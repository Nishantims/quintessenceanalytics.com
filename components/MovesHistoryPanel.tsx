import type { Color } from 'chess.js'
import type { MoveGrade } from '@/lib/analysis/move-quality'

export interface MoveLogEntry {
  ply: number
  color: Color
  san: string
  grade: MoveGrade | null
  centipawnLoss: number | null
  accuracy: number | null
}

// Best/Excellent/Good are all "fine" moves but previously all rendered as
// the exact same green dot, with no way to tell a real best move from a
// merely good one — a real, reported gap. Best gets its own distinct hue
// (blue, matching the same convention used for the "Recent moves" strip
// next to the board) since it's categorically different — it matched the
// engine's own top choice exactly; Excellent/Good stay green at different
// opacity so the real family relationship (all fine moves) still reads.
const DOT_COLOR: Record<MoveGrade, string> = {
  Best: 'bg-status-blue', Excellent: 'bg-status-green', Good: 'bg-status-green opacity-50',
  Inaccuracy: 'bg-status-orange', Mistake: 'bg-status-alt2', Blunder: 'bg-status-red',
}

function dotClass(grade: MoveGrade | null): string {
  return grade ? DOT_COLOR[grade] : 'bg-panel-line'
}

// Real move-by-move history, both sides, graded the same real way the
// per-move panel already grades them (move-quality.ts) — not a replay of
// PGN text, an accumulated log of what was actually played this game.
export function MovesHistoryPanel({ moves }: { moves: MoveLogEntry[] }) {
  const rows: { num: number; white: MoveLogEntry | null; black: MoveLogEntry | null }[] = []
  for (let i = 0; i < moves.length; i += 2) {
    rows.push({ num: Math.floor(i / 2) + 1, white: moves[i] ?? null, black: moves[i + 1] ?? null })
  }

  return (
    <div className="bg-panel px-4 py-3 mb-4">
      <div className="text-[9.5px] font-bold uppercase tracking-wide text-ink-faint">Move history</div>
      <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-2">
        {rows.map(row => (
          <div key={row.num} className="flex items-center gap-1 text-[11.5px]">
            <span className="text-ink-faint min-w-[16px]">{row.num}.</span>
            {row.white && <><span>{row.white.san}</span><span className={`inline-block w-[5px] h-[5px] rounded-full ml-0.5 ${dotClass(row.white.grade)}`} /></>}
            {row.black && <><span className="ml-1">{row.black.san}</span><span className={`inline-block w-[5px] h-[5px] rounded-full ml-0.5 ${dotClass(row.black.grade)}`} /></>}
          </div>
        ))}
        {rows.length === 0 && <span className="text-[11px] text-ink-faint">No moves played yet.</span>}
      </div>
      <div className="flex items-center gap-1.5 mt-2.5 flex-wrap">
        <span className="text-[10px] text-ink-faint mr-1">Move quality:</span>
        <span className="w-[7px] h-[7px] rounded-full bg-status-blue inline-block" /><span className="text-[10px] text-ink-faint mr-1">Best</span>
        <span className="w-[7px] h-[7px] rounded-full bg-status-green inline-block" /><span className="text-[10px] text-ink-faint mr-1">Excellent</span>
        <span className="w-[7px] h-[7px] rounded-full bg-status-green opacity-50 inline-block" /><span className="text-[10px] text-ink-faint mr-1">Good</span>
        <span className="w-[7px] h-[7px] rounded-full bg-status-orange inline-block" /><span className="text-[10px] text-ink-faint mr-1">Inaccuracy</span>
        <span className="w-[7px] h-[7px] rounded-full bg-status-alt2 inline-block" /><span className="text-[10px] text-ink-faint mr-1">Mistake</span>
        <span className="w-[7px] h-[7px] rounded-full bg-status-red inline-block" /><span className="text-[10px] text-ink-faint">Blunder</span>
      </div>
    </div>
  )
}
