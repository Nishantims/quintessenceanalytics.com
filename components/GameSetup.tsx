'use client'

import { useState } from 'react'
import type { Color } from 'chess.js'
import { ENGINE_MAX_ELO, ENGINE_MIN_ELO } from '@/lib/engine/constants'

export function GameSetup({ onStart }: { onStart: (color: Color, elo: number) => void }) {
  const [color, setColor] = useState<Color | 'random'>('w')
  const [elo, setElo] = useState(1500)

  return (
    <div className="mx-auto max-w-md w-full px-6 py-16">
      <h1 className="text-2xl font-semibold mb-1">Chess-2000</h1>
      <p className="text-sm text-ink-faint mb-8">Real Stockfish coaching, move by move. Set up a game to begin.</p>

      <div className="border border-panel-line bg-panel p-6 space-y-6">
        <div>
          <span className="block text-xs uppercase tracking-wide text-ink-faint mb-2">Play as</span>
          <div className="flex gap-2">
            {(['w', 'b', 'random'] as const).map(c => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`flex-1 border px-3 py-2 text-sm font-medium capitalize ${
                  color === c ? 'border-ink bg-ink text-panel' : 'border-panel-line text-ink-soft hover:border-ink-soft'
                }`}
              >
                {c === 'w' ? 'White' : c === 'b' ? 'Black' : 'Random'}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-xs uppercase tracking-wide text-ink-faint">Engine strength</span>
            <span className="text-sm font-semibold tabular-nums">{elo} ELO</span>
          </div>
          <input
            type="range"
            min={ENGINE_MIN_ELO}
            max={ENGINE_MAX_ELO}
            step={10}
            value={elo}
            onChange={e => setElo(Number(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-[11px] text-ink-faint mt-1">
            <span>{ENGINE_MIN_ELO} (weakest)</span>
            <span>{ENGINE_MAX_ELO} (full strength)</span>
          </div>
          <p className="text-[11px] text-ink-faint mt-2">
            Real Stockfish strength limiting (UCI_Elo) — the engine actually plays weaker at low settings, not a simulated handicap.
          </p>
        </div>

        <button
          onClick={() => onStart(color === 'random' ? (Math.random() < 0.5 ? 'w' : 'b') : color, elo)}
          className="w-full bg-ink px-4 py-2.5 text-sm font-medium text-panel hover:opacity-90"
        >
          Start game
        </button>
      </div>
    </div>
  )
}
