import type { CctapStep } from '@/lib/analysis/cctap'

// CCTAP walkthrough — replaces the plain toolbar row while active, guiding
// the player through the real 5-step thinking process one piece at a time.
// Deliberately self-contained now — a real, reported bug otherwise: this
// used to auto-select the board toolbar's own highlight tool for whatever
// step was active (Checks → Checkmate Alert, Plan → Hint, etc.), which
// meant opening CCTAP mode silently changed what the Positional Analysis
// panel was showing without the player asking for it, and there was no
// way to use CCTAP without that tool-hijacking. CCTAP now only navigates
// and shows its own real step guidance — it never touches the toolbar or
// highlightMode. The guidance text itself tells the player which real
// tool to go check manually if they want the live data for that step.
export function CctapBar({
  steps, step, onPrev, onNext,
}: {
  steps: CctapStep[]
  step: number
  onPrev: () => void
  onNext: () => void
}) {
  const current = steps[step]
  return (
    <div className="bg-accent-soft px-4 py-2.5 mb-4">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex gap-1.5">
          {steps.map((s, i) => (
            <span
              key={i}
              title={s.word}
              className={`w-[26px] h-[26px] rounded-full flex items-center justify-center text-[11px] font-extrabold ${
                i === step ? 'bg-accent text-white' : 'text-ink-faint'
              }`}
            >
              {s.letter}
            </span>
          ))}
        </div>
        <div className="font-heading text-[13px] font-extrabold flex-1 min-w-[120px]">
          {current.letter} · {current.word}
        </div>
        <div className="flex gap-1.5">
          <button onClick={onPrev} disabled={step === 0} className="text-[10.5px] font-semibold w-[70px] h-7 bg-panel disabled:opacity-40">‹ Prev</button>
          <button onClick={onNext} disabled={step === steps.length - 1} className="text-[10.5px] font-semibold w-[70px] h-7 bg-panel disabled:opacity-40">Next ›</button>
        </div>
      </div>
      <p className="text-[11px] text-ink leading-relaxed mt-2">{current.detail}</p>
    </div>
  )
}
