// Pure text logotype, no icon/badge — "QA.com" as the wordmark itself,
// domain-style (the way linear.app / notion.so use their own domain as
// the brand mark), rather than an icon + company name lockup.
export function Logo({ size = 21 }: { size?: number }) {
  return (
    <span
      className="font-body font-extrabold tracking-tight text-text-primary"
      style={{ fontSize: size }}
    >
      QA<span style={{ color: "var(--pink)" }}>.com</span>
    </span>
  );
}
