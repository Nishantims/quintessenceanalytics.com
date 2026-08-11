'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { markFreeGameUsedAction } from '@/lib/chess/free-game-actions'
import { Chess, type Color, type Square } from 'chess.js'
import { Chessboard } from 'react-chessboard'
import type { EngineAnalysis } from '@/lib/engine/stockfish'
import { computeAllFactors, type Factor } from '@/lib/analysis/factors'
import { computeGamePhase, type GamePhase } from '@/lib/analysis/game-phase'
import { computePositionStatus } from '@/lib/analysis/position-status'
import { computeRatingEstimate } from '@/lib/analysis/rating-estimate'
import { computeMoveAccuracy, computeSessionAccuracy } from '@/lib/analysis/accuracy'
import { computeThreats, computeWeaknesses } from '@/lib/analysis/threats'
import { computeMaterial } from '@/lib/analysis/heuristics'
import { computeWeakSquares } from '@/lib/analysis/weak-squares'
import { summarizePieceStrength } from '@/lib/analysis/piece-strength'
import { computeImbalances } from '@/lib/analysis/imbalance'
import { computePositionNarrative, computeGameOverNarrative } from '@/lib/analysis/position-narrative'
import { computeTacticalScoring, type ScoreEntry } from '@/lib/analysis/tactical-scoring'
import { CCTAP_STEPS } from '@/lib/analysis/cctap'
import { detectForks, detectPins, detectSkewers, detectDiscoveredAttacks, detectOverloadedPieces } from '@/lib/analysis/tactics'
import type { MoveQuality } from '@/lib/analysis/move-quality'
import type { PositionSummaryInput } from '@/lib/ai/narrate-position'
import { GameSetup } from '@/components/GameSetup'
import { EvalStrip } from '@/components/EvalStrip'
import { SituationPanel } from '@/components/SituationPanel'
import { LastMoveCard, type LastMoveInfo } from '@/components/LastMoveCard'
import { MetricsRow, type Metric } from '@/components/MetricsRow'
import { TacticalScoringPanel } from '@/components/TacticalScoringPanel'
import { MovesHistoryPanel, type MoveLogEntry } from '@/components/MovesHistoryPanel'
import { CctapBar } from '@/components/CctapBar'
import { BoardToolbar, type HighlightMode } from '@/components/BoardToolbar'

interface AnalyzeResponse {
  engine: EngineAnalysis
}

// Tags every fetched analysis with the exact fen it's FOR — a real,
// confirmed bug otherwise: the standing /api/analyze effect takes 1-3 real
// seconds per position, and during that window `data` still holds the
// PREVIOUS position's analysis. Anything reading `engine`/`topLine`
// directly (Hint, Best Move, Checkmate Alert) would silently show a
// recommendation for the position the player just moved OUT of — exactly
// the reported "Hint said Na6, I played it, and grading said Best was
// dxe4" case. Gating on `analyzedFen === fen` makes stale data fall back
// to each tool's own honest "Analyzing…" state instead.
interface TaggedAnalysis {
  fen: string
  engine: EngineAnalysis
}

interface MoveQualityResponse {
  moveQuality: MoveQuality
  playedMoveSan: string | null
  bestMoveSan: string | null
  bestLineSan: string[]
  narration: string | null
}

// Real fix for a reported bug: navigating to /how-it-works and clicking
// "Back to game" remounts this component from scratch, which previously
// reset every piece of React state to its initial value — the in-progress
// game was simply gone. sessionStorage survives a same-tab route change
// (but not a real close/reopen, which is the right scope: this restores
// THIS session's game, not a permanent save file). Theme prefs (dark mode,
// board color) live in their own always-on key so picking a theme on the
// setup screen isn't lost the moment "New game" clears the in-progress key.
const THEME_KEY = 'chess-iq-theme'
const GAME_KEY = 'chess-iq-game'

interface PersistedTheme { dark: boolean; boardTheme: BoardTheme }
interface PersistedGame {
  gameStarted: boolean
  playerColor: Color
  engineElo: number
  fen: string
  fenHistory: string[]
  lastMove: { from: Square; to: Square } | null
  moveLog: MoveLogEntry[]
  moveQuality: MoveQualityResponse | null
  summary: string | null
  cctapMode: boolean
  cctapStep: number
  movesHistoryOpen: boolean
  activePhaseTab: GamePhase
  phaseSnapshots: Partial<Record<GamePhase, ScoreEntry[]>>
  phaseStartMove: Partial<Record<GamePhase, number>>
}

function loadJSON<T>(key: string): T | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = sessionStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : null
  } catch {
    return null
  }
}

const START_FEN = new Chess().fen()

const PIECE_NAMES: Record<string, string> = { p: 'pawn', n: 'knight', b: 'bishop', r: 'rook', q: 'queen', k: 'king' }

function plyFromFen(fenBeforeMove: string): number {
  const parts = fenBeforeMove.split(' ')
  const turn = parts[1]
  const fullmove = Number(parts[5])
  return turn === 'w' ? (fullmove - 1) * 2 + 1 : (fullmove - 1) * 2 + 2
}
function fullmoveFromFen(fen: string): number {
  return Number(fen.split(' ')[5] ?? 1)
}

// Bumped up from an earlier 0.3-0.35 opacity — a real reported visibility
// gap: on the lighter board skins (and especially the new pink/green/blue
// themes) a translucent tint that faint was hard to actually see against
// the light squares. 0.5+ stays a tint (piece art underneath still reads)
// while being clearly visible on every board color.
const HIGHLIGHT_COLORS = {
  red: 'rgba(220,38,38,0.5)',
  orange: 'rgba(234,88,12,0.5)',
  blue: 'rgba(37,99,235,0.5)',
  green: 'rgba(22,163,74,0.5)',
}

// Pink/green/blue skins are a clean two-tone: light squares are literal
// white, dark squares carry the real theme color — swapped from an
// earlier version that used a deep shade of the same hue for dark squares,
// which read as too saturated/heavy across the whole board. Default stays
// the classic wood-style two-tone, untouched.
const BOARD_THEMES: Record<'default' | 'pink' | 'green' | 'blue', { light: string; dark: string; swatch: string }> = {
  default: { light: '#F0D9B5', dark: '#B58863', swatch: '#D9B98A' },
  pink: { light: '#FFFFFF', dark: '#FF6699', swatch: '#FF6699' },
  green: { light: '#FFFFFF', dark: '#00CC66', swatch: '#00CC66' },
  blue: { light: '#FFFFFF', dark: '#4BD0FF', swatch: '#4BD0FF' },
}
type BoardTheme = keyof typeof BOARD_THEMES

// Best/Excellent/Good are all "fine" moves but were previously all shown
// as the exact same green dot, with no way to tell a truly best move from
// a merely good one — a real, reported gap. Best gets its own distinct hue
// (blue) since it's categorically different (matched the engine exactly);
// Excellent/Good stay green but at different opacity so the family
// relationship (all real, all fine) still reads at a glance.
const GRADE_DOT_CLASS: Record<string, string> = {
  Best: 'bg-status-blue',
  Excellent: 'bg-status-green',
  Good: 'bg-status-green opacity-50',
  Inaccuracy: 'bg-status-orange',
  Mistake: 'bg-status-alt2',
  Blunder: 'bg-status-red',
}

