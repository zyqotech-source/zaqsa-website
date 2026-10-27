import { cn } from "@/lib/utils";

type Variant = "color" | "light" | "mono";

const FILL: Record<Variant, { bar: string; fold: string }> = {
  // Indigo layers with a navy fold, for light backgrounds.
  color: { bar: "#4f46e5", fold: "#14243e" },
  // White layers with a cyan fold, for dark backgrounds.
  light: { bar: "#ffffff", fold: "#22d3ee" },
  // One colour: follows the surrounding text colour.
  mono: { bar: "currentColor", fold: "currentColor" },
};

/**
 * The ZAQSA symbol, "Fold": a Z drawn as a folded plan. Two solid layers joined by one
 * diagonal path, separated by thin gaps so it reads as structure even in one colour.
 */
export function LogoMark({
  className,
  variant = "color",
}: {
  className?: string;
  variant?: Variant;
}) {
  const { bar, fold } = FILL[variant];
  return (
    <svg
      className={cn("logo-mark", className)}
      viewBox="0 0 64 64"
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="6" y="8" width="52" height="14" fill={bar} />
      <polygon className="logo-fold" points="6,39 36,25 58,25 28,39" fill={fold} />
      <rect x="6" y="42" width="52" height="14" fill={bar} />
    </svg>
  );
}
