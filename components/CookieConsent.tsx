"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// Cookie choice for the advertising cookies (Meta Pixel). The choice is kept in localStorage under
// CONSENT_KEY; MetaPixel listens for CONSENT_EVENT and only loads after "accepted". The banner shows until
// a choice is made, and the "Cookie settings" button (footer, Privacy Policy) opens it again.
export const CONSENT_KEY = "qa-cookie-consent";
export const CONSENT_EVENT = "qa-cookie-consent-changed";
const OPEN_EVENT = "qa-open-cookie-settings";

export function readConsent(): "accepted" | "declined" | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "accepted" || v === "declined" ? v : null;
  } catch {
    return null;
  }
}

export function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Read after mount: localStorage is not available during server rendering.
    const sync = () => setOpen(readConsent() === null);
    sync();
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, []);

  function choose(value: "accepted" | "declined") {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch {}
    window.dispatchEvent(new Event(CONSENT_EVENT));
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div role="dialog" aria-label="Cookie choice" className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-2xl rounded-2xl border border-border bg-surface-raised p-5 shadow-2xl sm:flex sm:items-center sm:gap-5">
      <p className="text-[13px] leading-relaxed text-text-secondary">
        We use advertising cookies (Meta Pixel) to measure our ads, only if you accept. Declining does not affect the
        site. <Link href="/privacy" className="text-blue-ink hover:underline">Privacy Policy</Link>
      </p>
      <div className="mt-4 flex shrink-0 gap-2 sm:mt-0">
        <button type="button" onClick={() => choose("declined")} className="rounded-full border border-border px-4 py-2 text-[13px] font-semibold text-text-primary hover:border-pink">
          Decline
        </button>
        <button type="button" onClick={() => choose("accepted")} className="rounded-full px-4 py-2 text-[13px] font-semibold text-white" style={{ background: "var(--pink)" }}>
          Accept
        </button>
      </div>
    </div>
  );
}

export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}>
      Cookie settings
    </button>
  );
}
