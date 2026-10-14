export interface AiProduct {
  name: string;
  tagline: string;
  duration: string;
  features: string[];
  accent: "pink" | "blue" | "green";
  featured?: boolean;
}

/** The one price the site shows (owner, 2026-10-14): no per-offer prices, every engagement is scoped to the budget. */
export const SERVICES_FROM = "$1,000";

// The entry offers. No per-offer prices on the site: each is scoped and quoted on the discovery call.
export const AI_PRODUCTS: AiProduct[] = [
  {
    name: "AI Readiness Assessment",
    tagline: "Where AI actually pays off in your business, and a 90-day roadmap to get there.",
    duration: "2–3 weeks",
    features: [
      "AI opportunity map scored against your real processes, not a generic checklist",
      "ROI-ranked priorities and a risk review before you commit real budget",
      "A concrete 90-day roadmap you can hand to your team on day one",
    ],
    accent: "blue",
  },
  {
    name: "AI Agent Quality Assessment",
    tagline: "Find out if the AI agent you're about to trust with real work is actually ready.",
    duration: "2–3 weeks",
    features: [
      "A test suite and evaluation scorecard built around your agent's real failure modes",
      "Security, reliability, and prompt-injection checks, not just a happy-path demo",
      "A named production-readiness report you can act on immediately",
    ],
    accent: "pink",
    featured: true,
  },
  {
    name: "AI Automation Pilot",
    tagline: "One real workflow, automated end to end, measured before you scale it.",
    duration: "3–6 weeks",
    features: [
      "One workflow automated end to end with your existing systems, not a proof of concept",
      "A human approval path built into the flow from day one",
      "A measurement dashboard showing exactly what it's handling and what it isn't",
    ],
    accent: "green",
  },
];

export interface EnterpriseProduct {
  name: string;
  duration: string;
  deliverables: string;
}

// The expansion path beyond the three starter offers above - shown on
// /pricing, not the homepage, per the productized-offers structure in the
// blueprint. Quoted per engagement, like the entry offers.
export const ENTERPRISE_PRODUCTS: EnterpriseProduct[] = [
  {
    name: "AI Governance Assessment",
    duration: "2–4 weeks",
    deliverables: "AI/agent inventory, data-access review, controls, risk matrix, governance roadmap.",
  },
  {
    name: "AI Knowledge System Pilot",
    duration: "3–6 weeks",
    deliverables: "Enterprise document ingestion, retrieval/RAG, permissions, evaluation, source-grounded responses.",
  },
  {
    name: "Enterprise AI Implementation",
    duration: "Scoped to the engagement",
    deliverables: "Full agent/automation build-out across multiple workflows, integrated governance, and a measurement layer sized to the business, not the pilot.",
  },
  {
    name: "Continuous Monitoring",
    duration: "Recurring",
    deliverables: "Ongoing evaluation, drift and incident monitoring, and governance upkeep after an implementation ships — the recurring relationship the starter offers lead into.",
  },
];
