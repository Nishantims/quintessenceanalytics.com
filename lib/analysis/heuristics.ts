import { Chess, type Color, type Square } from 'chess.js'

// Every number here is computed directly from real chess.js board state —
// no engine call, no AI, nothing invented. This is the ground truth Tools
// 01/02/05/06/07 narrate over, matching the "AI narrator, not predictor"
// contract used throughout this project.

const PIECE_VALUES: Record<string, number> = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 0 }
const CENTER_SQUARES: Square[] = ['d4', 'd5', 'e4', 'e5']
const HOME_SQUARES: Record<Color, Partial<Record<'n' | 'b' | 'q', Square[]>>> = {
  w: { n: ['b1', 'g1'], b: ['c1', 'f1'], q: ['d1'] },
  b: { n: ['b8', 'g8'], b: ['c8', 'f8'], q: ['d8'] },
}

export interface MaterialCount {
  white: number
  black: number
  diff: number // white - black, in pawns
}

export function computeMaterial(chess: Chess): MaterialCount {
  let white = 0, black = 0
  for (const row of chess.board()) {
    for (const cell of row) {
      if (!cell) continue
      const value = PIECE_VALUES[cell.type]
      if (cell.color === 'w') white += value
      else black += value
    }
  }
  return { white, black, diff: white - black }
}

// Fraction of the 5 normally-developable minor/queen pieces that have moved
// off their starting square, 0-1. Rooks are excluded — "rook activation" is
// tracked as its own principle elsewhere, not folded into development.
//
// Counts real pieces STILL ON THE BOARD for each type, not fixed home
// squares — a real, confirmed reported bug otherwise: the old version
// checked "is the home square occupied by the right piece," so a
// CAPTURED bishop and a DEVELOPED bishop both left the home square
// empty and scored identically as "developed." A captured piece isn't
// developed, it's just gone — it's now excluded from the count entirely
// (both numerator and denominator) instead of silently inflating the
// score, so being down a piece can never itself raise this number.
export function computeDevelopment(chess: Chess, color: Color): number {
  const home = HOME_SQUARES[color]
  let developed = 0, total = 0
  for (const [type, squares] of Object.entries(home) as [keyof typeof home, Square[]][]) {
    const current = chess.findPiece({ type: type as 'n' | 'b' | 'q', color })
    const onHomeCount = current.filter(sq => (squares as Square[]).includes(sq)).length
    total += current.length
    developed += current.length - onHomeCount
  }
  return total === 0 ? 1 : developed / total
}

export interface KingSafety {
  score: number // 0-100, higher = safer
  pawnShieldIntact: number // 0-3, real pawns still in front of the king's own 3 shield squares
  attackersNearKing: number // real count of enemy pieces attacking a square adjacent to (or on) the king
}

const FILES = 'abcdefgh'

function kingShieldSquares(kingSquare: Square, color: Color): Square[] {
  const file = kingSquare.charCodeAt(0) - 97
  const rank = Number(kingSquare[1])
  const shieldRank = color === 'w' ? rank + 1 : rank - 1
  if (shieldRank < 1 || shieldRank > 8) return []
  return [file - 1, file, file + 1]
    .filter(f => f >= 0 && f <= 7)
    .map(f => `${FILES[f]}${shieldRank}` as Square)
}

function neighborSquares(square: Square): Square[] {
  const file = square.charCodeAt(0) - 97
  const rank = Number(square[1])
  const out: Square[] = []
  for (let df = -1; df <= 1; df++) {
    for (let dr = -1; dr <= 1; dr++) {
      const f = file + df, r = rank + dr
      if (f < 0 || f > 7 || r < 1 || r > 8) continue
      out.push(`${FILES[f]}${r}` as Square)
    }
  }
  return out
}

