import { NextResponse } from 'next/server'
import { recordMove } from '@/lib/db/queries'
import type { MoveGrade } from '@/lib/analysis/move-quality'

export async function POST(req: Request) {
  const body = await req.json() as {
    gameId?: number; ply?: number; san?: string; grade?: MoveGrade; centipawnLoss?: number; missedForcedMate?: boolean
  }
  const { gameId, ply, san, grade, centipawnLoss, missedForcedMate } = body
  if (!gameId || ply === undefined || !san || !grade || centipawnLoss === undefined) {
    return NextResponse.json({ error: 'gameId, ply, san, grade, and centipawnLoss are required' }, { status: 400 })
  }
  recordMove(gameId, ply, san, grade, centipawnLoss, missedForcedMate ?? false)
  return NextResponse.json({ ok: true })
}
