"use client";

import Link from "next/link";
import { useState } from "react";

interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export function MobileNav({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-text-primary"
      >
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
          {open ? (
            <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          ) : (
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          )}
        </svg>
      </button>

      {open && (
        <div className="absolute inset-x-0 top-18 z-30 border-b border-border bg-paper px-6 py-6 shadow-lg">
          <nav className="flex flex-col gap-1">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-[15px] font-semibold text-text-primary hover:bg-surface-raised hover:text-coral"
              >
                {item.label}
                {item.external && <span aria-hidden> ↗</span>}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-ink px-5 py-3 text-center text-[14px] font-semibold text-paper"
            >
              Talk to an Analyst
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