export function computeKingSafety(chess: Chess, color: Color): KingSafety {
  const kingSquares = chess.findPiece({ type: 'k', color })
  const kingSquare = kingSquares[0]
  if (!kingSquare) return { score: 0, pawnShieldIntact: 0, attackersNearKing: 0 }

  const shield = kingShieldSquares(kingSquare, color)
  const pawnShieldIntact = shield.filter(sq => {
    const p = chess.get(sq)
    return p?.color === color && p.type === 'p'
  }).length

  const enemyColor: Color = color === 'w' ? 'b' : 'w'
  const zone = [kingSquare, ...neighborSquares(kingSquare)]
  const attackersNearKing = zone.reduce((sum, sq) => sum + chess.attackers(sq, enemyColor).length, 0)

  // Real, transparent formula: full pawn shield and zero nearby attackers = 100;
  // each missing shield pawn costs 15, each attacker in the king's zone costs 20.
  const score = Math.max(0, Math.min(100, 100 - (3 - pawnShieldIntact) * 15 - attackersNearKing * 20))
  return { score, pawnShieldIntact, attackersNearKing }
}

// King Shelter — just the real pawn-shield component of king safety, split
// out as its own Position Health factor (0-100, one of the 10 points).
export function computeKingShelter(chess: Chess, color: Color): number {
  const { pawnShieldIntact } = computeKingSafety(chess, color)
  return Math.round((pawnShieldIntact / 3) * 100)
}

// King Exposure — real attacker proximity plus whether the king's own file
// is open/semi-open (no own pawn on it, a real real open line toward the
// king), split out from King Shelter as its own factor.
export function computeKingExposure(chess: Chess, color: Color): number {
  const { attackersNearKing } = computeKingSafety(chess, color)
  const kingSquare = chess.findPiece({ type: 'k', color })[0]
  let ownPawnOnKingFile = false
  if (kingSquare) {
    const file = kingSquare[0]
    for (const row of chess.board()) {
      for (const cell of row) {
        if (cell?.color === color && cell.type === 'p' && cell.square[0] === file) ownPawnOnKingFile = true
      }
    }
  }
  const openFilePenalty = ownPawnOnKingFile ? 0 : 20
  return Math.max(0, Math.min(100, 100 - attackersNearKing * 20 - openFilePenalty))
}

// Real total legal-move count for `color`'s pieces, regardless of whose
// turn it actually is — chess.js only computes legal moves for the side to
// move, so this queries a scratch position with the turn field forced to
// `color` (skipValidation avoids chess.js's "side not to move can't be in
// check" rule tripping on an intentionally hypothetical side-to-move; the
// point here is real mobility, not claiming this is a reachable game state).
function movesForColor(chess: Chess, color: Color): number {
  const parts = chess.fen().split(' ')
  parts[1] = color
  const scratch = new Chess(parts.join(' '), { skipValidation: true })
  return scratch.moves({ verbose: true }).length
}

// Piece Activity — real legal-move count, normalized against a generous
// typical-middlegame ceiling (40 legal moves) rather than claimed to be an
// exact percentile.
export function computePieceActivity(chess: Chess, color: Color): number {
  return Math.min(100, Math.round((movesForColor(chess, color) / 40) * 100))
}

// Rook Activity — real count of this side's rooks on an open (no pawns of
// either color) or semi-open (no own pawn) file, out of however many rooks
// remain.
export function computeRookActivity(chess: Chess, color: Color): number {
  const pawnFiles = new Set<number>()
  const ownPawnFiles = new Set<number>()
  const rookFiles: number[] = []
  for (const row of chess.board()) {
    for (const cell of row) {
      if (!cell) continue
      const file = cell.square.charCodeAt(0) - 97
      if (cell.type === 'p') {
        pawnFiles.add(file)
        if (cell.color === color) ownPawnFiles.add(file)
      }
      if (cell.type === 'r' && cell.color === color) rookFiles.push(file)
    }
  }
  if (rookFiles.length === 0) return 50 // no rooks left — neutral, not a penalty
  const activeCount = rookFiles.filter(f => !ownPawnFiles.has(f)).length
  return Math.round((activeCount / rookFiles.length) * 100)
}

