import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { Reveal } from "@/components/site/primitives";
import type { Industry } from "@/lib/content";
import { cn } from "@/lib/utils";

export function IndustryAccordion({
  items,
  startIndex = 0,
  defaultOpen = null,
}: {
  items: Industry[];
  startIndex?: number;
  defaultOpen?: number | null;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const baseId = useId().replace(/:/g, "");
  return (
    <ul className="border-t border-border">
      {items.map((ind, i) => {
        const isOpen = open === i;
        return (
          <Reveal as="li" key={ind.name} delay={i * 40} className="border-b border-border">
            <button
              type="button"
              id={`${baseId}-trigger-${i}`}
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={`${baseId}-panel-${i}`}
              className="group grid w-full grid-cols-[2.5rem_minmax(0,1fr)_auto] items-center gap-4 py-6 text-left sm:grid-cols-[3rem_minmax(0,1fr)_auto]"
            >
              <span className="text-xs text-muted-foreground">
                {String(startIndex + i + 1).padStart(2, "0")}
              </span>
              <span
                className={cn(
                  "font-display text-[clamp(1.4rem,3.6vw,2.6rem)] font-light transition-colors",
                  isOpen ? "text-primary" : "group-hover:text-primary",
                )}
              >
                {ind.name}
              </span>
              <span
                aria-hidden
                className="flex size-9 flex-none items-center justify-center border border-border transition-colors group-hover:border-primary/60"
              >
                <Plus
                  size={16}
                  className={cn(
                    "transition-transform duration-300",
                    isOpen && "rotate-45 text-primary",
                  )}
                />
              </span>
            </button>
            <div
              id={`${baseId}-panel-${i}`}
              role="region"
              aria-labelledby={`${baseId}-trigger-${i}`}
              aria-hidden={!isOpen}
              className={cn(
                "grid transition-[grid-template-rows] duration-500 ease-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <div className="grid gap-8 pb-10 sm:pl-14 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-12">
                  <figure className="group/img overflow-hidden border border-border">
                    <img
                      src={ind.image}
                      alt={`${ind.name} — ZYQO industry perspective`}
                      width={1024}
                      height={768}
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover grayscale transition-all duration-700 group-hover/img:scale-[1.03] group-hover/img:grayscale-0"
                    />
                  </figure>
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-primary">{ind.ideas}</p>
                    <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
                      {ind.detail}
                    </p>
                    <p className="mt-7 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      Where we can help
                    </p>
                    <ul className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                      {ind.focus.map((f) => (
                        <li key={f} className="flex items-start gap-3 text-sm text-foreground/85">
                          <span aria-hidden className="mt-[0.55rem] size-1 flex-none bg-primary" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        );
      })}
    </ul>
  );
}
