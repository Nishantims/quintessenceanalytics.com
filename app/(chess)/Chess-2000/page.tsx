import { redirect } from 'next/navigation'
import { getActiveSubscription } from '@/lib/chess/subscription'
import { hasUsedFreeGame } from '@/lib/chess/free-game'
import ChessGameClient from './ChessGameClient'

// Real server-side access gate, checked on every fresh page load (a full
// navigation or reload — NOT covered by this: clicking "New Game" again
// within an already-mounted session, which ChessGameClient itself guards
// with the same two real signals passed down as props below). One real
// free game (a plain cookie, no account needed) or a real active
// subscription (checked against Supabase, not a client-trusted flag) —
// anything else is sent to the real paywall instead of the game.
export default async function ChessPage() {
  const activeSubscription = await getActiveSubscription()
  const freeGameUsed = await hasUsedFreeGame()

  if (!activeSubscription && freeGameUsed) {
    redirect('/Chess-2000/subscribe')
  }

  return <ChessGameClient hasActiveSubscription={activeSubscription !== null} initialFreeGameUsed={freeGameUsed} />
}