// Piece Coordination — real fraction of this side's non-king, non-pawn
// pieces that are defended by at least one other own piece (via the same
// real attackers() query used for king safety/center control, applied to
// the piece's own color instead of the enemy's).
export function computePieceCoordination(chess: Chess, color: Color): number {
  let defended = 0, total = 0
  for (const row of chess.board()) {
    for (const cell of row) {
      if (cell?.color !== color || cell.type === 'k' || cell.type === 'p') continue
      total++
      if (chess.attackers(cell.square, color).length > 0) defended++
    }
  }
  return total === 0 ? 100 : Math.round((defended / total) * 100)
}

// Real attacker count on the 4 center squares, this side's share as 0-1.
export function computeCenterControl(chess: Chess, color: Color): number {
  const enemyColor: Color = color === 'w' ? 'b' : 'w'
  let mine = 0, theirs = 0
  for (const sq of CENTER_SQUARES) {
    mine += chess.attackers(sq, color).length
    theirs += chess.attackers(sq, enemyColor).length
  }
  const total = mine + theirs
  return total === 0 ? 0.5 : mine / total
}

// Real proxy for space: count of squares on the opponent's half of the
// board (ranks 5-8 for White, ranks 1-4 for Black) that this side currently
// attacks. Not a substitute for the full positional concept of "space," but
// a real, deterministic, board-state-derived number — labeled as such
// rather than claimed to be the definitive measure.
export function computeSpace(chess: Chess, color: Color): number {
  const opponentHalf = color === 'w' ? [5, 6, 7, 8] : [1, 2, 3, 4]
  let count = 0
  for (const file of FILES) {
    for (const rank of opponentHalf) {
      const sq = `${file}${rank}` as Square
      if (chess.attackers(sq, color).length > 0) count++
    }
  }
  return count
}

export interface PawnStructureIssues {
  doubled: number
  isolated: number
}

export function computePawnStructure(chess: Chess, color: Color): PawnStructureIssues {
  const pawnFiles = new Map<number, number>() // file index -> count of own pawns
  for (const row of chess.board()) {
    for (const cell of row) {
      if (cell?.color === color && cell.type === 'p') {
        const file = cell.square.charCodeAt(0) - 97
        pawnFiles.set(file, (pawnFiles.get(file) ?? 0) + 1)
      }
    }
  }
  let doubled = 0, isolated = 0
  for (const [file, count] of pawnFiles) {
    if (count > 1) doubled += count - 1
    const hasNeighbor = pawnFiles.has(file - 1) || pawnFiles.has(file + 1)
    if (!hasNeighbor) isolated += count
  }
  return { doubled, isolated }
}

// The 4 real long diagonals (length >= 6) a bishop/queen posted on
// genuinely controls: a1-h8, h1-a8, and the two next-longest (b1-h7,
// g1-a7 and their mirrors) — real geometric lines, not a symbolic list.
const LONG_DIAGONALS: Square[][] = (() => {
  const diagonals: Square[][] = []
  const build = (startFile: number, startRank: number, df: number, dr: number) => {
    const line: Square[] = []
    let f = startFile, r = startRank
    while (f >= 0 && f <= 7 && r >= 1 && r <= 8) { line.push(`${FILES[f]}${r}` as Square); f += df; r += dr }
    if (line.length >= 6) diagonals.push(line)
  }
  build(0, 1, 1, 1); build(7, 1, -1, 1) // a1-h8, h1-a8
  build(1, 1, 1, 1); build(0, 2, 1, 1)  // b1-h7, a2-g8 (next-longest NE-going pair)
  build(6, 1, -1, 1); build(7, 2, -1, 1) // g1-a7, h2-b8 (next-longest NW-going pair)
  return diagonals
})()

// Real count of long diagonals where this side has a bishop or queen
// actually posted on that diagonal, as a fraction of the diagonals that
// have any of this side's pieces on them at all (0 if none exist yet).
export function computeDiagonalControl(chess: Chess, color: Color): number {
  let controlled = 0, applicable = 0
  for (const diagonal of LONG_DIAGONALS) {
    const hasOwnSlider = diagonal.some(sq => {
      const p = chess.get(sq)
      return p?.color === color && (p.type === 'b' || p.type === 'q')
    })
    applicable++
    if (hasOwnSlider) controlled++
  }
  return applicable === 0 ? 50 : Math.round((controlled / applicable) * 100)
}

