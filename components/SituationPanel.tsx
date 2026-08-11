// One box: shows the real explanation for whichever board tool is active,
// or — once deselected — a real position summary. Per an explicit user
// requirement: deselecting a toolbar button should make the summary
// reappear in the same place the tool text was, not leave two separate
// boxes competing for the same real estate.
//
// The summary itself prefers the AI narration when one comes back (nicer,
// more natural prose) but always has the deterministic one — composed
// entirely from real, already-computed data, zero latency, no API key
// required — as a genuine fallback, not a placeholder. Without this, any
// session without a configured GEMINI_API_KEY showed a permanent
// "No summary yet," which is exactly what was reported. The deterministic
// version is real, separate paragraphs (status / strategy / tactics /
// performance) — the same fixed template every time, with only the real
// numbers changing, per an explicit request that the text stay constant.
export function SituationPanel({
  toolTitle, toolLines, narration, deterministicNarrative,
}: {
  toolTitle: string
  toolLines: string[]
  narration: string | null
  deterministicNarrative: string[]
}) {
  if (toolTitle) {
    return (
      <div className="bg-panel p-3 h-full overflow-y-auto">
        <div className="font-heading text-[13px] font-extrabold text-accent">{toolTitle}</div>
        <div className="text-[11.5px] text-ink mt-1.5 leading-relaxed">{toolLines.join(' ')}</div>
      </div>
    )
  }
  const paragraphs = narration ? [narration] : deterministicNarrative
  return (
    <div className="bg-panel p-3 h-full overflow-y-auto">
      <div className="text-[9.5px] font-bold uppercase tracking-wide text-ink-faint">Positional Summary</div>
      <div className="mt-1.5 space-y-2">
        {paragraphs.map((p, i) => (
          <p key={i} className="text-[11.5px] text-ink leading-relaxed">{p}</p>
        ))}
      </div>
    </div>
  )
}
