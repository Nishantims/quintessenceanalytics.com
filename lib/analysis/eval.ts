import type { Color } from 'chess.js'

// The engine (standard UCI behavior, confirmed live: a position where Black
// is up a queen with Black to move returns a large POSITIVE evalCp) reports
// scores from the SIDE-TO-MOVE's perspective, not always White's. Every
// display and every cross-position comparison (move-quality loss, health
// scoring) needs one consistent frame — White-relative is used throughout
// this app since that's what "positive favors White" in the UI promises.

export interface WhiteRelativeScore {
  evalCp: number | null
  mateIn: number | null
}

export function toWhiteRelative(evalCp: number | null, mateIn: number | null, sideToMove: Color): WhiteRelativeScore {
  const sign = sideToMove === 'w' ? 1 : -1
  return {
    evalCp: evalCp === null ? null : evalCp * sign,
    mateIn: mateIn === null ? null : mateIn * sign,
  }
}

// Lichess's real, published win%-from-centipawns formula (winningChances.ts)
// — not invented here. Used both for display-neutral comparisons and as the
// basis for Tool 09's move-quality bands, which piggyback on Lichess's own
// real Inaccuracy/Mistake/Blunder win%-drop thresholds (10/20/30) — see
// move-quality.ts.
export function winPercentFromWhiteRelative(evalCp: number | null, mateIn: number | null): number {
  if (mateIn !== null) return mateIn > 0 ? 100 : 0
  if (evalCp === null) return 50
  return 50 + 50 * (2 / (1 + Math.exp(-0.00368208 * evalCp)) - 1)
}