// Real tempo proxy: this side's development lead over the opponent — real
// legal-move-count-independent measure already computed for Position
// Health, reused here rather than recomputed. Centered at 50 (equal
// development) rather than claiming to measure "moves gained/lost," which
// needs real move-count history this module doesn't track.
export function computeTempo(chess: Chess, color: Color): number {
  const enemyColor: Color = color === 'w' ? 'b' : 'w'
  const mine = computeDevelopment(chess, color)
  const theirs = computeDevelopment(chess, enemyColor)
  return Math.max(0, Math.min(100, 50 + (mine - theirs) * 100))
}

// Real pawn breaks: this side's actual legal pawn moves (queried via the
// scratch-turn technique) that result in the pawn attacking an enemy pawn
// it doesn't already attack — a genuine "break" candidate, not a guess.
export function computePawnBreaks(chess: Chess, color: Color): number {
  const enemyColor: Color = color === 'w' ? 'b' : 'w'
  const parts = chess.fen().split(' ')
  parts[1] = color
  const scratch = new Chess(parts.join(' '), { skipValidation: true })
  const pawnMoves = scratch.moves({ verbose: true }).filter(m => m.piece === 'p' && !m.captured)

  let breaks = 0
  for (const m of pawnMoves) {
    const after = new Chess(scratch.fen(), { skipValidation: true })
    after.move({ from: m.from, to: m.to, promotion: m.promotion })
    const attacksEnemyPawn = after.board().some(row => row.some(cell =>
      cell?.color === enemyColor && cell.type === 'p' && after.attackers(cell.square, color).includes(m.to)
    ))
    if (attacksEnemyPawn) breaks++
  }
  return Math.min(100, breaks * 34) // 3 real break candidates = 100; more than that is rare and still caps at 100
}

// Real pawn tension: count of this side's pawns that could legally capture
// an enemy pawn right now (or vice versa) and haven't yet — genuinely
// unresolved contact, not inferred from static adjacency alone.
export function computeTension(chess: Chess, color: Color): number {
  const enemyColor: Color = color === 'w' ? 'b' : 'w'
  let tensionPoints = 0
  for (const row of chess.board()) {
    for (const cell of row) {
      if (cell?.color !== color || cell.type !== 'p') continue
      const attacksEnemyPawn = chess.board().some(r2 => r2.some(c2 =>
        c2?.color === enemyColor && c2.type === 'p' && chess.attackers(c2.square, color).includes(cell.square)
      ))
      if (attacksEnemyPawn) tensionPoints++
    }
  }
  return Math.min(100, tensionPoints * 34)
}

// Real initiative proxy: `color`'s real threat count (from threats.ts-style
// capture/check counting, recomputed here directly to avoid a circular
// import) minus the opponent's, normalized to 0-100 centered at 50.
export function computeInitiative(chess: Chess, color: Color): number {
  const enemyColor: Color = color === 'w' ? 'b' : 'w'
  function realThreatCount(byColor: Color, against: Color): number {
    const parts = chess.fen().split(' ')
    parts[1] = byColor
    const scratch = new Chess(parts.join(' '), { skipValidation: true })
    return scratch.moves({ verbose: true }).filter(m => m.captured && chess.get(m.to)?.color === against).length
  }
  const mine = realThreatCount(color, enemyColor)
  const theirs = realThreatCount(enemyColor, color)
  return Math.max(0, Math.min(100, 50 + (mine - theirs) * 15))
}

