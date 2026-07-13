"use client";

import { useEffect, useRef, useState } from "react";

// Hero visual: an abstract neural-network diagram — nodes and connections,
// the standard visual shorthand for "AI" — rendered as solid-color SVG
// shapes (no gradient blends, per brand direction: pink/blue/purple are
// used as distinct solid accents, never blended into one another).

const NODES = [
  { x: 40, y: 110, r: 5, color: "blue", layer: 0 },
  { x: 40, y: 60, r: 5, color: "blue", layer: 0 },
  { x: 40, y: 160, r: 5, color: "blue", layer: 0 },
  { x: 130, y: 40, r: 6, color: "pink", layer: 1 },
  { x: 130, y: 90, r: 6, color: "pink", layer: 1 },
  { x: 130, y: 140, r: 6, color: "pink", layer: 1 },
  { x: 130, y: 180, r: 6, color: "pink", layer: 1 },
  { x: 220, y: 65, r: 6, color: "purple", layer: 2 },
  { x: 220, y: 120, r: 6, color: "purple", layer: 2 },
  { x: 220, y: 165, r: 6, color: "purple", layer: 2 },
  { x: 300, y: 100, r: 7, color: "blue", layer: 3 },
];

const EDGES: Array<[number, number]> = [
  [0, 3], [0, 4], [1, 3], [1, 4], [1, 5], [2, 5], [2, 6],
  [3, 7], [4, 7], [4, 8], [5, 8], [5, 9], [6, 9],
  [7, 10], [8, 10], [9, 10],
];

const COLOR_VAR: Record<string, string> = {
  blue: "var(--blue)",
  pink: "var(--pink)",
  purple: "var(--purple)",
};

export function AiNetworkVisual() {
  const [active, setActive] = useState(false);
  const mountedRef = useRef(false);

  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;
    setActive(true);
  }, []);

  return (
    <div className="rounded-2xl border border-border bg-surface-raised p-6">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-text-muted">
          AI research engine
        </span>
        <span className="flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--pink)" }} />
          <span className="font-data text-[10px] uppercase tracking-wide text-text-muted">Processing</span>
        </span>
      </div>

      <svg viewBox="0 0 340 210" className="mt-4 h-56 w-full">
        <g stroke="var(--border)" strokeWidth="1.4">
          {EDGES.map(([a, b], i) => (
            <line
              key={i}
              x1={NODES[a].x} y1={NODES[a].y}
              x2={NODES[b].x} y2={NODES[b].y}
              style={{
                opacity: active ? 1 : 0,
                transition: `opacity 0.5s ${(i * 0.05).toFixed(2)}s ease`,
              }}
            />
          ))}
        </g>
        {NODES.map((n, i) => (
          <circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={n.r}
            fill={COLOR_VAR[n.color]}
            style={{
              transformOrigin: `${n.x}px ${n.y}px`,
              animation: active ? `qa-fade-in 0.5s ${(n.layer * 0.15).toFixed(2)}s ease both` : undefined,
            }}
          />
        ))}
      </svg>

      <p className="mt-2 text-center font-data text-[11px] uppercase tracking-widest text-text-muted">
        Signals in. One model out.
      </p>
    </div>
  );
}
