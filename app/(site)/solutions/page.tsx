import type { Metadata } from "next";
import Link from "next/link";
import { SolutionsCatalog } from "@/components/SolutionsCatalog";
import { SOLUTIONS } from "@/lib/solutions-data";

export const metadata: Metadata = {
  title: "Solutions — 100 tasks we automate | Quintessence Analytics",
  description:
    "Find the task your team repeats every day - product listings, catalogue images, invoice matching, WhatsApp enquiries, reports - and see how Quintessence Analytics automates it. Pilots from $1,000.",
  alternates: { canonical: "/solutions" },
};

const STEPS = [
  { title: "Free task audit", body: "A 30-minute call. We list the tasks your team repeats most, how often, and pick the one to automate first.", accent: "var(--pink)" },
  { title: "Pilot on your own data", body: "We automate that one task with your real products, invoices or messages, and your team checks every result. From $1,000.", accent: "var(--blue)" },
  { title: "We run it for you", body: "Once it works, we keep it running and improving for a monthly fee or a price per item, so the cost grows only with your volume.", accent: "var(--green)" },
];

export default function SolutionsPage() {
  return (
    <>
      <section className="mx-auto max-w-4xl px-6 pt-20 pb-12 text-center">
        <span className="text-[15px] font-semibold uppercase tracking-wide" style={{ color: "var(--pink)" }}>Solutions</span>
        <h1 className="mx-auto mt-4 max-w-2xl font-display text-[40px] font-bold leading-[1.1] text-text-primary">
          Name the task your team repeats. <span style={{ color: "var(--blue)" }}>We automate it.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-[18px] leading-relaxed text-text-secondary">
          Writing hundreds of product listings. Photographing every new design on a model. Matching supplier
          invoices to deliveries. Answering the same questions on WhatsApp all day. Below are {SOLUTIONS.length} tasks
          we build AI systems for, grouped by industry. Search for yours.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/contact" className="rounded-full px-6 py-3 text-[14px] font-semibold text-white transition-transform hover:scale-[1.02]" style={{ background: "var(--pink)" }}>
            Book a free task audit
          </Link>
          <a href="#catalogue" className="rounded-full border border-border px-6 py-3 text-[14px] font-semibold text-text-primary hover:border-pink">
            Find your task
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-16">
        <div className="grid gap-4 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <div key={s.title} className="rounded-2xl border border-border bg-surface p-6">
              <span className="font-data text-[13px]" style={{ color: s.accent }}>Step {i + 1}</span>
              <h2 className="mt-2 font-display text-[20px] font-bold text-text-primary">{s.title}</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-text-secondary">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="catalogue" className="mx-auto max-w-6xl scroll-mt-24 px-6 pb-20">
        <h2 className="font-display text-[28px] font-bold text-text-primary">Find your task</h2>
        <p className="mt-2 max-w-2xl text-[16px] text-text-secondary">
          Each card shows what your team does today, what we build and what you get. Tasks marked &quot;Quick pilot&quot; are
          small first projects that can usually run on your own data within a few weeks.
        </p>
        <div className="mt-8">
          <SolutionsCatalog />
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-24">
        <div className="rounded-3xl border border-border bg-surface p-10 text-center">
          <h2 className="font-display text-[26px] font-bold text-text-primary">Your task is not on the list?</h2>
          <p className="mx-auto mt-3 max-w-xl text-[16px] leading-relaxed text-text-secondary">
            If your team does it the same way many times a week, it can most likely be automated. Describe it in a few
            lines and we will reply with how we would build it and what it would cost.
          </p>
          <Link href="/contact" className="mt-6 inline-block rounded-full px-6 py-3 text-[14px] font-semibold text-white" style={{ background: "var(--pink)" }}>
            Describe your task
          </Link>
        </div>
      </section>
    </>
  );
}
