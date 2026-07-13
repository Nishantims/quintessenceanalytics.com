"use client";

import { useEffect, useRef, useState } from "react";

// A richer "command center" hologram scene — a dot-map of the world with
// floating glass panels (bar chart, gauge ring, trend line, live readout)
// layered over it, in the spirit of the stock "AI dashboard" reference
// image but rebuilt from scratch in solid brand colors (no gradients, no
// stock photography — everything here is real markup, not a raster image).

// Simplified world dot-map — hand-placed clusters standing in for
// continents (not geographically precise, just legible at a glance).
const WORLD_DOTS = [
  // North America
  [40, 55], [50, 50], [60, 58], [45, 68], [55, 72], [65, 65], [35, 45],
  // South America
  [65, 95], [70, 105], [68, 115], [62, 125], [72, 90],
  // Europe
  [155, 45], [163, 40], [170, 48], [160, 55],
  // Africa
  [155, 75], [160, 88], [165, 100], [150, 95], [158, 110],
  // Asia
  [195, 50], [210, 45], [225, 55], [205, 62], [220, 68], [235, 60], [190, 65],
  // Australia
  [230, 115], [240, 120], [222, 118],
];

const BARS = [30, 55, 40, 70, 60, 85];
const LINE_PATH = "M0 30 L10 22 L20 26 L30 14 L40 18 L50 6 L60 10";

interface Props {
  variant?: "large" | "compact";
}

export function IntelligenceScene({ variant = "large" }: Props) {
  const [active, setActive] = useState(false);
  const mountedRef = useRef(false);

  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;
    setActive(true);
  }, []);

  const height = variant === "large" ? "h-72 sm:h-80" : "h-52";

  return (
    <div className="rounded-2xl border border-border bg-black p-5">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-white/50">
          Global signal map
        </span>
        <span className="flex items-center gap-1.5 rounded-full border border-white/15 px-2.5 py-1">
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: "var(--pink)", animation: active ? "qa-fade-in 1s ease-in-out infinite alternate" : undefined }}
          />
          <span className="font-data text-[10px] uppercase tracking-wide text-white/50">Live</span>
        </span>
      </div>

      <div className={`relative mt-4 ${height} w-full overflow-hidden rounded-xl`}>
        <svg viewBox="0 0 260 160" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
          {/* World dot-map, faint */}
          <g fill="white" opacity="0.18">
            {WORLD_DOTS.map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="1.6" />
            ))}
          </g>
          {/* A few "active" signal dots on the map, in brand colors */}
          <g>
            {[
              { x: 55, y: 60, c: "var(--blue)" },
              { x: 210, y: 55, c: "var(--pink)" },
              { x: 160, y: 90, c: "var(--purple)" },
              { x: 65, y: 105, c: "var(--blue)" },
            ].map((d, i) => (
              <circle
                key={i}
                cx={d.x}
                cy={d.y}
                r="2.4"
                fill={d.c}
                style={{ animation: active ? `qa-fade-in 0.6s ${(i * 0.2).toFixed(1)}s ease both` : undefined }}
              />
            ))}
          </g>
        </svg>

        {/* Floating glass panels, absolutely positioned over the map */}
        <div
          className="absolute left-[4%] top-[10%] w-[38%] rounded-lg border border-white/15 bg-white/[0.04] p-2.5 backdrop-blur-sm"
          style={{ opacity: active ? 1 : 0, transition: "opacity 0.5s 0.1s ease" }}
        >
          <p className="font-data text-[8px] uppercase tracking-wide text-white/40">Segment mix</p>
          <div className="mt-1.5 flex h-8 items-end gap-1">
            {BARS.map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-sm"
                style={{ height: `${h}%`, background: i % 2 === 0 ? "var(--blue)" : "var(--pink)" }}
              />
            ))}
          </div>
        </div>

        <div
          className="absolute right-[5%] top-[8%] flex w-[30%] items-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] p-2.5 backdrop-blur-sm"
          style={{ opacity: active ? 1 : 0, transition: "opacity 0.5s 0.25s ease" }}
        >
          <svg viewBox="0 0 36 36" className="h-8 w-8 shrink-0">
            <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="4" />
            <circle
              cx="18" cy="18" r="14" fill="none" stroke="var(--purple)" strokeWidth="4"
              strokeDasharray="88" strokeDashoffset={active ? 88 * (1 - 0.72) : 88}
              strokeLinecap="round" transform="rotate(-90 18 18)"
              style={{ transition: "stroke-dashoffset 1s 0.4s ease" }}
            />
          </svg>
          <div>
            <p className="font-data text-[13px] font-semibold text-white">72%</p>
            <p className="font-data text-[7px] uppercase tracking-wide text-white/40">Confidence</p>
          </div>
        </div>

        <div
          className="absolute bottom-[8%] left-[8%] w-[34%] rounded-lg border border-white/15 bg-white/[0.04] p-2.5 backdrop-blur-sm"
          style={{ opacity: active ? 1 : 0, transition: "opacity 0.5s 0.4s ease" }}
        >
          <p className="font-data text-[8px] uppercase tracking-wide text-white/40">Forecast trend</p>
          <svg viewBox="0 0 60 32" className="mt-1 h-6 w-full">
            <path
              d={LINE_PATH}
              fill="none"
              stroke="var(--blue)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength={1}
              style={{
                strokeDasharray: 1,
                strokeDashoffset: active ? 0 : 1,
                transition: "stroke-dashoffset 1s 0.5s ease",
              }}
            />
          </svg>
        </div>

        <div
          className="absolute bottom-[10%] right-[6%] rounded-lg border border-white/15 bg-white/[0.04] px-3 py-2 backdrop-blur-sm"
          style={{ opacity: active ? 1 : 0, transition: "opacity 0.5s 0.55s ease" }}
        >
          <p className="font-data text-[15px] font-semibold" style={{ color: "var(--pink)" }}>+18.6%</p>
          <p className="font-data text-[7px] uppercase tracking-wide text-white/40">CAGR</p>
        </div>
      </div>

      <p className="mt-3 text-center font-data text-[11px] uppercase tracking-widest text-white/40">
        Every market, one command center.
      </p>
    </div>
  );
}
