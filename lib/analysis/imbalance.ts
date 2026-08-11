import { Chess, type Color, type Square } from 'chess.js'
import { detectPins } from './tactics'

// Real, value-weighted attacker/defender imbalance per occupied square —
// a piece that IS pinned can't legally participate in a capture sequence
// without exposing its own king, so it's excluded from both the attacker
// and defender counts on every square (the user's own explicit spec: "do
// not count pins"), not just counted geometrically like a plain attacker()
// query would. Flags any occupied square (either color) where the real
// material weight of attackers exceeds defenders — a real, exploitable
// imbalance, not a full recursive exchange simulation like SEE.

const PIECE_VALUES: Record<string, number> = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 0 }

export interface ImbalanceEntry {
  square: Square
  pieceType: string
  pieceColor: Color
  attackerWeight: number
  defenderWeight: number
}

export function computeImbalances(fen: string): ImbalanceEntry[] {
  const chess = new Chess(fen)
  const pinned = new Set<Square>()
  ;(['w', 'b'] as Color[]).forEach(color => {
    detectPins(fen, color).forEach(p => pinned.add(p.pinnedSquare))
  })

  const out: ImbalanceEntry[] = []
  for (const row of chess.board()) {
    for (const cell of row) {
      if (!cell) continue
      const enemyColor: Color = cell.color === 'w' ? 'b' : 'w'
      const attackers = chess.attackers(cell.square, enemyColor).filter(sq => !pinned.has(sq))
      const defenders = chess.attackers(cell.square, cell.color).filter(sq => !pinned.has(sq))
      if (attackers.length === 0) continue
      const attackerWeight = attackers.reduce((s, sq) => s + PIECE_VALUES[chess.get(sq)!.type], 0)
      const defenderWeight = defenders.reduce((s, sq) => s + PIECE_VALUES[chess.get(sq)!.type], 0)
      if (attackerWeight > defenderWeight) {
        out.push({ square: cell.square, pieceType: cell.type, pieceColor: cell.color, attackerWeight, defenderWeight })
      }
    }
  }
  return out
}
