import { Scene3D } from "@/components/site/Scene3D";

/** Services: an animated 3D network of connected services. */
export function ServicesVisual() {
  return (
    <div className="hero-3d">
      <Scene3D kind="network" />
    </div>
  );
}
