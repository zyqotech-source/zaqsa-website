import { useEffect, useRef, useState, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

function useInView<T extends HTMLElement>(threshold = 0.3) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (!("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** Animated ZYQO wordmark: letters rise out of a mask, with a soft light sweep. */
export function AnimatedWordmark({ className }: { className?: string }) {
  return (
    <span className={cn("zy-wordmark", className)} aria-hidden="true">
      {"ZYQO".split("").map((char, index) => (
        <span
          key={char}
          className="zy-letter"
          data-char={char}
          style={{ "--i": index } as CSSProperties}
        >
          {char}
        </span>
      ))}
    </span>
  );
}

const GLYPHS = [
  ["</>", 6, 14, 0],
  ["{ }", 18, 72, 1.4],
  ["01", 30, 28, 2.8],
  ["AI", 42, 86, 0.6],
  ["=>", 54, 10, 3.6],
  ["#", 64, 60, 2.1],
  ["API", 74, 34, 4.2],
  ["[ ]", 84, 80, 1.1],
  ["10", 92, 20, 3.1],
  ["fn()", 12, 46, 4.8],
  ["git", 48, 52, 5.4],
  ["//", 78, 6, 2.4],
] as const;

/** Decorative floating code glyphs. Deterministic so server and client markup match. */
export function TechBackdrop({ className }: { className?: string }) {
  return (
    <div className={cn("tech-backdrop", className)} aria-hidden="true">
      {GLYPHS.map(([glyph, left, top, delay]) => (
        <span
          key={`${glyph}-${left}`}
          className="tech-glyph"
          style={{ left: `${left}%`, top: `${top}%`, animationDelay: `${delay}s` }}
        >
          {glyph}
        </span>
      ))}
    </div>
  );
}

const TERMINAL_LINES = [
  { kind: "cmd", text: "zyqo init --project your-idea" },
  { kind: "ok", text: "Requirements analysed" },
  { kind: "ok", text: "Architecture & roadmap designed" },
  { kind: "cmd", text: "zyqo build --web --mobile --ai" },
  { kind: "ok", text: "App · API · dashboard compiled" },
  { kind: "cmd", text: "zyqo deploy --production" },
  { kind: "live", text: "Live, monitored and supported" },
] as const;

/** A terminal that types out a delivery pipeline when scrolled into view. */
export function CodeTerminal() {
  const [ref, inView] = useInView<HTMLDivElement>(0.35);
  const [line, setLine] = useState(0);
  const [chars, setChars] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => setReduced(prefersReducedMotion()), []);

  useEffect(() => {
    if (!inView || reduced) return;
    const current = TERMINAL_LINES[line];
    if (!current) {
      const restart = window.setTimeout(() => {
        setLine(0);
        setChars(0);
      }, 3600);
      return () => window.clearTimeout(restart);
    }
    if (chars < current.text.length) {
      const timer = window.setTimeout(
        () => setChars((value) => value + 1),
        current.kind === "cmd" ? 42 : 14,
      );
      return () => window.clearTimeout(timer);
    }
    const next = window.setTimeout(
      () => {
        setLine((value) => value + 1);
        setChars(0);
      },
      current.kind === "cmd" ? 420 : 260,
    );
    return () => window.clearTimeout(next);
  }, [inView, reduced, line, chars]);

  const visible = reduced ? TERMINAL_LINES.length : line;

  return (
    <div
      ref={ref}
      className="code-terminal"
      role="img"
      aria-label="Animated ZYQO delivery pipeline"
    >
      <div className="code-terminal-bar" aria-hidden="true">
        <span />
        <span />
        <span />
        <em>zyqo — ship.sh</em>
      </div>
      <div className="code-terminal-body" aria-hidden="true">
        {TERMINAL_LINES.map((item, index) => {
          const shown = index < visible;
          const typing = index === visible && !reduced;
          if (!shown && !typing)
            return (
              <p key={item.text} className="code-line is-empty">
                &nbsp;
              </p>
            );
          const text = shown ? item.text : item.text.slice(0, chars);
          return (
            <p key={item.text} className={cn("code-line", `code-${item.kind}`)}>
              <span className="code-prompt">
                {item.kind === "cmd" ? "$" : item.kind === "live" ? "→" : "✔"}
              </span>{" "}
              {text}
              {typing && <span className="code-caret" />}
            </p>
          );
        })}
      </div>
    </div>
  );
}

/** Counts up to `value` the first time it scrolls into view. */
export function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [ref, inView] = useInView<HTMLSpanElement>(0.5);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!inView || prefersReducedMotion()) return;
    const duration = 1500;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

/** One marquee row of technologies. Seamless loop, pauses on hover. */
export function StackRow({
  tools,
  reverse = false,
}: {
  tools: readonly string[];
  reverse?: boolean;
}) {
  return (
    <div className={cn("stack-row", reverse && "is-reverse")}>
      <div className="stack-track">
        {[...tools, ...tools].map((tool, index) => (
          <span
            className="stack-chip"
            key={`${tool}-${index}`}
            aria-hidden={index >= tools.length ? "true" : undefined}
          >
            <i aria-hidden />
            {tool}
          </span>
        ))}
      </div>
    </div>
  );
}
