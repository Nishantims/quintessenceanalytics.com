import type { Metadata } from "next";
import Link from "next/link";

// Bespoke proposal page for a specific prospect (Yum! Brands) - not linked
// from primary nav, not meant to be indexed. Every claim on this page is
// taken directly from the source proposal document; nothing here asserts a
// named past client or engagement that isn't already in that source.
export const metadata: Metadata = {
  title: "Enterprise Decision Intelligence for Yum! Brands — Quintessence Analytics",
  description:
    "A proposed Enterprise Decision Intelligence platform for Yum! Brands, combining Enterprise Intelligence, Strategic Research, Data Analytics, Predictive Analytics, Decision Intelligence, Generative AI, and Custom Technology Development.",
  robots: { index: false, follow: false },
};

const ACCENT_VAR: Record<string, string> = {
  pink: "var(--pink)",
  blue: "var(--blue)",
  green: "var(--green)",
};

// Real, already-published reports on Market Reports (market-reports.com) -
// live today, not illustrative. Every figure/slug here is what's actually
// on the live report page as of publish; this section exists to show real
// coverage of QSR-adjacent markets rather than assert an unbuilt capability.
const MARKET_COVERAGE = [
  { title: "Quick Service Restaurant (QSR) Market", slug: "quick-service-restaurant-qsr", size: "$485.9B → $720.8B by 2035" },
  { title: "Fast Casual Restaurant Market", slug: "fast-casual-restaurant", size: "$143.5B → $291.1B by 2035" },
  { title: "Pizza Restaurant Market", slug: "pizza-restaurant", size: "$218.7B → $362.6B by 2035" },
  { title: "Fried Chicken Restaurant Market", slug: "fried-chicken-restaurant", size: "$100.1B → $198.3B by 2035" },
  { title: "Coffee Chain Market", slug: "coffee-chain", size: "$179.6B → $254.9B by 2035" },
  { title: "Cloud Kitchen Market", slug: "cloud-kitchen", size: "$78.0B → $234.0B by 2035" },
  { title: "Ghost Kitchen Market", slug: "ghost-kitchen", size: "$47.3B → $112.1B by 2035" },
  { title: "Healthy Fast Food Market", slug: "healthy-fast-food", size: "$92.4B → $214.1B by 2035" },
  { title: "Plant-Based QSR Market", slug: "plant-based-qsr", size: "$3.8B → $8.4B by 2035" },
  { title: "QSR Digital Ordering Market", slug: "qsr-digital-ordering", size: "$1.1B → $3.3B by 2035" },
  { title: "Restaurant Artificial Intelligence (AI) Market", slug: "restaurant-artificial-intelligence-ai", size: "$3.7B → $17.0B by 2035" },
  { title: "Smart Kitchen Market", slug: "smart-kitchen", size: "$10.0B → $35.5B by 2035" },
  { title: "Airport Foodservice Market", slug: "airport-foodservice", size: "$39.8B → $73.2B by 2035" },
  { title: "Bakery Cafe Market", slug: "bakery-cafe", size: "$17.8B → $36.1B by 2035" },
  { title: "Convenience Foodservice Market", slug: "convenience-foodservice", size: "$40.7B → $192.2B by 2035" },
  { title: "Food Court Market", slug: "food-court", size: "$156.8B → $257.8B by 2035" },
];

const INTELLIGENCE_SOLUTIONS = [
  { title: "Executive Intelligence Hub", accent: "pink" },
  { title: "Enterprise AI Copilot", detail: "“Ask Your Market”, “Ask Your Competitor”, “Ask Your Data”", accent: "blue" },
  { title: "Restaurant Innovation Radar", accent: "green" },
  { title: "Competitive Intelligence Hub", accent: "pink" },
  { title: "Decision Intelligence Engine", accent: "blue" },
  { title: "AI Market Simulator", accent: "green" },
  { title: "Enterprise Knowledge Workspace", accent: "pink" },
  { title: "Continuous Intelligence Briefings", accent: "blue" },
  { title: "Research Automation Platform", accent: "green" },
  { title: "Executive Morning Intelligence Digest", accent: "pink" },
];

