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

// Short, domain-style wordmark ("QA." + a small tracked tagline) rather than
// spelling out the full company name at header size — reads punchier at a
// glance, the way linear.app / notion.so style marks do.
export function Logo({ size = 32, wordmark = true }: { size?: number; wordmark?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark size={size} />
      {wordmark && (
        <span className="flex flex-col leading-none">
          <span className="font-body text-[21px] font-extrabold tracking-tight text-text-primary">
            QA<span style={{ color: "var(--pink)" }}>.</span>
          </span>
          <span className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-text-muted">
            Quintessence Analytics
          </span>
        </span>
      )}
    </span>
  );
}
