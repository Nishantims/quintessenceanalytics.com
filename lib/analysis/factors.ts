import { Chess, type Color, type Square } from 'chess.js'
import {
  computeCenterControl, computeDevelopment, computeDiagonalControl, computeInitiative,
  computeKingActivity, computeKingExposure, computeKingShelter, computePassedPawns, computePawnBreaks, computePawnStructure,
  computePieceActivity, computePieceCoordination, computeRookActivity, computeSEE,
  computeSpace, computeTempo, computeTension,
} from './heuristics'
import { computeMaterial } from './heuristics'
import { summarizePieceStrength } from './piece-strength'
import type { GamePhase } from './game-phase'

// The single consolidated factor table — replaces the earlier separate
// Position Health (10 factors) and Chess Principles (20 factors) panels,
// which a real user correctly flagged as showing overlapping/duplicate
// information (King Safety, Development, Center Control, etc. were
// computed identically in both). Every factor here is real and computed
// exactly once. King Shelter + King Exposure are merged into one real
// King Safety score per the same feedback — showing two separate 0-100
// numbers for what's conceptually one thing (and which aren't
// complementary/summing to 100) was confusing, not informative.
//
// Each factor is tagged with the real game phases it's actually relevant
// in (see game-phase.ts) — Development and Tempo stop mattering once the
// opening is over; King Safety in the endgame is a different, often
// inverted concern (activate the king, don't shelter it) and is excluded
// there rather than shown with a misleading label. King Activity (Endgame
// only) and Passed Pawns (Middlegame/Endgame) exist specifically to fill
// that gap — a real, reported complaint otherwise: without them, an
// endgame summary had nothing endgame-specific to actually say once King
// Safety dropped out.

export type HealthStatus = 'Strong' | 'Stable' | 'Weak' | 'Critical'

export interface Factor {
  name: string
  score: number | null
  status: HealthStatus | 'Not yet measured'
  phases: GamePhase[]
}

function statusFor(score: number): HealthStatus {
  if (score >= 75) return 'Strong'
  if (score >= 50) return 'Stable'
  if (score >= 30) return 'Weak'
  return 'Critical'
}

function factor(name: string, value: number, phases: GamePhase[]): Factor {
  return { name, score: Math.round(value), status: statusFor(value), phases }
}

// Real merged King Safety: pawn shield and attacker-proximity/open-file
// exposure combined into ONE number (average of the two real sub-signals,
// documented, not hidden) rather than shown as two separately-labeled
// scores that don't obviously relate to each other.
function computeKingSafety(chess: Chess, color: Color): number {
  return (computeKingShelter(chess, color) + computeKingExposure(chess, color)) / 2
}

function computeOutposts(chess: Chess, color: Color): number {
  const enemyColor: Color = color === 'w' ? 'b' : 'w'
  let outposts = 0, minorPieces = 0
  for (const row of chess.board()) {
    for (const cell of row) {
      if (cell?.color !== color || (cell.type !== 'n' && cell.type !== 'b')) continue
      minorPieces++
      const file = cell.square.charCodeAt(0) - 97
      const rank = Number(cell.square[1])
      const aheadRanks = color === 'w' ? [rank + 1, rank + 2] : [rank - 1, rank - 2]
      let canBeChallenged = false
      for (const row2 of chess.board()) {
        for (const cell2 of row2) {
          if (cell2?.color !== enemyColor || cell2.type !== 'p') continue
          const f2 = cell2.square.charCodeAt(0) - 97
          const r2 = Number(cell2.square[1])
          if (Math.abs(f2 - file) === 1 && aheadRanks.includes(r2)) canBeChallenged = true
        }
      }
      const isDefendedByOwnPawn = chess.attackers(cell.square, color).some(sq => chess.get(sq)?.type === 'p')
      if (!canBeChallenged && isDefendedByOwnPawn) outposts++
    }
  }
  return minorPieces === 0 ? 0 : Math.min(100, (outposts / minorPieces) * 100)
}

