import { lazy, Suspense, useEffect, useState } from "react";
import { useHydrated } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import type { SceneKind } from "@/components/site/Scene3DCanvas";

export type { SceneKind };

// The 3D scenes load on demand, so they never block the first paint.
const SceneCanvas = lazy(() => import("./Scene3DCanvas"));

const LABELS: Record<SceneKind, string> = {
  network: "Animated 3D network of connected services",
  stack: "Animated 3D stack of technology layers",
  bars: "Animated 3D growth chart",
  knot: "Animated 3D loop representing the journey from idea to launch",
  city: "Animated 3D city of industries",
  atom: "Animated 3D atom representing experiments",
  cluster: "Animated 3D cluster representing an ecosystem",
  wave: "Animated 3D signal wave representing conversation",
};

export function Scene3D({ kind, className }: { kind: SceneKind; className?: string }) {
  const hydrated = useHydrated();
  const [reduced, setReduced] = useState(false);
  const [webgl, setWebgl] = useState(false);
  const [draggable, setDraggable] = useState(false);

  useEffect(() => {
    let context: WebGLRenderingContext | WebGL2RenderingContext | null = null;
    try {
      const canvas = document.createElement("canvas");
      context = canvas.getContext("webgl2") || canvas.getContext("webgl");
    } catch {
      context = null;
    }
    setWebgl(Boolean(context));
    context?.getExtension("WEBGL_lose_context")?.loseContext();
    setDraggable(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return (
    <div className={cn("scene3d", className)} role="img" aria-label={LABELS[kind]}>
      <div className="scene3d-halo" aria-hidden />
      <div className="scene3d-fallback" aria-hidden />
      {hydrated && webgl && (
        <Suspense fallback={null}>
          <SceneCanvas kind={kind} reduced={reduced} draggable={draggable} />
        </Suspense>
      )}
    </div>
  );
}
