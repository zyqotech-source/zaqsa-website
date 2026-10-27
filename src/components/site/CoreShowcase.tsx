import { useEffect, useRef, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Bot,
  Code2,
  GraduationCap,
  HeartPulse,
  Palette,
  Share2,
  Store,
  Vote,
} from "lucide-react";
import { CORE_SERVICES } from "@/lib/content";
import { getGsap, prefersReducedMotion } from "@/lib/motion";
import {
  AutomationVisual,
  DesignVisual,
  ElectionVisual,
  HealthcareVisual,
  SchoolVisual,
  SmallBusinessVisual,
  SocialVisual,
  WebAppVisual,
} from "@/components/site/CoreVisuals";
import { LineReveal } from "@/components/site/Split";

const ICONS = {
  "election-campaign": Vote,
  "school-management": GraduationCap,
  "hospital-management": HeartPulse,
  "website-app-development": Code2,
  "small-business-solutions": Store,
  "social-media-management": Share2,
  "ai-business-automation": Bot,
  "graphic-design-branding": Palette,
} as const;

const VISUALS: Record<string, ReactNode> = {
  "election-campaign": <ElectionVisual />,
  "school-management": <SchoolVisual />,
  "hospital-management": <HealthcareVisual />,
  "website-app-development": <WebAppVisual />,
  "small-business-solutions": <SmallBusinessVisual />,
  "social-media-management": <SocialVisual />,
  "ai-business-automation": <AutomationVisual />,
  "graphic-design-branding": <DesignVisual />,
};

/**
 * Pinned scroll showcase for the eight core services. The heading stays in place
 * while each service card slides up over the previous one as the visitor scrolls.
 * Without motion (or before hydration) the cards simply stack as a normal list.
 */
export function CoreShowcase() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = root.current;
    if (!section || prefersReducedMotion()) return;
    const { gsap } = getGsap();
    section.classList.add("core-pinned");

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".core-card", section);
      const tabs = gsap.utils.toArray<HTMLElement>(".core-tab", section);
      const setActive = (index: number) =>
        tabs.forEach((tab, i) => tab.classList.toggle("is-active", i === index));
      setActive(0);
      gsap.set(cards.slice(1), { yPercent: 118 });

      const timeline = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: section.querySelector(".core-pin"),
          start: "top top",
          end: `+=${cards.length * 80}%`,
          pin: true,
          scrub: 0.7,
          anticipatePin: 1,
          onUpdate: (self) =>
            setActive(Math.min(cards.length - 1, Math.round(self.progress * (cards.length - 1)))),
        },
      });
      cards.forEach((card, index) => {
        if (index === 0) return;
        const previous = cards[index - 1]!;
        timeline.to(previous, { scale: 0.94, opacity: 0.3, yPercent: -4, duration: 1 }, index - 1);
        timeline.to(card, { yPercent: 0, duration: 1 }, index - 1);
      });
      timeline.to({}, { duration: 0.35 });
    }, section);

    return () => {
      ctx.revert();
      section.classList.remove("core-pinned");
    };
  }, []);

  return (
    <section ref={root} id="core-services" className="core-section" aria-labelledby="core-h">
      <div className="core-pin">
        <div className="container-z">
          <header className="core-head">
            <p className="eyebrow text-primary">01 / Core services</p>
            <h2 id="core-h">
              <LineReveal lines={["Eight core services,", "one accountable team."]} />
            </h2>
            <ol className="core-tabs" aria-hidden="true">
              {CORE_SERVICES.map((service) => (
                <li key={service.id} className="core-tab">
                  <span>{service.number}</span>
                  {service.label}
                </li>
              ))}
            </ol>
          </header>

          <div className="core-stage">
            {CORE_SERVICES.map((service) => {
              const Icon = ICONS[service.id];
              return (
                <article key={service.id} className="core-card">
                  <div className="core-copy">
                    <p className="core-label">
                      <span className="core-icon">
                        <Icon size={18} strokeWidth={1.7} />
                      </span>
                      {service.number} · {service.label}
                    </p>
                    <h3>{service.title}</h3>
                    <p className="core-blurb">{service.blurb}</p>
                    <ul className="core-features">
                      {service.features.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                    <p className="core-for">
                      <small>Built for</small>
                      {service.builtFor.join(" · ")}
                    </p>
                    <Link to="/services/$slug" params={{ slug: service.id }} className="core-link">
                      Explore {service.label.toLowerCase()} <ArrowUpRight size={16} />
                    </Link>
                  </div>
                  <div className="core-visual">{VISUALS[service.id]}</div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
