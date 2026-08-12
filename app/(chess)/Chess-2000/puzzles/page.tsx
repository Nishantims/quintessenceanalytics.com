import type { Metadata } from 'next'
import PuzzlesClient from './PuzzlesClient'

export const metadata: Metadata = {
  title: 'Puzzles — Chess-2000',
  description: 'Real, verified tactical puzzles — forks, pins, skewers, back-rank mates. Free, unlimited, no account needed.',
}

// Deliberately ungated, and genuinely zero backend cost: puzzle solving is
// validated entirely client-side against chess.js, no engine call involved.
export default function PuzzlesPage() {
  return <PuzzlesClient />
}
