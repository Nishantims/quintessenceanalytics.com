export type Accent = "pink" | "blue" | "green" | "purple" | "orange";

export interface Industry {
  slug: string;
  name: string;
  value: string;
  accent: Accent;
}

export const INDUSTRIES: Industry[] = [
  { slug: "healthcare-pharma", name: "Healthcare & Pharma", value: "Clinical documentation agents, patient-intake automation, and evaluated AI for regulated decisions.", accent: "pink" },
  { slug: "manufacturing", name: "Manufacturing", value: "Predictive-maintenance agents and shop-floor workflow automation with a human approval step.", accent: "blue" },
  { slug: "technology", name: "Technology", value: "AI agent development, RAG knowledge systems, and evaluation infrastructure for SaaS products.", accent: "green" },
  { slug: "financial-services", name: "Financial Services", value: "Risk and compliance agents with full audit trails, governed under an independent assurance layer.", accent: "purple" },
  { slug: "retail-ecommerce", name: "Retail & E-commerce", value: "Customer-service agents, demand-forecasting decision systems, and order-workflow automation.", accent: "orange" },
  { slug: "energy-utilities", name: "Energy & Utilities", value: "Asset-monitoring agents and automated reporting workflows for sustainability and compliance.", accent: "green" },
  { slug: "sports", name: "Sports", value: "Performance and fan-engagement decision systems built on your own real event data.", accent: "pink" },
  { slug: "automotive-mobility", name: "Automotive & Mobility", value: "Supply-chain agents and connected-mobility data pipelines feeding real-time decision systems.", accent: "blue" },
  { slug: "telecommunications", name: "Telecommunications", value: "Network-monitoring agents and churn-prediction decision systems tied to real usage signals.", accent: "orange" },
  { slug: "government-smart-cities", name: "Government & Smart Cities", value: "Citizen-service automation and policy-analytics decision systems, governed and auditable end to end.", accent: "purple" },
];
