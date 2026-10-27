import { useId, useState } from "react";
import type { KeyboardEvent } from "react";
import type { Group } from "@/lib/content";
import { cn } from "@/lib/utils";

/** Accessible tabbed explorer for a list of service groups. */
export function Explorer({ groups }: { groups: Group[] }) {
  const [active, setActive] = useState(0);
  const baseId = useId().replace(/:/g, "");
  const group = groups[active]!;

  function onTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown")
      nextIndex = (index + 1) % groups.length;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp")
      nextIndex = (index - 1 + groups.length) % groups.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = groups.length - 1;
    if (nextIndex === null) return;
    event.preventDefault();
    setActive(nextIndex);
    document.getElementById(`${baseId}-tab-${groups[nextIndex]!.id}`)?.focus();
  }

  return (
    <div className="grid gap-7 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-10">
      <div
        role="tablist"
        aria-label="Capability categories"
        className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0"
      >
        {groups.map((item, index) => {
          const selected = index === active;
          return (
            <button
              key={item.id}
              id={`${baseId}-tab-${item.id}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={(event) => onTabKeyDown(event, index)}
              className={cn(
                "explorer-tab flex min-h-12 shrink-0 items-center justify-between gap-5 border px-4 text-left text-sm transition-colors lg:min-h-14 lg:px-5",
                selected
                  ? "border-primary bg-secondary text-secondary-foreground shadow-[0_10px_28px_-20px_rgba(20,36,62,.6)]"
                  : "border-border bg-card/45 text-foreground/75 hover:border-teal/50 hover:bg-card",
              )}
            >
              <span className="whitespace-nowrap">{item.title}</span>
              <span className={cn("text-xs", selected ? "text-primary" : "text-muted-foreground")}>
                {String(item.items.length).padStart(2, "0")}
              </span>
            </button>
          );
        })}
      </div>

      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${group.id}`}
        tabIndex={0}
        className="glass min-w-0 rounded-3xl p-6 sm:p-9"
      >
        <div className="explorer-panel-content" key={group.id}>
          <div className="flex flex-wrap items-end justify-between gap-3 border-b border-border pb-5">
            <div>
              <p className="eyebrow text-teal">Capability area</p>
              <h3 className="mt-2 text-[clamp(2rem,4vw,3rem)] font-medium tracking-[-.02em]">
                {group.title}
              </h3>
            </div>
            <span className="text-xs font-semibold tracking-[.12em] text-muted-foreground uppercase">
              {String(group.items.length).padStart(2, "0")} capabilities
            </span>
          </div>
          <p className="mt-5 max-w-2xl text-muted-foreground">{group.blurb}</p>
          <ul className="explorer-item-list mt-6 grid gap-x-8 sm:grid-cols-2 xl:grid-cols-3">
            {group.items.map((item, index) => (
              <li
                key={item}
                style={{ animationDelay: `${index * 35}ms` }}
                className="flex min-h-12 items-center gap-3 border-b border-border/70 py-3 text-sm text-foreground/85"
              >
                <span className="explorer-item-dot h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                <span className="min-w-0">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
