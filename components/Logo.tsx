// Pure text logotype, no icon/badge — "QA.com" as the wordmark itself,
// domain-style (the way linear.app / notion.so use their own domain as
// the brand mark), with the full company name as a small subtitle beneath.
export function Logo({ size = 21 }: { size?: number }) {
  return (
    <span className="flex flex-col leading-none">
      <span
        className="font-body font-extrabold tracking-tight text-text-primary"
        style={{ fontSize: size }}
      >
        QA<span style={{ color: "var(--blue)" }}>.com</span>
      </span>
      <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-text-muted">
        Quintessence Analytics
      </span>
    </span>
  );
}