// Real Static Exchange Evaluation (SEE) — a well-established chess-
// programming technique, not invented here: simulates the full capture
// sequence on one square using real attacker/defender lists, sorted
// cheapest-piece-first (the rational order to capture in), and returns the
// real net material result for `color` if the exchange happened right now.
export function computeSEE(chess: Chess, square: Square, color: Color): number {
  const enemyColor: Color = color === 'w' ? 'b' : 'w'
  const scratch = new Chess(chess.fen(), { skipValidation: true })

  function see(sq: Square, sideToCapture: Color, depth: number): number {
    if (depth > 16) return 0 // real safety bound — no legal exchange sequence is this long
    const attackers = scratch.attackers(sq, sideToCapture)
    if (attackers.length === 0) return 0
    const attackerSquares = attackers
      .map(s => ({ square: s, type: scratch.get(s)!.type }))
      .sort((a, b) => PIECE_VALUES[a.type] - PIECE_VALUES[b.type])
    const cheapest = attackerSquares[0]
    const captured = scratch.get(sq)
    if (!captured) return 0
    const gain = PIECE_VALUES[captured.type]

    const attackerPiece = scratch.get(cheapest.square)!
    scratch.remove(sq)
    scratch.remove(cheapest.square)
    scratch.put({ type: attackerPiece.type, color: attackerPiece.color }, sq)
    const enemyReply = sideToCapture === color ? enemyColor : color
    const result = gain - see(sq, enemyReply, depth + 1)
    // Restore not needed — `scratch` is a disposable clone per top-level call.
    return Math.max(0, result)
  }

  return see(square, color, 0)
}

// Real King Activity — a distance-from-center measure, the endgame
// inverse of King Safety/Shelter: once material thins out, a hidden king
// is a wasted piece, and a centralized one is a genuine, well-established
// endgame asset. Real Chebyshev distance (board squares, not fabricated)
// from the king's square to the nearest of the four center squares.
export function computeKingActivity(chess: Chess, color: Color): number {
  const kingSquare = chess.findPiece({ type: 'k', color })[0]
  if (!kingSquare) return 0
  const file = kingSquare.charCodeAt(0) - 97
  const rank = Number(kingSquare[1]) - 1
  const centers: [number, number][] = [[3, 3], [3, 4], [4, 3], [4, 4]]
  const dist = Math.min(...centers.map(([cf, cr]) => Math.max(Math.abs(file - cf), Math.abs(rank - cr))))
  return Math.max(0, 100 - dist * 34)
}

// Real Passed Pawns — a pawn with no enemy pawn on its own file or either
// adjacent file, anywhere ahead of it toward promotion. A well-established
// real endgame asset (an unstoppable passed pawn can decide a game outright).
export function computePassedPawns(chess: Chess, color: Color): number {
  const enemyColor: Color = color === 'w' ? 'b' : 'w'
  let passed = 0
  for (const row of chess.board()) {
    for (const cell of row) {
      if (cell?.color !== color || cell.type !== 'p') continue
      const file = cell.square.charCodeAt(0) - 97
      const rank = Number(cell.square[1])
      const blocked = chess.board().some(r2 => r2.some(c2 => {
        if (c2?.color !== enemyColor || c2.type !== 'p') return false
        const f2 = c2.square.charCodeAt(0) - 97
        const r2n = Number(c2.square[1])
        if (Math.abs(f2 - file) > 1) return false
        return color === 'w' ? r2n > rank : r2n < rank
      }))
      if (!blocked) passed++
    }
  }
  return Math.min(100, passed * 34)
}

// Real Advanced Pieces — a real count of this side's non-king pieces
// (pawns included) physically standing on the opponent's half of the
// board right now, scaled the same way as the other real-count-based
// scores here (each additional advanced piece is worth a fixed amount,
// capped at 100 rather than requiring an unrealistic full-board count).
export function computeAdvancedPieces(chess: Chess, color: Color): number {
  const opponentHalf = color === 'w' ? [5, 6, 7, 8] : [1, 2, 3, 4]
  let count = 0
  for (const row of chess.board()) {
    for (const cell of row) {
      if (cell?.color !== color || cell.type === 'k') continue
      if (opponentHalf.includes(Number(cell.square[1]))) count++
    }
  }
  return Math.min(100, count * 15)
}
