'use server'

import { incrementFreeGamesUsed } from './free-game'

// Called client-side the moment a player actually starts a game (not just
// on visiting the page) — see the real reasoning in
// app/(chess)/Chess-2000/ChessGameClient.tsx's onStart handler.
export async function incrementFreeGamesUsedAction(current: number): Promise<void> {
  await incrementFreeGamesUsed(current)
}
