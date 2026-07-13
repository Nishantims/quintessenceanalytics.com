import type { Metadata } from "next";
import Link from "next/link";
import { SERVICES } from "@/lib/services-data";

export const metadata: Metadata = {
  title: "Services — Quintessence Analytics",
  description:
    "Custom market research, predictive analytics, business intelligence dashboards, competitive benchmarking, regulatory tracking, and AI-augmented research automation.",
};

const ACCENT_VAR: Record<string, string> = {
  pink: "var(--pink)",
  blue: "var(--blue)",
  purple: "var(--purple)",
};

export default function ServicesPage() {
  return (
    <>
      <section className="mx-auto max-w-4xl px-6 pt-20 pb-14 text-center">
        <span className="text-[13px] font-semibold uppercase tracking-wide text-blue-ink">Services</span>
        <h1 className="mx-auto mt-4 max-w-2xl font-display text-[40px] font-semibold leading-[1.1] text-text-primary">
          Six disciplines. One standard of evidence.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-text-secondary">
          Every engagement — bespoke or off-the-shelf — runs through the same triangulated methodology.
          Pick the discipline you need, or bring us a question that spans all six.
        </p>
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
                <h2 className="font-display text-[26px] font-semibold leading-snug text-text-primary">
                  {service.title}
                </h2>
                <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-text-secondary">
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

      <section className="mx-auto max-w-6xl px-6 pb-28">
        <div className="rounded-3xl px-8 py-16 text-center sm:px-16" style={{ background: "var(--dark-surface)" }}>
          <h2 className="mx-auto max-w-lg font-display text-[28px] font-semibold leading-tight text-dark-text">
            Not sure which discipline fits? Tell us the decision — we&apos;ll scope the mix.
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
