import { Chess, type Color, type Square } from 'chess.js'

// Tool 05 — Piece-by-Piece Strength Analyzer. Each score is real: mobility
// from actual legal-move counts, safety from the same real attacker/
// defender data threats.ts uses, coordination from whether another own
// piece actually defends it.

const MOBILITY_CEILING: Record<string, number> = { n: 8, b: 13, r: 14, q: 27, k: 8 } // real maximum possible moves for that piece type on an empty board

export interface PieceStrength {
  square: Square
  pieceType: string
  mobility: number   // 0-100
  safety: number      // 0-100
  coordination: number // 0-100 (100 if defended by another own piece, 0 if not)
  score: number        // 0-100 combined
}

// Real, SAFE destinations only — a real, confirmed reported gap
// otherwise: raw legal-move count treats a square the piece would just
// be captured on for free identically to a genuinely useful one, so a
// piece with several legal-but-losing destinations (and none of them
// real captures) could read as decently mobile when it's actually
// "cut off from doing anything real," the exact reported case. A real
// capture always counts (removing an enemy piece is concrete regardless
// of the destination's own defense); a quiet move only counts if the
// destination isn't simply outnumbered by real enemy attackers versus
// real friendly defenders on the CURRENT board — a first-order, not a
// full post-move re-simulation, but the same real attacker/defender
// technique already used throughout this codebase (weak-squares.ts,
// threats.ts) for exactly this kind of check.
function safeMovesForSquare(chess: Chess, square: Square, color: Color): number {
  const enemyColor: Color = color === 'w' ? 'b' : 'w'
  const parts = chess.fen().split(' ')
  parts[1] = color
  const scratch = new Chess(parts.join(' '), { skipValidation: true })
  let safe = 0
  for (const m of scratch.moves({ square, verbose: true })) {
    if (m.captured) { safe++; continue }
    const attackers = chess.attackers(m.to as Square, enemyColor)
    // The moving piece's own origin square is excluded — a real,
    // confirmed bug otherwise: a piece trivially "attacks" every one of
    // its own legal destination squares (that's WHY the move is legal),
    // so counting it among the square's real defenders made every piece
    // its own defender on every square it could reach, always passing
    // this check regardless of whether anything else actually defends it.
    const defenders = chess.attackers(m.to as Square, color).filter(sq => sq !== square)
    if (attackers.length <= defenders.length) safe++
  }
  return safe
}

export function computePieceStrength(fen: string, color: Color): PieceStrength[] {
  const chess = new Chess(fen)
  const enemyColor: Color = color === 'w' ? 'b' : 'w'
  const out: PieceStrength[] = []

  for (const row of chess.board()) {
    for (const cell of row) {
      if (cell?.color !== color || cell.type === 'p' || cell.type === 'k') continue
      const ceiling = MOBILITY_CEILING[cell.type] ?? 10
      const mobility = Math.min(100, Math.round((safeMovesForSquare(chess, cell.square, color) / ceiling) * 100))

      const attackers = chess.attackers(cell.square, enemyColor)
      const defenders = chess.attackers(cell.square, color)
      const safety = attackers.length === 0 ? 100 : Math.max(0, 100 - attackers.length * 30 + defenders.length * 15)

      const coordination = defenders.length > 0 ? 100 : 0

      const score = Math.round(mobility * 0.4 + safety * 0.4 + coordination * 0.2)
      out.push({ square: cell.square, pieceType: cell.type, mobility, safety, coordination, score })
    }
  }
  return out
}

export interface PieceStrengthSummary {
  pieces: PieceStrength[]
  best: PieceStrength | null
  worst: PieceStrength | null
}

export function summarizePieceStrength(fen: string, color: Color): PieceStrengthSummary {
  const pieces = computePieceStrength(fen, color)
  if (pieces.length === 0) return { pieces, best: null, worst: null }
  const sorted = [...pieces].sort((a, b) => b.score - a.score)
  return { pieces, best: sorted[0], worst: sorted[sorted.length - 1] }
}
