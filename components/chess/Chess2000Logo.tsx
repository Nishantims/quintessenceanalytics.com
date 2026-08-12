// Same mark as app/(chess)/Chess-2000/icon.tsx, as an inline SVG for use in
// the page itself (header, hero) rather than the browser tab. Three
// ascending bars in the site's pink/blue/green trio — a level-up motif,
// not a literal chess-piece illustration.
export function Chess2000Logo({ size = 28, withWordmark = true }: { size?: number; withWordmark?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2">
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect width="32" height="32" rx="7" fill="#0A0A0F" />
        <rect x="9" y="18" width="4" height="8" rx="1.5" fill="var(--status-blue, #3b82f6)" />
        <rect x="15" y="12" width="4" height="14" rx="1.5" fill="var(--status-green, #22c55e)" />
        <rect x="21" y="6" width="4" height="20" rx="1.5" fill="var(--status-alt2, #ec4899)" />
      </svg>
      {withWordmark && (
        <span className="font-heading font-extrabold" style={{ fontSize: size * 0.6 }}>
          Chess<span style={{ color: 'var(--status-alt2)' }}>-2000</span>
        </span>
      )}
    </span>
  )
}
