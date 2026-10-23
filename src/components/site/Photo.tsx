import { useRef, type CSSProperties } from "react";
import { getPhoto, type PhotoSlot } from "@/lib/photos";
import { useOnceInView } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * A photo slot. Uses the uploaded file for `slot` when present, otherwise a soft blue
 * placeholder. Settles in (scale 1.06 -> 1, fade) when it scrolls into view.
 */
export function Photo({
  slot,
  className,
  round = false,
  ratio,
  eager = false,
  settle = true,
  style,
}: {
  slot: PhotoSlot;
  className?: string;
  round?: boolean;
  ratio?: string;
  eager?: boolean;
  settle?: boolean;
  style?: CSSProperties;
}) {
  const { src, alt } = getPhoto(slot);
  const ref = useRef<HTMLDivElement>(null);
  useOnceInView(ref, (element) => element.classList.add("is-in"));

  return (
    <div
      ref={ref}
      className={cn("photo", settle && "photo-settle", round && "photo-round", className)}
      style={{ ...(ratio ? { aspectRatio: ratio } : null), ...style }}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          draggable={false}
        />
      ) : (
        <div className="photo-empty" role="img" aria-label={alt}>
          <span>Add photo here</span>
        </div>
      )}
    </div>
  );
}