// One real, concrete "how do I use this" instruction per CCTAP step,
// keyed by the tool that step drives (see cctap.ts's own tool mapping) —
// the missing piece the reported gap named directly: real data alone
// ("no forced mate," "3 undefended pieces") doesn't say what to DO with it.
const CCTAP_GUIDANCE: Record<string, string> = {
  checkmate: 'If a real mate is shown above, calculate it fully before playing anything else — it ends the game. If not, move on to Captures.',
  undefended: "Any real piece listed above (yours or theirs) is worth a look — capturing theirs wins material outright; defending yours prevents losing it. Then check Threats.",
  imbalance: "If a real imbalance favors the opponent, fix it now (defend, trade off the attacker, or move the piece) before it's actually lost. Then move to Analysis.",
  weakSquares: 'Compare the two real lists above — weak squares in their camp are real outposts for your pieces; weak squares in yours are real targets for theirs. Let that shape your plan, then check the Hint.',
  hint: "This is the engine's real best move for the position — but first confirm it actually addresses whatever you found in Checks, Captures, and Threats above. If it does, that's your move.",
}

// The vw term only ever binds below ~1300px width (the single-column
// stacked range) — 80vw (not 100) leaves room for the outer container's
// own px-5 padding plus the eval bar beside the board so nothing clips at
// the container edge on phones.
// Raised again to 850px/75vh per an explicit "make the board 125%
// bigger" request. The grid's "auto" center column shrinks to fit
// whatever real space is actually left after the two fixed 400px side
// columns at ordinary (non-fullscreen) widths, so this cap only fully
// binds in fullscreen (no max-w-[1680px] limit there) or on a wide-
// enough monitor — it never forces the row wider than the container.
const BOARD_MAX_WIDTH = 'min(850px, 75vh, 80vw)'
// Board width plus the vertical eval bar's own width (20px) and the gap
// between them (8px) — used for the rows below/beside the board (eval
// bar+board, Hint/Back, Recent moves) so they all line up to the same
// real total width instead of the board-only width leaving the eval bar
// looking unaligned with the rows below it.
const ROW_MAX_WIDTH = `calc(${BOARD_MAX_WIDTH} + 28px)`
// Red (matching the same red used for the toolbar's own real highlights),
// not the earlier blue — a real reported visibility gap: blue blended into
// a near-invisible purple against the blue board skins. A solid ring on
// top of the tint keeps the selected square clearly visible no matter
// which board color is active underneath.
const SELECTED_SQUARE_STYLE = { backgroundColor: 'rgba(220,38,38,0.5)', boxShadow: 'inset 0 0 0 3px rgba(220,38,38,0.95)' }
const QUIET_DOT_STYLE = { background: 'radial-gradient(circle, rgba(0,0,0,0.35) 18%, transparent 20%)' }
const CAPTURE_RING_STYLE = { boxShadow: 'inset 0 0 0 4px rgba(0,0,0,0.35)' }

