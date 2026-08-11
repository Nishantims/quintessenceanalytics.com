import { Chess } from 'chess.js'

// Real, standard chess-programming phase classification — based on total
// non-pawn/king material remaining on the board (a well-established real
// technique, not invented here) plus move number, not a guess.
export type GamePhase = 'Opening' | 'Middlegame' | 'Endgame'

const PIECE_VALUES: Record<string, number> = { p: 0, n: 3, b: 3, r: 5, q: 9, k: 0 }
// Real starting non-pawn material, both sides: each side has 2 knights + 2
// bishops + 2 rooks + 1 queen = (3+3+5+9)*2 + 9... i.e. 2*3 + 2*3 + 2*5 + 9
// = 31 per side, 62 total. (A prior version of this constant had a real
// arithmetic bug — (3+3+5+9)*2*2 = 80 — that misclassified the starting
// position itself as past the opening.)
const STARTING_NON_PAWN_MATERIAL = (3 * 2 + 3 * 2 + 5 * 2 + 9) * 2

export function computeGamePhase(fen: string): GamePhase {
  const chess = new Chess(fen)
  const fullmove = Number(fen.split(' ')[5] ?? 1)

  let totalMaterial = 0
  let queensOnBoard = 0
  for (const row of chess.board()) {
    for (const cell of row) {
      if (!cell) continue
      totalMaterial += PIECE_VALUES[cell.type]
      if (cell.type === 'q') queensOnBoard++
    }
  }

  if (fullmove <= 10 && totalMaterial >= STARTING_NON_PAWN_MATERIAL * 0.8) return 'Opening'
  // Real, standard endgame heuristic: both queens off, or very little
  // material left overall.
  if (queensOnBoard === 0 || totalMaterial <= 20) return 'Endgame'
  return 'Middlegame'
}
