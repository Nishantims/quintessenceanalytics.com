import { NextResponse } from 'next/server'
import { narratePosition, type PositionSummaryInput } from '@/lib/ai/narrate-position'

export async function POST(req: Request) {
  const body = await req.json() as PositionSummaryInput
  const narration = await narratePosition(body)
  return NextResponse.json({ narration })
}
