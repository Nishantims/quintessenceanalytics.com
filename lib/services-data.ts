export interface Service {
  slug: string;
  title: string;
  short: string;
  description: string;
  bullets: string[];
  accent: "pink" | "blue" | "green";
}

// Twelve core AI analytics services, per the client's content plan.
export const SERVICES: Service[] = [
  {
    slug: "predictive-analytics",
    title: "Predictive Analytics",
    short: "Forecasts built driver-by-driver, so you can see exactly what's moving the number.",
    description:
      "We decompose a forecast into its individual drivers and restraints — demand shifts, cost pressure, adoption curves — and quantify each one's contribution, so the final prediction is explainable, not a black box.",
    bullets: [
      "Driver-level forecast breakdowns showing what's adding or subtracting from the number",
      "Scenario modelling (bull / base / bear) grounded in the same factor set",
      "Ongoing re-forecasting as new data lands, not a one-time snapshot",
    ],
    accent: "blue",
  },
  {
    slug: "decision-intelligence",
    title: "Decision Intelligence",
    short: "The layer between raw analytics and an actual decision — what to do, not just what happened.",
    description:
      "Dashboards tell you what happened. Decision intelligence goes one step further: it models the trade-offs between your realistic options and quantifies what each one is likely to cost or return, so a decision-maker is choosing between outcomes, not staring at a chart.",
    bullets: [
      "Option-by-option trade-off modelling, not just a single recommended path",
      "Confidence bands on every projected outcome, not false precision",
      "Built to sit inside an existing decision cadence, not replace it",
    ],
    accent: "pink",
  },
  {
    slug: "market-intelligence",
    title: "Market Intelligence",
    short: "Bespoke market sizing and competitive positioning, triangulated across independent methods.",
    description:
      "Every market-intelligence engagement runs demand-side, supply-side, and bottom-up models in parallel, cross-checked against trade flow and macroeconomic data, then reconciled into one number with a stated confidence band.",
    bullets: [
      "TAM / SAM / SOM sizing with a stated confidence interval, not a single point estimate",
      "Segment, region, and country-level breakdowns built from the same underlying model",
      "Competitive benchmarking cross-validated against primary filings where they exist",
    ],
    accent: "green",
  },
  {
    slug: "customer-analytics",
    title: "Customer Analytics",
    short: "Segmentation and behavior models built on what your customers actually do, not survey guesses.",
    description:
      "We build customer segments from observed behavior — usage, spend, churn signals — rather than static demographic buckets, so the segments actually predict what a customer will do next.",
    bullets: [
      "Behavior-based segmentation, refreshed as usage patterns shift",
      "Churn and lifetime-value modelling tied to specific, actionable triggers",
      "Segment-level insight delivered in the language your go-to-market team already uses",
    ],
    accent: "blue",
  },
  {
    slug: "operational-analytics",
    title: "Operational Analytics",
    short: "Turning operational data into the handful of levers that actually move efficiency.",
    description:
      "Operations generate enormous amounts of data that mostly goes unused. We identify the small number of metrics that actually predict downtime, delay, or cost overrun, and build monitoring around those specifically.",
    bullets: [
      "Root-cause analysis tied to real operational data, not anecdote",
      "Leading-indicator dashboards built around metrics that predict problems early",
      "Designed to integrate with the operational systems you already run",
    ],
    accent: "pink",
  },
  {
    slug: "financial-risk-analytics",
    title: "Financial & Risk Analytics",
    short: "Risk, fraud, and compliance models grounded in real transaction and filing data.",
    description:
      "We build risk-scoring and anomaly-detection models cross-validated against primary financial data — not a single vendor's black-box score — so a risk flag comes with the evidence behind it, not just a number.",
    bullets: [
      "Anomaly and fraud detection models tuned to your actual transaction patterns",
      "Compliance-ready audit trails showing exactly why a risk score was assigned",
      "Cross-validated against primary filings wherever a counterparty discloses them",
    ],
    accent: "green",
  },
  {
    slug: "executive-dashboards",
    title: "Executive Dashboards",
    short: "Interactive dashboards your team can actually filter, not a static slide deck stale in a quarter.",
    description:
      "We build living dashboards — filterable by scenario, region, segment, and time period — so a leadership team can ask a new question the day after delivery instead of waiting on the next engagement for an answer.",
    bullets: [
      "Real-time filtering by scenario, geography, segment, and time period",
      "Exportable, board-ready views without losing the underlying detail",
      "Built to sit inside your existing reporting cadence, not replace it",
    ],
    accent: "blue",
  },
  {
    slug: "generative-ai-solutions",
    title: "Generative AI Solutions",
    short: "AI-generated analysis and content, always reviewed by a human before it reaches a client.",
    description:
      "We deploy generative AI for the parts of analysis it's actually good at — drafting narrative from structured data, summarizing large document sets, surfacing patterns across unstructured text — with a human review step on everything before it ships.",
    bullets: [
      "AI-drafted narrative and summaries grounded in your real underlying data",
      "Human review on every generated output before delivery, without exception",
      "Built for repeatable use, not a one-off proof of concept",
    ],
    accent: "pink",
  },
  {
    slug: "ai-process-automation",
    title: "AI Process Automation",
    short: "Automating the repetitive analysis work that eats analyst time without adding judgment.",
    description:
      "A meaningful share of analyst time goes to repetitive data pulls, reconciliation, and first-pass classification. We automate that layer specifically, freeing analysts to spend their time on the judgment calls automation can't make.",
    bullets: [
      "Automated data ingestion and reconciliation across your existing sources",
      "First-pass classification and tagging, with exceptions routed to a human",
      "Measured in analyst hours actually freed up, not just \"efficiency\"",
    ],
    accent: "green",
  },
  {
    slug: "custom-ai-consulting",
    title: "Custom AI Consulting",
    short: "The research engine behind Market Reports, adapted to a market or problem built just for you.",
    description:
      "Where the nine disciplines above don't quite fit the shape of your problem, we scope a custom engagement directly — the same triangulated methodology and analyst-reviewed AI pipeline, built around the specific question you're trying to answer.",
    bullets: [
      "Scoped around your actual decision, not a fixed deliverable template",
      "The same AI research engine that powers Market Reports, applied to your problem",
      "Every output analyst-reviewed before it reaches you, at every tier",
    ],
    accent: "blue",
  },
  {
    slug: "marketing-growth-analytics",
    title: "Marketing & Growth Analytics",
    short: "Attribution and funnel models that show which spend is actually driving growth.",
    description:
      "Most attribution models overstate the channel that happened to touch a customer last. We build multi-touch models tied to real conversion data, so budget moves toward what's actually driving growth instead of what's easiest to claim credit for.",
    bullets: [
      "Multi-touch attribution grounded in real conversion and revenue data",
      "Funnel and cohort analysis that isolates where growth is actually lost",
      "Campaign-level ROI modelling built for reallocating budget, not just reporting it",
    ],
    accent: "pink",
  },
  {
    slug: "data-engineering-ai-infrastructure",
    title: "Data Engineering & AI Infrastructure",
    short: "The pipelines, warehousing, and MLOps layer that makes everything above possible.",
    description:
      "Every analytics or AI deliverable is only as reliable as the pipeline feeding it. We design and build the ingestion, warehousing, and model-deployment infrastructure underneath — so dashboards stay current and models stay production-ready, not stuck in a notebook.",
    bullets: [
      "Ingestion and warehousing pipelines built for your actual data volume and cadence",
      "MLOps and model-deployment infrastructure that moves models from notebook to production",
      "Built to support every other service on this list, not a standalone project",
    ],
    accent: "green",
  },
];
