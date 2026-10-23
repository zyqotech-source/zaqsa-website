import { useEffect } from "react";
import { useLocation } from "@tanstack/react-router";
import { getGsap, prefersReducedMotion, smooth } from "@/lib/motion";

/** Lenis smooth scrolling, driven by the GSAP ticker so ScrollTrigger stays in sync. */
export function SmoothScroll() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let cancelled = false;
    let cleanup = () => {};

    void import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      const { gsap, ScrollTrigger } = getGsap();
      const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
      smooth.lenis = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      const onClick = (event: MouseEvent) => {
        const anchor = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
        const hash = anchor?.getAttribute("href");
        if (!anchor || !hash || hash === "#") return;
        const target = document.querySelector<HTMLElement>(hash);
        if (!target) return;
        event.preventDefault();
        lenis.scrollTo(target, { offset: -96 });
      };
      document.addEventListener("click", onClick);

      cleanup = () => {
        document.removeEventListener("click", onClick);
        gsap.ticker.remove(tick);
        lenis.destroy();
        smooth.lenis = null;
      };
    });

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  useEffect(() => {
    smooth.lenis?.scrollTo(0, { immediate: true });
    const { ScrollTrigger } = getGsap();
    const timer = window.setTimeout(() => ScrollTrigger.refresh(), 250);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  return null;
}
