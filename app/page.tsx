import Link from "next/link";
import { IntelligenceScene } from "@/components/IntelligenceScene";
import { ServiceCard } from "@/components/ServiceCard";
import { AiProductCard } from "@/components/AiProductCard";
import { CapabilityMarquee } from "@/components/CapabilityMarquee";
import { ScrollReveal } from "@/components/ScrollReveal";
import { FaqAccordion } from "@/components/FaqAccordion";
import { SERVICES } from "@/lib/services-data";
import { AI_PRODUCTS } from "@/lib/ai-products-data";
import { INDUSTRIES } from "@/lib/industries-data";
import { OUTCOMES, CASE_STUDIES, TECH_CAPABILITIES, WHY_CHOOSE_US, TESTIMONIALS, FAQS } from "@/lib/homepage-content";

const ACCENT_VAR = { pink: "var(--pink)", blue: "var(--blue)", green: "var(--green)" };

const WHAT_WE_DO = [
  { title: "Analytics", body: "Predictive, customer, operational, and financial analytics built on your real data.", accent: "blue" as const },
  { title: "Forecasting", body: "Driver-level forecasts you can explain in the room, not a black-box number.", accent: "pink" as const },
  { title: "Automation", body: "AI process automation for the repetitive work that eats analyst time.", accent: "green" as const },
  { title: "Dashboards", body: "Interactive executive dashboards, filterable and board-ready.", accent: "blue" as const },
  { title: "AI Consulting", body: "Custom engagements scoped around your actual decision, not a template.", accent: "pink" as const },
];

