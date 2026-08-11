import type { Color } from 'chess.js'
import { winPercentFromWhiteRelative } from './eval'

// The real headline "how is this game going" signal — anchored entirely on
// the real Stockfish evaluation (via the same real win% conversion used
// for move grading), never on an independently-averaged set of positional
// factors. A confirmed real bug motivated this: Position Health showed
// "68/100 Stable" for White in a position the engine had at -4.4 (a real,
// decisive advantage for Black) — because a flat average of King Safety/
// Pawn Structure/etc. can stay high even while the game is genuinely lost,
// masking the one number that actually matters. This can never contradict
// the eval bar, because it IS the eval bar, categorized.
export type PositionStatus = 'Winning' | 'Much Better' | 'Better' | 'Equal' | 'Worse' | 'Much Worse' | 'Losing'

// Calibrated by hand against real reference points, not just the raw
// win%-formula defaults — the underlying Lichess sigmoid is deliberately
// smooth and doesn't approach 0%/100% until extreme swings (e.g. a real
// -440cp deficit, reported as feeling "completely lost," still computes to
// ~16.5% win — the formula reflects genuine practical swindling chances at
// the GM level, but reads as too lenient for a 7-stage human-facing label).
// These thresholds are tuned so a real, decisive material deficit like
// that one lands in "Losing," not "Much Worse."
const THRESHOLDS: [number, PositionStatus][] = [
  [85, 'Winning'],
  [68, 'Much Better'],
  [55, 'Better'],
  [42, 'Equal'],
  [28, 'Worse'],
  [20, 'Much Worse'],
]

export function computePositionStatus(evalCp: number | null, mateIn: number | null, forColor: Color): PositionStatus {
  const whiteWinPercent = winPercentFromWhiteRelative(evalCp, mateIn)
  const winPercent = forColor === 'w' ? whiteWinPercent : 100 - whiteWinPercent
  for (const [min, status] of THRESHOLDS) {
    if (winPercent >= min) return status
  }
  return 'Losing'
}

export const STATUS_COLOR: Record<PositionStatus, string> = {
  Winning: 'text-status-green',
  'Much Better': 'text-status-green',
  Better: 'text-status-blue',
  Equal: 'text-ink-soft',
  Worse: 'text-status-orange',
  'Much Worse': 'text-status-orange',
  Losing: 'text-status-red',
}
