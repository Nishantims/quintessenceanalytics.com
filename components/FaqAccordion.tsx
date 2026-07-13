"use client";

import { useState } from "react";
import type { Faq } from "@/lib/homepage-content";

export function FaqAccordion({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-border rounded-2xl border border-border bg-surface">
      {items.map((item, i) => {
        const expanded = open === i;
        return (
          <div key={item.question}>
            <button
              onClick={() => setOpen(expanded ? null : i)}
              aria-expanded={expanded}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="text-[15px] font-semibold text-text-primary">{item.question}</span>
              <span
                className="shrink-0 text-[18px] leading-none text-text-muted transition-transform"
                style={{ transform: expanded ? "rotate(45deg)" : "none" }}
                aria-hidden
              >
                +
              </span>
            </button>
            {expanded && (
              <p className="px-6 pb-5 text-[14px] leading-relaxed text-text-secondary">{item.answer}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
