import Link from "next/link";
import type { Service } from "@/lib/services-data";

const ACCENT_VAR: Record<Service["accent"], string> = {
  coral: "var(--coral)",
  teal: "var(--teal)",
  gold: "var(--gold)",
};

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  const accent = ACCENT_VAR[service.accent];
  return (
    <Link
      href={`/services#${service.slug}`}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-surface p-7 transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_hsl(var(--shadow-color)/0.35)]"
    >
      <div
        className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
        style={{ background: accent }}
      />
      <div>
        <span className="font-data text-[12px] text-text-muted">{String(index + 1).padStart(2, "0")}</span>
        <h3 className="mt-3 font-display text-[19px] font-semibold leading-snug text-text-primary">
          {service.title}
        </h3>
        <p className="mt-3 text-[14px] leading-relaxed text-text-secondary">{service.short}</p>
      </div>
      <div className="mt-6 flex items-center gap-1.5 text-[13px] font-semibold" style={{ color: accent }}>
        Learn more
        <span className="transition-transform group-hover:translate-x-1" aria-hidden>→</span>
      </div>
    </Link>
  );
}
