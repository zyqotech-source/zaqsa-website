import { useCallback, useRef, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "@/components/site/icons";
import { cn } from "@/lib/utils";
import { useOnceInView } from "@/lib/motion";
import { TechBackdrop } from "@/components/site/motion";

export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
  from,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "article";
  from?: "left" | "right" | "zoom";
}) {
  const ref = useRef<HTMLElement>(null);
  const assignRef = useCallback((element: HTMLElement | null) => {
    ref.current = element;
  }, []);
  useOnceInView(ref, (element) => element.classList.add("in"));

  return (
    <Tag
      ref={assignRef}
      className={cn("reveal", from && `reveal-${from}`, className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

type ButtonProps = {
  to: string;
  children: ReactNode;
  variant?: "solid" | "glass" | "ink";
  className?: string;
};
export function GlassButton({ to, children, variant = "solid", className }: ButtonProps) {
  const base =
    "group inline-flex min-h-12 items-center justify-center gap-3 border px-5 text-[.68rem] font-bold uppercase tracking-[.13em] transition-all duration-300 hover:-translate-y-0.5";
  const variants = {
    solid:
      "border-primary bg-primary text-white shadow-[0_12px_28px_-18px_var(--primary)] hover:border-secondary hover:bg-secondary",
    glass:
      "border-border bg-card/60 text-foreground hover:border-teal/70 hover:bg-card hover:text-teal",
    ink: "border-secondary bg-secondary text-secondary-foreground hover:border-primary hover:bg-primary hover:text-white",
  }[variant];

  return (
    <Link to={to} className={cn(base, variants, className)}>
      {children}
      <ArrowUpRight
        size={15}
        aria-hidden
        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </Link>
  );
}

export function SectionHead({
  eyebrow,
  title,
  intro,
  light = false,
  center = false,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  light?: boolean;
  center?: boolean;
}) {
  return (
    <Reveal className={cn("section-heading-reveal max-w-3xl", center && "mx-auto text-center")}>
      <p className={cn("eyebrow", light ? "text-paper-muted" : "text-teal")}>{eyebrow}</p>
      <h2 className="mt-4 text-[clamp(2.1rem,4.8vw,4rem)] leading-[1.02] font-medium tracking-[-.02em]">
        {title}
      </h2>
      {intro && (
        <p
          className={cn(
            "mt-5 max-w-2xl text-base leading-relaxed sm:text-lg",
            light ? "text-paper-muted" : "text-muted-foreground",
          )}
        >
          {intro}
        </p>
      )}
    </Reveal>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
  visual,
}: {
  eyebrow: string;
  title: ReactNode;
  intro: string;
  visual?: ReactNode;
}) {
  return (
    <header className="page-hero">
      <TechBackdrop />
      <span className="page-hero-scan" aria-hidden="true" />
      <div className={cn("container-z", visual && "page-hero-split")}>
        <Reveal>
          <p className="eyebrow">
            <span className="page-hero-prompt" aria-hidden="true">
              &gt;_
            </span>
            {eyebrow}
          </p>
          <h1 className="page-hero-title">{title}</h1>
          <p className="page-hero-intro">{intro}</p>
        </Reveal>
        {visual && (
          <Reveal from="right" delay={160} className="page-hero-visual">
            {visual}
          </Reveal>
        )}
      </div>
    </header>
  );
}

export function Chip({ children, light }: { children: ReactNode; light?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex min-h-9 items-center border px-3 py-1.5 text-sm transition-colors",
        light
          ? "border-paper-border text-paper-foreground hover:border-paper-foreground/40"
          : "border-border bg-card/35 text-foreground/85 hover:border-teal/60",
      )}
    >
      {children}
    </span>
  );
}
