import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X, Moon, Sun, ShoppingBag, Instagram, ArrowUpRight } from "lucide-react";
import logo from "@/assets/instagram/chi-era-profile-logo.jpg";
import { useCart } from "./cart-context";
import { instagram } from "@/lib/catalog";
const links = [
  { to: "/shop", name: "Shop" },
  { to: "/about", name: "About us" },
  { to: "/reviews", name: "Reviews" },
  { to: "/faq", name: "FAQ" },
  { to: "/contact", name: "Contact us" },
] as const;
export function SiteHeader({ onHome }: { onHome?: () => void }) {
  const menuButton = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState("dark");
  const { items } = useCart();
  const pathname = useLocation({ select: (l) => l.pathname });
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  useEffect(() => {
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
  }, []);
  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);
  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem("chi-era-theme", next);
    } catch {
      // Browser storage is optional; keep this visit usable when it is unavailable.
    }
  };
  const brand = (
    <>
      <img src={logo} alt="" width={40} height={40} className="size-10 rounded-full object-cover" />
      <span className="hidden sm:inline">Chi-Era</span>
    </>
  );
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background px-5 sm:px-10 lg:px-16">
      <div className="flex min-h-20 flex-wrap items-center justify-between gap-x-3">
        {onHome ? (
          <button
            onClick={onHome}
            aria-label="Home"
            className="flex items-center gap-3 text-xs font-semibold uppercase tracking-widest"
          >
            {brand}
          </button>
        ) : (
          <Link
            to="/"
            aria-label="Home"
            className="flex items-center gap-3 text-xs font-semibold uppercase tracking-widest"
          >
            {brand}
          </Link>
        )}
        <nav
          id="main-menu"
          aria-label="Main navigation"
          aria-hidden={!open}
          inert={!open}
          className={`store-menu ${open ? "store-menu-open" : ""}`}
        >
          <div className="store-menu-links">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="store-nav py-3"
                activeProps={{ "aria-current": "page" }}
              >
                {l.name}
              </Link>
            ))}
          </div>
        </nav>
        <div className="flex shrink-0 items-center gap-2 sm:gap-4">
          <button
            onClick={toggle}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            className="store-icon"
          >
            {theme === "light" ? <Moon size={19} /> : <Sun size={19} />}
          </button>
          <Link
            to="/cart"
            data-cart-icon
            aria-label={`Shopping cart, ${items.reduce((n, i) => n + i.quantity, 0)} items`}
            className="store-icon relative"
          >
            <ShoppingBag size={20} />
            <span
              data-cart-count
              className="absolute -right-1 -top-1 flex min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] text-primary-foreground"
            >
              {items.reduce((n, i) => n + i.quantity, 0)}
            </span>
          </Link>
          <button
            ref={menuButton}
            className="store-icon"
            aria-expanded={open}
            aria-controls="main-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </header>
  );
}
export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card/40 px-6 py-12 sm:px-12">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 sm:flex-row">
        <div>
          <Link to="/" className="font-display text-3xl">
            Chi-Era Activewear
          </Link>
          <p className="mt-3 text-sm text-muted-foreground">Where power meets elegance.</p>
        </div>
        <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-4">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="store-nav">
              {l.name}
            </Link>
          ))}
        </nav>
      </div>
      <a
        href={instagram}
        target="_blank"
        rel="noreferrer"
        className="mt-8 inline-flex items-center gap-2 text-sm text-primary"
      >
        <Instagram size={16} /> @chiera.active <ArrowUpRight size={14} />
      </a>
    </footer>
  );
}
export function StorePage({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main className="store-page">
        <div className="store-page-heading">
          <p className="store-eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="store-intro">{intro}</p>
        </div>
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
