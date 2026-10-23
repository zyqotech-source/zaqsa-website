import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { getGsap, prefersReducedMotion } from "@/lib/motion";
import type { PhotoSlot } from "@/lib/photos";
import { Photo } from "@/components/site/Photo";
import { cn } from "@/lib/utils";

const vars = (values: Record<string, string | number>) => values as CSSProperties;
const finePointer = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/* ------------------------------------------------------------------ Hero cards */
const HERO_CARDS: { slot: PhotoSlot; depth: number; rotate: number }[] = [
  { slot: "hero-team", depth: 26, rotate: -5 },
  { slot: "hero-collab", depth: 44, rotate: 4 },
  { slot: "hero-client", depth: 16, rotate: -3 },
];

/** Three small photo cards that float at different depths and drift with the mouse. */
export function HeroPhotoCards() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = root.current;
    if (!element || prefersReducedMotion() || !finePointer()) return;
    const { gsap } = getGsap();
    const cards = Array.from(element.querySelectorAll<HTMLElement>(".hero-card"));
    const movers = cards.map((card) => ({
      x: gsap.quickTo(card, "x", { duration: 1.1, ease: "power3.out" }),
      y: gsap.quickTo(card, "y", { duration: 1.1, ease: "power3.out" }),
    }));
    const onMove = (event: PointerEvent) => {
      const nx = event.clientX / window.innerWidth - 0.5;
      const ny = event.clientY / window.innerHeight - 0.5;
      movers.forEach((mover, index) => {
        const depth = HERO_CARDS[index]?.depth ?? 20;
        mover.x(nx * depth * -1);
        mover.y(ny * depth * -1);
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div ref={root} className="hero-cards">
      {HERO_CARDS.map((card, index) => (
        <figure key={card.slot} className={`hero-card hero-card-${index + 1}`}>
          <div
            className="hero-card-inner"
            style={vars({ "--rot": `${card.rotate}deg`, "--i": index })}
          >
            <Photo slot={card.slot} ratio="4 / 3" eager settle={false} />
          </div>
        </figure>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ Tilt frame */
/** A frame that tilts toward the mouse, never more than 6 degrees. */
export function TiltFrame({ children, className }: { children: ReactNode; className?: string }) {
  const frame = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = frame.current;
    if (!element || prefersReducedMotion() || !finePointer()) return;
    const { gsap } = getGsap();
    const rx = gsap.quickTo(element, "rotationX", { duration: 0.8, ease: "power3.out" });
    const ry = gsap.quickTo(element, "rotationY", { duration: 0.8, ease: "power3.out" });
    gsap.set(element, { transformPerspective: 900 });
    const onMove = (event: PointerEvent) => {
      const box = element.getBoundingClientRect();
      const nx = (event.clientX - (box.left + box.width / 2)) / (window.innerWidth / 2);
      const ny = (event.clientY - (box.top + box.height / 2)) / (window.innerHeight / 2);
      ry(Math.max(-1, Math.min(1, nx)) * 6);
      rx(Math.max(-1, Math.min(1, ny)) * -6);
    };
    const onLeave = () => {
      rx(0);
      ry(0);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={frame} className={cn("tilt-frame", className)}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------- Parallax photo */
/** A photo that moves slower than the page, so it drifts inside its frame. */
export function ParallaxPhoto({ slot, className }: { slot: PhotoSlot; className?: string }) {
  const frame = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = inner.current;
    const trigger = frame.current;
    if (!target || !trigger || prefersReducedMotion()) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        target,
        { yPercent: -9 },
        {
          yPercent: 9,
          ease: "none",
          scrollTrigger: { trigger, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    }, trigger);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={frame} className={cn("parallax-frame", className)}>
      <div ref={inner} className="parallax-inner">
        <Photo slot={slot} settle={false} className="h-full" />
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------- Big text */
/** Lines of oversized text that rise and fade in one by one as the section scrolls into view. */
export function BigText({ lines, id }: { lines: string[]; id: string }) {
  const root = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const heading = root.current;
    if (!heading || prefersReducedMotion()) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      heading.querySelectorAll<HTMLElement>(".big-line").forEach((line) => {
        gsap.fromTo(
          line,
          { opacity: 0, y: 48 },
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: { trigger: line, start: "top 92%", end: "top 62%", scrub: 0.6 },
          },
        );
      });
    }, heading);
    return () => ctx.revert();
  }, []);

  return (
    <h2 id={id} ref={root} className="big-text">
      {lines.map((line) => (
        <span className="big-line" key={line}>
          {line}
        </span>
      ))}
    </h2>
  );
}

/* ---------------------------------------------------------- Scroll-scaled logo */
export function ScaledWordmark({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    const section = element?.parentElement;
    if (!element || !section || prefersReducedMotion()) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        { scale: 0.95 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: section, start: "top bottom", end: "bottom 70%", scrub: true },
        },
      );
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="cta-wordmark" aria-hidden="true">
      {children}
    </div>
  );
}
