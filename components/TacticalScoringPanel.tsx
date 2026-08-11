import type { GamePhase } from '@/lib/analysis/game-phase'
import type { ScoreEntry } from '@/lib/analysis/tactical-scoring'

const PHASES: GamePhase[] = ['Opening', 'Middlegame', 'Endgame']

function scoreColor(score: number): string {
  if (score >= 65) return 'text-status-green'
  if (score >= 35) return 'text-ink'
  return 'text-status-red'
}

// Real, pure-logic scoring — ten fixed metrics (real counts and board-state
// measurements), the SAME ten for every phase so the numbers stay
// comparable across a whole game, shown for both the player ("Player") and
// the engine ("Engine") in their own separate columns — a real, direct
// side-by-side comparison, not squeezed into one "62/71" cell.
export function TacticalScoringPanel({
  activePhase, onSelectPhase, snapshots,
}: {
  activePhase: GamePhase
  onSelectPhase: (phase: GamePhase) => void
  snapshots: Partial<Record<GamePhase, ScoreEntry[]>>
}) {
  const scores = snapshots[activePhase]
  return (
    <div className="bg-panel p-2.5 h-full overflow-y-auto">
      <div className="text-[9px] font-bold uppercase tracking-wide text-ink-faint">Tactical Scoring</div>
      {/* inline-flex (not a 3-col grid) — a real reported bug otherwise:
          grid-cols-3 stretched each tab to a third of the panel's own
          width, spreading "Opening"/"Middlegame"/"Endgame" out with huge
          gaps between short labels instead of sitting together as one
          compact tab group. */}
      <div className="inline-flex gap-1 mt-1.5">
        {PHASES.map(p => (
          <button
            key={p}
            onClick={() => onSelectPhase(p)}
            className={`text-[9px] font-bold py-1 px-2.5 text-center truncate ${
              p === activePhase ? 'bg-ink text-panel' : 'text-ink-faint hover:bg-panel-line'
            }`}
          >
            {p}
          </button>
        ))}
      </div>
      {scores ? (
        // Fixed 92px name column (not 1fr) — a real reported bug
        // otherwise: 1fr always takes up ALL the row's remaining flexible
        // width, so even capped at max-w-[260px] a short name like
        // "Development" left a big empty gap before its own scores. 92px
        // is the real measured width of the longest name ("Advanced
        // Pieces") plus a few px of buffer — every row's name column now
        // sizes to fit content, not to fill space. The table's own width
        // (92+38+38+gaps) replaces the old max-w cap, which is no longer
        // needed once nothing here is flexible.
        <div className="mt-2 w-[184px]">
          <div className="grid grid-cols-[92px_38px_38px] gap-1 text-[8px] font-bold text-ink-faint uppercase pb-1.5 border-b border-panel-line">
            <span>Metric</span>
            <span className="text-right pr-1.5">Plyr</span>
            <span className="text-right pr-1.5">Eng</span>
          </div>
          {scores.map(s => (
            <div key={s.name} className="grid grid-cols-[92px_38px_38px] gap-1 items-baseline text-[10px] py-2 border-b border-panel-line last:border-0">
              <span className="font-bold">{s.name}</span>
              <span className={`text-right pr-1.5 tabular-nums font-bold ${scoreColor(s.player)}`}>{s.player}</span>
              <span className={`text-right pr-1.5 tabular-nums font-bold ${scoreColor(s.computer)}`}>{s.computer}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-[10px] text-ink-faint mt-3 leading-relaxed">Not reached yet — this section will populate once the game gets there.</p>
      )}
    </div>
  )
}
