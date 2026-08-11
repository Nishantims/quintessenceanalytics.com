// Live estimated performance rating, computed from the player's own real
// Average Centipawn Loss (ACPL) so far this game — every input is a real
// number from real engine evaluations (see move-quality.ts). The ACPL ->
// rating conversion below is a commonly-referenced approximate banding
// (not an official, precisely-published chess.com/Lichess formula — no
// such exact formula is public), used here as a documented, transparent
// interpolation rather than invented from nothing. The UI must always
// label this as a rough, provisional, this-game-only estimate, never as
// an official rating.

// [acpl, rating] band edges, real-world-referenced approximate correlation.
// Revised to be more conservative after a real reported case (a
// self-assessed "very bad game" landed at ~2250) — the previous bands
// were too generous in the ACPL 30-80 range, which is where most real
// club-level games with a couple of genuine blunders actually fall.
const BANDS: [number, number][] = [
  [0, 2600], [10, 2300], [20, 2000], [35, 1700], [50, 1500], [75, 1200], [100, 1000], [150, 700], [250, 400],
]

export function estimateRatingFromAcpl(acpl: number): number {
  if (acpl <= BANDS[0][0]) return BANDS[0][1]
  for (let i = 1; i < BANDS.length; i++) {
    const [prevAcpl, prevRating] = BANDS[i - 1]
    const [curAcpl, curRating] = BANDS[i]
    if (acpl <= curAcpl) {
      const t = (acpl - prevAcpl) / (curAcpl - prevAcpl)
      return Math.round(prevRating + (curRating - prevRating) * t)
    }
  }
  return BANDS[BANDS.length - 1][1]
}

export interface RatingEstimate {
  acpl: number
  estimatedRating: number
  movesSampled: number
  provisional: boolean // fewer than 10 moves — too little data for the number to mean much
}

// A real, confirmed bug: a couple of near-perfect opening moves against a
// weak opponent (e.g. a 1500-strength engine) produced a raw ACPL estimate
// near ~2400-2600 after only 2-3 moves — technically "what this ACPL maps
// to" but an implausible, misleading number to show ("Black accuracy is
// 78%, so how can the current ELO be 2400?"). The real, already-known fact
// this app has and the raw ACPL formula ignores is who you're actually
// playing — you can't yet be shown as playing far above or below your
// opponent's real configured strength on a handful of moves. This shrinks
// the displayed estimate toward the real opponent ELO for small samples
// (a standard small-sample shrinkage-toward-a-known-prior technique, not
// an invented number) and lets the raw ACPL-based estimate take over as
// real evidence accumulates — fully resolved by 10 real graded moves.
export function computeRatingEstimate(centipawnLosses: number[], opponentElo: number): RatingEstimate {
  const movesSampled = centipawnLosses.length
  if (movesSampled === 0) return { acpl: 0, estimatedRating: 0, movesSampled: 0, provisional: true }
  const acpl = centipawnLosses.reduce((s, x) => s + x, 0) / movesSampled
  const rawEstimate = estimateRatingFromAcpl(acpl)
  const shrinkage = Math.min(1, movesSampled / 10)
  const estimatedRating = Math.round(opponentElo + (rawEstimate - opponentElo) * shrinkage)
  return {
    acpl: Math.round(acpl),
    estimatedRating,
    movesSampled,
    provisional: movesSampled < 10,
  }
}
