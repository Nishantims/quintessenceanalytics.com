import { NextResponse } from 'next/server'
import { endGame } from '@/lib/db/queries'

export async function POST(req: Request) {
  const { gameId, result } = await req.json() as { gameId?: number; result?: string | null }
  if (!gameId) return NextResponse.json({ error: 'gameId is required' }, { status: 400 })
  endGame(gameId, result ?? null)
  return NextResponse.json({ ok: true })
}
