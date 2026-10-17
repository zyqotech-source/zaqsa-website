import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { NAV } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Logo() {
  return (
    <span className="brand-logo">
      <span aria-hidden className="brand-symbol" />
      <span className="brand-name">ZYQO</span>
    </span>
  );
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    if (open) document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <header className="site-nav-wrap fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <nav
        aria-label="Main"
        className={cn(
          "site-nav flex items-center justify-between gap-4",
          (scrolled || open) && "is-scrolled",
          open && "is-open",
        )}
      >
        <Link to="/" aria-label="ZYQO home" className="shrink-0" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <ul className="nav-links hidden min-w-0 2xl:flex" aria-label="Main pages">
          {NAV.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                className="nav-link"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            to="/contact"
            className="nav-cta hidden sm:inline-flex sm:items-center sm:justify-center"
          >
            Request a consultation
          </Link>
          <button
            type="button"
            onClick={() => setOpen((current) => !current)}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Close menu" : "Open menu"}
            className="nav-menu-button grid 2xl:hidden"
          >
            {open ? <X size={19} strokeWidth={1.7} /> : <Menu size={19} strokeWidth={1.7} />}
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-navigation"
          className="site-mobile-panel fixed inset-x-3 top-[5.5rem] bottom-3 z-40 overflow-y-auto border border-border bg-background/95 p-5 shadow-2xl backdrop-blur-xl sm:inset-x-5 sm:p-7 2xl:hidden"
        >
          <p className="eyebrow mb-3 text-teal">Explore ZYQO</p>
          <ul className="flex flex-col">
            {NAV.map((item, index) => (
              <li key={item.to} className="border-b border-border/75 last:border-0">
                <Link
                  to={item.to}
                  activeOptions={{ exact: item.to === "/" }}
                  className="flex min-h-14 items-center justify-between gap-4 py-3 font-display text-2xl font-medium tracking-tight data-[status=active]:text-primary"
                  onClick={() => setOpen(false)}
                >
                  <span>{item.label}</span>
                  <span className="font-sans text-[.63rem] font-semibold tracking-[.16em] text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            to="/contact"
            className="mt-6 flex min-h-12 items-center justify-between border border-primary bg-primary px-4 text-xs font-bold tracking-[.13em] text-white uppercase"
            onClick={() => setOpen(false)}
          >
            Request a consultation <span aria-hidden>↗</span>
          </Link>
        </div>
      )}
    </header>
  );
}
