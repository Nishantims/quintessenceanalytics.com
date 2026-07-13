"use client";

import { useEffect, useRef, useState } from "react";

// A dense "command center" hologram scene — closely modelled on the
// reference AI-dashboard photo (a world map plus a scattered wall of
// glass panels: bar charts, gauge rings, trend lines, live readouts, a
// city skyline underneath) but rebuilt entirely as real markup in solid
// brand colors rather than a licensed stock photo.

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

const BARS_A = [30, 55, 40, 70, 60, 85];
const BARS_B = [50, 35, 65, 45, 80];
const LINE_PATH = "M0 30 L10 22 L20 26 L30 14 L40 18 L50 6 L60 10";
const SKYLINE = [10, 22, 14, 30, 18, 26, 12, 34, 20, 16, 28, 15, 24];

const GAUGES = [
  { pct: 47, color: "var(--blue)" },
  { pct: 80, color: "var(--pink)" },
  { pct: 71, color: "var(--green)" },
];

interface Props {
  variant?: "large" | "compact";
}

function Panel({
  className,
  delay,
  active,
  children,
}: {
  className: string;
  delay: number;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`absolute rounded-lg border border-white/15 bg-white/[0.04] backdrop-blur-sm ${className}`}
      style={{ opacity: active ? 1 : 0, transition: `opacity 0.5s ${delay}s ease` }}
    >
      {children}
    </div>
  );
}

export function IntelligenceScene({ variant = "large" }: Props) {
  const [active, setActive] = useState(false);
  const mountedRef = useRef(false);

  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;
    setActive(true);
  }, []);

  const height = variant === "large" ? "h-[26rem] sm:h-[30rem]" : "h-72";
  const isLarge = variant === "large";

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

      <div className={`relative mt-4 ${height} w-full overflow-hidden rounded-xl border border-white/10`}>
        {/* Faint skyline, bottom edge */}
        <svg viewBox="0 0 260 40" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-10 w-full opacity-[0.15]">
          {SKYLINE.map((h, i) => (
            <rect key={i} x={i * (260 / SKYLINE.length)} y={40 - h} width={260 / SKYLINE.length - 1} height={h} fill="white" />
          ))}
        </svg>

        {/* World dot-map */}
        <svg viewBox="0 0 260 160" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
          <g fill="white" opacity="0.16">
            {WORLD_DOTS.map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="1.6" />
            ))}
          </g>
          <g>
            {[
              { x: 55, y: 60, c: "var(--blue)" },
              { x: 210, y: 55, c: "var(--pink)" },
              { x: 160, y: 90, c: "var(--green)" },
              { x: 65, y: 105, c: "var(--blue)" },
              { x: 220, y: 100, c: "var(--pink)" },
            ].map((d, i) => (
              <circle
                key={i}
                cx={d.x}
                cy={d.y}
                r="2.2"
                fill={d.c}
                style={{ animation: active ? `qa-fade-in 0.6s ${(i * 0.15).toFixed(2)}s ease both` : undefined }}
              />
            ))}
          </g>
        </svg>

        {/* Scattered floating readout numbers, like the reference's loose data labels */}
        {isLarge && (
          <>
            <span className="absolute left-[6%] top-[6%] font-data text-[10px] text-white/25">09</span>
            <span className="absolute right-[34%] top-[4%] font-data text-[10px] text-white/25">04</span>
            <span className="absolute left-[46%] bottom-[6%] font-data text-[10px] text-white/25">247</span>
          </>
        )}

        {/* Bar chart panel — top-left */}
        <Panel className="left-[3%] top-[8%] w-[36%] p-2.5" delay={0.1} active={active}>
          <p className="font-data text-[8px] uppercase tracking-wide text-white/40">Segment mix</p>
          <div className="mt-1.5 flex h-9 items-end gap-1">
            {BARS_A.map((h, i) => (
              <div key={i} className="flex-1 rounded-t-sm" style={{ height: `${h}%`, background: i % 2 === 0 ? "var(--blue)" : "var(--pink)" }} />
            ))}
          </div>
        </Panel>

        {/* Gauge ring row — top-right, mirrors the reference's stacked % rings */}
        <div
          className="absolute right-[3%] top-[6%] flex w-[42%] gap-2 rounded-lg border border-white/15 bg-white/[0.04] p-2.5 backdrop-blur-sm"
          style={{ opacity: active ? 1 : 0, transition: "opacity 0.5s 0.2s ease" }}
        >
          {GAUGES.map((g, i) => (
            <div key={i} className="flex flex-1 flex-col items-center">
              <svg viewBox="0 0 36 36" className="h-9 w-9">
                <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="4" />
                <circle
                  cx="18" cy="18" r="14" fill="none" stroke={g.color} strokeWidth="4"
                  strokeDasharray="88" strokeDashoffset={active ? 88 * (1 - g.pct / 100) : 88}
                  strokeLinecap="round" transform="rotate(-90 18 18)"
                  style={{ transition: `stroke-dashoffset 1s ${0.4 + i * 0.15}s ease` }}
                />
              </svg>
              <p className="mt-0.5 font-data text-[9px] font-semibold text-white">{g.pct}%</p>
            </div>
          ))}
        </div>

        {/* Secondary bar panel — mid-left, only on the large variant */}
        {isLarge && (
          <Panel className="left-[2%] top-[46%] w-[30%] p-2.5" delay={0.3} active={active}>
            <p className="font-data text-[8px] uppercase tracking-wide text-white/40">Region split</p>
            <div className="mt-1.5 flex h-8 items-end gap-1">
              {BARS_B.map((h, i) => (
                <div key={i} className="flex-1 rounded-t-sm" style={{ height: `${h}%`, background: "var(--green)" }} />
              ))}
            </div>
          </Panel>
        )}

        {/* Trend line panel — bottom-left */}
        <Panel className="bottom-[10%] left-[8%] w-[34%] p-2.5" delay={0.4} active={active}>
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
              style={{ strokeDasharray: 1, strokeDashoffset: active ? 0 : 1, transition: "stroke-dashoffset 1s 0.55s ease" }}
            />
          </svg>
        </Panel>

        {/* CAGR readout — bottom-right */}
        <Panel className="bottom-[10%] right-[5%] px-3 py-2" delay={0.55} active={active}>
          <p className="font-data text-[15px] font-semibold" style={{ color: "var(--pink)" }}>+18.6%</p>
          <p className="font-data text-[7px] uppercase tracking-wide text-white/40">CAGR</p>
        </Panel>
      </div>

      <p className="mt-3 text-center font-data text-[11px] uppercase tracking-widest text-white/40">
        Every market, one command center.
      </p>
    </div>
  );
}
