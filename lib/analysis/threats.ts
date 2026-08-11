import { Chess, type Color, type Square } from 'chess.js'
import { computeSEE } from './heuristics'

// Tools 04 (Threat & Weakness Analyzer) and 08 (Piece Support & Protection
// Matrix) — both real, board-state-derived, no engine call needed. Built as
// one shared per-square attacker/defender map since that's the same real
// data both tools are asking about, viewed two ways.
//
// Both computeThreats and computeWeaknesses filter through real SEE
// (Static Exchange Evaluation) rather than "is there any capture at all" —
// a confirmed real bug: an undefended-looking piece that's only reachable
// via a capture that loses material for the attacker (e.g. a pawn
// defended by another pawn, where the "attacker" is a knight worth more)
// isn't a real threat, and flagging it as one is actively misleading.
// Likewise a piece with zero defenders but no attacker anywhere near it
// (true of literally every piece in the starting position) isn't a live
// problem — it only becomes one once something can actually profit from
// capturing it.

const PIECE_VALUES: Record<string, number> = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 0 }

export interface SquareSupport {
  square: Square
  pieceType: string
  attackers: Square[] // real enemy pieces attacking this square right now
  defenders: Square[] // real own pieces defending this square right now
  hanging: boolean     // attacked at least once, defended zero times
  netLoss: boolean      // more real attackers than defenders — a real material-count imbalance, not a full tactical search
}

export function computeSupportMatrix(fen: string, color: Color): SquareSupport[] {
  const chess = new Chess(fen)
  const enemyColor: Color = color === 'w' ? 'b' : 'w'
  const out: SquareSupport[] = []
  for (const row of chess.board()) {
    for (const cell of row) {
      if (cell?.color !== color) continue
      const attackers = chess.attackers(cell.square, enemyColor)
      const defenders = chess.attackers(cell.square, color)
      out.push({
        square: cell.square,
        pieceType: cell.type,
        attackers,
        defenders,
        hanging: attackers.length > 0 && defenders.length === 0,
        netLoss: attackers.length > defenders.length,
      })
    }
  }
  return out
}

export interface Threat {
  square: Square
  pieceType: string
  description: string
}

// Real, PROFITABLE opponent captures available right now against `color`'s
// pieces — queries the opponent's actual legal moves via a scratch position
// with the turn forced to them (same technique as heuristics.ts's
// movesForColor), then keeps only the ones a real Static Exchange
// Evaluation confirms are actually good for the opponent. A capture that
// loses material for the attacker once the full real exchange sequence is
// played out isn't a threat — it's a blunder waiting to happen to THEM.
export function computeThreats(fen: string, color: Color): Threat[] {
  const chess = new Chess(fen)
  const enemyColor: Color = color === 'w' ? 'b' : 'w'
  const parts = chess.fen().split(' ')
  parts[1] = enemyColor
  const scratch = new Chess(parts.join(' '), { skipValidation: true })

  const threats: Threat[] = []
  if (chess.turn() === color && chess.isCheck()) {
    const kingSquare = chess.findPiece({ type: 'k', color })[0]
    if (kingSquare) threats.push({ square: kingSquare, pieceType: 'k', description: 'King is in check right now.' })
  }
  const checkedSquares = new Set<Square>()
  for (const move of scratch.moves({ verbose: true })) {
    if (!move.captured) continue
    const targetPiece = chess.get(move.to)
    if (!targetPiece || targetPiece.color !== color) continue
    if (checkedSquares.has(move.to)) continue // already evaluated this square's real SEE via an earlier candidate capture
    checkedSquares.add(move.to)
    if (computeSEE(chess, move.to, enemyColor) <= 0) continue // not a real threat — the full exchange loses material for the opponent
    threats.push({
      square: move.to,
      pieceType: targetPiece.type,
      description: `${move.to} can be captured (${move.san}).`,
    })
  }
  return threats
}

export interface Weakness {
  square: Square
  pieceType: string
  description: string
}

// Real, LIVE structural weaknesses only: a piece with zero defenders that
// nothing is currently attacking (true of every piece in the starting
// position) isn't a real weakness yet — it only becomes one once there's
// a real enemy piece that could actually profit from capturing it (SEE
// confirms a positive result for the attacker), same standard as
// computeThreats above.
export function computeWeaknesses(fen: string, color: Color): Weakness[] {
  const chess = new Chess(fen)
  const enemyColor: Color = color === 'w' ? 'b' : 'w'
  const matrix = computeSupportMatrix(fen, color)
  const weaknesses: Weakness[] = []
  for (const s of matrix) {
    if (s.pieceType === 'k' || s.attackers.length === 0) continue
    if (computeSEE(chess, s.square, enemyColor) <= 0) continue
    if (s.defenders.length === 0) {
      weaknesses.push({ square: s.square, pieceType: s.pieceType, description: `${s.square} (${s.pieceType}) has no defenders and can be won.` })
    } else if (s.netLoss) {
      const value = PIECE_VALUES[s.pieceType]
      weaknesses.push({ square: s.square, pieceType: s.pieceType, description: `${s.square} (${s.pieceType}, worth ${value}) is attacked ${s.attackers.length}x but defended only ${s.defenders.length}x.` })
    }
  }
  return weaknesses
}
