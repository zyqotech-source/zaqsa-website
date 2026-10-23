import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type Lenis from "lenis";

let registered = false;

/** Registers GSAP plugins once, on the client only. */
export function getGsap() {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
  return { gsap, ScrollTrigger };
}

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** Shared handle to the smooth-scroll instance (null when motion is reduced). */
export const smooth: { lenis: Lenis | null } = { lenis: null };

/** Runs `onEnter` once when the element reaches 85% of the viewport (immediately if motion is reduced). */
export function useOnceInView<T extends Element>(
  ref: RefObject<T | null>,
  onEnter: (element: T) => void,
  start = "top 85%",
) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (prefersReducedMotion()) {
      onEnter(element);
      return;
    }
    const { ScrollTrigger: trigger } = getGsap();
    const instance = trigger.create({
      trigger: element,
      start,
      end: "max",
      once: true,
      onEnter: () => onEnter(element),
    });
    return () => instance.kill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
