import { NextResponse } from 'next/server'
import { Chess, type Color } from 'chess.js'
import { analyzePosition, type CandidateLine } from '@/lib/engine/stockfish'
import { classifyMove } from '@/lib/analysis/move-quality'
import { narrateMove } from '@/lib/ai/narrate-move'

// UCI move ("e2e4", "e7e8q") -> SAN, replayed against the given position —
// the real move, not a re-derived guess.
function uciToSan(fen: string, uci: string): string | null {
  try {
    const game = new Chess(fen)
    const move = game.move({ from: uci.slice(0, 2), to: uci.slice(2, 4), promotion: uci[4] })
    return move.san
  } catch {
    return null
  }
}

function lineToSan(fen: string, pv: string[], maxPlies = 6): string[] {
  const sanLine: string[] = []
  let scratchFen = fen
  for (const uci of pv.slice(0, maxPlies)) {
    const san = uciToSan(scratchFen, uci)
    if (!san) break
    sanLine.push(san)
    const g = new Chess(scratchFen)
    g.move({ from: uci.slice(0, 2), to: uci.slice(2, 4), promotion: uci[4] })
    scratchFen = g.fen()
  }
  return sanLine
}

export async function POST(req: Request) {
  const body = await req.json() as {
    fenBefore?: string
    fenAfter?: string
    playedMoveUci?: string
    bestMoveBeforeUci?: string | null
    bestLineBefore?: CandidateLine
    depth?: number
  }
  const { fenBefore, fenAfter, playedMoveUci, bestMoveBeforeUci = null, bestLineBefore, depth = 18 } = body
  if (!fenBefore || !fenAfter || !playedMoveUci || !bestLineBefore) {
    return NextResponse.json({ error: 'fenBefore, fenAfter, playedMoveUci, and bestLineBefore are required' }, { status: 400 })
  }

  try {
    const mover: Color = new Chess(fenBefore).turn()
    const afterAnalysis = await analyzePosition(fenAfter, { depth, multiPv: 1 })
    const bestLineAfter = afterAnalysis.candidates[0] ?? { pv: [], evalCp: null, mateIn: null }

    const moveQuality = classifyMove({ mover, playedMoveUci, bestMoveBeforeUci, bestLineBefore, bestLineAfter })

    const playedMoveSan = uciToSan(fenBefore, playedMoveUci)
    const bestMoveSan = bestMoveBeforeUci ? uciToSan(fenBefore, bestMoveBeforeUci) : null
    const bestLineSan = lineToSan(fenBefore, bestLineBefore.pv)

    const narration = playedMoveSan
      ? await narrateMove({
          grade: moveQuality.grade,
          playedMoveSan,
          bestMoveSan,
          winPercentDrop: Math.round(moveQuality.winPercentDrop),
          bestLineSan,
          missedForcedMate: moveQuality.missedForcedMate,
        })
      : null

    return NextResponse.json({ moveQuality, playedMoveSan, bestMoveSan, bestLineSan, narration })
  } catch (err) {
    console.error('[api/move-quality] failed:', err)
    return NextResponse.json({ error: 'move-quality analysis failed' }, { status: 500 })
  }
}
