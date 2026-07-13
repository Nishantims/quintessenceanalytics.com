export interface Service {
  slug: string;
  title: string;
  short: string;
  description: string;
  bullets: string[];
  accent: "coral" | "teal" | "gold";
}

export const SERVICES: Service[] = [
  {
    slug: "custom-market-research",
    title: "Custom Market Research & Sizing",
    short: "Bespoke market sizing triangulated across independent methods, not a single guess dressed up as a number.",
    description:
      "Every sizing engagement runs demand-side, supply-side, and bottom-up revenue models in parallel, cross-checked against trade flow and macroeconomic data, then reconciled into one number with a stated confidence band — not presented as false precision.",
    bullets: [
      "TAM / SAM / SOM sizing with a stated confidence interval, not a single point estimate",
      "Segment, region, and country-level breakdowns built from the same underlying model",
      "Base, optimistic, and conservative scenarios — every assumption itemized and traceable",
    ],
    accent: "coral",
  },
  {
    slug: "predictive-analytics",
    title: "Predictive Analytics & Forecasting",
    short: "CAGR and demand forecasts built driver-by-driver, so you can see exactly what's moving the number.",
    description:
      "We decompose a forecast into its individual drivers and restraints — regulatory tailwinds, input-cost pressure, adoption curves — and quantify each one's contribution in percentage points, so the final CAGR is explainable, not a black box.",
    bullets: [
      "Driver-level CAGR waterfalls showing what's adding or subtracting growth",
      "Scenario modelling (bull / base / bear) grounded in the same factor set",
      "Ongoing re-forecasting as new filings, pricing, and macro data land",
    ],
    accent: "teal",
  },
  {
    slug: "business-intelligence-dashboards",
    title: "Business Intelligence Dashboards",
    short: "Interactive dashboards your team can actually filter, not a static slide deck that's stale in a quarter.",
    description:
      "We build living dashboards — filterable by scenario, region, segment, and currency — so a strategy team can ask a new question the day after delivery instead of waiting on the next engagement to get an answer.",
    bullets: [
      "Real-time filtering by scenario, geography, segment, and currency",
      "Exportable views for board decks without losing the underlying detail",
      "Built to sit inside your existing reporting cadence, not replace it",
    ],
    accent: "gold",
  },
  {
    slug: "competitive-benchmarking",
    title: "Competitive & Financial Benchmarking",
    short: "Company financials cross-checked against government filings, not scraped from a single aggregator.",
    description:
      "Where a company files with a securities regulator, we reconcile against the primary filing directly rather than trusting a single financial-data aggregator — and we tell you plainly when a figure is estimated rather than sourced.",
    bullets: [
      "Revenue, margin, and R&D intensity benchmarked across named competitors",
      "Cross-validated against primary filings wherever a company discloses them",
      "Market-share estimates shown with their underlying assumptions, not hidden",
    ],
    accent: "coral",
  },
  {
    slug: "regulatory-patent-tracking",
    title: "Regulatory & Patent Landscape Tracking",
    short: "Structured tracking of the filings and policy shifts that move a market before the headlines do.",
    description:
      "Patent filing velocity and regulatory activity are leading indicators — a cluster of filings around one capability, or a subsidy program landing in a key geography, usually shows up in patent and policy data before it shows up in revenue.",
    bullets: [
      "Patent filing trends by assignee, geography, and technology class",
      "Regulatory and subsidy tracking across the jurisdictions that matter to your market",
      "Flagged as a leading indicator, cross-referenced against the demand forecast",
    ],
    accent: "teal",
  },
  {
    slug: "ai-research-automation",
    title: "AI-Augmented Research Automation",
    short: "The same research engine behind Market Reports, built to scope, ingest, and model any market on demand.",
    description:
      "Our internal research engine ingests government macro data, patent registries, filings, and news in parallel, classifies it, and runs it through the same eight-method sizing model our analysts use by hand — with every output reviewed before it reaches a client.",
    bullets: [
      "Automated ingestion from public data sources, always analyst-reviewed before delivery",
      "Consistent methodology across markets, so comparisons hold up",
      "The engine that powers Market Reports, available for a market built just for you",
    ],
    accent: "gold",
  },
];
