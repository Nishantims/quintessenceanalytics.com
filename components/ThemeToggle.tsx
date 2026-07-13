"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    // One-time read of the attribute ThemeScript (components/ThemeScript.tsx)
    // set before hydration — not syncing with an external subscription, just
    // picking up the pre-hydration value once so the icon matches reality.
    const current = document.documentElement.getAttribute("data-theme");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(current === "dark" ? "dark" : current === "light" ? "light" : null);
  }, []);

  function toggle() {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const currentlyDark = theme === "dark" || (theme === null && prefersDark);
    const next = currentlyDark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("qa-theme", next);
    setTheme(next);
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle color theme"
      className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-text-secondary transition-colors hover:border-coral hover:text-coral"
    >
      {theme === "dark" ? (
        <svg aria-hidden viewBox="0 0 24 24" fill="none" className="h-4 w-4">
          <path
            d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z"
            fill="currentColor"
          />
        </svg>
      ) : (
        <svg aria-hidden viewBox="0 0 24 24" fill="none" className="h-4 w-4">
          <path
            d="M12 3v1.5M12 19.5V21M4.22 4.22l1.06 1.06M18.72 18.72l1.06 1.06M3 12h1.5M19.5 12H21M4.22 19.78l1.06-1.06M18.72 5.28l1.06-1.06"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      )}
    </button>
  );
}
