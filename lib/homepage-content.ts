export interface Outcome {
  title: string;
  body: string;
  accent: "pink" | "blue" | "green";
}

export const OUTCOMES: Outcome[] = [
  {
    title: "Faster decisions",
    body: "A trade-off model with confidence bands replaces a week of back-and-forth analysis with a same-week decision.",
    accent: "blue",
  },
  {
    title: "Fewer surprises",
    body: "Leading-indicator monitoring catches operational and financial anomalies before they show up in a quarterly review.",
    accent: "pink",
  },
  {
    title: "Analyst time back",
    body: "Automating the repetitive first-pass work frees your team to spend its time on judgment calls, not data wrangling.",
    accent: "green",
  },
  {
    title: "Board-ready, every time",
    body: "Dashboards and reports built to be presented as-is, not reworked into a deck the night before a meeting.",
    accent: "blue",
  },
];

export interface CaseStudy {
  industry: string;
  challenge: string;
  approach: string;
  outcome: string;
  accent: "pink" | "blue" | "green";
}

// Representative engagement patterns, not attributed to a specific named
// client — illustrative of the kind of problem and approach, not a claim
// about a real completed project. Replace with real case studies as they
// become available to publish.
export const CASE_STUDIES: CaseStudy[] = [
  {
    industry: "Manufacturing",
    challenge: "Unplanned downtime was eating into margin, with no reliable way to predict which machines were at risk.",
    approach: "Built a predictive-maintenance model on existing sensor data, surfacing risk scores by machine and shift.",
    outcome: "Maintenance shifted from reactive to scheduled, with risk flagged days ahead instead of after failure.",
    accent: "blue",
  },
  {
    industry: "Financial Services",
    challenge: "A single vendor risk score wasn't catching a specific pattern of fraud the team suspected was growing.",
    approach: "Built a custom anomaly-detection model tuned to the client's actual transaction patterns, with a full audit trail.",
    outcome: "Flagged pattern-specific risk the generic score missed, with evidence attached to every flag.",
    accent: "pink",
  },
  {
    industry: "Retail & E-commerce",
    challenge: "Demand forecasts were built on last year's seasonality, missing real shifts in customer behavior.",
    approach: "Rebuilt the forecast on behavior-based segmentation, refreshed on a rolling basis instead of an annual reset.",
    outcome: "Forecast accuracy improved enough to change reorder timing, reducing both stockouts and excess inventory.",
    accent: "green",
  },
];

export interface TechCapability {
  title: string;
  body: string;
  accent: "pink" | "blue" | "green";
}

export const TECH_CAPABILITIES: TechCapability[] = [
  {
    title: "Predictive modelling",
    body: "Driver-level forecasting models, not a single black-box prediction — every projection ships with the assumptions behind it.",
    accent: "blue",
  },
  {
    title: "Generative AI, human-reviewed",
    body: "Large-language-model drafting for narrative and summarization, with a mandatory human review step before anything ships.",
    accent: "pink",
  },
  {
    title: "Automated data pipelines",
    body: "Ingestion and reconciliation across your existing data sources, built to run on a schedule, not a one-time pull.",
    accent: "green",
  },
  {
    title: "Interactive dashboards",
    body: "Filterable by scenario, segment, and time period — a living tool your team can query, not a static export.",
    accent: "blue",
  },
];

export interface WhyPoint {
  title: string;
  body: string;
}

export const WHY_CHOOSE_US: WhyPoint[] = [
  { title: "Business-focused AI", body: "Every model is built around a business decision, not a technology demo." },
  { title: "Industry expertise", body: "Analysts who understand the sector, not just the dataset." },
  { title: "Actionable insights", body: "Every output ships with a recommended next step, not just a chart." },
  { title: "Scalable enterprise solutions", body: "Built to grow from one team's pilot to an organization-wide rollout." },
  { title: "Transparent methodology", body: "You see the assumptions and the model, not a black box you have to trust blindly." },
  { title: "Secure AI", body: "Your data stays yours — models are built on it, never used to train anything shared outside your engagement." },
  { title: "Rapid delivery", body: "Scoped engagements move in weeks, not quarters, without cutting corners on review." },
  { title: "Custom models", body: "Built around your specific data and question, not a generic template repackaged per client." },
  { title: "Executive-ready reporting", body: "Deliverables built to be presented as-is in the room where the decision gets made." },
  { title: "Long-term partnership", body: "Models get re-tuned as your business changes — this isn't a one-time deliverable." },
];

export interface Testimonial {
  quote: string;
  role: string;
}

// Illustrative, role-based attribution — not tied to a specific named
// company or person. Replace with real client testimonials once available.
export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "We stopped guessing which machines needed attention and started knowing, days in advance. That alone paid for the engagement.",
    role: "VP of Operations, Industrial Manufacturer",
  },
  {
    quote: "The model came with its assumptions attached, so when the board asked how we got the number, we actually had an answer.",
    role: "Head of Strategy, Financial Services Firm",
  },
  {
    quote: "It's rare to get a forecast that's actually explainable. Every driver was itemized — that's what made it usable.",
    role: "Director of Analytics, Retail Enterprise",
  },
];

export interface Faq {
  question: string;
  answer: string;
}

export const FAQS: Faq[] = [
  {
    question: "How is this different from hiring a generic AI consultancy?",
    answer:
      "Every engagement is business-focused first — we scope around the decision you're trying to make, not a technology to showcase. And every AI-generated output is reviewed by a senior analyst before it reaches you, without exception.",
  },
  {
    question: "Do you work with our existing data infrastructure?",
    answer:
      "Yes — engagements are built around the data and systems you already run. We don't require a platform migration before we can start delivering value.",
  },
  {
    question: "How long does a typical engagement take?",
    answer:
      "A scoped engagement typically moves in weeks, not quarters. The exact timeline depends on data availability and the complexity of the decision — we'll give you a specific estimate during the discovery call.",
  },
  {
    question: "Is our data used to train models for other clients?",
    answer:
      "No. Models are built specifically on your data, for your engagement. Your data is never used to train anything shared outside your own engagement.",
  },
  {
    question: "What if our market or problem doesn't fit one of the ten services?",
    answer:
      "That's exactly what Custom AI Consulting is for — we scope engagements around the actual question, not a fixed deliverable template.",
  },
  {
    question: "Can we start with something small before a full engagement?",
    answer:
      "Yes — the AI Insight Starter product is built for exactly that: an affordable, self-serve way to see the approach before committing to a full engagement.",
  },
];
