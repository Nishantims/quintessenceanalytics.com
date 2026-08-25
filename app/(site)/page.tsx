import Link from "next/link";
import {
  Wrench, Bot, ShieldCheck, Scale, Workflow, LineChart,
  HeartPulse, Factory, Cpu, Landmark, ShoppingCart, Zap, Trophy, Car, Radio, Building2,
  CheckCircle2, Tag, Unlock, UserCheck, FileLock2, Globe,
  Target, GraduationCap, Lightbulb, TrendingUp, Eye, Lock, Rocket, Puzzle, Presentation, Handshake,
  Gauge, Bell, Clock, Database,
  type LucideIcon,
} from "lucide-react";
import { DashboardPhoto } from "@/components/DashboardPhoto";
import { ServiceCard } from "@/components/ServiceCard";
import { AiProductCard } from "@/components/AiProductCard";
import { CapabilityMarquee } from "@/components/CapabilityMarquee";
import { ScrollReveal } from "@/components/ScrollReveal";
import { FaqAccordion } from "@/components/FaqAccordion";
import { SERVICES } from "@/lib/services-data";
import { AI_PRODUCTS } from "@/lib/ai-products-data";
import { INDUSTRIES } from "@/lib/industries-data";
import { OUTCOMES, CASE_STUDIES, TECH_CAPABILITIES, WHY_CHOOSE_US, TESTIMONIALS, FAQS, TRUST_POINTS, TOOLS_WE_BUILD } from "@/lib/homepage-content";

const ACCENT_VAR = {
  pink: "var(--pink)",
  blue: "var(--blue)",
  green: "var(--green)",
  purple: "var(--purple)",
  orange: "var(--orange)",
};

const WHAT_WE_DO_ICONS: Record<string, LucideIcon> = {
  "AI Tools": Wrench,
  "AI Agents": Bot,
  "AI Assurance": ShieldCheck,
  "AI Governance": Scale,
  Automation: Workflow,
  "Decision Systems": LineChart,
};

const INDUSTRY_ICONS: Record<string, LucideIcon> = {
  "healthcare-pharma": HeartPulse,
  manufacturing: Factory,
  technology: Cpu,
  "financial-services": Landmark,
  "retail-ecommerce": ShoppingCart,
  "energy-utilities": Zap,
  sports: Trophy,
  "automotive-mobility": Car,
  telecommunications: Radio,
  "government-smart-cities": Building2,
};

const TRUST_ICONS: Record<string, LucideIcon> = {
  "Scope-Completion Guarantee": CheckCircle2,
  "Fixed-Price, No Surprises": Tag,
  "No Long-Term Lock-In": Unlock,
  "Senior-Analyst Reviewed": UserCheck,
  "NDA On Request": FileLock2,
  "Global, Dual-Currency": Globe,
};

const WHY_ICONS: Record<string, LucideIcon> = {
  "Business-focused AI": Target,
  "Industry expertise": GraduationCap,
  "Actionable insights": Lightbulb,
  "Scalable enterprise solutions": TrendingUp,
  "Transparent methodology": Eye,
  "Secure AI": Lock,
  "Rapid, AI-native delivery": Rocket,
  "Custom-built, not templated": Puzzle,
  "Executive-ready reporting": Presentation,
  "Long-term partnership": Handshake,
};

const OUTCOME_ICONS: Record<string, LucideIcon> = {
  "Faster decisions": Gauge,
  "Fewer surprises": Bell,
  "Analyst time back": Clock,
  "Board-ready, every time": Presentation,
};

const TECH_ICONS: Record<string, LucideIcon> = {
  "AI agents & automation": Bot,
  "Agent evaluation & assurance": ShieldCheck,
  "Governed data pipelines": Database,
  "Interactive decision systems": LineChart,
};