const TECH_CAPABILITIES = [
  "AI assistants and internal GPTs",
  "Executive Copilots",
  "Custom dashboards",
  "Predictive analytics engines",
  "Decision-support models",
  "Knowledge management platforms",
  "Competitor tracking systems",
  "Location intelligence tools",
  "Restaurant intelligence portals",
  "Workflow automation",
  "Data integration solutions",
  "Custom web applications",
  "Secure enterprise portals",
  "APIs and data connectors (where applicable)",
];

const WORKSPACE_FEATURES = [
  "Direct analyst chat",
  "Dedicated research & client support",
  "Live project tracking",
  "Dashboard views",
  "HTML report viewer",
  "Sample tool",
  "AI chat assistant",
  "Deliverable repository",
  "Meeting notes",
  "Approvals",
  "Data downloads",
  "Shared workspaces",
  "Enterprise knowledge base",
];

const DELIVERABLES = [
  "Interactive executive dashboards",
  "AI-generated insights",
  "Downloadable data packs",
  "HTML intelligence reports",
  "Scenario modelling",
  "Predictive forecasts",
  "Executive presentations",
  "Board-ready summaries",
  "Live intelligence portals",
];

const ENGAGEMENT_MODEL = [
  { title: "Dedicated Research Team", accent: "pink" },
  { title: "Dedicated Data Analysts", accent: "blue" },
  { title: "AI Specialists", accent: "green" },
  { title: "Client Success Manager", accent: "pink" },
  { title: "Weekly reviews", accent: "blue" },
  { title: "Monthly executive briefings", accent: "green" },
  { title: "Quarterly strategy workshops", accent: "pink" },
  { title: "Rapid-response research", accent: "blue" },
  { title: "Priority support", accent: "green" },
  { title: "Direct communication channel", accent: "pink" },
];

const CUSTOM_TOOLS = [
  "Competitor Intelligence Portal",
  "Executive Intelligence Dashboard",
  "Restaurant Expansion Planner",
  "Pricing Optimizer",
  "AI Knowledge Search",
  "Market Opportunity Explorer",
  "Innovation Tracker",
  "Supplier Intelligence Portal",
  "Research Request Management System",
  "Internal Analytics Workspace",
  "Executive Reporting Automation",
  "Custom AI copilots integrated with Yum!'s workflows",
];

const ROADMAP = [
  {
    phase: "30 Days",
    accent: "pink",
    body: "Discovery workshops, data assessment, pilot dashboard and AI prototype.",
  },
  {
    phase: "90 Days",
    accent: "blue",
    body: "Deploy intelligence workspace, competitor monitoring, executive dashboards and AI copilots.",
  },
  {
    phase: "365 Days",
    accent: "green",
    body: "Enterprise-wide intelligence platform with continuous analytics, custom tools, automation and strategic advisory.",
  },
];

const LEADERSHIP_EXPERIENCE = [
  "QSR market expansion strategy and opportunity assessment",
  "Restaurant performance analytics and executive KPI programs",
  "Competitive intelligence and market monitoring initiatives",
  "Executive decision support and strategic intelligence engagements",
];

// Illustrative only - Quintessence Analytics is a new venture with no named
// QSR client history to cite, so these are worked examples of how the
// engagement model above would apply to a QSR enterprise, not descriptions
// of specific past clients or completed engagements. Labelled as such on the
// page itself, not just here.
const ILLUSTRATIVE_SCENARIOS = [
  {
    title: "Multi-Market Expansion Sizing",
    scenario: "A national QSR chain evaluating entry into a set of new metro markets.",
    approach:
      "Demand-side and supply-side sizing per candidate market, cross-checked against trade-area demographics and existing competitive density, ranked by opportunity and payback timeline.",
    accent: "pink",
  },
  {
    title: "Restaurant Performance & Executive KPI Program",
    scenario: "A multi-brand restaurant group standardizing performance reporting across regions.",
    approach:
      "A single executive KPI framework — same-store sales, unit economics, labor and food-cost ratios — rebuilt as a live, filterable dashboard instead of a static monthly deck.",
    accent: "blue",
  },
  {
    title: "Competitive Intelligence & Market Monitoring",
    scenario: "A QSR brand tracking competitor menu, pricing, and footprint moves in near real time.",
    approach:
      "Continuous monitoring of competitor pricing, menu changes, and store openings/closures, surfaced as a briefing rather than a one-off report, so shifts are caught while they're still actionable.",
    accent: "green",
  },
];

