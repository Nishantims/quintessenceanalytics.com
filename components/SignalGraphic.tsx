// Hero visual: scattered signal converging into one clean ascending line —
// literal illustration of "distillation," the company's whole thesis,
// instead of a generic stock photo or gradient blob.
const NOISE_POINTS = [
  { x: 18, y: 58, r: 3, delay: 0 },
  { x: 34, y: 30, r: 2.4, delay: 0.06 },
  { x: 26, y: 92, r: 2.8, delay: 0.12 },
  { x: 48, y: 70, r: 2.2, delay: 0.18 },
  { x: 40, y: 112, r: 3.2, delay: 0.24 },
  { x: 58, y: 40, r: 2, delay: 0.3 },
  { x: 20, y: 130, r: 2.4, delay: 0.36 },
  { x: 62, y: 96, r: 2.6, delay: 0.42 },
  { x: 46, y: 150, r: 2, delay: 0.48 },
  { x: 66, y: 140, r: 2.8, delay: 0.54 },
];

export function SignalGraphic() {
  return (
    <svg
      viewBox="0 0 420 220"
      className="h-full w-full"
      role="img"
      aria-label="Scattered data points converging into a single upward signal line"
    >
      <defs>
        <linearGradient id="signal-line" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--coral)" />
          <stop offset="55%" stopColor="var(--gold)" />
          <stop offset="100%" stopColor="var(--teal)" />
        </linearGradient>
      </defs>

      {/* Noise: real, scattered data points on the left */}
      <g className="text-text-muted" fill="currentColor" opacity="0.55">
        {NOISE_POINTS.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={p.r}
            style={{
              animation: `qa-fade-in 0.6s ease-out ${p.delay}s both`,
            }}
          />
        ))}
      </g>

      {/* Faint convergence guide lines */}
      <g stroke="var(--border)" strokeWidth="1" opacity="0.7">
        {NOISE_POINTS.map((p, i) => (
          <line key={i} x1={p.x} y1={p.y} x2={110} y2={110} />
        ))}
      </g>

      {/* The distilled signal: one clean ascending line */}
      <path
        d="M110 110 C 160 110, 175 150, 220 128 S 300 40, 400 24"
        fill="none"
        stroke="url(#signal-line)"
        strokeWidth="3.5"
        strokeLinecap="round"
        pathLength={1}
        style={{
          strokeDasharray: 1,
          strokeDashoffset: 1,
          animation: "qa-draw-line 1.4s 0.5s cubic-bezier(0.65,0,0.35,1) forwards",
        }}
      />
      <circle cx="400" cy="24" r="5" fill="var(--teal)" style={{ animation: "qa-fade-in 0.4s 1.8s ease-out both" }} />
    </svg>
  );
}
