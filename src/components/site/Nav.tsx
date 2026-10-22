import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
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
  const [docked, setDocked] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const { pathname } = useLocation();
  const listRef = useRef<HTMLUListElement>(null);
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null);

  const moveIndicator = useCallback((target?: HTMLElement | null) => {
    const list = listRef.current;
    const link = target ?? list?.querySelector<HTMLElement>('[data-status="active"]');
    if (!list || !link) {
      setIndicator(null);
      return;
    }
    setIndicator({ left: link.offsetLeft, width: link.offsetWidth });
  }, []);

  useLayoutEffect(() => {
    moveIndicator();
    const onResize = () => moveIndicator();
    window.addEventListener("resize", onResize);
    document.fonts?.ready.then(onResize).catch(() => undefined);
    return () => window.removeEventListener("resize", onResize);
  }, [pathname, moveIndicator]);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 24);
      setDocked(y > 140);
      const range = document.documentElement.scrollHeight - window.innerHeight;
      navRef.current?.style.setProperty(
        "--nav-progress",
        String(range > 0 ? Math.min(1, Math.max(0, y / range)) : 0),
      );
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => moveIndicator(), 460);
    return () => window.clearTimeout(timer);
  }, [docked, moveIndicator]);

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
        ref={navRef}
        aria-label="Main"
        className={cn(
          "site-nav flex items-center justify-between gap-4",
          (scrolled || open) && "is-scrolled",
          docked && !open && "is-docked",
          open && "is-open",
        )}
      >
        <span className="nav-progress" aria-hidden="true" />
        <Link to="/" aria-label="ZYQO home" className="shrink-0" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <ul
          ref={listRef}
          className="nav-links hidden min-w-0 xl:flex"
          aria-label="Main pages"
          onMouseLeave={() => moveIndicator()}
        >
          <span
            aria-hidden="true"
            className="nav-indicator"
            style={
              indicator
                ? {
                    transform: `translateX(${indicator.left}px)`,
                    width: indicator.width,
                    opacity: 1,
                  }
                : { opacity: 0 }
            }
          />
          {NAV.map((item) => (
            <li key={item.to} onMouseEnter={(event) => moveIndicator(event.currentTarget)}>
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
            className="nav-menu-button grid xl:hidden"
          >
            {open ? <X size={19} strokeWidth={1.7} /> : <Menu size={19} strokeWidth={1.7} />}
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-navigation"
          className="site-mobile-panel fixed inset-x-3 top-[5.5rem] bottom-3 z-40 overflow-y-auto border border-border bg-background/95 p-5 shadow-2xl backdrop-blur-xl sm:inset-x-5 sm:p-7 xl:hidden"
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
