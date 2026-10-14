import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES } from "@/lib/services-data";
import { DashboardPhoto } from "@/components/DashboardPhoto";

export const metadata: Metadata = {
  title: "Services — Quintessence Analytics",
  description:
    "Six core enterprise AI services: AI workflow automation, enterprise data analytics, AI agent development & automation, AI agent quality & evaluation, AI governance & risk, and AI data & knowledge systems.",
};

const ACCENT_VAR: Record<string, string> = {
  pink: "var(--pink)",
  blue: "var(--blue)",
  green: "var(--green)",
  purple: "var(--purple)",
  orange: "var(--orange)",
};

export default function ServicesPage() {
  return (
    <>
      <section className="mx-auto max-w-4xl px-6 pt-20 pb-14 text-center">
        <span className="text-[15px] font-semibold uppercase tracking-wide" style={{ color: "var(--pink)" }}>Services</span>
        <h1 className="mx-auto mt-4 max-w-2xl font-display text-[40px] font-bold leading-[1.1] text-text-primary">
          Build AI. Automate work.{" "}
          <span style={{ color: "var(--blue)" }}>Trust the outcome.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-[18px] leading-relaxed text-text-secondary">
          Six disciplines that move an enterprise from AI experimentation to production — agents that do
          real work, evaluated before they ship, governed once they&apos;re live. Pick the one you need,
          or bring us a workflow that spans all six. Top AI services at your budget: we scope every
          engagement to a fixed price that fits.
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-16">
        <DashboardPhoto src="/images/services-dashboard.png" alt="System performance analytics dashboard on a laptop" />
      </section>

      <section className="mx-auto max-w-5xl divide-y divide-border px-6 pb-24">
        {SERVICES.map((service, i) => (
          <div key={service.slug} id={service.slug} className="scroll-mt-24 py-14 first:pt-0">
            <div className="grid gap-8 lg:grid-cols-[auto_1fr] lg:gap-12">
              <div className="flex items-start gap-4 lg:flex-col lg:items-start lg:gap-2">
                <span className="font-data text-[15px] text-text-muted">{String(i + 1).padStart(2, "0")}</span>
                <span
                  className="h-2 w-2 rounded-full lg:mt-1"
                  style={{ background: ACCENT_VAR[service.accent] }}
                  aria-hidden
                />
              </div>
              <div>
                <h2 className="font-display text-[26px] font-bold leading-snug text-text-primary">
                  {service.title.split(" ").slice(0, -1).join(" ")}{" "}
                  <span style={{ color: ACCENT_VAR[service.accent] }}>
                    {service.title.split(" ").slice(-1)}
                  </span>
                </h2>
                <p className="mt-4 max-w-2xl text-[19px] leading-relaxed text-text-secondary">
                  {service.description}
                </p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {service.bullets.map((b) => (
                    <li key={b} className="flex gap-2.5 text-[14px] leading-relaxed text-text-primary">
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ background: ACCENT_VAR[service.accent] }}
                        aria-hidden
                      />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-20">
        <div className="rounded-3xl border border-border bg-surface px-8 py-10 sm:px-12">
          <span className="text-[13px] font-semibold uppercase tracking-wide" style={{ color: "var(--blue)" }}>Strategic intelligence</span>
          <h2 className="mt-3 font-display text-[26px] font-bold leading-snug text-text-primary">
            Need the market evidence <span style={{ color: "var(--blue)" }}>behind the decision?</span>
          </h2>
          <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-text-secondary">
            Our sister company Market-Reports.com runs the research side: executive strategic intelligence
            reports, competitive benchmarking, market entry, product innovation, investment and acquisition
            intelligence, and continuous monthly intelligence - for any industry, at your budget.
          </p>
          <a
            href="https://www.market-reports.com/intelligence-services"
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-[14px] font-semibold text-white transition-transform hover:scale-[1.03]"
            style={{ background: "var(--blue)" }}
          >
            See the intelligence services ↗
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-28">
        <div className="rounded-3xl px-8 py-16 text-center sm:px-16" style={{ background: "var(--dark-surface)" }}>
          <h2 className="mx-auto max-w-lg font-display text-[28px] font-bold leading-tight text-dark-text">
            Not sure which discipline fits? Tell us the{" "}
            <span style={{ color: "var(--pink)" }}>decision</span> — we&apos;ll scope the mix.
          </h2>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full px-7 py-4 text-[14px] font-semibold text-white transition-transform hover:scale-[1.03]"
            style={{ background: "var(--pink)" }}
          >
            Talk to an analyst →
          </Link>
        </div>
      </section>
    </>
  );
}
