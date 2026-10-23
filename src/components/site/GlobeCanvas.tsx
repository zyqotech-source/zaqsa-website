import { Canvas, useFrame } from "@react-three/fiber";
import { Line, OrbitControls } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const GLOW = "#60a5fa";
const ICE = "#eaf2ff";
const NAVY = "#0f1b4d";

function GlobeMesh({ reducedMotion }: { reducedMotion: boolean }) {
  const float = useRef<THREE.Group>(null);
  const globe = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      mouse.current.x = event.clientX / window.innerWidth - 0.5;
      mouse.current.y = event.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

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

  useFrame(({ clock }, rawDelta) => {
    if (!globe.current || !float.current || reducedMotion) return;
    const delta = Math.min(rawDelta, 0.05);
    globe.current.rotation.y += delta * 0.22;
    // Gentle float, and a soft tilt toward the mouse.
    float.current.position.y = Math.sin(clock.elapsedTime * 0.9) * 0.12;
    float.current.rotation.x += (mouse.current.y * 0.35 - float.current.rotation.x) * 0.05;
    float.current.rotation.z += (-mouse.current.x * 0.25 - float.current.rotation.z) * 0.05;
  });

  return (
    <group ref={float}>
      <group ref={globe} rotation={[0.18, 0, -0.08]}>
        <mesh>
          <sphereGeometry args={[2, 48, 48]} />
          <meshPhysicalMaterial
            color={NAVY}
            metalness={0.6}
            roughness={0.28}
            clearcoat={1}
            clearcoatRoughness={0.18}
          />
        </mesh>
        <mesh>
          <sphereGeometry args={[2.18, 40, 40]} />
          <meshBasicMaterial color={GLOW} transparent opacity={0.08} side={THREE.BackSide} />
        </mesh>
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[points, 3]} />
          </bufferGeometry>
          <pointsMaterial color={GLOW} size={0.018} transparent opacity={0.9} sizeAttenuation />
        </points>
        {latitudeLines.map((line, index) => (
          <Line
            key={index}
            points={line}
            color={GLOW}
            lineWidth={0.45}
            transparent
            opacity={0.35}
          />
        ))}
        {[0, Math.PI / 3, (Math.PI * 2) / 3].map((rotation, index) => (
          <mesh key={index} rotation={[0, rotation, 0]}>
            <torusGeometry args={[2.005, 0.004, 4, 96]} />
            <meshBasicMaterial color={GLOW} transparent opacity={0.34} />
          </mesh>
        ))}
        <mesh rotation={[Math.PI / 2, 0.12, 0]}>
          <torusGeometry args={[2.42, 0.008, 6, 128]} />
          <meshBasicMaterial color={ICE} transparent opacity={0.4} />
        </mesh>
      </group>
    </group>
  );
}

export default function GlobeCanvas({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.4]}
      camera={{ position: [0, 0, 7.7], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={0.75} />
      <directionalLight position={[4, 5, 5]} intensity={2.1} color={ICE} />
      <pointLight position={[-4, -1, 3]} intensity={10} color={GLOW} distance={10} />
      <GlobeMesh reducedMotion={reducedMotion} />
      <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.35} />
    </Canvas>
  );
}
