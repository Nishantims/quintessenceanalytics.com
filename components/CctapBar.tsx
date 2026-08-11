import type { CctapStep } from '@/lib/analysis/cctap'

// CCTAP walkthrough — replaces the plain toolbar row while active, guiding
// the player through the real 5-step thinking process one piece at a time.
// Deliberately compact: this bar just navigates; the REAL per-position
// guidance (what's actually undefended, what the imbalance actually is,
// what the engine's actual best move is) comes from the SituationPanel
// below, which already tracks whichever tool the current step maps to —
// a real, live answer for THIS position, not generic pedagogical copy
// duplicated in two places (the reported "How It Works and CCTAP both
// look the same" — this is the fix, not a longer detail paragraph here).
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
    <div className="bg-accent-soft px-4 py-2.5 mb-4 flex items-center gap-3 flex-wrap">
      <div className="flex gap-1.5">
        {steps.map((s, i) => (
          <span
            key={i}
            title={s.detail}
            className={`w-[26px] h-[26px] rounded-full flex items-center justify-center text-[11px] font-extrabold ${
              i === step ? 'bg-accent text-white' : 'text-ink-faint'
            }`}
          >
            {s.letter}
          </span>
        ))}
      </div>
      <div className="font-heading text-[13px] font-extrabold flex-1 min-w-[120px]" title={current.detail}>
        {current.letter} · {current.word}
      </div>
      <div className="flex gap-1.5">
        <button onClick={onPrev} disabled={step === 0} className="text-[10.5px] font-semibold w-[70px] h-7 bg-panel disabled:opacity-40">‹ Prev</button>
        <button onClick={onNext} disabled={step === steps.length - 1} className="text-[10.5px] font-semibold w-[70px] h-7 bg-panel disabled:opacity-40">Next ›</button>
      </div>
    </div>
  )
}
