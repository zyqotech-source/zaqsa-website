import { lazy, Suspense, useEffect, useState } from "react";
import { useHydrated } from "@tanstack/react-router";

// The 3D scene is loaded on demand, so it never blocks the first paint.
const GlobeCanvas = lazy(() => import("./GlobeCanvas"));

export function ConsultingGlobe() {
  const hydrated = useHydrated();
  const [reducedMotion, setReducedMotion] = useState(false);
  const [webglAvailable, setWebglAvailable] = useState(false);
  const [wideScreen, setWideScreen] = useState(false);

  useEffect(() => {
    let context: WebGLRenderingContext | WebGL2RenderingContext | null = null;
    try {
      const canvas = document.createElement("canvas");
      context = canvas.getContext("webgl2") || canvas.getContext("webgl");
    } catch {
      context = null;
    }
    setWebglAvailable(Boolean(context));
    context?.getExtension("WEBGL_lose_context")?.loseContext();
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const wide = window.matchMedia("(min-width: 768px)");
    const sync = () => {
      setReducedMotion(reduced.matches);
      setWideScreen(wide.matches);
    };
    sync();
    reduced.addEventListener("change", sync);
    wide.addEventListener("change", sync);
    return () => {
      reduced.removeEventListener("change", sync);
      wide.removeEventListener("change", sync);
    };
  }, []);

  // On phones the sphere stays a static gradient circle (no WebGL cost).
  const showCanvas = hydrated && webglAvailable && wideScreen;

  return (
    <div
      className="globe-stage"
      role="img"
      aria-label="Interactive 3D visualization of a connected global consultancy network"
    >
      <div aria-hidden className="globe-halo" />
      <div className="globe-fallback" aria-hidden />
      {showCanvas && (
        <Suspense fallback={null}>
          <GlobeCanvas reducedMotion={reducedMotion} />
        </Suspense>
      )}
    </div>
  );
}
