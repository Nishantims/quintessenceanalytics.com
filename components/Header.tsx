import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MobileNav } from "@/components/MobileNav";
import { Logo } from "@/components/Logo";

interface NavItem {
  label: string;
  href: string;
  external?: boolean;
  /** Home only - renders a house glyph instead of the label text, since the
   * logo already carries "Quintessence Analytics" as a wordmark and a second
   * text label reading "Home" next to it would be redundant. */
  icon?: "home";
}

const NAV: NavItem[] = [
  { label: "Home", href: "/", icon: "home" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden>
      <path
        d="M4 11.5 12 4l8 7.5M6 9.5V20h12V9.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="group flex items-center gap-2.5">
          <Logo size={24} />
        </Link>

        <div className="flex items-center gap-10">
          <nav className="hidden items-center gap-8 md:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                aria-label={item.icon ? item.label : undefined}
                className="flex items-center text-[13px] font-semibold uppercase tracking-wide text-text-secondary transition-colors hover:text-pink"
              >
                {item.icon === "home" ? <HomeIcon /> : item.label}
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
      </div>
    </header>
  );
}
