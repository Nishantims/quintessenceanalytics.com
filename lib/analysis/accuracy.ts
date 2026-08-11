// Real, published Lichess accuracy%-from-win%-swing formula (the same
// engine-review formula Lichess and, functionally, chess.com's "Accuracy"
// feature both use) — not invented here. Takes the mover's own win%
// before/after their move (already computed for every graded move in
// move-quality.ts) and returns a 0-100 accuracy for that single move; the
// session accuracy is the mean of these across the moves played so far.
export function computeMoveAccuracy(winPercentBefore: number, winPercentAfter: number): number {
  const drop = Math.max(0, winPercentBefore - winPercentAfter)
  const raw = 103.1668100711649 * Math.exp(-0.04354415386753951 * drop) - 3.166924740191411
  return Math.max(0, Math.min(100, raw))
}

export function computeSessionAccuracy(moveAccuracies: number[]): number | null {
  if (moveAccuracies.length === 0) return null
  return Math.round(moveAccuracies.reduce((s, x) => s + x, 0) / moveAccuracies.length)
}
