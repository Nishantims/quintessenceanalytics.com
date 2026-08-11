export type HighlightMode =
  | 'undefended' | 'overloaded' | 'weakSquares' | 'pieceStrength' | 'imbalance' | 'tactics' | 'checkmate' | 'hint' | null

// Exact order per the user's own button-arrangement spec. Hint is
// deliberately NOT in this ribbon — it's a standalone button beside the
// board (mirroring Back) since it answers a different kind of question
// ("what should I play") than these seven board-analysis toggles. Every
// button gets its own idle-state color (matching the highlight color it
// actually paints on the board) — a real "make it colorful" fix, and a
// real reported bug fix: Tactics Alert and Checkmate Alert previously
// shared the same neutral grey idle color and were indistinguishable at a
// glance. Both now carry a SOFT tint of their own alert color even at
// idle (green / red), then switch to the solid, saturated version of that
// same color once something real is actually available — the two states
// read as related, not as two unrelated colors.
const MODES: { mode: HighlightMode; label: string; idle: string }[] = [
  { mode: 'undefended', label: 'Undefended Pieces', idle: 'bg-status-red-soft text-status-red' },
  { mode: 'overloaded', label: 'Overloaded Pieces', idle: 'bg-status-orange-soft text-status-orange' },
  { mode: 'weakSquares', label: 'Weak Squares', idle: 'bg-status-purple-soft text-status-purple' },
  { mode: 'pieceStrength', label: 'Piece Strength', idle: 'bg-status-gold-soft text-status-gold' },
  { mode: 'imbalance', label: 'Imbalance', idle: 'bg-status-teal-soft text-status-teal' },
  { mode: 'tactics', label: 'Tactics Alert', idle: 'bg-status-green-soft text-status-green' },
  { mode: 'checkmate', label: 'Checkmate Alert', idle: 'bg-status-red-soft text-status-red' },
]

// Real board-highlight tools, single-select with real toggle-off (clicking
// the already-active tool deselects it — with nothing selected, the
// right-side panel shows the general position summary instead of a tool
// explanation). Undefended/Overloaded/Weak Squares/Piece Strength/Imbalance/
// Checkmate Alert are all real for BOTH sides (two distinct highlight
// colors each, per spec); Tactics Alert is deliberately player-only (forks,
// pins, skewers, discovered attacks, and profitable exchanges the PLAYER
// can execute) and lights up green the moment any real one exists, same
// alert pattern as Checkmate Alert (which lights up red — a real forced
// mate is more urgent/decisive than a tactic, so it gets the more urgent
// color rather than reusing green for both).
export function BoardToolbar({
  active, onSelect, hasForcedMate, hasTactic,
}: {
  active: HighlightMode
  onSelect: (mode: HighlightMode) => void
  hasForcedMate: boolean
  hasTactic: boolean
}) {
  return (
    <div className="w-full flex flex-nowrap gap-1.5 mb-2.5 overflow-x-auto">
      {MODES.map(({ mode, label, idle }) => {
        const isActive = active === mode
        const isAlert = (mode === 'checkmate' && hasForcedMate) || (mode === 'tactics' && hasTactic)
        const alertClass = mode === 'checkmate' ? 'bg-status-red text-white' : 'bg-status-green text-white'
        const className = isActive
          ? 'bg-ink text-[var(--background)]'
          : isAlert
            ? alertClass
            : idle
        return (
          <button
            key={mode}
            onClick={() => onSelect(isActive ? null : mode)}
            className={`text-[9.5px] font-bold h-[42px] flex-1 min-w-0 px-1 leading-tight ${className}`}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