// Shared "premium" card treatment reused across every accent-colored grid
// on this page: an icon badge tinted to the accent, a soft blurred glow in
// the corner for depth, and the card's border picking up the accent on
// hover (via a CSS custom property, since Tailwind can't take a dynamic
// per-item color as a static class).
function AccentCard({
  icon: Icon,
  accent,
  title,
  body,
  href,
}: {
  icon: LucideIcon;
  accent: string;
  title: string;
  body: string;
  href?: string;
}) {
  const className =
    "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface-raised p-6 transition-all hover:-translate-y-0.5 hover:border-[color:var(--card-accent)]";
  const style = { "--card-accent": accent } as React.CSSProperties;
  const content = (
    <>
      <span
        className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full opacity-[0.14] blur-2xl transition-opacity group-hover:opacity-25"
        style={{ background: accent }}
        aria-hidden
      />
      <span
        className="relative flex h-10 w-10 items-center justify-center rounded-xl"
        style={{ background: `color-mix(in srgb, ${accent} 16%, transparent)` }}
      >
        <Icon className="h-5 w-5" style={{ color: accent }} strokeWidth={2} />
      </span>
      <h3 className="relative mt-4 font-display text-[15.5px] font-bold text-text-primary">{title}</h3>
      <p className="relative mt-2 flex-1 text-[13px] leading-relaxed text-text-secondary">{body}</p>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={className} style={style}>
        {content}
      </Link>
    );
  }
  return (
    <div className={className} style={style}>
      {content}
    </div>
  );
}

const WHAT_WE_DO = [
  { title: "AI Tools", body: "Any application you need built, AI-powered or not — custom software scoped to your exact workflow, not a fixed product.", accent: "green" as const },
  { title: "AI Agents", body: "Task-oriented agents that retrieve, reason, use approved tools, and finish the workflow.", accent: "blue" as const },
  { title: "AI Assurance", body: "Evaluation and testing that finds an agent's failure modes before your customers do.", accent: "pink" as const },
  { title: "AI Governance", body: "An independent inventory, permissions review, and audit trail for the AI you already run.", accent: "purple" as const },
  { title: "Automation", body: "One real workflow, automated end to end, with a human approval step built in.", accent: "orange" as const },
  { title: "Decision Systems", body: "Predictive analytics and dashboards, analyst-reviewed at every tier.", accent: "pink" as const },
];

const STAGES = [
  { n: "1", stage: "Identify", capability: "AI Readiness Assessment", cta: "Assess your business", href: "/pricing", accent: "pink" as const },
  { n: "2", stage: "Build", capability: "AI Agent / Automation Pilot", cta: "Start a pilot", href: "/pricing", accent: "blue" as const },
  { n: "3", stage: "Assure", capability: "AI Agent Quality & Evaluation", cta: "Evaluate an agent", href: "/services#ai-agent-quality-evaluation", accent: "orange" as const },
  { n: "4", stage: "Govern", capability: "AI Governance & Risk", cta: "Assess AI risk", href: "/services#ai-governance-risk", accent: "purple" as const },
  { n: "5", stage: "Operate", capability: "Continuous AI Monitoring", cta: "Discuss monitoring", href: "/contact", accent: "green" as const },
];

