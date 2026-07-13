import Link from "next/link";
import type { AiProduct } from "@/lib/ai-products-data";

const ACCENT_VAR: Record<AiProduct["accent"], string> = {
  pink: "var(--pink)",
  blue: "var(--blue)",
  purple: "var(--purple)",
};

export function AiProductCard({ product }: { product: AiProduct }) {
  const accent = ACCENT_VAR[product.accent];
  return (
    <div
      className="relative flex flex-col rounded-2xl border p-7"
      style={{
        borderColor: product.featured ? accent : "var(--border)",
        borderWidth: product.featured ? 2 : 1,
        background: "var(--surface)",
      }}
    >
      {product.featured && (
        <span
          className="absolute -top-3 left-7 rounded-full px-3 py-1 text-[11px] font-semibold text-white"
          style={{ background: accent }}
        >
          Most popular
        </span>
      )}
      <h3 className="font-display text-[19px] font-semibold text-text-primary">{product.name}</h3>
      <p className="mt-2 text-[13.5px] leading-relaxed text-text-secondary">{product.tagline}</p>
      <p className="mt-5 font-data text-[24px] font-semibold text-text-primary">{product.price}</p>
      <ul className="mt-5 flex-1 space-y-2.5">
        {product.features.map((f) => (
          <li key={f} className="flex gap-2.5 text-[13.5px] leading-relaxed text-text-primary">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: accent }} aria-hidden />
            {f}
          </li>
        ))}
      </ul>
      <Link
        href="/contact"
        className="mt-7 rounded-full py-3 text-center text-[13.5px] font-semibold text-white transition-transform hover:scale-[1.02]"
        style={{ background: accent }}
      >
        Get started
      </Link>
    </div>
  );
}
