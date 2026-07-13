import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — Quintessence Analytics",
  description:
    "Quintessence Analytics is a data and market-intelligence consultancy, and the parent company of Market Reports.",
};

const PRINCIPLES = [
  {
    title: "Show the reasoning, not just the number",
    body: "A forecast without its assumptions is an opinion with better formatting. Every figure we deliver comes with the driver behind it.",
    accent: "pink",
  },
  {
    title: "Cross-validate before you trust",
    body: "One data source is a claim. Two independent sources that agree are evidence. We reconcile against primary filings wherever they exist rather than trusting a single aggregator.",
    accent: "blue",
  },
  {
    title: "Say plainly what you don't know",
    body: "A confidence band is more honest than false precision. Where the evidence is thin, we say so instead of quietly rounding to a clean number.",
    accent: "purple",
  },
];

const ACCENT_VAR: Record<string, string> = {
  pink: "var(--pink)",
  blue: "var(--blue)",
  purple: "var(--purple)",
};

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto max-w-4xl px-6 pt-20 pb-16 text-center">
        <span className="text-[13px] font-semibold uppercase tracking-wide text-blue-ink">About</span>
        <h1 className="mx-auto mt-4 max-w-2xl font-display text-[40px] font-semibold leading-[1.1] text-text-primary">
          We built the research engine first, then the reports on top of it.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-text-secondary">
          Quintessence Analytics is a data and market-intelligence consultancy. Market Reports — our
          subscription platform of syndicated industry reports — is the first product built on top of
          our research methodology. This page exists because the methodology is the product, whichever
          form it ships in.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="grid gap-10 rounded-3xl border border-border bg-surface p-10 lg:grid-cols-2 lg:p-14">
          <div>
            <h2 className="font-display text-[24px] font-semibold text-text-primary">Why &quot;Quintessence&quot;</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-text-secondary">
              The word originally meant the fifth element — the pure substance left once everything
              inessential has been stripped away. That&apos;s the job: a market throws off an enormous
              amount of noise — press releases, analyst notes, social sentiment, half-finished patent
              filings. Our work is separating the signal in that noise from the noise itself, and being
              honest about which is which.
            </p>
          </div>
          <div>
            <h2 className="font-display text-[24px] font-semibold text-text-primary">Why we also sell reports</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-text-secondary">
              A custom engagement is expensive to run for every market that exists. Market Reports is how
              we make the same triangulated methodology available off the shelf, for the markets common
              enough that a syndicated report already answers the question — without waiting on a bespoke
              engagement.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <span className="text-[13px] font-semibold uppercase tracking-wide" style={{ color: "var(--pink)" }}>
          How we hold ourselves accountable
        </span>
        <h2 className="mt-3 max-w-lg font-display text-[30px] font-semibold leading-tight text-text-primary">
          Three principles that don&apos;t change per engagement
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {PRINCIPLES.map((p) => (
            <div key={p.title} className="rounded-2xl border border-border bg-surface p-7">
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ background: ACCENT_VAR[p.accent] }}
                aria-hidden
              />
              <h3 className="mt-4 font-display text-[18px] font-semibold leading-snug text-text-primary">
                {p.title}
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-text-secondary">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-28">
        <div className="grid items-center gap-8 rounded-3xl border border-border bg-surface p-10 sm:grid-cols-[1fr_auto] lg:p-14">
          <div>
            <h2 className="font-display text-[24px] font-semibold leading-snug text-text-primary">
              Want to see the methodology in production first?
            </h2>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-text-secondary">
              Market Reports runs on the same engine described throughout this site — browse a live
              report before you commission a custom one.
            </p>
          </div>
          <Link
            href="https://market-reports.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-full px-6 py-3.5 text-[14px] font-semibold text-white transition-transform hover:scale-[1.03]"
            style={{ background: "var(--blue)" }}
          >
            Visit Market Reports ↗
          </Link>
        </div>
      </section>
    </>
  );
}
