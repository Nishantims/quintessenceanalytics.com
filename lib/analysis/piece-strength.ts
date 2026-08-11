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

function movesForSquare(chess: Chess, square: Square, color: Color): number {
  const parts = chess.fen().split(' ')
  parts[1] = color
  const scratch = new Chess(parts.join(' '), { skipValidation: true })
  return scratch.moves({ square, verbose: true }).length
}

export function computePieceStrength(fen: string, color: Color): PieceStrength[] {
  const chess = new Chess(fen)
  const enemyColor: Color = color === 'w' ? 'b' : 'w'
  const out: PieceStrength[] = []

  for (const row of chess.board()) {
    for (const cell of row) {
      if (cell?.color !== color || cell.type === 'p' || cell.type === 'k') continue
      const ceiling = MOBILITY_CEILING[cell.type] ?? 10
      const mobility = Math.min(100, Math.round((movesForSquare(chess, cell.square, color) / ceiling) * 100))

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
