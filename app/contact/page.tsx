import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact — Quintessence Analytics",
  description: "Start a conversation with Quintessence Analytics about a custom research or analytics engagement.",
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <span className="text-[13px] font-semibold uppercase tracking-wide text-teal-ink">Contact</span>
          <h1 className="mt-4 font-display text-[36px] font-semibold leading-[1.12] text-text-primary">
            Bring us the question. We&apos;ll bring the evidence.
          </h1>
          <p className="mt-5 text-[15px] leading-relaxed text-text-secondary">
            Tell us the market, the timeframe, and what&apos;s riding on the answer. An analyst will
            reply within one business day with next steps — no automated sales sequence.
          </p>

          <div className="mt-10 space-y-6 border-t border-border pt-8">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-wide text-text-muted">Email</p>
              <a href="mailto:contact@market-reports.com" className="mt-1 block text-[15px] font-semibold text-text-primary hover:text-coral">
                contact@market-reports.com
              </a>
            </div>
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-wide text-text-muted">Already know your market?</p>
              <a href="https://market-reports.com" target="_blank" rel="noopener noreferrer" className="mt-1 block text-[15px] font-semibold text-teal-ink hover:underline">
                Browse Market Reports ↗
              </a>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-surface p-8 sm:p-10">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
