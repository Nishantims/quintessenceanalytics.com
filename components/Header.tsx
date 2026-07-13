import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MobileNav } from "@/components/MobileNav";

const NAV = [
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Market Reports", href: "https://market-reports.com", external: true },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink text-paper">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
              <path d="M4 17 L10 9 L14 13 L20 5" stroke="var(--coral)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="20" cy="5" r="1.8" fill="var(--gold)" />
            </svg>
          </span>
          <span className="font-display text-[19px] font-semibold leading-none tracking-tight text-text-primary">
            Quintessence <span className="text-text-muted font-normal">Analytics</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              className="text-[13px] font-semibold uppercase tracking-wide text-text-secondary transition-colors hover:text-coral"
            >
              {item.label}
              {item.external && <span aria-hidden> ↗</span>}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/contact"
            className="hidden rounded-full bg-ink px-5 py-2.5 text-[13px] font-semibold text-paper transition-transform hover:scale-[1.03] sm:inline-block"
          >
            Talk to an Analyst
          </Link>
          <MobileNav items={NAV} />
        </div>
      </div>
    </header>
  );
}
