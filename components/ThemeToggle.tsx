"use client";

import { useEffect, useState } from "react";

// Dark is the unconditional default (app/globals.css :root), so a missing
// data-theme attribute means "dark", not "unknown" — this no longer
// consults prefers-color-scheme at all per the client's explicit choice to
// not follow OS preference.
export function ThemeToggle() {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    // One-time read of the attribute ThemeScript (components/ThemeScript.tsx)
    // set before hydration — not syncing with an external subscription, just
    // picking up the pre-hydration value once so the icon matches reality.
    const current = document.documentElement.getAttribute("data-theme");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLight(current === "light");
  }, []);

  function toggle() {
    const next = isLight ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("qa-theme", next);
    setIsLight(next === "light");
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle color theme"
      className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-text-secondary transition-colors hover:border-pink hover:text-pink"
    >
      {isLight ? (
        <svg aria-hidden viewBox="0 0 24 24" fill="none" className="h-4 w-4">
          <path
            d="M12 3v1.5M12 19.5V21M4.22 4.22l1.06 1.06M18.72 18.72l1.06 1.06M3 12h1.5M19.5 12H21M4.22 19.78l1.06-1.06M18.72 5.28l1.06-1.06"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      ) : (
        <svg aria-hidden viewBox="0 0 24 24" fill="none" className="h-4 w-4">
          <path
            d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z"
            fill="currentColor"
          />
        </svg>
      )}
    </button>
  );
}
