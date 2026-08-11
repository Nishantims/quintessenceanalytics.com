'use server'

import { markFreeGameUsed } from './free-game'

// Called client-side the moment a player actually starts their first game
// (not just on visiting the page) — see the real reasoning in
// app/(chess)/Chess-2000/ChessGameClient.tsx's onStart handler.
export async function markFreeGameUsedAction(): Promise<void> {
  await markFreeGameUsed()
}
