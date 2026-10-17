"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { INDUSTRIES, SOLUTIONS, type Industry } from "@/lib/solutions-data";

// The searchable "find your task" grid on /solutions.
export function SolutionsCatalog() {
  const [industry, setIndustry] = useState<Industry | "All">("All");
  const [term, setTerm] = useState("");
  const [quickOnly, setQuickOnly] = useState(false);

  const list = useMemo(() => {
    const t = term.trim().toLowerCase();
    return SOLUTIONS.map((s, i) => ({ s, n: i + 1 })).filter(({ s }) =>
      (industry === "All" || s.industry === industry) &&
      (!quickOnly || s.quick) &&
      (!t || [s.name, s.today, s.build, s.result, s.buyers, s.industry].join(" ").toLowerCase().includes(t)));
  }, [industry, term, quickOnly]);

  const chip = (active: boolean) =>
    `rounded-full border px-3.5 py-1.5 text-[13px] font-semibold transition-colors ${active ? "border-text-primary bg-text-primary text-paper" : "border-border text-text-secondary hover:border-pink hover:text-text-primary"}`;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label htmlFor="solution-search" className="sr-only">Search by task, industry or tool</label>
        <input
          id="solution-search"
          type="search"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search a task: invoices, product photos, WhatsApp, listings…"
          className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-[15px] text-text-primary outline-none transition-colors focus:border-pink sm:max-w-md"
        />
        <label className="flex items-center gap-2 text-[14px] text-text-secondary">
          <input id="quick-only" type="checkbox" checked={quickOnly} onChange={(e) => setQuickOnly(e.target.checked)} className="h-4 w-4 accent-[var(--pink)]" />
          Quick pilots only
        </label>
      </div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by industry">
        {(["All", ...INDUSTRIES] as const).map((i) => (
          <button key={i} type="button" aria-pressed={industry === i} onClick={() => setIndustry(i)} className={chip(industry === i)}>
            {i}
          </button>
        ))}
      </div>
      <p className="font-data text-[12px] text-text-muted">{list.length} of {SOLUTIONS.length} shown</p>

      {list.length ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map(({ s, n }) => (
            <article key={s.name} className="flex min-w-0 flex-col gap-3 rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-blue">
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-[11px] font-semibold uppercase tracking-wide text-blue-ink">{s.industry}</span>
                <span className="font-data text-[11px] text-text-muted">{String(n).padStart(3, "0")}</span>
              </div>
              <h3 className="font-display text-[18px] font-bold leading-snug text-text-primary">{s.name}</h3>
              <dl className="grid gap-2 text-[14px] leading-relaxed">
                <div><dt className="text-[11px] font-semibold uppercase tracking-wide text-text-muted">Today</dt><dd className="text-text-secondary">{s.today}</dd></div>
                <div><dt className="text-[11px] font-semibold uppercase tracking-wide text-text-muted">We build</dt><dd className="text-text-secondary">{s.build}</dd></div>
                <div><dt className="text-[11px] font-semibold uppercase tracking-wide text-text-muted">You get</dt><dd className="text-text-primary">{s.result}</dd></div>
              </dl>
              <div className="mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-dashed border-border pt-3 text-[12px] text-text-muted">
                <span>{s.buyers}</span>
                <span className="font-data">priced {s.unit}</span>
              </div>
              {s.quick && <span className="self-start rounded-full px-2.5 py-0.5 text-[11px] font-semibold" style={{ background: "color-mix(in srgb, var(--pink) 15%, transparent)", color: "var(--pink-ink)" }}>Quick pilot</span>}
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-border p-8 text-center text-[15px] text-text-secondary">
          No match yet. Tell us the task and we will tell you how we would automate it.{" "}
          <Link href="/contact" className="font-semibold text-blue-ink hover:underline">Describe your task →</Link>
        </div>
      )}
    </div>
  );
}
