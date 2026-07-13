"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// Wraps a section in a fade-up-on-scroll reveal (app/globals.css .qa-reveal).
// One IntersectionObserver per instance is fine at this page's scale (a
// handful of sections), so no shared-observer optimization is needed here.
export function ScrollReveal({ children, delayMs = 0, className = "" }: { children: ReactNode; delayMs?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const t = setTimeout(() => setRevealed(true), delayMs);
          observer.disconnect();
          return () => clearTimeout(t);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delayMs]);

  return (
    <div ref={ref} className={`qa-reveal ${revealed ? "qa-revealed" : ""} ${className}`}>
      {children}
    </div>
  );
}
