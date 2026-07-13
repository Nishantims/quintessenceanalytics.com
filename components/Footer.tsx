import Link from "next/link";

const SERVICES = [
  "Custom Market Research",
  "Predictive Analytics & Forecasting",
  "Business Intelligence Dashboards",
  "Competitive Benchmarking",
  "Data Strategy & Advisory",
  "AI-Driven Research Automation",
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-ink text-paper">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-paper/10">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
                  <path d="M4 17 L10 9 L14 13 L20 5" stroke="var(--coral)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="20" cy="5" r="1.8" fill="var(--gold)" />
                </svg>
              </span>
              <span className="font-display text-[18px] font-semibold text-paper">Quintessence Analytics</span>
            </div>
            <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-paper/60">
              A data and market-intelligence consultancy. We distil raw signal — filings, patents, pricing,
              sentiment — into decisions boards can act on.
            </p>
            <p className="mt-4 text-[13px] text-paper/45">
              Parent company of{" "}
              <Link href="https://market-reports.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-teal hover:underline">
                Market Reports ↗
              </Link>
            </p>
          </div>

          <div>
            <p className="text-[12px] font-semibold uppercase tracking-wide text-paper/45">Services</p>
            <ul className="mt-4 space-y-2.5">
              {SERVICES.map((s) => (
                <li key={s}>
                  <Link href="/services" className="text-[14px] text-paper/70 hover:text-coral">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[12px] font-semibold uppercase tracking-wide text-paper/45">Company</p>
            <ul className="mt-4 space-y-2.5">
              <li><Link href="/about" className="text-[14px] text-paper/70 hover:text-coral">About</Link></li>
              <li><Link href="/services" className="text-[14px] text-paper/70 hover:text-coral">Services</Link></li>
              <li><Link href="/contact" className="text-[14px] text-paper/70 hover:text-coral">Contact</Link></li>
              <li><Link href="https://market-reports.com" target="_blank" rel="noopener noreferrer" className="text-[14px] text-paper/70 hover:text-coral">Market Reports ↗</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-[12px] font-semibold uppercase tracking-wide text-paper/45">Get in touch</p>
            <ul className="mt-4 space-y-2.5 text-[14px] text-paper/70">
              <li>
                <a href="mailto:contact@market-reports.com" className="hover:text-coral">
                  contact@market-reports.com
                </a>
              </li>
              <li className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 rounded-full border border-paper/20 px-4 py-2 text-[13px] font-semibold text-paper transition-colors hover:border-coral hover:text-coral"
                >
                  Start a conversation →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-paper/10 pt-8 text-[12px] text-paper/40 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Quintessence Analytics. All rights reserved.</p>
          <p className="font-data">Distilled from signal, not noise.</p>
        </div>
      </div>
    </footer>
  );
}