const ASSURANCE_STEPS = ["Scope", "Test", "Evaluate", "Remediate", "Retest", "Monitor"];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-16 sm:pt-24 sm:pb-20">
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border px-3.5 py-1.5 text-[14px] font-semibold uppercase tracking-wide text-text-secondary">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--pink)" }} />
              Enterprise AI solutions &amp; AI assurance
            </span>
            <h1 className="mt-6 font-display text-[42px] font-bold leading-[1.08] tracking-tight text-text-primary sm:text-[54px]">
              Build AI. <span style={{ color: "var(--blue)" }}>Automate work.</span> Trust the{" "}
              <span style={{ color: "var(--pink)" }}>outcome.</span>
            </h1>
            <p className="mt-6 max-w-lg text-[19px] leading-relaxed text-text-secondary">
              Quintessence Analytics helps enterprises move AI from experimentation to production —
              building AI agents, automating real workflows, and evaluating AI systems for reliability,
              security, and governance, with every output reviewed by a senior analyst. We&apos;re also the
              research engine behind{" "}
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
                Book an AI Assessment
              </Link>
              <Link
                href="/services"
                className="rounded-full border border-border px-6 py-3.5 text-[14px] font-semibold text-text-primary transition-colors hover:border-green hover:text-green-ink"
              >
                Explore AI Solutions
              </Link>
            </div>
          </div>

          <DashboardPhoto src="/images/hero-dashboard.png" alt="Analytics dashboard overview on a laptop" priority />
        </div>
      </section>

      <CapabilityMarquee />

      {/* ── From AI Pilot to Production ── */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <ScrollReveal>
            <span className="text-[15px] font-semibold uppercase tracking-wide" style={{ color: "var(--blue)" }}>
              How we work
            </span>
            <h2 className="mt-3 max-w-lg font-display text-[32px] font-bold leading-tight text-text-primary">
              From AI pilot to{" "}
              <span style={{ color: "var(--pink)" }}>production</span>, in five stages
            </h2>
          </ScrollReveal>
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {STAGES.map((s, i) => {
              const accent = ACCENT_VAR[s.accent];
              return (
                <ScrollReveal key={s.stage} delayMs={i * 60}>
                  <Link
                    href={s.href}
                    className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface-raised p-6 transition-all hover:-translate-y-1 hover:border-[color:var(--card-accent)] hover:shadow-[0_12px_32px_-12px_hsl(var(--shadow-color)/0.4)]"
                    style={{ "--card-accent": accent } as React.CSSProperties}
                  >
                    <span
                      className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full opacity-[0.14] blur-2xl transition-opacity group-hover:opacity-25"
                      style={{ background: accent }}
                      aria-hidden
                    />
                    <span
                      className="relative flex h-9 w-9 items-center justify-center rounded-full font-data text-[13px] font-bold"
                      style={{ background: `color-mix(in srgb, ${accent} 16%, transparent)`, color: accent }}
                    >
                      {s.n}
                    </span>
                    <h3 className="relative mt-4 font-display text-[17px] font-bold text-text-primary">{s.stage}</h3>
                    <p className="relative mt-2 flex-1 text-[13px] leading-relaxed text-text-secondary">{s.capability}</p>
                    <span className="relative mt-4 flex items-center gap-1.5 text-[12.5px] font-semibold" style={{ color: accent }}>
                      {s.cta}
                      <span className="transition-transform group-hover:translate-x-1" aria-hidden>→</span>
                    </span>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Who We Are ── */}
      <section className="mx-auto max-w-4xl px-6 py-24 text-center">
        <ScrollReveal>
          <span className="text-[15px] font-semibold uppercase tracking-wide" style={{ color: "var(--green)" }}>
            Who we are
          </span>
          <h2 className="mx-auto mt-3 max-w-2xl font-display text-[32px] font-bold leading-tight text-text-primary">
            An enterprise AI partner built to ship{" "}
            <span style={{ color: "var(--blue)" }}>working systems</span>, not proofs of concept
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[18px] leading-relaxed text-text-secondary">
            We&apos;re not a technology vendor selling a platform, and we&apos;re not a slide-deck
            consultancy — we build AI agents and automation using AI-native, Claude-assisted development,
            which is exactly why we can move in weeks instead of quarters. Every engagement starts with
            the workflow you actually need done, and every AI output is reviewed by a senior analyst
            before it reaches you.
          </p>
        </ScrollReveal>
      </section>

      {/* ── What We Do ── */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <ScrollReveal>
            <span className="text-[15px] font-semibold uppercase tracking-wide" style={{ color: "var(--blue)" }}>
              What we do
            </span>
            <h2 className="mt-3 max-w-lg font-display text-[32px] font-bold leading-tight text-text-primary">
              Six ways we turn AI into a{" "}
              <span style={{ color: "var(--pink)" }}>working outcome</span>
            </h2>
          </ScrollReveal>
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {WHAT_WE_DO.map((w, i) => (
              <ScrollReveal key={w.title} delayMs={i * 60}>
                <AccentCard icon={WHAT_WE_DO_ICONS[w.title]} accent={ACCENT_VAR[w.accent]} title={w.title} body={w.body} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tools We Build ── */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <ScrollReveal>
          <span className="text-[15px] font-semibold uppercase tracking-wide" style={{ color: "var(--green)" }}>
            Tools we build
          </span>
          <h2 className="mt-3 max-w-lg font-display text-[32px] font-bold leading-tight text-text-primary">
            Ten examples of what{" "}
            <span style={{ color: "var(--blue)" }}>AI Tools</span> looks like in practice
          </h2>
          <p className="mt-3 max-w-2xl text-[13.5px] text-text-muted">
            Representative of the kind of tool we build under AI Tools — not attributed to a specific named
            client. Tell us what you need built; it doesn&apos;t have to match one of these exactly.
          </p>
        </ScrollReveal>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {TOOLS_WE_BUILD.map((t, i) => (
            <ScrollReveal key={t.title} delayMs={i * 40}>
              <div className="h-full rounded-xl border border-border bg-surface p-5">
                <span className="inline-block h-2 w-2 rounded-full" style={{ background: ACCENT_VAR[t.accent] }} aria-hidden />
                <h3 className="mt-3 font-display text-[14.5px] font-bold text-text-primary">{t.title}</h3>
                <p className="mt-2 text-[12.5px] leading-relaxed text-text-secondary">{t.body}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── Industries We Serve ── */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <ScrollReveal>
          <span className="text-[15px] font-semibold uppercase tracking-wide" style={{ color: "var(--pink)" }}>
            Industries we serve
          </span>
          <h2 className="mt-3 max-w-lg font-display text-[32px] font-bold leading-tight text-text-primary">
            Ten industries, one{" "}
            <span style={{ color: "var(--green)" }}>AI delivery methodology</span>
          </h2>
        </ScrollReveal>
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {INDUSTRIES.map((ind, i) => (
            <ScrollReveal key={ind.slug} delayMs={i * 40}>
              <AccentCard
                icon={INDUSTRY_ICONS[ind.slug]}
                accent={ACCENT_VAR[ind.accent]}
                title={ind.name}
                body={ind.value}
                href={`/industries#${ind.slug}`}
              />
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── Six Core AI Services ── */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <ScrollReveal>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="text-[15px] font-semibold uppercase tracking-wide" style={{ color: "var(--green)" }}>
                  Our services
                </span>
                <h2 className="mt-3 max-w-lg font-display text-[32px] font-bold leading-tight text-text-primary">
                  Six core AI{" "}
                  <span style={{ color: "var(--blue)" }}>solutions services</span>
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

      {/* ── AI Assurance ── */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <ScrollReveal>
          <div className="text-center">
            <span className="text-[15px] font-semibold uppercase tracking-wide" style={{ color: "var(--pink)" }}>
              AI assurance
            </span>
            <h2 className="mx-auto mt-3 max-w-xl font-display text-[32px] font-bold leading-tight text-text-primary">
              Test AI <span style={{ color: "var(--blue)" }}>before your customers do</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[16px] leading-relaxed text-text-secondary">
              Accuracy, hallucination, task completion, tool use, prompt injection, data leakage, policy
              compliance, security, reliability, cost, and latency — scored against a repeatable
              methodology, not asserted.
            </p>
          </div>
        </ScrollReveal>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          {ASSURANCE_STEPS.map((step, i) => (
            <ScrollReveal key={step} delayMs={i * 60} className="flex items-center gap-3">
              <div className="rounded-full border border-border bg-surface px-5 py-2.5 text-[13px] font-semibold text-text-primary">
                {step}
              </div>
              {i < ASSURANCE_STEPS.length - 1 && (
                <span className="text-text-muted" aria-hidden>→</span>
              )}
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── AI Products & Pricing ── */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <ScrollReveal>
            <div className="text-center">
              <span className="text-[15px] font-semibold uppercase tracking-wide" style={{ color: "var(--pink)" }}>
                Entry packages
              </span>
              <h2 className="mx-auto mt-3 max-w-xl font-display text-[32px] font-bold leading-tight text-text-primary">
                Fixed-scope, low-friction offers to{" "}
                <span style={{ color: "var(--blue)" }}>start this month</span>
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-[19px] leading-relaxed text-text-secondary">
                No undefined consulting engagement — a real starting price, a real delivery window, and a
                specific list of what you get.
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
          <p className="mt-10 text-center">
            <Link href="/pricing" className="text-[13.5px] font-semibold" style={{ color: "var(--blue)" }}>
              See the full expansion path, from pilot to enterprise implementation →
            </Link>
          </p>
        </div>
      </section>

      {/* ── Trust & Guarantee ── */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <ScrollReveal>
            <div className="text-center">
              <span className="text-[15px] font-semibold uppercase tracking-wide" style={{ color: "var(--blue)" }}>
                Trust &amp; guarantee
              </span>
              <h2 className="mx-auto mt-3 max-w-xl font-display text-[32px] font-bold leading-tight text-text-primary">
                What you&apos;re actually protected{" "}
                <span style={{ color: "var(--pink)" }}>by</span>
              </h2>
            </div>
          </ScrollReveal>
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TRUST_POINTS.map((t, i) => (
              <ScrollReveal key={t.title} delayMs={i * 60}>
                <AccentCard icon={TRUST_ICONS[t.title]} accent={ACCENT_VAR[t.accent]} title={t.title} body={t.body} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Business Outcomes & Client Benefits ── */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <ScrollReveal>
          <span className="text-[15px] font-semibold uppercase tracking-wide" style={{ color: "var(--blue)" }}>
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
              <AccentCard icon={OUTCOME_ICONS[o.title]} accent={ACCENT_VAR[o.accent]} title={o.title} body={o.body} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── Case Studies & Success Stories ── */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <ScrollReveal>
            <span className="text-[15px] font-semibold uppercase tracking-wide" style={{ color: "var(--pink)" }}>
              Case studies
            </span>
            <h2 className="mt-3 max-w-lg font-display text-[32px] font-bold leading-tight text-text-primary">
              Representative{" "}
              <span style={{ color: "var(--green)" }}>engagements</span>
            </h2>
            <p className="mt-3 max-w-2xl text-[13.5px] text-text-muted">
              Representative examples of the kind of problem and approach we take on — not attributed to a
              specific named client. Real case studies replace these as engagements clear for publication.
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
        </div>
      </section>

      {/* ── Technology & AI Capabilities ── */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <ScrollReveal>
          <span className="text-[15px] font-semibold uppercase tracking-wide" style={{ color: "var(--green)" }}>
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
              <AccentCard icon={TECH_ICONS[t.title]} accent={ACCENT_VAR[t.accent]} title={t.title} body={t.body} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── Why Choose Quintessence Analytics ── */}
      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <ScrollReveal>
            <span className="text-[15px] font-semibold uppercase tracking-wide" style={{ color: "var(--blue)" }}>
              Why choose us
            </span>
            <h2 className="mt-3 max-w-lg font-display text-[32px] font-bold leading-tight text-text-primary">
              Ten reasons clients{" "}
              <span style={{ color: "var(--pink)" }}>stay</span>
            </h2>
          </ScrollReveal>
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {WHY_CHOOSE_US.map((w, i) => (
              <ScrollReveal key={w.title} delayMs={i * 40}>
                <AccentCard icon={WHY_ICONS[w.title]} accent={ACCENT_VAR[w.accent]} title={w.title} body={w.body} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Client Testimonials ── */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <ScrollReveal>
          <span className="text-[15px] font-semibold uppercase tracking-wide" style={{ color: "var(--pink)" }}>
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
            <span className="text-[15px] font-semibold uppercase tracking-wide" style={{ color: "var(--green)" }}>
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

      {/* ── Market Reports — secondary link, not the homepage centerpiece ── */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <ScrollReveal>
          <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-border bg-surface px-8 py-8 text-center sm:flex-row sm:text-left">
            <div>
              <span className="text-[12px] font-semibold uppercase tracking-wide text-text-muted">A separate product</span>
              <p className="mt-1.5 text-[15px] leading-relaxed text-text-secondary">
                Need off-the-shelf market sizing instead? <span className="font-semibold text-text-primary">Market Reports</span>{" "}
                is our syndicated research platform, built on the same AI engine.
              </p>
            </div>
            <Link
              href="https://market-reports.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-border px-5 py-2.5 text-[13px] font-semibold text-text-primary transition-colors hover:border-blue hover:text-blue-ink"
            >
              Visit Market Reports ↗
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* ── Final CTA ── */}
      <section className="mx-auto max-w-6xl px-6 pb-28 pt-4">
        <div className="rounded-3xl bg-black px-8 py-16 text-center sm:px-16">
          <h2 className="mx-auto max-w-xl font-display text-[30px] font-bold leading-tight text-white">
            Is your business <span style={{ color: "var(--pink)" }}>AI-ready</span>? Get an{" "}
            <span style={{ color: "var(--green)" }}>AI Opportunity Assessment</span>.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-white/70">
            Tell us the workflow you want automated or the agent you need evaluated — we&apos;ll scope a
            discovery call within a few business days.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full px-7 py-4 text-[14px] font-semibold text-white transition-transform hover:scale-[1.03]"
            style={{ background: "var(--blue)" }}
          >
            Book an AI Assessment →
          </Link>
        </div>
      </section>
    </>
  );
}
