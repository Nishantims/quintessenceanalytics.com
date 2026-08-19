export interface Industry {
  slug: string;
  name: string;
  value: string;
}

export const INDUSTRIES: Industry[] = [
  { slug: "healthcare-pharma", name: "Healthcare & Pharma", value: "Clinical documentation agents, patient-intake automation, and evaluated AI for regulated decisions." },
  { slug: "manufacturing", name: "Manufacturing", value: "Predictive-maintenance agents and shop-floor workflow automation with a human approval step." },
  { slug: "technology", name: "Technology", value: "AI agent development, RAG knowledge systems, and evaluation infrastructure for SaaS products." },
  { slug: "financial-services", name: "Financial Services", value: "Risk and compliance agents with full audit trails, governed under an independent assurance layer." },
  { slug: "retail-ecommerce", name: "Retail & E-commerce", value: "Customer-service agents, demand-forecasting decision systems, and order-workflow automation." },
  { slug: "energy-utilities", name: "Energy & Utilities", value: "Asset-monitoring agents and automated reporting workflows for sustainability and compliance." },
  { slug: "sports", name: "Sports", value: "Performance and fan-engagement decision systems built on your own real event data." },
  { slug: "automotive-mobility", name: "Automotive & Mobility", value: "Supply-chain agents and connected-mobility data pipelines feeding real-time decision systems." },
  { slug: "telecommunications", name: "Telecommunications", value: "Network-monitoring agents and churn-prediction decision systems tied to real usage signals." },
  { slug: "government-smart-cities", name: "Government & Smart Cities", value: "Citizen-service automation and policy-analytics decision systems, governed and auditable end to end." },
];
