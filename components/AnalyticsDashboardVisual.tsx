"use client";

import { useEffect, useRef, useState } from "react";

// Hero visual: a live-looking analytics panel (KPI strip + animated bar
// chart + trend line) instead of a stock photo — this is what the product
// actually looks like, dogfooding Market Reports' own dashboard aesthetic
// with the new brand gradient, so it reads as "ours" rather than generic.
//
// Animates unconditionally on mount via pure CSS (qa-grow-up / qa-draw-line
// keyframes in app/globals.css) rather than gating on an IntersectionObserver
// + inline-style toggle — this widget always sits above the fold in the
// hero, so there's nothing to "wait to scroll into view" for, and a plain
// CSS keyframe can't silently fail to apply the way a JS-driven state flip
// tied to observer timing / hydration can.

const BARS = [38, 52, 44, 61, 58, 74, 69, 88];
const KPIS = [
  { label: "Market size tracked", target: 4.2, prefix: "$", suffix: "B", decimals: 1 },
  { label: "Forecast CAGR", target: 18.6, prefix: "", suffix: "%", decimals: 1 },
  { label: "Model confidence", target: 94, prefix: "", suffix: "%", decimals: 0 },
];

function useCountUp(target: number, decimals: number, durationMs: number) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const t0 = performance.now();
    let raf: number;
    function tick(now: number) {
      const progress = Math.min(1, (now - t0) / durationMs);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Number((target * eased).toFixed(decimals)));
      if (progress < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return value;
}

function Kpi({ item, index }: { item: (typeof KPIS)[number]; index: number }) {
  const value = useCountUp(item.target, item.decimals, 1200 + index * 200);
  return (
    <div className="rounded-xl border border-border bg-surface px-4 py-3">
      <p className="font-data text-[20px] font-semibold text-text-primary">
        {item.prefix}
        {value.toFixed(item.decimals)}
        {item.suffix}
      </p>
      <p className="mt-1 text-[11px] leading-snug text-text-muted">{item.label}</p>
    </div>
  );
}

export function AnalyticsDashboardVisual() {
  const [pulse, setPulse] = useState(false);
  const mountedRef = useRef(false);

  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;
    setPulse(true);
  }, []);

  return (
    <div className="rounded-2xl border border-border bg-surface-raised p-5">
      {/* Panel chrome */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-grey" />
          <span className="h-2.5 w-2.5 rounded-full bg-grey" />
          <span className="h-2.5 w-2.5 rounded-full bg-grey" />
        </div>
        <div className="flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1">
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={pulse ? { background: "var(--pink)", animation: "qa-fade-in 1s ease-in-out infinite alternate" } : { background: "var(--pink)" }}
          />
          <span className="font-data text-[10px] uppercase tracking-wide text-text-muted">Live signal</span>
        </div>
      </div>

      {/* KPI strip */}
      <div className="mt-5 grid grid-cols-3 gap-2.5">
        {KPIS.map((k, i) => (
          <Kpi key={k.label} item={k} index={i} />
        ))}
      </div>

      {/* Bar chart with trend overlay */}
      <div className="relative mt-5 h-32 rounded-xl border border-border bg-surface p-4">
        <div className="flex h-full items-end gap-2">
          {BARS.map((h, i) => (
            <div key={i} className="flex-1 flex items-end">
              <div
                className="w-full origin-bottom rounded-t-sm"
                style={{
                  height: `${h}%`,
                  background: "linear-gradient(180deg, var(--purple) 0%, var(--pink) 100%)",
                  animation: `qa-grow-up 0.6s ${(i * 0.07).toFixed(2)}s cubic-bezier(0.34,1.56,0.64,1) both`,
                }}
              />
            </div>
          ))}
        </div>
        <svg className="pointer-events-none absolute inset-4" viewBox="0 0 100 40" preserveAspectRatio="none">
          <path
            d="M0 32 L14 26 L28 29 L42 18 L57 20 L71 8 L85 11 L100 2"
            fill="none"
            stroke="var(--blue)"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            pathLength={1}
            style={{
              strokeDasharray: 1,
              animation: "qa-draw-line 1.2s 0.5s cubic-bezier(0.65,0,0.35,1) both",
            }}
          />
        </svg>
      </div>
    </div>
  );
}
