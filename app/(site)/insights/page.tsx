import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Insights — Quintessence Analytics",
  description:
    "AI agent, assurance, and governance explainers, case studies, and field notes from Quintessence Analytics.",
};

export default function InsightsPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 pt-20 pb-28 text-center">
      <span className="text-[15px] font-semibold uppercase tracking-wide" style={{ color: "var(--blue)" }}>Insights</span>
      <h1 className="mx-auto mt-4 max-w-xl font-display text-[36px] font-bold leading-[1.15] text-text-primary">
        The first articles are{" "}
        <span style={{ color: "var(--pink)" }}>in progress</span>
      </h1>
      <p className="mx-auto mt-5 max-w-md text-[17px] leading-relaxed text-text-secondary">
        We&apos;re publishing real field notes on AI agents, evaluation, and governance as engagements
        wrap — not generic &quot;AI is changing the world&quot; content. Check back soon, or ask us directly.
      </p>
      <Link
        href="/contact"
        className="mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[14px] font-semibold text-white transition-transform hover:scale-[1.03]"
        style={{ background: "var(--blue)" }}
      >
        Ask us a question →
      </Link>
    </section>
  );
}
