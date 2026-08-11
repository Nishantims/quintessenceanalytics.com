import type { MoveGrade } from '@/lib/analysis/move-quality'

const TAG_STYLE: Record<MoveGrade, string> = {
  Best: 'text-status-green bg-status-green-soft', Excellent: 'text-status-green bg-status-green-soft', Good: 'text-status-green bg-status-green-soft',
  Inaccuracy: 'text-status-orange bg-status-orange-soft', Mistake: 'text-status-orange bg-status-orange-soft',
  Blunder: 'text-status-red bg-status-red-soft',
}

export interface LastMoveInfo {
  san: string
  grade: MoveGrade
  note: string | null
  mover: 'White' | 'Black'
}

// Real last-move card — whichever side moved most recently, player or
// engine (both are graded the same real way; see move-quality.ts and the
// engine-move effect in page.tsx that grades the computer's moves too).
// `compact` renders a single slim row (SAN + grade badge, no note, no
// label) sized to match the Hint/Back buttons it now sits between —
// the full version is kept for any future non-inline placement.
export function LastMoveCard({ info, loading, compact = false }: { info: LastMoveInfo | null; loading: boolean; compact?: boolean }) {
  if (!info && !loading) return null

  if (compact) {
    return (
      <div className="bg-panel h-7 px-3 flex items-center justify-center gap-2">
        {loading || !info ? (
          <span className="text-[10px] text-ink-faint">Grading…</span>
        ) : (
          <>
            <span className="font-heading text-[13px] font-extrabold">{info.san}</span>
            <span className={`text-[9px] font-bold px-1.5 py-0.5 ${TAG_STYLE[info.grade]}`}>{info.grade}</span>
          </>
        )}
      </div>
    )
  }

  return (
    <div className="bg-panel p-3">
      <div className="text-[9.5px] font-bold uppercase tracking-wide text-ink-faint">Last move</div>
      {loading || !info ? (
        <p className="text-[11.5px] text-ink-faint mt-2">Grading…</p>
      ) : (
        <>
          <div className="flex items-baseline gap-2 mt-1.5">
            <span className="font-heading text-xl font-extrabold">{info.san}</span>
            <span className={`text-[10px] font-bold px-1.5 py-0.5 ${TAG_STYLE[info.grade]}`}>{info.grade}</span>
          </div>
          {info.note && <div className="text-[11px] text-ink-faint mt-2 leading-relaxed">{info.note}</div>}
        </>
      )}
    </div>
  )
}