const PROCESS = [
  {
    step: "01",
    title: "Scope the question",
    body: "We start with the decision you're actually trying to make, not a generic deliverable template — the boundary of the problem, the audience, and what a wrong answer would cost you.",
  },
  {
    step: "02",
    title: "Ingest the evidence",
    body: "Your existing data sources are ingested and reconciled in parallel, cross-checked against each other before anything gets modelled.",
  },
  {
    step: "03",
    title: "Model with AI, verify with analysts",
    body: "Our AI engine runs the ingestion and first-pass modelling — every output is then reviewed by a senior analyst before it ever reaches a client.",
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
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-16 sm:pt-24 sm:pb-20">
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border px-3.5 py-1.5 text-[12px] font-semibold uppercase tracking-wide text-text-secondary">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--pink)" }} />
              AI analytics &amp; decision intelligence
            </span>
            <h1 className="mt-6 font-display text-[42px] font-bold leading-[1.08] tracking-tight text-text-primary sm:text-[54px]">
              Turn enterprise data into{" "}
              <span style={{ color: "var(--blue)" }}>decisions</span>, not just{" "}
              <span style={{ color: "var(--pink)" }}>dashboards.</span>
            </h1>
            <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-text-secondary">
              Quintessence Analytics is an AI analytics and decision intelligence company — predictive
              analytics, automation, and executive dashboards built on your real data, every AI output
              reviewed by a senior analyst before it reaches you. We&apos;re also the research engine
              behind{" "}
              <Link href="https://market-reports.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-ink underline decoration-blue/40 underline-offset-4 hover:decoration-blue">
                Market Reports
              </Link>
              .
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="rounded-full px-6 py-3.5 text-[14px] font-semibold text-white transition-transform hover:scale-[1.03]"
                style={{ background: "var(--blue)" }}
              >
                Book a Consultation
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-border px-6 py-3.5 text-[14px] font-semibold text-text-primary transition-colors hover:border-green hover:text-green-ink"
              >
                Request a Demo
              </Link>
            </div>
          </div>

          <IntelligenceScene variant="large" />
        </div>
      </section>

      <CapabilityMarquee />

      {/* ── Who We Are ── */}
      <section className="mx-auto max-w-4xl px-6 py-24 text-center">
        <ScrollReveal>
          <span className="text-[13px] font-semibold uppercase tracking-wide" style={{ color: "var(--green)" }}>
            Who we are
          </span>
          <h2 className="mx-auto mt-3 max-w-2xl font-display text-[32px] font-bold leading-tight text-text-primary">
            An AI analytics company built to solve{" "}
            <span style={{ color: "var(--blue)" }}>enterprise decision problems</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-text-secondary">
            We&apos;re not a technology vendor selling a platform — we&apos;re an analytics partner who
            happens to build the AI ourselves. Every engagement starts with the business decision, works
            backward to the data and models that answer it, and ends with a senior analyst reviewing the
            output before it ever reaches you.
          </p>
        </ScrollReveal>
      </section>

      {/* ── What We Do ── */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <ScrollReveal>
            <span className="text-[13px] font-semibold uppercase tracking-wide" style={{ color: "var(--blue)" }}>
              What we do
            </span>
            <h2 className="mt-3 max-w-lg font-display text-[32px] font-bold leading-tight text-text-primary">
              Five ways we turn data into a{" "}
              <span style={{ color: "var(--pink)" }}>working decision</span>
            </h2>
          </ScrollReveal>
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {WHAT_WE_DO.map((w, i) => (
              <ScrollReveal key={w.title} delayMs={i * 60}>
                <div className="h-full rounded-2xl border border-border bg-surface-raised p-6">
                  <span className="inline-block h-2 w-2 rounded-full" style={{ background: ACCENT_VAR[w.accent] }} aria-hidden />
                  <h3 className="mt-3 font-display text-[17px] font-bold text-text-primary">{w.title}</h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-text-secondary">{w.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Industries We Serve ── */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <ScrollReveal>
          <span className="text-[13px] font-semibold uppercase tracking-wide" style={{ color: "var(--pink)" }}>
            Industries we serve
          </span>
          <h2 className="mt-3 max-w-lg font-display text-[32px] font-bold leading-tight text-text-primary">
            Ten industries, one{" "}
            <span style={{ color: "var(--green)" }}>triangulated methodology</span>
          </h2>
        </ScrollReveal>
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {INDUSTRIES.map((ind, i) => (
            <ScrollReveal key={ind.name} delayMs={i * 40}>
              <div className="h-full rounded-xl border border-border bg-surface p-5">
                <h3 className="font-display text-[15px] font-bold text-text-primary">{ind.name}</h3>
                <p className="mt-2 text-[12.5px] leading-relaxed text-text-secondary">{ind.value}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── Ten Core AI Analytics Services ── */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <ScrollReveal>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="text-[13px] font-semibold uppercase tracking-wide" style={{ color: "var(--green)" }}>
                  Our services
                </span>
                <h2 className="mt-3 max-w-lg font-display text-[32px] font-bold leading-tight text-text-primary">
                  Ten core AI{" "}
                  <span style={{ color: "var(--blue)" }}>analytics services</span>
                </h2>
              </div>
            </div>
          </ScrollReveal>
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service, i) => (
              <ScrollReveal key={service.slug} delayMs={i * 50}>
                <ServiceCard service={service} index={i} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI Products & Pricing ── */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <ScrollReveal>
          <div className="text-center">
            <span className="text-[13px] font-semibold uppercase tracking-wide" style={{ color: "var(--pink)" }}>
              AI products
            </span>
            <h2 className="mx-auto mt-3 max-w-xl font-display text-[32px] font-bold leading-tight text-text-primary">
              AI-driven decision systems, priced for how{" "}
              <span style={{ color: "var(--blue)" }}>serious</span> you are
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-[15px] leading-relaxed text-text-secondary">
              From an affordable self-serve dashboard to a fully bespoke enterprise partnership — the same
              AI engine, analyst-reviewed at every tier.
            </p>
          </div>
        </ScrollReveal>
        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3 items-stretch">
          {AI_PRODUCTS.map((product, i) => (
            <ScrollReveal key={product.name} delayMs={i * 80} className="h-full">
              <AiProductCard product={product} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── Business Outcomes & Client Benefits ── */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <ScrollReveal>
            <span className="text-[13px] font-semibold uppercase tracking-wide" style={{ color: "var(--blue)" }}>
              Business outcomes
            </span>
            <h2 className="mt-3 max-w-lg font-display text-[32px] font-bold leading-tight text-text-primary">
              What a working{" "}
              <span style={{ color: "var(--pink)" }}>engagement</span> actually changes
            </h2>
          </ScrollReveal>
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {OUTCOMES.map((o, i) => (
              <ScrollReveal key={o.title} delayMs={i * 60}>
                <div className="h-full rounded-2xl border border-border bg-surface-raised p-6">
                  <span className="inline-block h-2 w-2 rounded-full" style={{ background: ACCENT_VAR[o.accent] }} aria-hidden />
                  <h3 className="mt-3 font-display text-[16px] font-bold text-text-primary">{o.title}</h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-text-secondary">{o.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Case Studies & Success Stories ── */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <ScrollReveal>
          <span className="text-[13px] font-semibold uppercase tracking-wide" style={{ color: "var(--pink)" }}>
            Case studies
          </span>
          <h2 className="mt-3 max-w-lg font-display text-[32px] font-bold leading-tight text-text-primary">
            Representative{" "}
            <span style={{ color: "var(--green)" }}>engagements</span>
          </h2>
          <p className="mt-3 max-w-2xl text-[13.5px] text-text-muted">
            Illustrative of the kind of problem and approach we take on — not attributed to a specific
            named client. Real case studies available on request as engagements are cleared for publication.
          </p>
        </ScrollReveal>
        <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {CASE_STUDIES.map((cs, i) => (
            <ScrollReveal key={cs.industry} delayMs={i * 80}>
              <div className="h-full rounded-2xl border border-border bg-surface p-7">
                <span
                  className="inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white"
                  style={{ background: ACCENT_VAR[cs.accent] }}
                >
                  {cs.industry}
                </span>
                <p className="mt-4 text-[13px] font-semibold text-text-primary">Challenge</p>
                <p className="mt-1 text-[13.5px] leading-relaxed text-text-secondary">{cs.challenge}</p>
                <p className="mt-4 text-[13px] font-semibold text-text-primary">Approach</p>
                <p className="mt-1 text-[13.5px] leading-relaxed text-text-secondary">{cs.approach}</p>
                <p className="mt-4 text-[13px] font-semibold text-text-primary">Outcome</p>
                <p className="mt-1 text-[13.5px] leading-relaxed text-text-secondary">{cs.outcome}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── Technology & AI Capabilities ── */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <ScrollReveal>
            <span className="text-[13px] font-semibold uppercase tracking-wide" style={{ color: "var(--green)" }}>
              Technology
            </span>
            <h2 className="mt-3 max-w-lg font-display text-[32px] font-bold leading-tight text-text-primary">
              AI capabilities,{" "}
              <span style={{ color: "var(--blue)" }}>always human-reviewed</span>
            </h2>
          </ScrollReveal>
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {TECH_CAPABILITIES.map((t, i) => (
              <ScrollReveal key={t.title} delayMs={i * 60}>
                <div className="h-full rounded-2xl border border-border bg-surface-raised p-6">
                  <span className="inline-block h-2 w-2 rounded-full" style={{ background: ACCENT_VAR[t.accent] }} aria-hidden />
                  <h3 className="mt-3 font-display text-[16px] font-bold text-text-primary">{t.title}</h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-text-secondary">{t.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Delivery Methodology ── */}
      <section className="bg-dark-surface text-dark-text">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <ScrollReveal>
            <span className="text-[13px] font-semibold uppercase tracking-wide" style={{ color: "var(--pink)" }}>
              Our delivery methodology
            </span>
            <h2 className="mt-3 max-w-lg font-display text-[32px] font-bold leading-tight text-dark-text">
              A repeatable process, not a{" "}
              <span style={{ color: "var(--green)" }}>bespoke guess</span> every time
            </h2>
          </ScrollReveal>
          <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p, i) => (
              <ScrollReveal key={p.step} delayMs={i * 80}>
                <div className="relative border-t-2 pt-6" style={{ borderColor: "var(--pink)" }}>
                  <span className="font-data text-[13px] text-dark-text/40">{p.step}</span>
                  <h3 className="mt-3 font-display text-[19px] font-semibold text-dark-text">{p.title}</h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-dark-text/65">{p.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Quintessence Analytics ── */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <ScrollReveal>
          <span className="text-[13px] font-semibold uppercase tracking-wide" style={{ color: "var(--blue)" }}>
            Why choose us
          </span>
          <h2 className="mt-3 max-w-lg font-display text-[32px] font-bold leading-tight text-text-primary">
            Ten reasons clients{" "}
            <span style={{ color: "var(--pink)" }}>stay</span>
          </h2>
        </ScrollReveal>
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {WHY_CHOOSE_US.map((w, i) => (
            <ScrollReveal key={w.title} delayMs={i * 40}>
              <div className="h-full rounded-xl border border-border bg-surface p-5">
                <h3 className="font-display text-[14.5px] font-bold text-text-primary">{w.title}</h3>
                <p className="mt-2 text-[12.5px] leading-relaxed text-text-secondary">{w.body}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── Market Reports spotlight ── */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <ScrollReveal>
            <div className="grid items-center gap-12 rounded-3xl border border-border bg-surface-raised p-10 lg:grid-cols-[1fr_auto] lg:p-14">
              <div>
                <span className="text-[13px] font-semibold uppercase tracking-wide" style={{ color: "var(--green)" }}>
                  Our flagship product
                </span>
                <h2 className="mt-3 font-display text-[28px] font-bold leading-snug text-text-primary">
                  Market Reports is Quintessence Analytics&apos;{" "}
                  <span style={{ color: "var(--blue)" }}>syndicated research platform</span>
                </h2>
                <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-text-secondary">
                  Every methodology on this page — driver-level forecasting, triangulated market sizing,
                  interactive scenario dashboards — ships today inside Market Reports, our subscription
                  platform of ready-made industry reports. If your market already has one, buy it off the
                  shelf. If it doesn&apos;t, that&apos;s exactly what a custom engagement here is for.
                </p>
              </div>
              <Link
                href="https://market-reports.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-2 rounded-full px-6 py-3.5 text-[14px] font-semibold text-white transition-transform hover:scale-[1.03]"
                style={{ background: "var(--blue)" }}
              >
                Visit Market Reports ↗
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Client Testimonials ── */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <ScrollReveal>
          <span className="text-[13px] font-semibold uppercase tracking-wide" style={{ color: "var(--pink)" }}>
            Client testimonials
          </span>
          <h2 className="mt-3 max-w-lg font-display text-[32px] font-bold leading-tight text-text-primary">
            Illustrative of the{" "}
            <span style={{ color: "var(--blue)" }}>working relationship</span>
          </h2>
          <p className="mt-3 max-w-2xl text-[13.5px] text-text-muted">
            Role-based, not attributed to a named company — real testimonials will replace these as clients
            clear them for publication.
          </p>
        </ScrollReveal>
        <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <ScrollReveal key={t.role} delayMs={i * 70}>
              <div className="h-full rounded-2xl border border-border bg-surface p-7">
                <p className="text-[14.5px] leading-relaxed text-text-primary">&ldquo;{t.quote}&rdquo;</p>
                <p className="mt-4 text-[12px] font-semibold uppercase tracking-wide text-text-muted">{t.role}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── FAQs ── */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-3xl px-6 py-24">
          <ScrollReveal>
            <span className="text-[13px] font-semibold uppercase tracking-wide" style={{ color: "var(--green)" }}>
              FAQs
            </span>
            <h2 className="mt-3 font-display text-[32px] font-bold leading-tight text-text-primary">
              Questions we get{" "}
              <span style={{ color: "var(--pink)" }}>most often</span>
            </h2>
          </ScrollReveal>
          <div className="mt-10">
            <FaqAccordion items={FAQS} />
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="mx-auto max-w-6xl px-6 pb-28 pt-4">
        <div className="rounded-3xl bg-black px-8 py-16 text-center sm:px-16">
          <h2 className="mx-auto max-w-xl font-display text-[30px] font-bold leading-tight text-white">
            Bring us the <span style={{ color: "var(--pink)" }}>question</span>. We&apos;ll bring the{" "}
            <span style={{ color: "var(--green)" }}>evidence</span>.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-white/70">
            Tell us the decision riding on it — we&apos;ll scope a discovery call within a few business
            days.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full px-7 py-4 text-[14px] font-semibold text-white transition-transform hover:scale-[1.03]"
            style={{ background: "var(--blue)" }}
          >
            Schedule a Discovery Call →
          </Link>
        </div>
      </section>
    </>
  );
}
