import { StockfishPool, type StockfishAnalysis } from '@se-oss/stockfish'
import { Chess } from 'chess.js'
import { toWhiteRelative } from '../analysis/eval'
import { ENGINE_MIN_ELO, ENGINE_MAX_ELO } from './constants'

export { ENGINE_MIN_ELO, ENGINE_MAX_ELO }

// A single Stockfish instance can only run one analyze() call at a time —
// confirmed live: making a move fires both the position-analysis call and
// the move-quality call (which itself needs to analyze the post-move
// position) within the same moment, and a lone engine threw "Analysis
// already in progress." A small pool (not a hand-rolled queue) is the
// package's own answer to exactly this, and lets those two real concurrent
// requests actually run in parallel instead of serializing.
//
// Singleton across hot-reloads in dev, same pattern as realestateos's
// getDb() — the pool's child WASM processes shouldn't be re-spawned per
// request.
declare global {
  var __chessIqPool: StockfishPool | undefined
  var __chessIqPoolReady: Promise<void> | undefined
}

function getPool(): { pool: StockfishPool; ready: Promise<void> } {
  if (!global.__chessIqPool) {
    global.__chessIqPool = new StockfishPool(2)
    global.__chessIqPoolReady = global.__chessIqPool.initialize()
  }
  return { pool: global.__chessIqPool, ready: global.__chessIqPoolReady! }
}

export interface CandidateLine {
  pv: string[]           // sequence of moves in UCI form, e.g. ['e2e4', 'e7e5', ...]
  evalCp: number | null  // centipawns, ALWAYS White-relative (positive favors White), regardless of side to move — see lib/analysis/eval.ts
  mateIn: number | null  // moves to mate, ALWAYS White-relative (positive = White mates); null if evalCp is set
}

export interface EngineAnalysis {
  fen: string
  depth: number
  bestMove: string | null
  candidates: CandidateLine[]  // ordered strongest-first, length = multiPv requested (or fewer if game is near mate/over)
}

// Real Stockfish analysis, nothing invented here — every caller downstream
// (heuristics, narration) treats this as ground truth to explain, never to
// second-guess or override with its own guess at an eval/best move.
export async function analyzePosition(fen: string, { depth = 18, multiPv = 3 }: { depth?: number; multiPv?: number } = {}): Promise<EngineAnalysis> {
  // A real, confirmed bug otherwise: a position that is ALREADY checkmate
  // (the side to move has no legal moves and is in check) has nothing for
  // the engine to search. Some Stockfish builds report this as a bare
  // "mate 0", but 0 carries no sign — winPercentFromWhiteRelative's
  // `mateIn > 0 ? 100 : 0` then always resolves to 0, which showed the eval
  // bar as a decisive win for Black even when White had just delivered the
  // mate. Detected and reported directly here instead of trusting an
  // ambiguous engine value: a decisive, capped centipawn score (matching
  // move-quality.ts's own mate-adjacent ±1000cp convention) in whichever
  // direction is actually real for this position.
  const positionBeforeSearch = new Chess(fen)
  if (positionBeforeSearch.isCheckmate()) {
    const sideCheckmated = positionBeforeSearch.turn()
    return {
      fen,
      depth,
      bestMove: null,
      candidates: [{ pv: [], evalCp: sideCheckmated === 'w' ? -1000 : 1000, mateIn: null }],
    }
  }

  const { pool, ready } = getPool()
  await ready

  const engine = await pool.acquire()
  let result: StockfishAnalysis
  try {
    // A pooled engine may have been left in weakened "play at ELO X" mode by
    // a getEngineMove() call (see below) — options set via setOptions()
    // persist on the instance across calls, so real coaching analysis must
    // explicitly force full strength rather than trust the engine's prior
    // state.
    await engine.setOptions({ UCI_LimitStrength: false })
    result = await engine.analyze(fen, depth, multiPv)
  } finally {
    pool.release(engine)
  }
  const sideToMove = new Chess(fen).turn()

  // The engine already returns lines strongest-first (multipv 1..N). Raw
  // scores are side-to-move-relative (UCI convention) — converted to
  // White-relative immediately so every downstream consumer gets one
  // consistent frame and never has to re-derive whose perspective a number
  // is in.
  const candidates: CandidateLine[] = result.lines.map(line => {
    const raw = { evalCp: line.score.type === 'cp' ? line.score.value : null, mateIn: line.score.type === 'mate' ? line.score.value : null }
    const whiteRelative = toWhiteRelative(raw.evalCp, raw.mateIn, sideToMove)
    return { pv: line.pv.trim().split(/\s+/).filter(Boolean), ...whiteRelative }
  })

  return {
    fen,
    depth,
    bestMove: result.bestmove || null,
    candidates,
  }
}

// The move Stockfish plays when deliberately weakened to approximate a
// target ELO, via the engine's own real UCI_LimitStrength/UCI_Elo options —
// not a hand-rolled "randomly pick a worse move" simulation.
export async function getEngineMove(fen: string, elo: number): Promise<string | null> {
  const clampedElo = Math.max(ENGINE_MIN_ELO, Math.min(ENGINE_MAX_ELO, Math.round(elo)))
  const { pool, ready } = getPool()
  await ready

  const engine = await pool.acquire()
  try {
    await engine.setOptions({ UCI_LimitStrength: true, UCI_Elo: clampedElo })
    const result = await engine.analyze(fen, 15, 1)
    return result.bestmove || null
  } finally {
    // Reset immediately on release too, belt-and-braces against the next
    // acquirer forgetting to (analyzePosition already does its own reset,
    // this just keeps the pool's resting state honest).
    await engine.setOptions({ UCI_LimitStrength: false }).catch(() => {})
    pool.release(engine)
  }
}
