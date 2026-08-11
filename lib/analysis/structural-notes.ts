import { Chess, type Color, type Square } from 'chess.js'
import { computeWeakSquares } from './weak-squares'
import { summarizePieceStrength } from './piece-strength'

// A second, deterministic (no AI, no engine call) summary distinct from
// narrate-position.ts's eval-anchored prose — this one is structural: pawn
// weaknesses by flank, which color complex is weak/strong, and which minor
// pieces are well- or poorly-placed. Built template-only (not an LLM call)
// so it's always available even with no GEMINI_API_KEY configured, which
// narrate-position.ts gracefully degrades without.

const FILES = 'abcdefgh'

function pawnFileCounts(chess: Chess, color: Color): Map<number, number> {
  const counts = new Map<number, number>()
  for (const row of chess.board()) {
    for (const cell of row) {
      if (cell?.color === color && cell.type === 'p') {
        const f = cell.square.charCodeAt(0) - 97
        counts.set(f, (counts.get(f) ?? 0) + 1)
      }
    }
  }
  return counts
}

function squareColor(square: Square): 'light' | 'dark' {
  const file = square.charCodeAt(0) - 97
  const rank = Number(square[1])
  return (file + rank) % 2 === 0 ? 'dark' : 'light'
}

const FLANKS: [string, number[]][] = [
  ['Queenside', [0, 1, 2]],
  ['Kingside', [5, 6, 7]],
]

export function computeStructuralNotes(fen: string, color: Color): string[] {
  const chess = new Chess(fen)
  const enemyColor: Color = color === 'w' ? 'b' : 'w'
  const notes: string[] = []
  const counts = pawnFileCounts(chess, color)

  for (const [name, files] of FLANKS) {
    const doubledFiles = files.filter(f => (counts.get(f) ?? 0) > 1)
    const isolatedFiles = files.filter(f => (counts.get(f) ?? 0) > 0 && !counts.has(f - 1) && !counts.has(f + 1))
    if (doubledFiles.length > 0) {
      notes.push(`${name} pawns are weak — doubled on the ${doubledFiles.map(f => FILES[f]).join(', ')}-file.`)
    } else if (isolatedFiles.length > 0) {
      notes.push(`${name} pawns are weak — the ${FILES[isolatedFiles[0]]}-pawn is isolated with no neighbor to defend it.`)
    }
  }

  const weakSquares = computeWeakSquares(fen, color)
  const lightWeak = weakSquares.filter(sq => squareColor(sq) === 'light').length
  const darkWeak = weakSquares.filter(sq => squareColor(sq) === 'dark').length
  const hasBishopOn = (complex: 'light' | 'dark') =>
    chess.board().some(row => row.some(c => c?.color === color && c.type === 'b' && squareColor(c.square) === complex))

  if (lightWeak >= 3 && !hasBishopOn('light')) notes.push(`Light squares are weak — ${lightWeak} real holes and no light-squared bishop left to cover them.`)
  else if (lightWeak === 0) notes.push('Light squares are well defended.')
  if (darkWeak >= 3 && !hasBishopOn('dark')) notes.push(`Dark squares are weak — ${darkWeak} real holes and no dark-squared bishop left to cover them.`)
  else if (darkWeak === 0) notes.push('Dark squares are well defended.')

  const strength = summarizePieceStrength(fen, color)
  const badKnights = strength.pieces.filter(p => p.pieceType === 'n' && p.score < 40)
  const goodKnights = strength.pieces.filter(p => p.pieceType === 'n' && p.score >= 85)
  badKnights.forEach(k => notes.push(`Knight on ${k.square} is placed badly — low mobility and little support.`))
  goodKnights.forEach(k => notes.push(`Knight on ${k.square} is excellently placed.`))

  let ownBishops = 0, enemyBishops = 0
  for (const row of chess.board()) for (const cell of row) {
    if (cell?.type === 'b' && cell.color === color) ownBishops++
    if (cell?.type === 'b' && cell.color === enemyColor) enemyBishops++
  }
  if (ownBishops === 2 && enemyBishops < 2) notes.push('You hold the bishop pair — a real long-term structural advantage.')

  return notes.slice(0, 6)
}
