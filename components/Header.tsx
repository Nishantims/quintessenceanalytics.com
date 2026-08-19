import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MobileNav } from "@/components/MobileNav";
import { Logo } from "@/components/Logo";

interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

// Logo already links home (below), so "Home" doesn't need its own nav
// slot - that space goes to the six-service catalog's supporting pages
// instead. Market Reports stays as an external link, per the blueprint's
// explicit instruction to keep it secondary rather than a primary nav item.
const NAV: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Industries", href: "/industries" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Market Reports", href: "https://market-reports.com", external: true },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="group flex items-center gap-2.5">
          <Logo size={24} />
        </Link>

        <div className="flex items-center gap-8">
          {/* Seven items now (was four) - needs lg's extra width, not md's,
           * to fit alongside the theme toggle and CTA without crowding. */}
          <nav className="hidden items-center gap-6 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className="flex items-center whitespace-nowrap text-[13px] font-semibold uppercase tracking-wide text-text-secondary transition-colors hover:text-pink"
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
              Book an AI Assessment
            </Link>
            <MobileNav items={NAV} />
          </div>
        </div>
      </div>
    </header>
  );
}
