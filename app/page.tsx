import Link from "next/link";
import { SignalGraphic } from "@/components/SignalGraphic";
import { ServiceCard } from "@/components/ServiceCard";
import { SERVICES } from "@/lib/services-data";

const STATS = [
  { value: "8", unit: "", label: "Independent sizing methods triangulated per market" },
  { value: "40", unit: "+", label: "Weighted growth factors scored per forecast" },
  { value: "3", unit: "", label: "Scenarios modelled — bull, base, and bear — every time" },
  { value: "100", unit: "%", label: "Of engine output reviewed by an analyst before delivery" },
];

const PROCESS = [
  {
    step: "01",
    title: "Scope the question",
    body: "We start with the decision you're actually trying to make, not a generic report template — the boundary of the market, the audience, and what a wrong answer would cost you.",
  },
  {
    step: "02",
    title: "Ingest the evidence",
    body: "Government macro data, patent registries, primary filings, pricing, and news are pulled in parallel and cross-checked against each other before anything gets modelled.",
  },
  {
    step: "03",
    title: "Model, then triangulate",
    body: "Demand-side, supply-side, and bottom-up estimates run independently and get reconciled — a single model's blind spot doesn't become your blind spot.",
  },
  {
    step: "04",
    title: "Deliver with the reasoning attached",
    body: "Every figure ships with the assumption behind it. You get the number and the argument, so your team can defend it in the room we're not in.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border px-3.5 py-1.5 text-[12px] font-semibold uppercase tracking-wide text-text-secondary">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--coral)" }} />
              Market intelligence, distilled
            </span>
            <h1 className="mt-6 font-display text-[42px] font-semibold leading-[1.08] tracking-tight text-text-primary sm:text-[54px]">
              The essence of your market —{" "}
              <span style={{ color: "var(--coral)" }}>distilled to a decision.</span>
            </h1>
            <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-text-secondary">
              Quintessence Analytics turns filings, patents, pricing signals, and a decade of macro data
              into forecasts your board can act on. We&apos;re the research engine behind{" "}
              <Link href="https://market-reports.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-teal-ink underline decoration-teal/40 underline-offset-4 hover:decoration-teal">
                Market Reports
              </Link>
              , available to build a market just for you.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="rounded-full px-6 py-3.5 text-[14px] font-semibold text-white transition-transform hover:scale-[1.03]"
                style={{ background: "var(--coral)" }}
              >
                Start a project
              </Link>
              <Link
                href="/services"
                className="rounded-full border border-border px-6 py-3.5 text-[14px] font-semibold text-text-primary transition-colors hover:border-teal hover:text-teal-ink"
              >
                See our services
              </Link>
            </div>
          </div>

          <div className="relative rounded-3xl border border-border bg-surface p-6 sm:p-10">
            <SignalGraphic />
            <p className="mt-2 text-center font-data text-[11px] uppercase tracking-widest text-text-muted">
              Noise in. One signal out.
            </p>
          </div>
        </div>
      </section>

      {/* ── Stat strip ── */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-14 sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="font-data text-[34px] font-semibold text-text-primary">
                {s.value}
                <span style={{ color: "var(--coral)" }}>{s.unit}</span>
              </p>
              <p className="mt-2 text-[13px] leading-snug text-text-secondary">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Services overview ── */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-[13px] font-semibold uppercase tracking-wide text-teal-ink">What we do</span>
            <h2 className="mt-3 max-w-lg font-display text-[32px] font-semibold leading-tight text-text-primary">
              Six ways we turn evidence into a decision
            </h2>
          </div>
          <Link
            href="/services"
            className="text-[14px] font-semibold text-text-primary underline decoration-border underline-offset-4 hover:decoration-coral"
          >
            View all services →
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.slug} service={service} index={i} />
          ))}
        </div>
      </section>

      {/* ── Process ── */}
      <section className="bg-ink text-paper">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <span className="text-[13px] font-semibold uppercase tracking-wide" style={{ color: "var(--gold)" }}>
            How we work
          </span>
          <h2 className="mt-3 max-w-lg font-display text-[32px] font-semibold leading-tight text-paper">
            A repeatable process, not a bespoke guess every time
          </h2>
          <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p) => (
              <div key={p.step} className="relative border-t-2 pt-6" style={{ borderColor: "var(--coral)" }}>
                <span className="font-data text-[13px] text-paper/40">{p.step}</span>
                <h3 className="mt-3 font-display text-[19px] font-semibold text-paper">{p.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-paper/65">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Market Reports spotlight ── */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid items-center gap-12 rounded-3xl border border-border bg-surface p-10 lg:grid-cols-[1fr_auto] lg:p-14">
          <div>
            <span className="text-[13px] font-semibold uppercase tracking-wide" style={{ color: "var(--coral)" }}>
              Our flagship product
            </span>
            <h2 className="mt-3 font-display text-[28px] font-semibold leading-snug text-text-primary">
              Market Reports is Quintessence Analytics&apos; syndicated research platform
            </h2>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-text-secondary">
              Every methodology on this page — the eight-method sizing model, driver-level CAGR
              waterfalls, interactive scenario dashboards — ships today inside Market Reports, our
              subscription platform of ready-made industry reports. If your market already has one, buy
              it off the shelf. If it doesn&apos;t, that&apos;s exactly what a custom engagement here is for.
            </p>
          </div>
          <Link
            href="https://market-reports.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-full px-6 py-3.5 text-[14px] font-semibold text-white transition-transform hover:scale-[1.03]"
            style={{ background: "var(--teal)" }}
          >
            Visit Market Reports ↗
          </Link>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="mx-auto max-w-6xl px-6 pb-28">
        <div className="rounded-3xl px-8 py-16 text-center sm:px-16" style={{ background: "var(--ink)" }}>
          <h2 className="mx-auto max-w-xl font-display text-[30px] font-semibold leading-tight text-paper">
            Bring us the question. We&apos;ll bring the evidence.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-paper/65">
            Tell us the market and the decision riding on it — we&apos;ll scope an engagement within a
            few business days.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full px-7 py-4 text-[14px] font-semibold text-white transition-transform hover:scale-[1.03]"
            style={{ background: "var(--coral)" }}
          >
            Start a project →
          </Link>
        </div>
      </section>
    </>
  );
}
