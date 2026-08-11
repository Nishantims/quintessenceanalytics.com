import type { HighlightMode } from '@/components/BoardToolbar'

// The CCTAP method — Checks, Captures, Threats, Analysis, Plan — a real,
// well-established over-the-board thinking process for finding a move
// without an engine (this is the honest core of the original "how to find
// the best move" brief this whole app was built around). The five steps
// are static pedagogical copy, not per-position data — same category as
// hint.ts's FACTOR_IDEAS or the "How It Works" panel — each mapped to the
// existing real analysis tool that answers that step's question.
export interface CctapStep {
  letter: string
  word: string
  detail: string
  tool: HighlightMode
}

export const CCTAP_STEPS: CctapStep[] = [
  { letter: 'C', word: 'Checks', tool: 'checkmate',
    detail: "Can I give check, and does it lead anywhere? Even one that doesn't work can reveal a hidden idea." },
  { letter: 'C', word: 'Captures', tool: 'undefended',
    detail: 'List every capture on the board, yours and theirs — Undefended Pieces and Overloaded Pieces surface these instantly.' },
  { letter: 'T', word: 'Threats', tool: 'imbalance',
    detail: "What is my opponent's very next move if I do nothing? Imbalance shows exactly which squares are outweighed before you play." },
  { letter: 'A', word: 'Analysis', tool: 'weakSquares',
    detail: 'Compare pawn structures and Weak Squares — whoever holds up better usually stands better.' },
  { letter: 'P', word: 'Plan', tool: 'hint',
    detail: "Once you've checked the board, see what Hint says — then decide if you agree before you play it." },
]
