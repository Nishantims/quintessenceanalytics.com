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
    title: "AI agents & automation",
    body: "Task-oriented agents built with AI-native, Claude-assisted development — the same approach that lets us move in weeks, not quarters.",
    accent: "blue",
  },
  {
    title: "Agent evaluation & assurance",
    body: "Accuracy, hallucination, tool use, and security testing, with a mandatory human review step before anything ships.",
    accent: "pink",
  },
  {
    title: "Governed data pipelines",
    body: "Permission-aware ingestion and retrieval across your existing data sources, built to run on a schedule, not a one-time pull.",
    accent: "green",
  },
  {
    title: "Interactive decision systems",
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
  { title: "Rapid, AI-native delivery", body: "AI-assisted development is how we actually build — real work in weeks, not quarters, without cutting corners on review." },
  { title: "Custom-built, not templated", body: "Built around your specific data and workflow, not a generic template repackaged per client." },
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

export interface TrustPoint {
  title: string;
  body: string;
}

// A bounded, checkable commitment tied to the deliverables actually listed
// on each fixed-scope offer - not an unverifiable "results guaranteed"
// claim, since outcomes depend on the client's own data and adoption, not
// just our delivery.
export const TRUST_POINTS: TrustPoint[] = [
  { title: "Scope-Completion Guarantee", body: "Every deliverable listed on your offer gets delivered — or we keep working at no extra charge until it is." },
  { title: "Fixed-Price, No Surprises", body: "The price you're quoted on the discovery call is the price you pay — nothing added after the fact." },
  { title: "No Long-Term Lock-In", body: "Fixed-scope engagements, not a multi-year contract you can't get out of." },
  { title: "Senior-Analyst Reviewed", body: "Every AI-generated output is reviewed by a senior analyst before it reaches you, without exception." },
  { title: "NDA On Request", body: "Confidentiality terms set before any of your data or workflow details are shared with us." },
  { title: "Global, Dual-Currency", body: "Quoted and billable in USD or INR, for clients anywhere in the world." },
];

export interface ToolExample {
  title: string;
  body: string;
  accent: "pink" | "blue" | "green";
}

// Representative examples of the kind of tool built under the AI Tools
// service line - illustrative of capability and scope, not a claim about a
// specific named client engagement. Real, client-attributed examples
// replace these as engagements clear for publication (same pattern as
// CASE_STUDIES above).
export const TOOLS_WE_BUILD: ToolExample[] = [
  { title: "Support Ticket Triage Agent", body: "Classifies and routes inbound tickets, and drafts a first-response reply for your team to approve.", accent: "blue" },
  { title: "Meeting Notes & Action-Item Extractor", body: "Turns a call recording or transcript into structured notes with owners and due dates.", accent: "pink" },
  { title: "Invoice & Receipt Data Extractor", body: "Pulls line-item data from PDFs and photos straight into a spreadsheet or accounting system.", accent: "green" },
  { title: "Review Response Assistant", body: "Drafts on-brand replies to Google and Yelp reviews for a human to approve before posting.", accent: "blue" },
  { title: "Lead Qualification Agent", body: "Scores and routes inbound leads against your own criteria before they hit a rep's inbox.", accent: "pink" },
  { title: "Internal Knowledge Search", body: "A chat interface over your internal docs and wikis so staff get answers instead of searching folders.", accent: "green" },
  { title: "Sales Proposal Generator", body: "Assembles a first-draft proposal or quote straight from a scoping call transcript.", accent: "blue" },
  { title: "Website Concierge", body: "An FAQ and lead-capture chat widget embedded on your own site, tuned to your offer.", accent: "pink" },
  { title: "Market Opportunity Dashboard", body: "A lightweight, self-serve sizing and scoring view for one product idea, built on our own research engine.", accent: "green" },
  { title: "AI Audit-Trail Logger", body: "Tracks which AI systems you run, who has access, and flags permissions that have gone stale.", accent: "blue" },
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
    question: "What if our workflow doesn't fit one of the six services?",
    answer:
      "Tell us the workflow or decision, not which service you think it maps to — we scope the engagement around the actual problem, not a fixed deliverable template.",
  },
  {
    question: "Can we start with something small before a full engagement?",
    answer:
      "Yes — the AI Readiness Assessment is built for exactly that: a fixed-scope, 2-3 week engagement that maps the real opportunity before you commit to a pilot.",
  },
  {
    question: "How is AI-assisted development different from a generic AI wrapper?",
    answer:
      "We build with Claude and modern AI development tooling because it's the fastest, most reliable way to ship a real agent or automation today — the same senior-analyst review and evaluation methodology applies regardless of how the code gets written.",
  },
];
