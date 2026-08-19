import type { Metadata } from "next";
import Link from "next/link";
import { AiProductCard } from "@/components/AiProductCard";
import { AI_PRODUCTS, ENTERPRISE_PRODUCTS } from "@/lib/ai-products-data";

export const metadata: Metadata = {
  title: "Pricing — Quintessence Analytics",
  description:
    "Three fixed-scope entry offers starting from $1,200 / ₹1L, expanding into enterprise AI implementation and continuous monitoring engagements from $6,000 / ₹5L+.",
};

export default function PricingPage() {
  return (
    <>
      <section className="mx-auto max-w-4xl px-6 pt-20 pb-14 text-center">
        <span className="text-[15px] font-semibold uppercase tracking-wide" style={{ color: "var(--pink)" }}>Pricing</span>
        <h1 className="mx-auto mt-4 max-w-2xl font-display text-[40px] font-bold leading-[1.1] text-text-primary">
          Start small, fixed-scope. Expand once the{" "}
          <span style={{ color: "var(--blue)" }}>ROI is proven</span>.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-[18px] leading-relaxed text-text-secondary">
          No undefined consulting engagements. Every offer below has a starting price, a real delivery
          window, and a specific list of what you get — anywhere in the world.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 items-stretch">
          {AI_PRODUCTS.map((product) => (
            <AiProductCard key={product.name} product={product} />
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center text-[13px] leading-relaxed text-text-muted">
          These are starting prices, not fixed-scope promises — final pricing depends on your data,
          integrations, the number of workflows or agents involved, and security requirements. You&apos;ll
          get a specific number during the discovery call, before anything is billed.
        </p>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <div className="text-center">
            <span className="text-[15px] font-semibold uppercase tracking-wide" style={{ color: "var(--green)" }}>
              The expansion path
            </span>
            <h2 className="mx-auto mt-3 max-w-lg font-display text-[30px] font-bold leading-tight text-text-primary">
              Starter assessment → pilot →{" "}
              <span style={{ color: "var(--blue)" }}>enterprise implementation</span> → monitoring
            </h2>
          </div>
          <div className="mt-12 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface-raised">
            {ENTERPRISE_PRODUCTS.map((p) => (
              <div key={p.name} className="grid gap-3 p-6 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-6">
                <div>
                  <h3 className="font-display text-[16px] font-bold text-text-primary">{p.name}</h3>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-text-secondary">{p.deliverables}</p>
                </div>
                <div className="shrink-0 text-left sm:text-right">
                  <p className="font-data text-[17px] font-semibold text-text-primary">{p.priceUsd}</p>
                  <p className="text-[12px] text-text-muted">{p.priceInr} · {p.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="rounded-3xl px-8 py-16 text-center sm:px-16" style={{ background: "var(--dark-surface)" }}>
          <h2 className="mx-auto max-w-lg font-display text-[28px] font-bold leading-tight text-dark-text">
            Not sure which offer fits? Tell us the{" "}
            <span style={{ color: "var(--pink)" }}>problem</span> — we&apos;ll scope it in one call.
          </h2>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full px-7 py-4 text-[14px] font-semibold text-white transition-transform hover:scale-[1.03]"
            style={{ background: "var(--pink)" }}
          >
            Book an AI Assessment →
          </Link>
        </div>
      </section>
    </>
  );
}
