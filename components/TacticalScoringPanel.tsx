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
      <div className="grid grid-cols-3 gap-1 mt-1.5">
        {PHASES.map(p => (
          <button
            key={p}
            onClick={() => onSelectPhase(p)}
            className={`text-[9px] font-bold py-1 px-1 text-center truncate ${
              p === activePhase ? 'bg-ink text-panel' : 'text-ink-faint hover:bg-panel-line'
            }`}
          >
            {p}
          </button>
        ))}
      </div>
      {scores ? (
        // max-w caps the row's own content width — a real reported bug
        // otherwise: the metric-name column is 1fr (flexible), so once the
        // panel itself got wider (400px, for the equal-size-columns fix),
        // that column stretched to fill ALL the leftover width, pushing a
        // huge empty gap between a short name like "Development" and its
        // scores. Capped here, the whole table just sits snug at the left
        // instead of stretching to the panel's own full width.
        <div className="mt-2 max-w-[260px]">
          <div className="grid grid-cols-[1fr_38px_38px] gap-1 text-[8px] font-bold text-ink-faint uppercase pb-1 border-b border-panel-line">
            <span>Metric</span>
            <span className="text-right">Plyr</span>
            <span className="text-right">Eng</span>
          </div>
          {scores.map(s => (
            <div key={s.name} className="grid grid-cols-[1fr_38px_38px] gap-1 items-baseline text-[10px] py-1 border-b border-panel-line last:border-0">
              <span className="font-bold">{s.name}</span>
              <span className={`text-right tabular-nums font-bold ${scoreColor(s.player)}`}>{s.player}</span>
              <span className={`text-right tabular-nums font-bold ${scoreColor(s.computer)}`}>{s.computer}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-[10px] text-ink-faint mt-3 leading-relaxed">Not reached yet — this section will populate once the game gets there.</p>
      )}
    </div>
  )
}
