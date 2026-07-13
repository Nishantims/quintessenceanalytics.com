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
    <footer className="border-t border-border bg-dark-surface text-dark-text">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <div className="flex flex-col leading-none">
              <span className="font-body text-[19px] font-extrabold tracking-tight text-dark-text">
                QA<span style={{ color: "var(--blue)" }}>.com</span>
              </span>
              <span className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-dark-text/50">
                Quintessence Analytics
              </span>
            </div>
            <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-dark-text/60">
              A data and market-intelligence consultancy. We distil raw signal — filings, patents, pricing,
              sentiment — into decisions boards can act on.
            </p>
            <p className="mt-4 text-[13px] text-dark-text/45">
              Parent company of{" "}
              <Link href="https://market-reports.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-blue hover:underline">
                Market Reports ↗
              </Link>
            </p>
          </div>

          <div>
            <p className="text-[12px] font-semibold uppercase tracking-wide text-dark-text/45">Services</p>
            <ul className="mt-4 space-y-2.5">
              {SERVICES.map((s) => (
                <li key={s}>
                  <Link href="/services" className="text-[14px] text-dark-text/70 hover:text-pink">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[12px] font-semibold uppercase tracking-wide text-dark-text/45">Company</p>
            <ul className="mt-4 space-y-2.5">
              <li><Link href="/about" className="text-[14px] text-dark-text/70 hover:text-pink">About</Link></li>
              <li><Link href="/services" className="text-[14px] text-dark-text/70 hover:text-pink">Services</Link></li>
              <li><Link href="/contact" className="text-[14px] text-dark-text/70 hover:text-pink">Contact</Link></li>
              <li><Link href="https://market-reports.com" target="_blank" rel="noopener noreferrer" className="text-[14px] text-dark-text/70 hover:text-pink">Market Reports ↗</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-[12px] font-semibold uppercase tracking-wide text-dark-text/45">Get in touch</p>
            <ul className="mt-4 space-y-2.5 text-[14px] text-dark-text/70">
              <li>
                <a href="mailto:contact@market-reports.com" className="hover:text-pink">
                  contact@market-reports.com
                </a>
              </li>
              <li className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 rounded-full border border-dark-text/20 px-4 py-2 text-[13px] font-semibold text-dark-text transition-colors hover:border-pink hover:text-pink"
                >
                  Start a conversation →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-dark-text/10 pt-8 text-[12px] text-dark-text/40 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Quintessence Analytics. All rights reserved.</p>
          <p className="font-data">Distilled from signal, not noise.</p>
        </div>
      </div>
    </footer>
  );
}
