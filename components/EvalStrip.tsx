import type { Color } from 'chess.js'
import { winPercentFromWhiteRelative } from '@/lib/analysis/eval'

function formatEval(evalCp: number | null, mateIn: number | null): string {
  if (mateIn !== null) return `M${Math.abs(mateIn)}`
  if (evalCp !== null) return `${evalCp > 0 ? '+' : ''}${(evalCp / 100).toFixed(1)}`
  return '—'
}

// A real, classic vertical eval bar (matching the standard Lichess/
// chess.com convention) instead of the earlier horizontal strip — sits
// directly beside the board, stretched to the board's own real height.
// Orientation follows the board: whichever side's pieces sit at the
// bottom of the (possibly flipped) board also gets the bottom of the bar,
// so the bar always reads correctly for whoever is actually looking at it.
// Literal black/white fill colors (not the theme's --ink/--accent tokens,
// which flip with light/dark mode and board skin) — the two halves
// represent the two real chess sides and must always read as White and
// Black regardless of which visual theme is active.
export function EvalStrip({
  evalCp, mateIn, playerColor,
}: {
  evalCp: number | null
  mateIn: number | null
  playerColor: Color
}) {
  const whitePercent = winPercentFromWhiteRelative(evalCp, mateIn)
  const whiteAtBottom = playerColor === 'w'
  return (
    <div className="h-full flex flex-col items-center gap-1.5">
      <div className="flex-1 w-5 relative overflow-hidden" style={{ backgroundColor: whiteAtBottom ? '#14161c' : '#f5f5f5', borderRadius: 'var(--radius-control)' }}>
        <div
          className="absolute left-0 right-0 transition-[height] duration-500"
          style={{
            [whiteAtBottom ? 'bottom' : 'top']: 0,
            height: `${whitePercent}%`,
            backgroundColor: whiteAtBottom ? '#f5f5f5' : '#14161c',
          }}
        />
      </div>
      <div className="text-[10px] font-bold tabular-nums text-ink-faint">{formatEval(evalCp, mateIn)}</div>
    </div>
  )
}
