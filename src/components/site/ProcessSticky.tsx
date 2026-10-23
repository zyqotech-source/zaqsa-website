import { useEffect, useRef, type CSSProperties } from "react";
import { ENGAGEMENT_STEPS } from "@/lib/content";
import { getGsap, prefersReducedMotion } from "@/lib/motion";
import type { PhotoSlot } from "@/lib/photos";
import { Photo } from "@/components/site/Photo";
import { SectionHead } from "@/components/site/primitives";

const vars = (values: Record<string, string | number>) => values as CSSProperties;
const SLOTS: PhotoSlot[] = ["process-1", "process-2", "process-3", "process-4"];
const TILTS = [-5, 4, -4, 5];

/**
 * Sticky-scroll process: the heading stays on the left while steps scroll on the right.
 * The step in focus turns fully opaque with a blue number; the others rest at 40%.
 */
export function ProcessSticky() {
  const list = useRef<HTMLOListElement>(null);
  const fill = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = list.current;
    if (!element) return;
    const steps = Array.from(element.querySelectorAll<HTMLElement>(".proc-step"));
    if (prefersReducedMotion()) {
      steps.forEach((step) => step.classList.add("is-active"));
      fill.current?.style.setProperty("transform", "scaleY(1)");
      return;
    }
    const { gsap, ScrollTrigger } = getGsap();
    const ctx = gsap.context(() => {
      steps.forEach((step) => {
        ScrollTrigger.create({
          trigger: step,
          start: "top 62%",
          end: "bottom 62%",
          onToggle: (self) => step.classList.toggle("is-active", self.isActive),
        });
      });
      if (fill.current) {
        gsap.fromTo(
          fill.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: element, start: "top 62%", end: "bottom 62%", scrub: true },
          },
        );
      }
    }, element);
    return () => ctx.revert();
  }, []);

  return (
    <div className="proc-layout">
      <div className="proc-head">
        <SectionHead
          eyebrow="04 / How we work"
          title={<span id="process-h">A disciplined path from ambiguity to action.</span>}
          intro="Every engagement is sized around the decision at hand—from a focused advisory sprint to end-to-end transformation delivery."
        />
      </div>
      <ol ref={list} className="proc-list">
        <span className="proc-track" aria-hidden="true">
          <span ref={fill} className="proc-fill" />
        </span>
        {ENGAGEMENT_STEPS.map((step, index) => (
          <li key={step.title} className="proc-step">
            <div className="proc-copy">
              <span className="proc-number">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.blurb}</p>
            </div>
            <div className="proc-photo" style={vars({ "--tilt": `${TILTS[index] ?? 0}deg` })}>
              <Photo slot={SLOTS[index] ?? "process-1"} ratio="16 / 10" settle={false} />
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
