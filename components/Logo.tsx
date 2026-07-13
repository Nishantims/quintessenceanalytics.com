// Brand mark: three ascending bars (distinct signals converging into one
// reading) on a pink→purple→blue gradient badge, with a single "signal
// point" marker on the tallest bar. Used standalone (favicon, footer) or
// paired with the wordmark (header).
export function LogoMark({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" role="img" aria-label="Quintessence Analytics">
      <defs>
        <linearGradient id="qa-logo-gradient" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#FF6699" />
          <stop offset="55%" stopColor="#9900CC" />
          <stop offset="100%" stopColor="#0066FF" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill="url(#qa-logo-gradient)" />
      <rect x="8" y="17" width="3.4" height="8" rx="1.7" fill="white" />
      <rect x="14.3" y="12" width="3.4" height="13" rx="1.7" fill="white" />
      <rect x="20.6" y="7" width="3.4" height="18" rx="1.7" fill="white" fillOpacity="0.92" />
      <circle cx="22.3" cy="7" r="2.4" fill="white" />
    </svg>
  );
}

export function Logo({ size = 32, wordmark = true }: { size?: number; wordmark?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark size={size} />
      {wordmark && (
        <span className="font-display text-[19px] font-semibold leading-none tracking-tight text-text-primary">
          Quintessence <span className="text-text-muted font-normal">Analytics</span>
        </span>
      )}
    </span>
  );
}
