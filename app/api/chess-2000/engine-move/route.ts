import { NextResponse } from 'next/server'
import { getEngineMove } from '@/lib/engine/stockfish'

export async function POST(req: Request) {
  const { fen, elo } = await req.json() as { fen?: string; elo?: number }
  if (!fen || !elo) return NextResponse.json({ error: 'fen and elo are required' }, { status: 400 })

  try {
    const move = await getEngineMove(fen, elo)
    return NextResponse.json({ move })
  } catch (err) {
    console.error('[api/engine-move] failed:', err)
    return NextResponse.json({ error: 'engine move failed' }, { status: 500 })
  }
}
