export interface Service {
  slug: string;
  title: string;
  short: string;
  description: string;
  bullets: string[];
  accent: "pink" | "blue" | "green";
}

// Six core AI services, repositioned from the prior twelve-discipline
// "AI analytics & decision intelligence" catalog toward a focused Enterprise
// AI Solutions & AI Assurance offering. Market Intelligence and Competitive
// Benchmarking have moved off this primary list — that capability continues
// under Market Reports (see the homepage's Market Reports section), not as
// a QA.com service in its own right.
export const SERVICES: Service[] = [
  {
    slug: "ai-agent-development",
    title: "AI Agent Development & Automation",
    short: "Task-oriented AI agents that retrieve information, use approved tools, and execute real work.",
    description:
      "We build enterprise AI agents that do a specific job end to end — retrieve the right information, call the tools they're authorized to use, execute a workflow, and escalate to a human exactly where the rules say they should. Not a chatbot demo — a system that finishes the task.",
    bullets: [
      "HR, finance, IT support, customer service, procurement, and document-processing agents",
      "Tool use and system integrations scoped to what the agent is actually authorized to touch",
      "Human escalation built in at the decision points that call for it, not bolted on after launch",
    ],
    accent: "blue",
  },
  {
    slug: "ai-agent-quality-evaluation",
    title: "AI Agent Quality & Evaluation",
    short: "Test AI before your customers do — accuracy, hallucination, security, and production readiness.",
    description:
      "Before an agent goes near a real customer or a real decision, we test it the way its failure modes actually show up: accuracy, hallucination rate, task completion, tool-use correctness, prompt-injection resistance, data leakage, policy compliance, cost, and latency — scored, not asserted.",
    bullets: [
      "A test suite and evaluation scorecard built around your agent's actual failure modes",
      "A named Production Readiness status, not a vague 'looks good to us'",
      "One-time assessments or recurring evaluation as the agent and its usage evolve",
    ],
    accent: "pink",
  },
  {
    slug: "ai-governance-risk",
    title: "AI Governance & Risk",
    short: "An independent assurance layer for the AI and agents you're already running.",
    description:
      "Once AI is in production, someone has to be able to answer who owns it, what it can access, and what happens when it's wrong. We build the AI/agent inventory, permissions review, oversight policy, and audit trail that makes an enterprise AI deployment defensible, not just functional.",
    bullets: [
      "A real AI/agent inventory — what's running, who owns it, what data it can touch",
      "Human-oversight policy, incident response, and lifecycle controls, not a policy PDF nobody follows",
      "Built as an independent check, not graded by the same team that built the agent",
    ],
    accent: "green",
  },
  {
    slug: "ai-workflow-automation",
    title: "AI Workflow Automation",
    short: "Automating one real, repetitive, rule-heavy process end to end — proven before it scales.",
    description:
      "We automate the specific process that's currently eating the most manual hours — invoice validation and approval, email triage into your CRM, document review and routing — combining AI judgment with your existing systems and a human approval step, then measure it before asking you to trust it with more.",
    bullets: [
      "One workflow automated end to end first, with integrations into the systems you already run",
      "A human approval path built into the flow, not removed for the sake of a demo",
      "A measurement dashboard showing exactly what the automation is and isn't handling",
    ],
    accent: "blue",
  },
  {
    slug: "ai-data-knowledge-systems",
    title: "AI Data & Knowledge Systems",
    short: "Turning your documents and data into something an AI agent can actually search and trust.",
    description:
      "An AI agent is only as good as what it can retrieve. We build the ingestion, retrieval (RAG), and permission-aware knowledge layer underneath — so answers are grounded in your real documents and data, respect who's allowed to see what, and cite where they came from.",
    bullets: [
      "Enterprise document ingestion and permission-aware retrieval, not a flat unsearchable dump",
      "Source-grounded responses your team can actually verify, not confident-sounding guesses",
      "Built to support the agents and automations above, not a standalone science project",
    ],
    accent: "pink",
  },
  {
    slug: "ai-decision-systems",
    title: "AI Decision Systems",
    short: "Predictive analytics and dashboards, packaged as a decision system, not a static report.",
    description:
      "The forecasting and dashboard work Quintessence Analytics already does well doesn't disappear — it becomes one more input into the same decision architecture: monitor the real signal, analyze it, predict what's coming, recommend the move, alert when something changes, and act — with a senior analyst reviewing every AI-generated output before it reaches you.",
    bullets: [
      "Driver-level forecasts with the assumptions attached, not a single unexplained number",
      "Interactive, filterable dashboards built to be queried, not a static export",
      "Every AI output reviewed by a senior analyst before it ever reaches a client",
    ],
    accent: "green",
  },
];
