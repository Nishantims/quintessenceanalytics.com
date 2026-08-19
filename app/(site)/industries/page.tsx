import type { Metadata } from "next";
import Link from "next/link";
import { INDUSTRIES } from "@/lib/industries-data";

export const metadata: Metadata = {
  title: "Industries — Quintessence Analytics",
  description:
    "AI agents, automation, and governed decision systems applied to ten industries — healthcare, manufacturing, technology, financial services, retail, energy, sports, automotive, telecom, and government.",
};

const ACCENT_CYCLE = ["blue", "pink", "green"] as const;
const ACCENT_VAR: Record<string, string> = {
  pink: "var(--pink)",
  blue: "var(--blue)",
  green: "var(--green)",
};

export default function IndustriesPage() {
  return (
    <>
      <section className="mx-auto max-w-4xl px-6 pt-20 pb-14 text-center">
        <span className="text-[15px] font-semibold uppercase tracking-wide" style={{ color: "var(--green)" }}>Industries</span>
        <h1 className="mx-auto mt-4 max-w-2xl font-display text-[40px] font-bold leading-[1.1] text-text-primary">
          The same AI methodology,{" "}
          <span style={{ color: "var(--blue)" }}>ten real domains</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-[18px] leading-relaxed text-text-secondary">
          Agent development, evaluation, governance, and automation don&apos;t change discipline by
          industry — what changes is which workflow is worth automating first, and what &quot;governed&quot;
          actually requires. Here&apos;s what that looks like by sector.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((ind, i) => {
            const accent = ACCENT_CYCLE[i % ACCENT_CYCLE.length];
            return (
              <div key={ind.slug} id={ind.slug} className="scroll-mt-24 h-full rounded-2xl border border-border bg-surface p-6">
                <span className="inline-block h-2 w-2 rounded-full" style={{ background: ACCENT_VAR[accent] }} aria-hidden />
                <h2 className="mt-3 font-display text-[17px] font-bold leading-snug text-text-primary">{ind.name}</h2>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-text-secondary">{ind.value}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-28">
        <div className="rounded-3xl px-8 py-16 text-center sm:px-16" style={{ background: "var(--dark-surface)" }}>
          <h2 className="mx-auto max-w-lg font-display text-[28px] font-bold leading-tight text-dark-text">
            Don&apos;t see your industry? The <span style={{ color: "var(--green)" }}>methodology</span>{" "}
            still applies.
          </h2>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full px-7 py-4 text-[14px] font-semibold text-white transition-transform hover:scale-[1.03]"
            style={{ background: "var(--green)" }}
          >
            Tell us your workflow →
          </Link>
        </div>
      </section>
    </>
  );
}