function SectionEyebrow({ children, accent = "pink" }: { children: React.ReactNode; accent?: string }) {
  return (
    <span className="text-[15px] font-semibold uppercase tracking-wide" style={{ color: ACCENT_VAR[accent] }}>
      {children}
    </span>
  );
}

export default function YumProposalPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="mx-auto max-w-4xl px-6 pt-20 pb-14 text-center">
        <SectionEyebrow accent="blue">Proposal — Prepared for Yum! Brands</SectionEyebrow>
        <h1 className="mx-auto mt-4 max-w-3xl font-display text-[40px] font-bold leading-[1.1] text-text-primary">
          An Enterprise <span style={{ color: "var(--pink)" }}>Decision Intelligence</span> Platform for{" "}
          <span style={{ color: "var(--green)" }}>Yum! Brands</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-[18px] leading-relaxed text-text-secondary">
          Quintessence Analytics combines Enterprise Intelligence, Strategic Research, Data Analytics,
          Predictive Analytics, Decision Intelligence, Generative AI, and Custom Technology
          Development. Our objective is not to become another research vendor — we aim to become an
          extension of Yum!&apos;s Strategy, Analytics, Innovation and Technology teams.
        </p>
        <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-border bg-surface px-6 py-4">
          <p className="text-[14px] font-semibold text-text-primary">Quality First Commitment</p>
          <p className="mt-1.5 text-[14px] leading-relaxed text-text-secondary">
            We stand behind the quality of our work. Our goal is to earn your confidence through
            measurable outcomes, exceptional delivery, and long-term partnership.
          </p>
        </div>
      </section>

      {/* ── About / Leadership ── */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <SectionEyebrow accent="green">About Quintessence Analytics &amp; Leadership Experience</SectionEyebrow>
        <h2 className="mt-3 max-w-2xl font-display text-[28px] font-bold leading-tight text-text-primary">
          A new venture, built on <span style={{ color: "var(--blue)" }}>20+ years</span> of leadership
          experience
        </h2>
        <p className="mt-5 max-w-3xl text-[17px] leading-relaxed text-text-secondary">
          Quintessence Analytics is a new venture founded on more than 20 years of leadership
          experience in research, consulting, analytics, and technology. Representative leadership
          experience from previous professional engagements includes:
        </p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {LEADERSHIP_EXPERIENCE.map((item) => (
            <li key={item} className="flex gap-2.5 rounded-xl border border-border bg-surface px-5 py-4 text-[14px] leading-relaxed text-text-primary">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--blue)" }} aria-hidden />
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-5 max-w-3xl text-[13px] leading-relaxed text-text-muted">
          These examples represent prior leadership experience and demonstrate the expertise now
          brought into Quintessence Analytics.
        </p>
      </section>

      {/* ── Relevant Market Coverage - real, live reports, not illustrative ── */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <SectionEyebrow accent="green">Relevant Market Coverage — Already Live</SectionEyebrow>
        <h2 className="mt-3 max-w-2xl font-display text-[28px] font-bold leading-tight text-text-primary">
          {MARKET_COVERAGE.length} QSR-adjacent markets, <span style={{ color: "var(--green)" }}>sized and published</span> today
        </h2>
        <p className="mt-5 max-w-3xl text-[17px] leading-relaxed text-text-secondary">
          Not a pitch deck promise — these are live reports on Market Reports, our syndicated research
          platform, built on the same triangulated methodology this proposal describes. Each one is
          openly available today.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {MARKET_COVERAGE.map((r) => (
            <a
              key={r.slug}
              href={`https://market-reports.com/reports/${r.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-4 rounded-xl border border-border bg-surface px-5 py-4 transition-colors hover:border-green/50"
            >
              <div>
                <p className="text-[14px] font-semibold text-text-primary">{r.title}</p>
                <p className="mt-1 text-[12px] text-text-muted">{r.size}</p>
              </div>
              <span className="shrink-0 text-[12px] font-semibold" style={{ color: "var(--green)" }}>View ↗</span>
            </a>
          ))}
        </div>
      </section>

      {/* ── Illustrative QSR Scenarios ── */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <SectionEyebrow accent="blue">What This Looks Like in Practice</SectionEyebrow>
        <h2 className="mt-3 max-w-2xl font-display text-[28px] font-bold leading-tight text-text-primary">
          Three <span style={{ color: "var(--pink)" }}>illustrative scenarios</span>, built on the
          experience above
        </h2>
        <p className="mt-5 max-w-3xl text-[13px] font-semibold uppercase tracking-wide text-text-muted">
          Illustrative — not descriptions of a specific past client or completed engagement.
        </p>
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {ILLUSTRATIVE_SCENARIOS.map((s) => (
            <div key={s.title} className="rounded-2xl border border-border bg-surface p-7">
              <span className="inline-block h-2 w-2 rounded-full" style={{ background: ACCENT_VAR[s.accent] }} aria-hidden />
              <h3 className="mt-4 font-display text-[17px] font-bold leading-snug text-text-primary">{s.title}</h3>
              <p className="mt-3 text-[13px] font-semibold uppercase tracking-wide text-text-muted">Scenario</p>
              <p className="mt-1.5 text-[14px] leading-relaxed text-text-secondary">{s.scenario}</p>
              <p className="mt-4 text-[13px] font-semibold uppercase tracking-wide text-text-muted">Approach</p>
              <p className="mt-1.5 text-[14px] leading-relaxed text-text-secondary">{s.approach}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Enterprise Intelligence Solutions ── */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <SectionEyebrow accent="pink">Enterprise Intelligence Solutions for Yum! Brands</SectionEyebrow>
        <h2 className="mt-3 max-w-2xl font-display text-[28px] font-bold leading-tight text-text-primary">
          An External Enterprise Intelligence Layer, <span style={{ color: "var(--green)" }}>complementing</span>{" "}
          Yum!&apos;s internal systems
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {INTELLIGENCE_SOLUTIONS.map((s) => (
            <div key={s.title} className="rounded-2xl border border-border bg-surface p-6">
              <span className="inline-block h-2 w-2 rounded-full" style={{ background: ACCENT_VAR[s.accent] }} aria-hidden />
              <h3 className="mt-3 font-display text-[16px] font-bold leading-snug text-text-primary">{s.title}</h3>
              {s.detail && <p className="mt-2 text-[13px] leading-relaxed text-text-secondary">{s.detail}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* ── AI, Data & Custom Technology ── */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <SectionEyebrow accent="blue">AI, Data &amp; Custom Technology</SectionEyebrow>
        <h2 className="mt-3 max-w-2xl font-display text-[28px] font-bold leading-tight text-text-primary">
          Beyond research: <span style={{ color: "var(--pink)" }}>custom enterprise solutions</span>
        </h2>
        <p className="mt-5 max-w-3xl text-[17px] leading-relaxed text-text-secondary">
          Every solution is designed specifically around Yum!&apos;s business processes rather than
          off-the-shelf software.
        </p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {TECH_CAPABILITIES.map((item) => (
            <li key={item} className="flex gap-2.5 text-[14px] leading-relaxed text-text-primary">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--blue)" }} aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* ── Dedicated Workspace ── */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-10 rounded-3xl border border-border bg-surface p-10 lg:grid-cols-[0.9fr_1.1fr] lg:p-14">
          <div>
            <SectionEyebrow accent="green">Dedicated Yum! Enterprise Workspace</SectionEyebrow>
            <h2 className="mt-3 font-display text-[26px] font-bold leading-tight text-text-primary">
              A secure <span style={{ color: "var(--green)" }}>collaboration portal</span>
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-text-secondary">
              One place for Yum!&apos;s team to reach us, track work in progress, and pull deliverables
              — not a shared drive of static files.
            </p>
          </div>
          <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {WORKSPACE_FEATURES.map((item) => (
              <li key={item} className="flex gap-2.5 text-[14px] leading-relaxed text-text-primary">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--green)" }} aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Deliverables ── */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <SectionEyebrow accent="pink">Decision Intelligence Deliverables</SectionEyebrow>
        <h2 className="mt-3 max-w-2xl font-display text-[28px] font-bold leading-tight text-text-primary">
          What lands on the desk of a <span style={{ color: "var(--blue)" }}>decision-maker</span>
        </h2>
        <div className="mt-8 flex flex-wrap gap-3">
          {DELIVERABLES.map((item) => (
            <span
              key={item}
              className="rounded-full border border-border bg-surface px-4 py-2 text-[13px] font-semibold text-text-primary"
            >
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* ── Engagement Model ── */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <SectionEyebrow accent="blue">Enterprise Engagement Model</SectionEyebrow>
        <h2 className="mt-3 max-w-2xl font-display text-[28px] font-bold leading-tight text-text-primary">
          A <span style={{ color: "var(--pink)" }}>Dedicated Intelligence Office</span> for Yum!
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {ENGAGEMENT_MODEL.map((item) => (
            <div key={item.title} className="rounded-xl border border-border bg-surface p-5">
              <span className="inline-block h-2 w-2 rounded-full" style={{ background: ACCENT_VAR[item.accent] }} aria-hidden />
              <p className="mt-3 text-[13px] font-semibold leading-snug text-text-primary">{item.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Custom Tool Development ── */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <SectionEyebrow accent="green">Custom Tool Development</SectionEyebrow>
        <h2 className="mt-3 max-w-2xl font-display text-[28px] font-bold leading-tight text-text-primary">
          Bespoke tools, built <span style={{ color: "var(--green)" }}>exclusively</span> for Yum!
        </h2>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CUSTOM_TOOLS.map((item) => (
            <li key={item} className="flex gap-2.5 rounded-xl border border-border bg-surface px-5 py-4 text-[14px] leading-relaxed text-text-primary">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--green)" }} aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* ── 30-90-365 Roadmap ── */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <SectionEyebrow accent="pink">30-90-365 Day Roadmap</SectionEyebrow>
        <h2 className="mt-3 max-w-2xl font-display text-[28px] font-bold leading-tight text-text-primary">
          From <span style={{ color: "var(--blue)" }}>pilot</span> to{" "}
          <span style={{ color: "var(--green)" }}>enterprise-wide platform</span>
        </h2>
        <div className="relative mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="absolute top-5 left-0 right-0 hidden h-px bg-border sm:block" aria-hidden />
          {ROADMAP.map((r) => (
            <div key={r.phase} className="relative rounded-2xl border border-border bg-surface p-7">
              <span
                className="flex h-10 w-10 items-center justify-center rounded-full text-[12px] font-bold text-white"
                style={{ background: ACCENT_VAR[r.accent] }}
              >
                {r.phase.split(" ")[0]}
              </span>
              <h3 className="mt-4 font-display text-[17px] font-bold leading-snug text-text-primary">{r.phase}</h3>
              <p className="mt-2.5 text-[14px] leading-relaxed text-text-secondary">{r.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Partnership Vision + CTA ── */}
      <section className="mx-auto max-w-6xl px-6 pb-28">
        <div className="rounded-3xl px-8 py-16 text-center sm:px-16" style={{ background: "var(--dark-surface)" }}>
          <SectionEyebrow accent="blue">Partnership Vision</SectionEyebrow>
          <h2 className="mx-auto mt-4 max-w-2xl font-display text-[28px] font-bold leading-tight text-dark-text">
            Our ambition is to become Yum!&apos;s long-term{" "}
            <span style={{ color: "var(--pink)" }}>Enterprise Decision Intelligence Partner</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed" style={{ color: "#C7C7C7" }}>
            We earn trust through delivery and measurable outcomes. We welcome the opportunity to
            conduct a discovery workshop and co-design a roadmap that delivers strategic intelligence,
            AI, analytics, and custom technology tailored specifically for Yum! Brands.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full px-7 py-4 text-[14px] font-semibold text-white transition-transform hover:scale-[1.03]"
            style={{ background: "var(--pink)" }}
          >
            Schedule a discovery workshop →
          </Link>
        </div>
      </section>
    </>
  );
}
