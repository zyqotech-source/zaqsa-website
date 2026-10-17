import { useState } from "react";
import { cn } from "@/lib/utils";

export function ZyqoCore({ size = 160, label = true }: { size?: number; label?: boolean }) {
  return (
    <div className="relative grid shrink-0 place-items-center" style={{ width: size, height: size }}>
      <div aria-hidden className="absolute inset-[-18%] rounded-full border border-primary/20 animate-orbit" style={{ borderStyle: "dashed" }} />
      <div className="animate-core relative grid h-full w-full place-items-center rounded-full border border-primary/50 bg-[radial-gradient(circle_at_35%_30%,var(--glow),color-mix(in_oklab,var(--primary)_40%,transparent)_45%,transparent_75%)]">
        <div aria-hidden className="absolute inset-[12%] rounded-full border border-foreground/20 backdrop-blur-sm" />
        {label && <span className="relative font-display text-[clamp(0.9rem,1.6vw,1.25rem)] font-medium tracking-[0.3em] text-primary-foreground">ZYQO</span>}
      </div>
    </div>
  );
}

const NODES: { k: string; caps: string[] }[] = [
  { k: "AI", caps: ["Generative AI", "AI agents", "Chatbots", "Computer vision"] },
  { k: "Data", caps: ["Dashboards", "Pipelines", "Business intelligence", "Predictive analytics"] },
  { k: "Software", caps: ["Custom software", "SaaS", "APIs", "Backend systems"] },
  { k: "Web", caps: ["Business websites", "Web apps", "E-commerce", "PWAs"] },
  { k: "Mobile", caps: ["Android", "iOS", "Cross-platform", "Customer apps"] },
  { k: "Cloud", caps: ["Deployment", "DevOps & CI/CD", "Monitoring", "Migration"] },
  { k: "Automation", caps: ["Workflow automation", "AI workflows", "Process automation", "IoT automation"] },
  { k: "Business", caps: ["CRM", "Billing & invoices", "Inventory", "HR systems"] },
  { k: "Education", caps: ["School management", "Fees & attendance", "Library systems", "Coaching tools"] },
  { k: "Digital", caps: ["Social media", "SEO", "Branding", "Content & video"] },
  { k: "Industry", caps: ["Agriculture", "Healthcare", "Retail", "Logistics"] },
];

const WORLDS = ["Technology", "Business", "Digital", "Education", "Industry", "Products", "Consulting", "Innovation", "Future"];

export function Ecosystem() {
  const [active, setActive] = useState(0);
  const node = NODES[active]!;
  return (
    <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)]">
      {/* Desktop/tablet orbital */}
      <div className="relative mx-auto hidden aspect-square w-full max-w-[640px] md:block">
        <svg aria-hidden viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" className="text-foreground/10" strokeWidth="0.15" />
          <circle cx="50" cy="50" r="27" fill="none" stroke="currentColor" className="text-primary/25 animate-dash" strokeWidth="0.2" />
          <circle cx="50" cy="50" r="47" fill="none" stroke="currentColor" className="text-foreground/5" strokeWidth="0.1" />
          {NODES.map((_, i) => {
            const a = (i / NODES.length) * Math.PI * 2 - Math.PI / 2;
            return <line key={i} x1="50" y1="50" x2={50 + Math.cos(a) * 40} y2={50 + Math.sin(a) * 40} stroke="currentColor" strokeWidth={i === active ? 0.35 : 0.12} className={i === active ? "text-primary" : "text-foreground/15"} />;
          })}
        </svg>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"><ZyqoCore size={150} /></div>
        {NODES.map((n, i) => {
          const a = (i / NODES.length) * Math.PI * 2 - Math.PI / 2;
          return (
            <button
              key={n.k}
              type="button"
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              aria-pressed={i === active}
              className={cn("glass absolute w-[6.5rem] -translate-x-1/2 -translate-y-1/2 rounded-full py-2.5 text-[0.68rem] font-semibold tracking-[0.18em] uppercase transition-all duration-300", i === active ? "scale-110 border-primary/70 text-primary" : "text-foreground/80 hover:text-foreground")}
              style={{ left: `${50 + Math.cos(a) * 40}%`, top: `${50 + Math.sin(a) * 40}%` }}
            >
              {n.k}
            </button>
          );
        })}
      </div>

      {/* Mobile tap list */}
      <div className="md:hidden">
        <div className="mb-8 flex justify-center"><ZyqoCore size={120} /></div>
        <div className="grid grid-cols-3 gap-2">
          {NODES.map((n, i) => (
            <button key={n.k} type="button" onClick={() => setActive(i)} aria-pressed={i === active} className={cn("glass min-h-11 rounded-full px-2 text-[0.65rem] font-semibold tracking-[0.14em] uppercase", i === active ? "border-primary/70 text-primary" : "text-foreground/80")}>
              {n.k}
            </button>
          ))}
        </div>
      </div>

      <div className="glass min-w-0 rounded-3xl p-7 sm:p-9" aria-live="polite">
        <p className="eyebrow text-primary">Capability</p>
        <h3 className="mt-3 text-4xl font-light">{node.k}</h3>
        <ul className="mt-6 space-y-3">
          {node.caps.map((c) => (
            <li key={c} className="flex items-center gap-3 border-b border-border/60 pb-3 text-foreground/85 last:border-0">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />{c}
            </li>
          ))}
        </ul>
        <p className="mt-8 eyebrow text-muted-foreground">Connected worlds</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {WORLDS.map((w) => <span key={w} className="rounded-full border border-border px-3 py-1 text-xs text-foreground/70">{w}</span>)}
        </div>
      </div>
    </div>
  );
}
