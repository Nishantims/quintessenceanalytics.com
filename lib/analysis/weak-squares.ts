import { Chess, type Color, type Square } from 'chess.js'

// A real "hole": a square in `color`'s own camp (ranks 3-6, where this
// matters practically) that none of `color`'s CURRENT pawns can ever
// advance to guard — the same real geometric check used for outposts in
// factors.ts, generalized to every square rather than just occupied ones.
export function computeWeakSquares(fen: string, color: Color): Square[] {
  const chess = new Chess(fen)
  const files = 'abcdefgh'
  const ranks = [3, 4, 5, 6]
  const weak: Square[] = []

  for (const file of files) {
    for (const rank of ranks) {
      const square = `${file}${rank}` as Square
      const fileIndex = file.charCodeAt(0) - 97
      // A pawn only ever guards squares in front of where it currently is
      // (it can't move backward) — a white pawn at rank R guards rank R+1,
      // so it can still reach `rank` iff its current rank < `rank`; a
      // black pawn's equivalent condition is current rank > `rank`.
      let canEverBeGuarded = false
      for (const df of [-1, 1]) {
        const f = fileIndex + df
        if (f < 0 || f > 7) continue
        const piece = findPawnOnFile(chess, files[f], color)
        if (!piece) continue
        if ((color === 'w' && piece.rank < rank) || (color === 'b' && piece.rank > rank)) canEverBeGuarded = true
      }
      if (!canEverBeGuarded) weak.push(square)
    }
  }
  return weak
}

function findPawnOnFile(chess: Chess, file: string, color: Color): { rank: number } | null {
  for (let r = 1; r <= 8; r++) {
    const p = chess.get(`${file}${r}` as Square)
    if (p?.color === color && p.type === 'p') return { rank: r }
  }
  return null
}
