import { NextResponse } from 'next/server'
import { analyzePosition } from '@/lib/engine/stockfish'

export async function POST(req: Request) {
  const { fen, depth, multiPv } = await req.json() as { fen?: string; depth?: number; multiPv?: number }
  if (!fen) return NextResponse.json({ error: 'fen is required' }, { status: 400 })

  try {
    const engine = await analyzePosition(fen, { depth, multiPv })
    return NextResponse.json({ engine })
  } catch (err) {
    console.error('[api/analyze] engine call failed:', err)
    return NextResponse.json({ error: 'engine analysis failed' }, { status: 500 })
  }
}