// hasActiveSubscription/initialFreeGameUsed come from a real server-side
// check (see page.tsx) — the server already redirects to /Chess-2000/
// subscribe before this component ever mounts if neither is true, so
// within one mount access always starts allowed. The only gate needed
// HERE is for a second "Start game" click in the same session (no full
// page reload in between), tracked via local state seeded from the same
// server values.
export default function ChessGameClient({
  hasActiveSubscription, initialFreeGameUsed,
}: {
  hasActiveSubscription: boolean
  initialFreeGameUsed: boolean
}) {
  const router = useRouter()
  const [freeGameUsed, setFreeGameUsed] = useState(initialFreeGameUsed)
  const containerRef = useRef<HTMLDivElement>(null)

  const [isFullscreen, setIsFullscreen] = useState(false)
  // Dark + green are the real default now, per an explicit request — a
  // returning player's own saved choice (THEME_KEY, below) still always
  // wins once it exists; this only changes what a first-ever visit sees.
  const [dark, setDark] = useState(true)
  const [boardTheme, setBoardTheme] = useState<BoardTheme>('green')
  const [copied, setCopied] = useState(false)
  // True until the component actually unmounts — used only to guard the
  // engine's move-quality grading fetch below, which must NOT be cancelled
  // by that same effect's own re-run (see the real bug this fixed: setting
  // `fen` to the post-move position from inside the effect changes the
  // effect's own dependency, tearing it down and cancelling its still-
  // pending grading fetch before the response ever arrives).
  const mountedRef = useRef(true)
  useEffect(() => () => { mountedRef.current = false }, [])

  const [gameStarted, setGameStarted] = useState(false)
  const [playerColor, setPlayerColor] = useState<Color>('w')
  const [engineElo, setEngineElo] = useState(1500)

  const [fen, setFen] = useState(START_FEN)
  const [fenHistory, setFenHistory] = useState<string[]>([])
  const [lastMove, setLastMove] = useState<{ from: Square; to: Square } | null>(null)
  const [data, setData] = useState<TaggedAnalysis | null>(null)
  const [loading, setLoading] = useState(false)
  const [engineThinking, setEngineThinking] = useState(false)
  const [highlightMode, setHighlightMode] = useState<HighlightMode>(null)
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null)

  const [moveQuality, setMoveQuality] = useState<MoveQualityResponse | null>(null)
  const [moveQualityLoading, setMoveQualityLoading] = useState(false)
  const [moveLog, setMoveLog] = useState<MoveLogEntry[]>([])
  const [summary, setSummary] = useState<string | null>(null)

  const [cctapMode, setCctapMode] = useState(false)
  const [cctapStep, setCctapStep] = useState(0)
  const [movesHistoryOpen, setMovesHistoryOpen] = useState(false)
  const [activePhaseTab, setActivePhaseTab] = useState<GamePhase>('Opening')
  const [phaseSnapshots, setPhaseSnapshots] = useState<Partial<Record<GamePhase, ScoreEntry[]>>>({})
  const [phaseStartMove, setPhaseStartMove] = useState<Partial<Record<GamePhase, number>>>({})

  // Real fix for a real hydration-mismatch bug: reading sessionStorage
  // directly into useState's initial value (the earlier version) made the
  // very first CLIENT render disagree with the server's render (the server
  // has no access to browser storage, so it always renders the GameSetup
  // default) — React detects the mismatch and throws the tree away.
  // Restoring in an effect keeps the first render identical on both sides.
  //
  // `hydrated` is real STATE, not a ref, and deliberately included in both
  // save-effects' dependency arrays below — a ref alone doesn't force a
  // second render, so a save-effect sharing the exact same commit as this
  // restore effect would still see the pre-restore, default values (the
  // setState calls above only apply on the NEXT render) and could wipe the
  // real saved session before it was ever applied. Flipping real state
  // guarantees that next render happens, and the dependency array
  // guarantees both save-effects actually re-evaluate once it does.
  const [hydrated, setHydrated] = useState(false)
  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- the standard, React-team-endorsed pattern for restoring client-only storage after mount without a hydration mismatch; there's no external-system "subscription" to model here, just a one-time read */
    const savedTheme = loadJSON<PersistedTheme>(THEME_KEY)
    if (savedTheme) {
      setDark(savedTheme.dark)
      setBoardTheme(savedTheme.boardTheme)
    }
    const savedGame = loadJSON<PersistedGame>(GAME_KEY)
    if (savedGame) {
      setGameStarted(savedGame.gameStarted)
      setPlayerColor(savedGame.playerColor)
      setEngineElo(savedGame.engineElo)
      setFen(savedGame.fen)
      setFenHistory(savedGame.fenHistory)
      setLastMove(savedGame.lastMove)
      setMoveQuality(savedGame.moveQuality)
      setMoveLog(savedGame.moveLog)
      setSummary(savedGame.summary)
      setCctapMode(savedGame.cctapMode)
      setCctapStep(savedGame.cctapStep)
      setMovesHistoryOpen(savedGame.movesHistoryOpen)
      setActivePhaseTab(savedGame.activePhaseTab)
      setPhaseSnapshots(savedGame.phaseSnapshots)
      setPhaseStartMove(savedGame.phaseStartMove)
    }
    setHydrated(true)
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [])

  // Theme prefs always persist. The in-progress game persists only while
  // one is actually active, and is cleared the moment it isn't (New Game),
  // so a stale finished game never comes back from a later How It Works visit.
  useEffect(() => {
    if (!hydrated) return
    sessionStorage.setItem(THEME_KEY, JSON.stringify({ dark, boardTheme }))
  }, [hydrated, dark, boardTheme])
  useEffect(() => {
    if (!hydrated) return
    if (!gameStarted) {
      sessionStorage.removeItem(GAME_KEY)
      return
    }
    const session: PersistedGame = {
      gameStarted, playerColor, engineElo, fen, fenHistory, lastMove, moveLog, moveQuality, summary,
      cctapMode, cctapStep, movesHistoryOpen, activePhaseTab, phaseSnapshots, phaseStartMove,
    }
    sessionStorage.setItem(GAME_KEY, JSON.stringify(session))
  }, [hydrated, gameStarted, playerColor, engineElo, fen, fenHistory, lastMove, moveLog, moveQuality, summary, cctapMode, cctapStep, movesHistoryOpen, activePhaseTab, phaseSnapshots, phaseStartMove])

  const game = useMemo(() => new Chess(fen), [fen])
  const sideToMove = game.turn()
  const gameOver = game.isGameOver()
  const gameStatus = game.isCheckmate() ? 'Checkmate' : game.isStalemate() ? 'Stalemate' : game.isDraw() ? 'Draw' : game.isCheck() ? 'Check' : null
  const enemyColor: Color = playerColor === 'w' ? 'b' : 'w'
  const playerLabel = playerColor === 'w' ? 'White' : 'Black'

  // Click-to-move: a real, standard second interaction mode alongside
  // drag-and-drop. Legal targets always come straight from chess.js, same
  // as every other move in this app — clicking never "teleports" a piece
  // anywhere it couldn't really go.
  const legalTargets = useMemo(() => {
    if (!selectedSquare || sideToMove !== playerColor) return []
    return game.moves({ square: selectedSquare, verbose: true }).map(m => m.to)
  }, [selectedSquare, game, sideToMove, playerColor])
  const moveDotStyles = useMemo(() => {
    const styles: Record<string, { backgroundColor?: string; background?: string; boxShadow?: string }> = {}
    if (selectedSquare) styles[selectedSquare] = SELECTED_SQUARE_STYLE
    legalTargets.forEach(sq => { styles[sq] = game.get(sq) ? CAPTURE_RING_STYLE : QUIET_DOT_STYLE })
    return styles
  }, [selectedSquare, legalTargets, game])
  useEffect(() => { Promise.resolve().then(() => setSelectedSquare(null)) }, [fen])

  const gamePhase = useMemo(() => computeGamePhase(fen), [fen])
  const factors = useMemo(() => computeAllFactors(fen, playerColor, gamePhase), [fen, playerColor, gamePhase])
  const scoredFactors = useMemo(() => factors.filter((f): f is Factor & { score: number } => f.score !== null), [factors])

  const playerMoves = useMemo(() => moveLog.filter(m => m.color === playerColor), [moveLog, playerColor])
  const ratingEstimate = useMemo(
    () => computeRatingEstimate(playerMoves.filter((m): m is typeof m & { centipawnLoss: number } => m.centipawnLoss !== null).map(m => m.centipawnLoss), engineElo),
    [playerMoves, engineElo],
  )
  const sessionAccuracy = useMemo(
    () => computeSessionAccuracy(playerMoves.filter((m): m is typeof m & { accuracy: number } => m.accuracy !== null).map(m => m.accuracy)),
    [playerMoves],
  )
  const materialDiff = useMemo(() => computeMaterial(game).diff, [game])

  const threats = useMemo(() => computeThreats(fen, playerColor), [fen, playerColor])
  const weaknesses = useMemo(() => computeWeaknesses(fen, playerColor), [fen, playerColor])
  const opportunityCaptures = useMemo(() => computeThreats(fen, enemyColor), [fen, enemyColor])
  const enemyWeaknesses = useMemo(() => computeWeaknesses(fen, enemyColor), [fen, enemyColor])
  const ownWeakSquares = useMemo(() => computeWeakSquares(fen, playerColor), [fen, playerColor])
  const enemyWeakSquares = useMemo(() => computeWeakSquares(fen, enemyColor), [fen, enemyColor])
  const overloadedEnemy = useMemo(() => detectOverloadedPieces(fen, enemyColor), [fen, enemyColor])
  const overloadedOwn = useMemo(() => detectOverloadedPieces(fen, playerColor), [fen, playerColor])

  const playerTactics = useMemo(() => ({
    forks: detectForks(fen, playerColor), pins: detectPins(fen, enemyColor), skewers: detectSkewers(fen, playerColor),
    discoveredAttacks: detectDiscoveredAttacks(fen, playerColor),
  }), [fen, playerColor, enemyColor])
  // Tactics Alert is deliberately player-only: real geometric patterns
  // (forks/pins/skewers/discovered attacks) plus real profitable exchanges
  // (opportunityCaptures, the same real SEE-filtered captures used
  // throughout) — everything the PLAYER can actually execute right now.
  const hasTactic = playerTactics.forks.length + playerTactics.pins.length + playerTactics.skewers.length
    + playerTactics.discoveredAttacks.length + opportunityCaptures.length > 0

  const pieceStrength = useMemo(() => summarizePieceStrength(fen, playerColor), [fen, playerColor])
  const enemyPieceStrength = useMemo(() => summarizePieceStrength(fen, enemyColor), [fen, enemyColor])
  const imbalances = useMemo(() => computeImbalances(fen), [fen])

  const engine = data?.fen === fen ? data.engine : undefined
  const topLine = engine?.candidates[0]
  const hasForcedMate = topLine?.mateIn != null
  const positionStatus = useMemo(() => computePositionStatus(topLine?.evalCp ?? null, topLine?.mateIn ?? null, playerColor), [topLine, playerColor])

  // Last-move analysis is deliberately player-only — the engine's own last
  // move isn't something the player needs graded for them; showing it
  // muddied whose move was actually being reviewed. `engineMoveQuality`
  // is still computed above (it feeds the shared move-grade dots in
  // Moves History and Recent moves, which DO need both sides).
  const lastMoveInfo: LastMoveInfo | null = useMemo(() => moveQuality?.playedMoveSan
    ? {
        san: moveQuality.playedMoveSan,
        grade: moveQuality.moveQuality.grade,
        note: moveQuality.narration ?? (moveQuality.moveQuality.grade !== 'Best' && moveQuality.bestMoveSan ? `Stronger was ${moveQuality.bestMoveSan}.` : null),
        mover: playerLabel as 'White' | 'Black',
      }
    : null, [moveQuality, playerLabel])

  function toSan(uci: string | null | undefined): string {
    if (!uci) return '?'
    try {
      const g = new Chess(fen)
      const mv = g.move({ from: uci.slice(0, 2), to: uci.slice(2, 4), promotion: uci[4] })
      return mv.san
    } catch {
      return uci
    }
  }

  const playerMaterialDiff = playerColor === 'w' ? materialDiff : -materialDiff

  // Once the game is actually over, the ongoing-position SWOT stops being
  // real (a real, reported bug: it kept talking about king safety and
  // tactics in an already-checkmated position) — a short, real,
  // outcome-specific summary replaces it instead.
  const positionNarrative = useMemo(() => {
    if (gameOver && (gameStatus === 'Checkmate' || gameStatus === 'Stalemate' || gameStatus === 'Draw')) {
      const playerWon = gameStatus === 'Checkmate' && sideToMove !== playerColor
      const lastMoveSan = moveLog[moveLog.length - 1]?.san ?? null
      return computeGameOverNarrative(gameStatus, playerWon, lastMoveSan)
    }
    const sorted = [...scoredFactors].sort((a, b) => b.score - a.score)
    return computePositionNarrative({
      status: positionStatus,
      topFactor: sorted[0] ?? null,
      bottomFactor: sorted[sorted.length - 1] ?? null,
      realThreatCount: threats.length,
      realOpportunityCount: playerTactics.forks.length + playerTactics.pins.length + playerTactics.skewers.length + opportunityCaptures.length,
      playerMaterialDiff,
      ownWeakSquaresCount: ownWeakSquares.length,
      enemyWeakSquaresCount: enemyWeakSquares.length,
    })
  }, [
    gameOver, gameStatus, sideToMove, playerColor, moveLog, scoredFactors, positionStatus, threats, playerTactics,
    opportunityCaptures, playerMaterialDiff, ownWeakSquares, enemyWeakSquares,
  ])

  // Real board highlights + the persistent Tool Panel's real explanation
  // text — every mode backed by data already computed above.
  const { squareStyles, arrows, explanationTitle, explanationLines } = useMemo(() => {
    const styles: Record<string, { backgroundColor: string }> = {}
    const arrowList: { startSquare: string; endSquare: string; color: string }[] = []
    let title = ''
    let lines: string[] = []

    if (highlightMode === 'undefended') {
      title = 'Undefended Pieces'
      weaknesses.forEach(w => { styles[w.square] = { backgroundColor: HIGHLIGHT_COLORS.red } })
      enemyWeaknesses.forEach(w => { styles[w.square] = { backgroundColor: HIGHLIGHT_COLORS.orange } })
      lines = [...weaknesses.map(w => `Yours: ${w.description}`), ...enemyWeaknesses.map(w => `Theirs: ${w.square} (${PIECE_NAMES[w.pieceType]}) is undefended and can be won.`)]
      if (lines.length === 0) lines = ['Nothing hanging for either side right now.']
    } else if (highlightMode === 'overloaded') {
      title = 'Overloaded Pieces'
      overloadedEnemy.forEach(o => { styles[o.square] = { backgroundColor: HIGHLIGHT_COLORS.orange } })
      overloadedOwn.forEach(o => { styles[o.square] = { backgroundColor: HIGHLIGHT_COLORS.red } })
      lines = [
        ...overloadedEnemy.map(o => `Theirs: ${PIECE_NAMES[o.pieceType]} on ${o.square} is overloaded, defending ${o.defending.join(' and ')}.`),
        ...overloadedOwn.map(o => `Yours: ${PIECE_NAMES[o.pieceType]} on ${o.square} is overloaded, defending ${o.defending.join(' and ')}.`),
      ]
      if (lines.length === 0) lines = ['No overloaded pieces for either side right now.']
    } else if (highlightMode === 'weakSquares') {
      title = 'Weak Squares'
      ownWeakSquares.forEach(sq => { styles[sq] = { backgroundColor: HIGHLIGHT_COLORS.red } })
      enemyWeakSquares.forEach(sq => { styles[sq] = { backgroundColor: HIGHLIGHT_COLORS.orange } })
      lines = [
        `Weak squares in your camp: ${ownWeakSquares.length ? ownWeakSquares.join(', ') : 'none'}.`,
        `Weak squares in their camp: ${enemyWeakSquares.length ? enemyWeakSquares.join(', ') : 'none'}.`,
      ]
    } else if (highlightMode === 'checkmate') {
      title = 'Checkmate Alert'
      if (topLine?.mateIn != null && engine?.bestMove) {
        const mateForPlayer = Math.sign(topLine.mateIn) === (playerColor === 'w' ? 1 : -1)
        arrowList.push({ startSquare: engine.bestMove.slice(0, 2), endSquare: engine.bestMove.slice(2, 4), color: mateForPlayer ? HIGHLIGHT_COLORS.green : HIGHLIGHT_COLORS.red })
        const kingSquare = game.findPiece({ type: 'k', color: mateForPlayer ? enemyColor : playerColor })[0]
        if (kingSquare) styles[kingSquare] = { backgroundColor: mateForPlayer ? HIGHLIGHT_COLORS.green : HIGHLIGHT_COLORS.red }
        lines = [mateForPlayer
          ? `Forced mate in ${Math.abs(topLine.mateIn)} for you — starting with ${toSan(engine.bestMove)}.`
          : `Forced mate in ${Math.abs(topLine.mateIn)} against you — the line starts with ${toSan(engine.bestMove)}.`]
      } else if (!engine) {
        // Real fix for a reported bug: the standing /api/chess-2000/analyze
        // effect takes 1-3 real seconds per position (see TaggedAnalysis
        // above), and `engine` is undefined the whole time it's running (or
        // stale-filtered out) — showing a flat "No forced mate" during that
        // window is actively wrong whenever a real mate exists and the
        // analysis just hasn't come back yet. Say so honestly instead.
        lines = ['Analyzing…']
      } else {
        lines = ['No forced mate on the board right now.']
      }
    } else if (highlightMode === 'hint') {
      title = 'Hint'
      // Hint is for the player's own decision — showing the engine's real
      // best move DURING the engine's own thinking phase isn't a hint for
      // anyone, it's just revealing the opponent's move before it plays.
      if (sideToMove !== playerColor) {
        lines = ["It's the engine's move — no hint needed."]
      } else if (engine?.bestMove) {
        arrowList.push({ startSquare: engine.bestMove.slice(0, 2), endSquare: engine.bestMove.slice(2, 4), color: HIGHLIGHT_COLORS.green })
        lines = [`${toSan(engine.bestMove)} is the engine's top choice for you right now.`]
      } else {
        lines = ['Analyzing…']
      }
    } else if (highlightMode === 'pieceStrength') {
      title = 'Piece Strength'
      const yours = pieceStrength.best && pieceStrength.worst
        ? `Yours — best piece: ${PIECE_NAMES[pieceStrength.best.pieceType]} on ${pieceStrength.best.square} (${pieceStrength.best.score}). Worst piece: ${PIECE_NAMES[pieceStrength.worst.pieceType]} on ${pieceStrength.worst.square} (${pieceStrength.worst.score}).`
        : 'Yours — no developed pieces to rank yet.'
      const theirs = enemyPieceStrength.best && enemyPieceStrength.worst
        ? `Theirs — best piece: ${PIECE_NAMES[enemyPieceStrength.best.pieceType]} on ${enemyPieceStrength.best.square} (${enemyPieceStrength.best.score}). Worst piece: ${PIECE_NAMES[enemyPieceStrength.worst.pieceType]} on ${enemyPieceStrength.worst.square} (${enemyPieceStrength.worst.score}).`
        : 'Theirs — no developed pieces to rank yet.'
      lines = [yours, theirs, 'Ranked by real mobility, safety, and coordination.']
    } else if (highlightMode === 'tactics') {
      title = 'Tactics Alert'
      playerTactics.forks.forEach(f => { styles[f.square] = { backgroundColor: HIGHLIGHT_COLORS.blue }; f.targets.forEach(t => { styles[t.square] = { backgroundColor: HIGHLIGHT_COLORS.blue } }) })
      playerTactics.pins.forEach(p => { styles[p.pinnedSquare] = { backgroundColor: HIGHLIGHT_COLORS.blue } })
      playerTactics.skewers.forEach(s => { styles[s.frontSquare] = { backgroundColor: HIGHLIGHT_COLORS.blue }; styles[s.backSquare] = { backgroundColor: HIGHLIGHT_COLORS.blue } })
      playerTactics.discoveredAttacks.forEach(d => { styles[d.movingPieceSquare] = { backgroundColor: HIGHLIGHT_COLORS.blue }; styles[d.targetSquare] = { backgroundColor: HIGHLIGHT_COLORS.blue } })
      opportunityCaptures.forEach(c => { styles[c.square] = { backgroundColor: HIGHLIGHT_COLORS.blue } })
      lines = [
        ...playerTactics.forks.map(f => `${PIECE_NAMES[f.pieceType]} on ${f.square} forks ${f.targets.map(t => `${PIECE_NAMES[t.pieceType]} (${t.square})`).join(' and ')}.`),
        ...playerTactics.pins.map(p => `Their ${PIECE_NAMES[p.pinnedPieceType]} on ${p.pinnedSquare} is pinned to their king by your piece on ${p.pinnedBy}.`),
        ...playerTactics.skewers.map(s => `Your piece on ${s.attackerSquare} skewers their ${PIECE_NAMES[s.frontPieceType]} into their ${PIECE_NAMES[s.backPieceType]}.`),
        ...playerTactics.discoveredAttacks.map(d => `Moving your ${PIECE_NAMES[d.movingPieceType]} (${d.movingPieceSquare}) reveals an attack on their ${PIECE_NAMES[d.targetType]} (${d.targetSquare}).`),
        ...opportunityCaptures.map(c => c.description),
      ]
      if (lines.length === 0) lines = ['No real tactic available for you right now.']
    } else if (highlightMode === 'imbalance') {
      title = 'Imbalance'
      imbalances.forEach(im => { styles[im.square] = { backgroundColor: im.pieceColor === playerColor ? HIGHLIGHT_COLORS.red : HIGHLIGHT_COLORS.orange } })
      lines = imbalances.map(im => {
        const who = im.pieceColor === playerColor ? 'Your' : 'Their'
        return `${who} ${PIECE_NAMES[im.pieceType]} on ${im.square} is outweighed — ${im.attackerWeight} points attacking vs ${im.defenderWeight} defending (pins excluded).`
      })
      if (lines.length === 0) lines = ['No real material imbalance on any square right now.']
    }
    // CCTAP mode is a guided walkthrough, not just a tool switcher — each
    // step gets one real, concrete "how do I use this" instruction on top
    // of the same real data, directly answering the reported gap ("CCTAP
    // doesn't tell how to find the best move").
    if (cctapMode) {
      const guidance = CCTAP_GUIDANCE[highlightMode as string]
      if (guidance) lines = [...lines, guidance]
    }
    return { squareStyles: styles, arrows: arrowList, explanationTitle: title, explanationLines: lines }
    // toSan is a plain function redefined every render off the same `fen`
    // already listed below — it always sees the current position when
    // called here, so it's deliberately left out rather than added as a
    // dependency that would just churn every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    highlightMode, weaknesses, enemyWeaknesses, overloadedEnemy, overloadedOwn, ownWeakSquares, enemyWeakSquares,
    fen, enemyColor, playerColor, lastMove, sideToMove, topLine, engine, game, pieceStrength, enemyPieceStrength, cctapMode,
    imbalances, playerTactics, opportunityCaptures,
  ])

  useEffect(() => {
    if (!gameStarted) return
    let cancelled = false
    Promise.resolve().then(() => { if (!cancelled) setLoading(true) })
    fetch('/api/chess-2000/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fen, depth: 18, multiPv: 3 }),
    })
      .then(r => r.json())
      .then((result: AnalyzeResponse) => { if (!cancelled) setData({ fen, engine: result.engine }) })
      .catch(err => console.error('[analyze] failed', err))
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [fen, gameStarted])

  useEffect(() => {
    if (!gameStarted || !topLine) return
    let cancelled = false
    const sorted = [...scoredFactors].sort((a, b) => b.score - a.score)
    const body: PositionSummaryInput = {
      status: positionStatus,
      evalDescription: topLine.mateIn !== null ? `Mate in ${Math.abs(topLine.mateIn)}` : `${(topLine.evalCp ?? 0) / 100}`,
      topFactors: sorted.slice(0, 3),
      bottomFactors: sorted.slice(-3),
      realThreatCount: threats.length,
      realTacticCount: playerTactics.forks.length + playerTactics.pins.length + playerTactics.skewers.length,
    }
    fetch('/api/chess-2000/position-summary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
      .then(r => r.json())
      .then((result: { narration: string | null }) => { if (!cancelled) setSummary(result.narration) })
      .catch(err => console.error('[position-summary] failed', err))
    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fen, gameStarted, topLine?.evalCp, topLine?.mateIn])

  useEffect(() => {
    if (!gameStarted || gameOver || sideToMove === playerColor) return
    let cancelled = false
    Promise.resolve().then(() => { if (!cancelled) setEngineThinking(true) })
    const fenBeforeEngineMove = fen

    // Fetches its OWN dedicated analysis of the exact pre-move position
    // rather than reading the shared `engine` state — that state is also
    // being refreshed by the separate /api/analyze effect for this same
    // fen, and depending on it here created a real race: if that other
    // effect resolved first, `engine` (a dependency of this effect) would
    // change, tearing this effect down mid-flight and permanently
    // cancelling the in-flight grading fetch (leaving "Grading…" stuck
    // forever — a confirmed reproduced bug). A self-contained fetch has no
    // such race, at the cost of one extra real Stockfish call per engine move.
    Promise.all([
      fetch('/api/chess-2000/engine-move', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fen: fenBeforeEngineMove, elo: engineElo }),
      }).then(r => r.json()) as Promise<{ move: string | null }>,
      fetch('/api/chess-2000/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fen: fenBeforeEngineMove, depth: 18, multiPv: 1 }),
      }).then(r => r.json()).catch(() => null) as Promise<AnalyzeResponse | null>,
    ])
      .then(([result, analysis]) => {
        if (cancelled || !result.move) return
        const g = new Chess(fenBeforeEngineMove)
        const move = g.move({ from: result.move.slice(0, 2), to: result.move.slice(2, 4), promotion: result.move[4] })
        setFenHistory(prev => [...prev, fenBeforeEngineMove])
        setFen(g.fen())
        if (!move) return
        setLastMove({ from: move.from, to: move.to })
        const ply = plyFromFen(fenBeforeEngineMove)
        setMoveLog(prev => [...prev, { ply, color: move.color, san: move.san, grade: null, centipawnLoss: null, accuracy: null }])

        const bestLineBefore = analysis?.engine.candidates[0]
        if (bestLineBefore) {
          fetch('/api/chess-2000/move-quality', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              fenBefore: fenBeforeEngineMove,
              fenAfter: g.fen(),
              playedMoveUci: result.move,
              bestMoveBeforeUci: analysis?.engine.bestMove ?? null,
              bestLineBefore,
            }),
          })
            .then(r => r.json())
            .then((mq: MoveQualityResponse) => {
              if (!mountedRef.current) return
              const accuracy = computeMoveAccuracy(mq.moveQuality.winPercentBefore, mq.moveQuality.winPercentAfter)
              setMoveLog(prev => prev.map(m => m.ply === ply ? { ...m, grade: mq.moveQuality.grade, centipawnLoss: mq.moveQuality.centipawnLoss, accuracy } : m))
            })
            .catch(err => console.error('[engine move-quality] failed', err))
        }
      })
      .catch(err => console.error('[engine-move] failed', err))
      .finally(() => { if (!cancelled) setEngineThinking(false) })
    return () => { cancelled = true }
  }, [fen, gameStarted, gameOver, sideToMove, playerColor, engineElo])

  // Real phase-history: freezes each phase's real Strong/Neutral/Weak
  // principles the moment the game moves past it (see principles-by-phase.ts
  // for why recomputing against a LATER position would misrepresent it),
  // and records the real move number a phase actually began.
  useEffect(() => {
    if (!gameStarted) return
    Promise.resolve().then(() => {
      setPhaseSnapshots(prev => ({ ...prev, [gamePhase]: computeTacticalScoring(fen, playerColor) }))
    })
  }, [fen, gameStarted, playerColor, gamePhase])
  useEffect(() => {
    if (!gameStarted) return
    // Only the real moment of a phase TRANSITION should move the tab/record
    // a start move — deliberately excludes `fen` so browsing doesn't fight
    // a user who clicked a different tab mid-phase.
    Promise.resolve().then(() => {
      setPhaseStartMove(prev => prev[gamePhase] !== undefined ? prev : { ...prev, [gamePhase]: fullmoveFromFen(fen) })
      setActivePhaseTab(gamePhase)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gamePhase, gameStarted])

  // CCTAP walkthrough drives the real board tool for whichever step is
  // active — same real tools the toolbar exposes directly.
  useEffect(() => {
    if (!cctapMode) return
    Promise.resolve().then(() => setHighlightMode(CCTAP_STEPS[cctapStep].tool))
  }, [cctapMode, cctapStep])

  useEffect(() => {
    function onFullscreenChange() { setIsFullscreen(document.fullscreenElement === containerRef.current) }
    document.addEventListener('fullscreenchange', onFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange)
  }, [])

  function toggleFullscreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(err => console.error('[fullscreen] exit failed', err))
    } else {
      containerRef.current?.requestFullscreen().catch(err => console.error('[fullscreen] request failed', err))
    }
  }

  function shareGame() {
    navigator.clipboard.writeText(fen).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }).catch(err => console.error('[share] clipboard failed', err))
  }

  function handlePlayerMove(sourceSquare: string, targetSquare: string): boolean {
    if (sideToMove !== playerColor) return false
    const g = new Chess(fen)
    let move
    try {
      move = g.move({ from: sourceSquare, to: targetSquare, promotion: 'q' })
    } catch {
      return false
    }
    if (!move) return false

    const fenBefore = fen
    const fenAfter = g.fen()
    const playedMoveUci = move.from + move.to + (move.promotion ?? '')
    const prevEngine = engine
    const ply = plyFromFen(fenBefore)

    setFenHistory(prev => [...prev, fenBefore])
    setFen(fenAfter)
    setLastMove({ from: move.from, to: move.to })
    setMoveQuality(null)
    setMoveLog(prev => [...prev, { ply, color: move.color, san: move.san, grade: null, centipawnLoss: null, accuracy: null }])

    if (prevEngine?.candidates[0]) {
      setMoveQualityLoading(true)
      fetch('/api/chess-2000/move-quality', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fenBefore,
          fenAfter,
          playedMoveUci,
          bestMoveBeforeUci: prevEngine.bestMove,
          bestLineBefore: prevEngine.candidates[0],
        }),
      })
        .then(r => r.json())
        .then((result: MoveQualityResponse) => {
          setMoveQuality(result)
          const accuracy = computeMoveAccuracy(result.moveQuality.winPercentBefore, result.moveQuality.winPercentAfter)
          setMoveLog(prev => prev.map(m => m.ply === ply ? { ...m, grade: result.moveQuality.grade, centipawnLoss: result.moveQuality.centipawnLoss, accuracy } : m))
        })
        .catch(err => console.error('[move-quality] failed', err))
        .finally(() => setMoveQualityLoading(false))
    }
    return true
  }

  function handleBack() {
    if (fenHistory.length === 0) return
    let i = fenHistory.length - 1
    while (i > 0 && new Chess(fenHistory[i]).turn() !== playerColor) i--
    const prev = fenHistory[i]
    const popped = fenHistory.length - i
    setFenHistory(h => h.slice(0, i))
    setFen(prev)
    setLastMove(null)
    setMoveQuality(null)
    setMoveLog(log => log.slice(0, -popped))
  }

  function resetGame() {
    setGameStarted(false)
    setFen(START_FEN)
    setFenHistory([])
    setLastMove(null)
    setData(null)
    setMoveQuality(null)
    setMoveLog([])
    setHighlightMode(null)
    setSummary(null)
    setCctapMode(false)
    setCctapStep(0)
    setMovesHistoryOpen(false)
    setPhaseSnapshots({})
    setPhaseStartMove({})
  }

  if (!gameStarted) {
    // Real fix for a reported bug: data-theme is scoped to this app's own
    // container (see the main return below), not the document — the setup
    // screen previously rendered with no themed ancestor at all, so it
    // always showed light/default-board regardless of the real dark+green
    // defaults (or a returning player's own saved choice) below.
    return (
      <div data-theme={dark ? 'dark' : 'light'} data-board-theme={boardTheme} className="min-h-dvh bg-[var(--background)] text-ink">
        <GameSetup
          onStart={(color, elo) => {
            // Real gate: a second game in the same session, with no active
            // subscription and the one real free game already spent, goes
            // to checkout instead of starting — the server-side check in
            // page.tsx catches every OTHER case (a fresh visit, a reload),
            // this only covers "New Game" clicked again without leaving.
            if (!hasActiveSubscription && freeGameUsed) {
              router.push('/Chess-2000/subscribe')
              return
            }
            if (!hasActiveSubscription && !freeGameUsed) {
              setFreeGameUsed(true)
              markFreeGameUsedAction().catch(err => console.error('[free-game] failed to mark used', err))
            }
            setPlayerColor(color)
            setEngineElo(elo)
            setGameStarted(true)
            setFen(START_FEN)
            setFenHistory([])
            setMoveLog([])
          }}
        />
      </div>
    )
  }

  // Tone is only ever set once there's a real number behind it — comparing
  // your real live estimate against the real configured opponent strength
  // (ELO) and against a real, meaningful accuracy floor (Lichess treats
  // sub-70% as a rough game), never a decorative default.
  const metrics: Metric[] = [
    {
      label: 'CURRENT ELO',
      value: ratingEstimate.movesSampled > 0 ? `${ratingEstimate.estimatedRating}` : '—',
      sub: ratingEstimate.movesSampled > 0 ? (ratingEstimate.provisional ? 'provisional' : `${ratingEstimate.movesSampled} moves sampled`) : 'Play a few moves',
      tone: ratingEstimate.movesSampled > 0 ? (ratingEstimate.estimatedRating >= engineElo ? 'good' : 'bad') : undefined,
    },
    {
      label: 'ACCURACY',
      value: sessionAccuracy !== null ? `${sessionAccuracy}%` : '—',
      sub: `${playerMoves.filter(m => m.grade).length} moves played`,
      tone: sessionAccuracy !== null ? (sessionAccuracy >= 80 ? 'good' : sessionAccuracy < 50 ? 'bad' : undefined) : undefined,
    },
    { label: 'MOVE NUMBER', value: String(fullmoveFromFen(fen)), sub: `${sideToMove === 'w' ? 'White' : 'Black'} to move` },
    { label: 'GAME PHASE', value: gamePhase, sub: phaseStartMove[gamePhase] ? `since move ${phaseStartMove[gamePhase]}` : 'just started' },
    { label: 'OPPONENT RATING', value: String(engineElo), sub: `You: ${playerLabel}` },
  ]

  return (
    <div
      ref={containerRef}
      data-theme={dark ? 'dark' : 'light'}
      data-board-theme={boardTheme}
      className={`mx-auto flex h-dvh w-full flex-col overflow-hidden bg-[var(--background)] text-ink px-5 py-1.5 ${isFullscreen ? '' : 'max-w-[1680px]'}`}
    >
      {/* The old permanent two-line quote + "White vs. Stockfish" block ate
          real vertical space on every single view — moved to the How It
          Works page (its actual home, as a real explanatory tagline) and
          replaced here with a single-line header that only grows when
          there's something live to say (engine thinking / game over).
          Trimmed from pb-2/mb-2/h-8 — a real reported bug: the header,
          MetricsRow, and toolbar's combined vertical footprint was enough
          to force an unwanted internal scrollbar on ordinary ~768-800px
          laptop screens once the board itself grew larger. Every trim
          below is a few px, but they add up to comfortably clearing that
          overflow without visibly cramping anything. */}
      <div className="flex-none pb-1.5 border-b-2 border-panel-line mb-1.5">
        <div className="flex justify-between items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2.5">
            <div className="font-heading text-xl font-extrabold">Chess-2000</div>
            {engineThinking && <span className="text-[10px] font-bold text-status-blue">engine thinking…</span>}
            {gameStatus && <span className="text-[10px] font-bold text-status-red">{gameStatus}</span>}
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            {/* Board color skin — light squares take the real hex the user
                picked; dark squares get a matched deeper shade of the same
                hue for a cohesive two-tone board. The accent color of the
                whole page follows the same choice (see globals.css's
                data-board-theme blocks), so this one control re-skins both
                the board and the surrounding chrome together. */}
            <div className="flex items-center gap-1 bg-panel px-1.5 h-7">
              {(Object.keys(BOARD_THEMES) as BoardTheme[]).map(t => (
                <button
                  key={t}
                  onClick={() => setBoardTheme(t)}
                  title={`${t[0].toUpperCase()}${t.slice(1)} board`}
                  aria-label={`${t} board theme`}
                  className="w-4 h-4 rounded-full"
                  style={{
                    backgroundColor: BOARD_THEMES[t].swatch,
                    boxShadow: boardTheme === t ? '0 0 0 2px var(--panel), 0 0 0 3.5px var(--ink)' : '0 0 0 1px var(--panel-line)',
                  }}
                />
              ))}
            </div>
            <Link href="/Chess-2000/how-it-works" className="text-[10px] font-bold w-[92px] h-7 bg-accent-soft text-accent flex items-center justify-center">How It Works</Link>
            <button onClick={() => setMovesHistoryOpen(o => !o)} className="text-[10px] font-semibold w-[92px] h-7 bg-panel">Moves History</button>
            <button onClick={shareGame} className="text-[10px] font-semibold w-[92px] h-7 bg-panel">{copied ? 'Copied!' : 'Share Game'}</button>
            <button onClick={toggleFullscreen} className="text-[10px] font-semibold w-[92px] h-7 bg-panel">⛶ {isFullscreen ? 'Exit' : 'Full Screen'}</button>
            <button onClick={() => setCctapMode(m => !m)} className={`text-[10px] font-bold w-[92px] h-7 ${cctapMode ? 'bg-accent text-white' : 'bg-panel'}`}>CCTAP Mode</button>
            <button onClick={() => setDark(d => !d)} className="text-[10px] font-bold w-[66px] h-7 bg-ink text-[var(--background)]">{dark ? '☾ Dark' : '☀ Light'}</button>
            <button onClick={resetGame} className="text-[10px] font-semibold w-[80px] h-7 bg-panel">New game</button>
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto pr-1">
        {movesHistoryOpen && <MovesHistoryPanel moves={moveLog} />}

        <MetricsRow metrics={metrics} />

        {cctapMode ? (
          <CctapBar
            steps={CCTAP_STEPS}
            step={cctapStep}
            onPrev={() => setCctapStep(s => Math.max(0, s - 1))}
            onNext={() => setCctapStep(s => Math.min(CCTAP_STEPS.length - 1, s + 1))}
          />
        ) : (
          <BoardToolbar active={highlightMode} onSelect={setHighlightMode} hasForcedMate={hasForcedMate} hasTactic={hasTactic} />
        )}

        {/* A fixed real height (not "let content decide") — a real reported
            bug otherwise: clicking a toolbar button swaps the Summary
            panel's content for a tool explanation, and if that content is
            a different length, the whole row's height used to change with
            it, visibly shifting the board and every other panel on the
            page. Fixing the row's own height means the board and both
            side panels stay exactly where they are no matter what's
            toggled; Tactical Scoring and Summary scroll internally
            (overflow-y-auto) in the rare case their own content is taller
            than this. The height itself accounts for the board's own real
            max size plus the Hint/Back row and Recent Moves row below it. */}
        {/* The fixed height only applies at the xl breakpoint, where the
            grid actually goes 3-column — below that it stacks to a single
            column (grid-cols-1) and must stay auto-height or the Tactical
            Scoring / Summary panels would be clipped to the board's size.
            Side columns are EQUAL fixed widths (not 1fr/1.5fr) — a real
            reported bug otherwise: giving Summary 1.5x the flexible share
            of Tactical Scoring made it visibly much wider than everything
            else once the row had real room to spread (wide viewports),
            with mostly empty space inside it, while a hungrier flexible
            column left less predictable room for the board's own "auto"
            track. Equal fixed widths make all three columns read as the
            same real size, and the gap is wider for real visible
            separation between them. */}
        {/* This literal string duplicates BOARD_MAX_WIDTH above — Tailwind's
            arbitrary-value classes have to be static source text to be
            picked up by its JIT scanner, so the two must be kept in sync
            by hand whenever BOARD_MAX_WIDTH changes. */}
        {/* Side columns sized to their own real content instead of equal
            400px each — a real reported bug otherwise: 400px was much
            wider than Tactical Scoring's own content actually needed
            (mostly empty space), and narrowing both columns gives the
            board's own "auto" center column real room to reach its own
            max size at ordinary desktop widths instead of being squeezed
            down by two oversized side columns. 220px matches Tactical
            Scoring's own real measured content width (184px + padding);
            340px keeps Positional Summary's prose at a still-comfortable
            reading width while freeing real space for the board. */}
        <div className="grid grid-cols-1 xl:grid-cols-[220px_auto_340px] gap-y-5 gap-x-6 items-stretch xl:h-[calc(min(850px,_75vh,_80vw)+68px)]">
          {/* Tactical Scoring and Summary pushed down ~1cm (38px) relative
              to the board, per an explicit request — items-stretch still
              governs their overall box within the fixed-height row, so the
              margin shifts their content down and shrinks how much of that
              row they actually fill; their own overflow-y-auto absorbs the
              difference rather than clipping anything. */}
          {/* Capped + centered below xl — a real reported bug otherwise:
              once the layout falls back to a single stacked column (under
              1280px, a real range of ordinary desktop window widths, not
              just mobile), this panel used to stretch to the full page
              width, spreading its 3-way phase-tab row out into huge,
              broken-looking gaps instead of staying a sensible size. */}
          {/* order-2/order-1/order-3 below xl — a real reported mobile bug
              otherwise: source order (this panel, then the board, then
              Summary) is what a single stacked column falls back to, so
              the board — the actual primary content — landed BELOW a wall
              of stats and had to be scrolled to. xl:order-none restores
              the real left/center/right source order once there's room
              for the 3-column layout these were designed for. */}
          {/* The earlier 1cm (38px) push-down relative to the board is
              removed — the reference layout has all three columns starting
              flush at the same top edge, and reclaiming that 38px also
              closes most of the real gap that was forcing an unwanted
              scrollbar on ordinary ~768-800px-tall laptop screens. */}
          <div className="order-2 xl:order-none min-w-0 max-w-[420px] mx-auto xl:max-w-none xl:mx-0">
            <TacticalScoringPanel activePhase={activePhaseTab} onSelectPhase={setActivePhaseTab} snapshots={phaseSnapshots} />
          </div>

          <div className="order-1 xl:order-none min-w-0 flex flex-col items-center">
            {/* Eval bar sits directly beside the board, stretched to the
                board's own real rendered height via the flex row below
                (no fixed height needed — flexbox's default stretch
                behavior does it), matching the classic vertical
                eval-bar convention instead of the earlier horizontal strip. */}
            <div className="w-full flex gap-2 items-stretch" style={{ maxWidth: ROW_MAX_WIDTH }}>
              <EvalStrip evalCp={topLine?.evalCp ?? null} mateIn={topLine?.mateIn ?? null} playerColor={playerColor} />
              <div className="flex-1 min-w-0" style={{ border: '1px solid var(--panel-line)', borderRadius: 'var(--radius-card)', overflow: 'hidden' }}>
                <Chessboard
                options={{
                  position: fen,
                  boardOrientation: playerColor === 'w' ? 'white' : 'black',
                  canDragPiece: ({ piece }) => piece.pieceType[0].toLowerCase() === playerColor && sideToMove === playerColor,
                  onPieceDrop: ({ sourceSquare, targetSquare }) => {
                    setSelectedSquare(null)
                    return targetSquare ? handlePlayerMove(sourceSquare, targetSquare) : false
                  },
                  onSquareClick: ({ piece, square }) => {
                    if (selectedSquare && legalTargets.includes(square as Square)) {
                      handlePlayerMove(selectedSquare, square)
                      setSelectedSquare(null)
                      return
                    }
                    if (piece && piece.pieceType[0].toLowerCase() === playerColor && sideToMove === playerColor) {
                      setSelectedSquare(prev => prev === square ? null : (square as Square))
                    } else {
                      setSelectedSquare(null)
                    }
                  },
                  squareStyles: { ...squareStyles, ...moveDotStyles },
                  lightSquareStyle: { backgroundColor: BOARD_THEMES[boardTheme].light },
                  darkSquareStyle: { backgroundColor: BOARD_THEMES[boardTheme].dark },
                  arrows,
                  squareRenderer: highlightMode === 'pieceStrength' ? ({ square, children }) => {
                    const own = pieceStrength.pieces.find(x => x.square === square)
                    const enemy = enemyPieceStrength.pieces.find(x => x.square === square)
                    const p = own ?? enemy
                    // Two distinct color pairs so it's clear whose piece is
                    // being rated: yours = green (strong) / red (weak),
                    // theirs = blue (strong) / orange (weak).
                    const tint = own
                      ? (own.score >= 70 ? HIGHLIGHT_COLORS.green : own.score < 40 ? HIGHLIGHT_COLORS.red : null)
                      : enemy
                        ? (enemy.score >= 70 ? HIGHLIGHT_COLORS.blue : enemy.score < 40 ? HIGHLIGHT_COLORS.orange : null)
                        : null
                    return (
                      <div style={{ width: '100%', height: '100%', position: 'relative', backgroundColor: tint ?? undefined }}>
                        {children}
                        {p && (
                          <span style={{ position: 'absolute', bottom: 2, left: 2, fontSize: '9px', fontWeight: 700, background: 'var(--ink)', color: 'var(--background)', padding: '1px 3px', lineHeight: 1 }}>
                            {p.score}
                          </span>
                        )}
                      </div>
                    )
                  } : undefined,
                }}
              />
              </div>
            </div>
            {/* Hint (left) and Back (right) moved below the board; Last
                Move now sits between them instead of in the right column,
                so the right column can be fully given to the summary. */}
            <div className="w-full flex items-center justify-between gap-2 mt-1.5" style={{ maxWidth: ROW_MAX_WIDTH }}>
              <button
                onClick={() => setHighlightMode(highlightMode === 'hint' ? null : 'hint')}
                className={`text-[10px] font-bold w-[70px] h-7 shrink-0 ${highlightMode === 'hint' ? 'bg-ink text-[var(--background)]' : 'bg-panel'}`}
              >
                Hint
              </button>
              <div className="flex-1 min-w-0">
                <LastMoveCard info={lastMoveInfo} loading={moveQualityLoading} compact />
              </div>
              <button onClick={handleBack} disabled={fenHistory.length === 0} className="text-[10px] font-bold w-[70px] h-7 shrink-0 bg-panel disabled:opacity-40">← Back</button>
            </div>
            <div className="w-full flex items-center gap-2 mt-1.5" style={{ maxWidth: ROW_MAX_WIDTH }}>
              <span className="text-[10px] text-ink-faint">Recent moves</span>
              <div className="flex gap-1">
                {moveLog.slice(-12).map((m, i) => (
                  <span
                    key={i}
                    title={m.grade ?? 'pending'}
                    className={`w-2 h-2 rounded-full inline-block ${m.grade ? GRADE_DOT_CLASS[m.grade] : 'bg-panel-line'}`}
                  />
                ))}
              </div>
            </div>

          </div>

          {/* No h-full here (unlike an earlier version) — a real, found
              cause of Tactical Scoring and Summary rendering at different
              heights: an explicit height:100% plus a margin-top ADDS the
              margin on top of that 100%, while relying on the grid's own
              items-stretch (as Tactical Scoring's wrapper already does)
              correctly subtracts the margin first, so both wrappers land
              on the exact same real height. */}
          <div className="order-3 xl:order-none min-w-0 max-w-[640px] mx-auto xl:max-w-none xl:mx-0">
            <SituationPanel toolTitle={explanationTitle} toolLines={explanationLines} narration={summary} deterministicNarrative={positionNarrative} />
          </div>
        </div>
      </div>

      {loading && !engine && <p className="text-center text-[11px] text-ink-faint mt-1 flex-none">Analyzing…</p>}
    </div>
  )
}
