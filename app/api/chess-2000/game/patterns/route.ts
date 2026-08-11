import { NextResponse } from 'next/server'
import { getRecurringPatterns, getGamesPlayedCount } from '@/lib/db/queries'

export async function GET() {
  const patterns = getRecurringPatterns()
  const gamesPlayed = getGamesPlayedCount()
  return NextResponse.json({ patterns, gamesPlayed })
}
