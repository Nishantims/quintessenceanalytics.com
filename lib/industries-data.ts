export interface Industry {
  name: string;
  value: string;
}

export const INDUSTRIES: Industry[] = [
  { name: "Healthcare & Pharma", value: "Clinical analytics, commercialization, and patient insights." },
  { name: "Manufacturing", value: "Predictive maintenance and operational efficiency." },
  { name: "Technology", value: "AI products, customer intelligence, and SaaS analytics." },
  { name: "Financial Services", value: "Risk, fraud, compliance, and forecasting." },
  { name: "Retail & E-commerce", value: "Demand forecasting, pricing, and customer analytics." },
  { name: "Energy & Utilities", value: "Asset optimization and sustainability." },
  { name: "Sports", value: "Player performance, fan engagement, and sponsorship analytics." },
  { name: "Automotive & Mobility", value: "EV analytics, connected mobility, and supply chain." },
  { name: "Telecommunications", value: "Network analytics and churn prediction." },
  { name: "Government & Smart Cities", value: "Urban intelligence and policy analytics." },
];
