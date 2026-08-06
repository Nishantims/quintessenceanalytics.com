// Shared visual building blocks for the bespoke Yum! Brands proposal pages
// (app/yum/page.tsx and app/yum/strategic-analysis/page.tsx) - kept in one
// place so both pages stay visually consistent rather than drifting apart.
export const ACCENT_VAR: Record<string, string> = {
  pink: "var(--pink)",
  blue: "var(--blue)",
  green: "var(--green)",
};
export const ROTATE = ["pink", "blue", "green"] as const;
export const accentAt = (i: number) => ROTATE[i % ROTATE.length];

export function SectionEyebrow({ children, accent = "pink" }: { children: React.ReactNode; accent?: string }) {
  return (
    <span className="text-[15px] font-semibold uppercase tracking-wide" style={{ color: ACCENT_VAR[accent] }}>
      {children}
    </span>
  );
}

/** Alternating full-bleed background band - same convention as the
 * homepage (border-y + bg-surface every other section) so adjacent
 * sections read as visually distinct rather than one undifferentiated
 * scroll of cards. */
export function Band({ children, wide = false }: { children: React.ReactNode; wide?: boolean }) {
  return (
    <section className="border-y border-border bg-surface">
      <div className={`mx-auto px-6 py-20 ${wide ? "max-w-6xl" : "max-w-5xl"}`}>{children}</div>
    </section>
  );
}
