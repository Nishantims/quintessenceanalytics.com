import { redirect } from 'next/navigation'
import { getActiveSubscription } from '@/lib/chess/subscription'
import { getFreeGamesUsed } from '@/lib/chess/free-game'
import { PAYWALL_ENABLED, FREE_GAMES_LIMIT } from '@/lib/chess/config'
import ChessGameClient from '../ChessGameClient'

// Real server-side access gate, checked on every fresh page load (a full
// navigation or reload — NOT covered by this: clicking "New Game" again
// within an already-mounted session, which ChessGameClient itself guards
// with the same two real signals passed down as props below). Up to
// FREE_GAMES_LIMIT real free games (a plain cookie, no account needed) or a
// real active subscription (checked against Supabase, not a client-trusted
// flag) — anything past that is sent to the real paywall instead of the
// game, but only while PAYWALL_ENABLED is on (off during testing — see
// lib/chess/config.ts).
export default async function PlayPage() {
  const activeSubscription = await getActiveSubscription()
  const freeGamesUsed = await getFreeGamesUsed()

  if (PAYWALL_ENABLED && !activeSubscription && freeGamesUsed >= FREE_GAMES_LIMIT) {
    redirect('/Chess-2000/subscribe')
  }

  return <ChessGameClient hasActiveSubscription={activeSubscription !== null} initialFreeGamesUsed={freeGamesUsed} />
}
