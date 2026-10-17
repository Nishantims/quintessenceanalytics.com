import type { ReactNode } from "react";

// Shared layout for the Privacy Policy and Terms pages: one reading column, numbered sections.
export interface LegalSection {
  heading: string;
  body: ReactNode;
}

export function LegalPage({ title, intro, updated, sections }: { title: string; intro: ReactNode; updated: string; sections: LegalSection[] }) {
  return (
    <article className="mx-auto max-w-3xl px-6 pt-20 pb-24">
      <span className="text-[15px] font-semibold uppercase tracking-wide text-blue-ink">Legal</span>
      <h1 className="mt-4 font-display text-[40px] font-bold leading-[1.1] text-text-primary">{title}</h1>
      <p className="mt-3 text-[13px] text-text-muted">Last updated: {updated}</p>
      <div className="mt-6 text-[16px] leading-relaxed text-text-secondary">{intro}</div>
      <div className="mt-12 space-y-10">
        {sections.map((s, i) => (
          <section key={s.heading}>
            <h2 className="font-display text-[22px] font-bold text-text-primary">
              {i + 1}. {s.heading}
            </h2>
            <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-text-secondary">{s.body}</div>
          </section>
        ))}
      </div>
    </article>
  );
}

export function Bullets({ items }: { items: ReactNode[] }) {
  return (
    <ul className="list-disc space-y-1.5 pl-5">
      {items.map((it, i) => (
        <li key={i}>{it}</li>
      ))}
    </ul>
  );
}