function computeOpenFileControl(chess: Chess, color: Color): number {
  const pawnFiles = new Set<number>()
  for (const row of chess.board()) for (const cell of row) if (cell?.type === 'p') pawnFiles.add(cell.square.charCodeAt(0) - 97)
  const openFiles = [0, 1, 2, 3, 4, 5, 6, 7].filter(f => !pawnFiles.has(f))
  if (openFiles.length === 0) return 50
  let controlled = 0
  for (const f of openFiles) {
    for (let r = 1; r <= 8; r++) {
      const piece = chess.get(`${'abcdefgh'[f]}${r}` as Square)
      if (piece?.color === color && (piece.type === 'r' || piece.type === 'q')) { controlled++; break }
    }
  }
  return Math.min(100, (controlled / openFiles.length) * 100)
}

export function computeAllFactors(fen: string, color: Color, phase: GamePhase): Factor[] {
  const chess = new Chess(fen)
  const material = computeMaterial(chess)
  const materialDiff = color === 'w' ? material.diff : -material.diff
  const pawnIssues = computePawnStructure(chess, color)
  const pawnStructureScore = Math.max(0, 100 - pawnIssues.doubled * 15 - pawnIssues.isolated * 15)

  const pieceStrength = summarizePieceStrength(fen, color)
  const queenSquare = chess.findPiece({ type: 'q', color })[0]
  const queenStrength = queenSquare ? pieceStrength.pieces.find(p => p.square === queenSquare) : undefined

  const enemyColor: Color = color === 'w' ? 'b' : 'w'
  let bestSEE = 0
  for (const row of chess.board()) {
    for (const cell of row) {
      if (cell?.color !== enemyColor || chess.attackers(cell.square, color).length === 0) continue
      bestSEE = Math.max(bestSEE, computeSEE(chess, cell.square, color))
    }
  }

  const all: Factor[] = [
    factor('Material', Math.max(0, Math.min(100, 50 + materialDiff * 6)), ['Opening', 'Middlegame', 'Endgame']),
    factor('Development', computeDevelopment(chess, color) * 100, ['Opening', 'Middlegame']),
    factor('King Safety', computeKingSafety(chess, color), ['Opening', 'Middlegame']),
    factor('Center Control', computeCenterControl(chess, color) * 100, ['Opening', 'Middlegame']),
    factor('Space', Math.min(100, computeSpace(chess, color) * 5), ['Opening', 'Middlegame', 'Endgame']),
    factor('Pawn Structure', pawnStructureScore, ['Opening', 'Middlegame', 'Endgame']),
    factor('Piece Activity', computePieceActivity(chess, color), ['Opening', 'Middlegame', 'Endgame']),
    factor('Piece Coordination', computePieceCoordination(chess, color), ['Middlegame', 'Endgame']),
    factor('Rook Activity', computeRookActivity(chess, color), ['Middlegame', 'Endgame']),
    factor('Open-File Control', computeOpenFileControl(chess, color), ['Middlegame', 'Endgame']),
    factor('Diagonal Control', computeDiagonalControl(chess, color), ['Middlegame']),
    factor('Outposts', computeOutposts(chess, color), ['Middlegame']),
    factor('Pawn Breaks', computePawnBreaks(chess, color), ['Middlegame', 'Endgame']),
    factor('Maintaining Tension', computeTension(chess, color), ['Middlegame']),
    factor('Exchanging Correctly', Math.max(0, Math.min(100, 50 + bestSEE * 5)), ['Opening', 'Middlegame', 'Endgame']),
    factor('Initiative', computeInitiative(chess, color), ['Middlegame', 'Endgame']),
    factor('Tempo', computeTempo(chess, color), ['Opening', 'Middlegame']),
    factor('King Activity', computeKingActivity(chess, color), ['Endgame']),
    factor('Passed Pawns', computePassedPawns(chess, color), ['Middlegame', 'Endgame']),
    queenStrength
      ? factor('Queen Safety', queenStrength.safety, ['Opening', 'Middlegame'])
      : { name: 'Queen Safety', score: null, status: 'Not yet measured', phases: ['Opening', 'Middlegame'] },
  ]

  // A factor with no real score for this position (e.g. Queen Safety once
  // the queen is off the board) isn't a strength or a weakness — it's
  // nothing to report, not a line item to call out as "unmeasured."
  return all.filter(f => f.phases.includes(phase) && f.score !== null)
}
