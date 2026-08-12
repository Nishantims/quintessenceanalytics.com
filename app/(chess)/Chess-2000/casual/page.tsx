import type { Metadata } from 'next'
import CasualPlayClient from './CasualPlayClient'

export const metadata: Metadata = {
  title: 'Casual Play — Chess-2000',
  description: 'Play a real Stockfish opponent with no coaching overlay. Free, unlimited, no account needed.',
}

// Deliberately ungated — no subscription check, no free-game cookie. This
// route never calls the paid analysis/move-quality/position-summary
// endpoints (see CasualPlayClient), which is the real reason it can stay
// free and unlimited rather than a limited trial.
export default function CasualPage() {
  return <CasualPlayClient />
}
