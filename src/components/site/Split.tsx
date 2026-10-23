import { Fragment, useRef, type CSSProperties, type ReactNode } from "react";
import { useOnceInView } from "@/lib/motion";
import { cn } from "@/lib/utils";

const vars = (values: Record<string, string | number>) => values as CSSProperties;

/** Headline that reveals word by word on load (0.05s stagger). */
export function WordReveal({
  text,
  startDelay = 0.1,
  className,
}: {
  text: string;
  startDelay?: number;
  className?: string;
}) {
  const words = text.split(" ");
  return (
    <span className={cn("word-reveal", className)}>
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          <span className="word-mask">
            <span
              className="word-inner"
              style={vars({ "--d": `${(startDelay + index * 0.05).toFixed(2)}s` })}
            >
              {word}
            </span>
          </span>
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </span>
  );
}

/** Heading that reveals line by line when it scrolls into view. */
export function LineReveal({ lines, className }: { lines: string[]; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useOnceInView(ref, (element) => element.classList.add("is-in"));
  return (
    <span ref={ref} className={cn("line-reveal", className)}>
      {lines.map((line, index) => (
        <span className="line-mask" key={line}>
          <span className="line-inner" style={vars({ "--i": index })}>
            {line}
          </span>
        </span>
      ))}
    </span>
  );
}

/** A list whose direct children glide in from the left, 0.08s apart. */
export function StaggerList({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLUListElement>(null);
  useOnceInView(ref, (element) => element.classList.add("is-in"));
  return (
    <ul ref={ref} className={cn("stagger-list", className)}>
      {children}
    </ul>
  );
}
