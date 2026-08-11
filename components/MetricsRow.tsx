export interface Metric {
  label: string
  value: string
  sub: string
  tone?: 'good' | 'bad'
}

const TONE_CLASS: Record<'good' | 'bad', string> = {
  good: 'text-status-green',
  bad: 'text-status-red',
}

// Five real, live metrics — no placeholder text. Current ELO/Accuracy come
// from real centipawn-loss and win%-swing math (rating-estimate.ts,
// accuracy.ts); Move Number/Game Phase come straight off the real FEN;
// Opponent Rating is the real Stockfish UCI_Elo strength setting chosen at
// game start, not a fabricated username or rating. `tone` (green/red) is
// real too — set by the caller only once there's an actual real number to
// judge as good or bad, never a decorative default.
export function MetricsRow({ metrics }: { metrics: Metric[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-2.5">
      {metrics.map(m => (
        <div key={m.label} className="bg-panel px-2.5 py-1.5">
          <div className="text-[9px] font-bold uppercase tracking-wide text-ink-faint">{m.label}</div>
          <div className={`font-heading text-base font-extrabold mt-0.5 ${m.tone ? TONE_CLASS[m.tone] : ''}`}>{m.value}</div>
          <div className="text-[9.5px] text-ink-faint mt-0.5 truncate">{m.sub}</div>
        </div>
      ))}
    </div>
  )
}
