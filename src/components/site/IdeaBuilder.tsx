import { useState } from "react";
import { NEEDS } from "@/lib/content";
import { cn } from "@/lib/utils";
import { GlassButton, Reveal, SectionHead } from "./primitives";

const STEPS = [
  "Question",
  "Understand",
  "Data",
  "Intelligence",
  "Engineering",
  "Automation",
  "Scale",
  "Product",
];

export function Timeline({ steps, light = true }: { steps: string[]; light?: boolean }) {
  return (
    <ol className="motion-timeline relative grid gap-6 md:grid-flow-col md:auto-cols-fr md:gap-2">
      <span
        aria-hidden
        className={cn(
          "timeline-track absolute top-0 bottom-0 left-[1.1rem] w-px md:top-[1.1rem] md:right-[3%] md:bottom-auto md:left-[3%] md:h-px md:w-auto",
          light ? "bg-paper-foreground/20" : "bg-foreground/15",
        )}
      />
      {steps.map((s, i) => (
        <Reveal
          as="li"
          key={s}
          delay={i * 80}
          className="relative flex items-center gap-4 md:flex-col md:text-center"
        >
          <span
            className={cn(
              "relative grid h-9 w-9 shrink-0 place-items-center rounded-full border text-[0.65rem] font-semibold",
              light
                ? "glass-paper border-paper-border text-paper-foreground"
                : "glass text-primary",
            )}
            style={{
              boxShadow: `0 0 0 4px color-mix(in oklab, var(--glow) ${10 + i * 6}%, transparent)`,
            }}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <span
            className={cn(
              "min-w-0 text-[0.7rem] font-semibold tracking-[0.18em] uppercase md:break-words",
              light ? "text-paper-foreground" : "text-foreground/85",
            )}
          >
            {s}
          </span>
        </Reveal>
      ))}
    </ol>
  );
}

export function IdeaBuilder() {
  const [pick, setPick] = useState<string | null>(null);
  return (
    <section className="bg-paper py-24 text-paper-foreground sm:py-32" aria-labelledby="idea-h">
      <div className="container-z">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
          <SectionHead
            light
            eyebrow="Idea builder"
            title={<span id="idea-h">What are you trying to create?</span>}
            intro="Pick a starting point. Every idea moves through the same honest journey — from a question to something real."
          />
          <p className="font-hand text-3xl text-paper-muted lg:pb-3">start anywhere ↓</p>
        </div>
        <div className="mt-12 flex flex-wrap gap-2.5">
          {NEEDS.map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setPick(n)}
              aria-pressed={pick === n}
              className={cn(
                "idea-choice min-h-11 rounded-full border px-5 text-sm transition-all",
                pick === n
                  ? "border-paper-foreground bg-paper-foreground text-paper"
                  : "border-paper-border hover:border-paper-foreground/50",
              )}
            >
              {n}
            </button>
          ))}
        </div>
        <div className="mt-20">
          <Timeline steps={STEPS} />
        </div>
        <div className="mt-16 flex flex-wrap items-center gap-5">
          <GlassButton to="/contact" variant="ink">
            Let's explore the idea
          </GlassButton>
          {pick && (
            <p className="text-sm text-paper-muted">
              Starting point: <strong className="text-paper-foreground">{pick}</strong>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
