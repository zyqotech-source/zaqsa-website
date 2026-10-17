import { Canvas, useFrame } from "@react-three/fiber";
import { Line, OrbitControls } from "@react-three/drei";
import { useHydrated } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const BRASS = "#d6b46a";
const IVORY = "#f2f5ef";
const INK = "#14243e";

function GlobeMesh({ reducedMotion }: { reducedMotion: boolean }) {
  const globe = useRef<THREE.Group>(null);
  const points = useMemo(() => {
    const positions: number[] = [];
    const total = 480;
    for (let i = 0; i < total; i += 1) {
      const y = 1 - (i / (total - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = Math.PI * (3 - Math.sqrt(5)) * i;
      positions.push(Math.cos(theta) * radius * 2.02, y * 2.02, Math.sin(theta) * radius * 2.02);
    }
    return new Float32Array(positions);
  }, []);

  const latitudeLines = useMemo(
    () =>
      [-1.45, -0.72, 0, 0.72, 1.45].map((y) => {
        const radius = Math.sqrt(4 - y * y);
        return Array.from({ length: 65 }, (_, i) => {
          const angle = (i / 64) * Math.PI * 2;
          return [Math.cos(angle) * radius, y, Math.sin(angle) * radius] as [
            number,
            number,
            number,
          ];
        });
      }),
    [],
  );

  useFrame((_, rawDelta) => {
    if (!globe.current || reducedMotion) return;
    globe.current.rotation.y += Math.min(rawDelta, 0.05) * 0.24;
  });

  return (
    <group ref={globe} rotation={[0.18, 0, -0.08]}>
      <mesh>
        <sphereGeometry args={[2, 48, 48]} />
        <meshPhysicalMaterial
          color={INK}
          metalness={0.72}
          roughness={0.25}
          clearcoat={1}
          clearcoatRoughness={0.18}
        />
      </mesh>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[points, 3]} />
        </bufferGeometry>
        <pointsMaterial color={BRASS} size={0.018} transparent opacity={0.9} sizeAttenuation />
      </points>
      {latitudeLines.map((line, index) => (
        <Line key={index} points={line} color={BRASS} lineWidth={0.45} transparent opacity={0.35} />
      ))}
      {[0, Math.PI / 3, (Math.PI * 2) / 3].map((rotation, index) => (
        <mesh key={index} rotation={[0, rotation, 0]}>
          <torusGeometry args={[2.005, 0.004, 4, 96]} />
          <meshBasicMaterial color={BRASS} transparent opacity={0.34} />
        </mesh>
      ))}
      <mesh rotation={[Math.PI / 2, 0.12, 0]}>
        <torusGeometry args={[2.42, 0.008, 6, 128]} />
        <meshBasicMaterial color={IVORY} transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

export function ConsultingGlobe() {
  const hydrated = useHydrated();
  const [reducedMotion, setReducedMotion] = useState(false);
  const [webglAvailable, setWebglAvailable] = useState(false);

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
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return (
    <div
      className="globe-stage"
      role="img"
      aria-label="Interactive 3D visualization of a connected global consultancy network"
    >
      <div aria-hidden className="globe-halo" />
      <div className="globe-fallback" aria-hidden />
      {hydrated && webglAvailable && (
        <Canvas
          dpr={[1, 1.4]}
          camera={{ position: [0, 0, 7.7], fov: 42 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        >
          <ambientLight intensity={0.75} />
          <directionalLight position={[4, 5, 5]} intensity={2.1} color={IVORY} />
          <pointLight position={[-4, -1, 3]} intensity={10} color={BRASS} distance={10} />
          <GlobeMesh reducedMotion={reducedMotion} />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate={!reducedMotion}
            autoRotateSpeed={0.55}
            rotateSpeed={0.35}
          />
        </Canvas>
      )}
    </div>
  );
}
