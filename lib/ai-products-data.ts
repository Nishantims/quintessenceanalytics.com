export interface AiProduct {
  name: string;
  tagline: string;
  price: string;
  features: string[];
  accent: "pink" | "blue" | "purple";
  featured?: boolean;
}

// Illustrative pricing — replace with real figures before launch.
export const AI_PRODUCTS: AiProduct[] = [
  {
    name: "AI Insight Starter",
    tagline: "Affordable, self-serve AI dashboards for teams testing the waters before committing to a full engagement.",
    price: "From $499/mo",
    features: [
      "AI-generated market summaries for up to 3 tracked markets",
      "Self-serve dashboard with monthly refresh",
      "Email support, standard turnaround",
    ],
    accent: "blue",
  },
  {
    name: "AI Decision Copilot",
    tagline: "A managed AI-driven decision system embedded directly into your existing planning workflow.",
    price: "From $2,500/mo",
    features: [
      "Real-time scenario modelling (bull / base / bear)",
      "Dedicated analyst review on every AI-generated output",
      "API access for your own BI tools",
    ],
    accent: "pink",
    featured: true,
  },
  {
    name: "Enterprise Intelligence Partner",
    tagline: "The full, white-glove partnership — our top-tier offering for organizations where the decision is high-stakes.",
    price: "Custom pricing",
    features: [
      "Bespoke research engagements across unlimited markets",
      "Direct access to a senior analyst team",
      "Priority delivery and board-ready presentation support",
    ],
    accent: "purple",
  },
];
