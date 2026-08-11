import { NextResponse } from 'next/server'
import type { Color } from 'chess.js'
import { createGame } from '@/lib/db/queries'

export async function POST(req: Request) {
  const { playerColor, engineElo } = await req.json() as { playerColor?: Color; engineElo?: number }
  if (!playerColor || !engineElo) return NextResponse.json({ error: 'playerColor and engineElo are required' }, { status: 400 })
  const gameId = createGame(playerColor, engineElo)
  return NextResponse.json({ gameId })
}
