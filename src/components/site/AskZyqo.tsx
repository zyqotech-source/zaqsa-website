import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { MessageCircle, X } from "lucide-react";

/** Text-first discovery helper. Answers are local; the `answer` lookup can later be swapped for an AI or voice backend. */
const TOPICS: { k: string; to: string; a: string }[] = [
  {
    k: "Technology",
    to: "/technology",
    a: "AI, data, software, web, mobile, cloud, IT/networking and IoT.",
  },
  {
    k: "Business",
    to: "/business",
    a: "CRM, billing, inventory, HR, education management, marketing and workflows.",
  },
  {
    k: "Solutions",
    to: "/solutions",
    a: "Consulting, civic technology, the customer journey and future products.",
  },
  {
    k: "Industries",
    to: "/industries",
    a: "Thirteen industries we're ready to explore and build for.",
  },
  { k: "Education", to: "/business", a: "School, coaching, library, fees and attendance systems." },
  {
    k: "Consulting",
    to: "/solutions",
    a: "A thinking partner for strategy, planning and roadmaps.",
  },
  { k: "Lab", to: "/lab", a: "Experiments, prototypes and future technology research." },
  { k: "Contact", to: "/contact", a: "Tell us what you're thinking of building." },
];

export function AskZyqo() {
  const [open, setOpen] = useState(false);
  const [sel, setSel] = useState<number | null>(null);
  return (
    <div className="fixed right-4 bottom-4 z-40 sm:right-6 sm:bottom-6">
      {open && (
        <div
          role="dialog"
          aria-label="Ask ZYQO"
          className="ask-zyqo-panel glass mb-3 w-[min(22rem,calc(100vw-2rem))] rounded-3xl bg-background/85 p-5"
        >
          <div className="flex items-center justify-between">
            <p className="eyebrow text-primary">Ask ZYQO</p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="grid h-9 w-9 place-items-center rounded-full hover:bg-foreground/10"
            >
              <X size={16} />
            </button>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">What would you like to discover?</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {TOPICS.map((t, i) => (
              <button
                key={t.k}
                type="button"
                onClick={() => setSel(i)}
                style={{ animationDelay: `${i * 45}ms` }}
                className={`ask-zyqo-topic min-h-9 rounded-full border px-3 text-xs ${sel === i ? "border-primary text-primary" : "border-border text-foreground/80"}`}
              >
                {t.k}
              </button>
            ))}
          </div>
          {sel !== null && (
            <div
              className="ask-zyqo-answer mt-4 rounded-2xl border border-border p-4 text-sm"
              aria-live="polite"
            >
              <p>{TOPICS[sel]!.a}</p>
              <Link
                to={TOPICS[sel]!.to}
                onClick={() => setOpen(false)}
                className="mt-3 inline-block text-xs font-semibold tracking-[0.18em] uppercase text-primary"
              >
                Go there →
              </Link>
            </div>
          )}
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label="Ask ZYQO"
        className="ask-zyqo-trigger glass ml-auto flex h-12 w-12 items-center justify-center gap-2 rounded-full bg-background/70 text-xs font-semibold tracking-[0.18em] uppercase sm:w-auto sm:px-5"
      >
        <MessageCircle size={16} className="ask-zyqo-icon text-primary" />{" "}
        <span className="hidden sm:inline">Ask ZYQO</span>
      </button>
    </div>
  );
}
