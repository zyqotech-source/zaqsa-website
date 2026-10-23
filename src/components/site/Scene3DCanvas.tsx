import { Canvas, useFrame } from "@react-three/fiber";
import { Line, OrbitControls } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const INDIGO = "#4f46e5";
const CYAN = "#22d3ee";
const VIOLET = "#7c3aed";
const NAVY = "#312e81";
const ICE = "#eef2ff";

export type SceneKind =
  "network" | "stack" | "bars" | "knot" | "city" | "atom" | "cluster" | "wave";

type SceneProps = { reduced: boolean };

function useSpin(speed: number, reduced: boolean) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (!ref.current || reduced) return;
    ref.current.rotation.y += Math.min(delta, 0.05) * speed;
  });
  return ref;
}

/* Services: connected nodes around a core */
function Network({ reduced }: SceneProps) {
  const group = useSpin(0.28, reduced);
  const geometry = useMemo(() => new THREE.IcosahedronGeometry(2.1, 1), []);
  const nodes = useMemo(() => {
    const unique = new Map<string, THREE.Vector3>();
    const position = geometry.getAttribute("position")!;
    for (let i = 0; i < position.count; i += 1) {
      const point = new THREE.Vector3().fromBufferAttribute(position, i);
      unique.set(`${point.x.toFixed(2)}${point.y.toFixed(2)}${point.z.toFixed(2)}`, point);
    }
    return [...unique.values()];
  }, [geometry]);
  const pulse = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!pulse.current || reduced) return;
    pulse.current.scale.setScalar(1 + Math.sin(clock.elapsedTime * 2) * 0.08);
  });
  return (
    <group ref={group} rotation={[0.3, 0, 0.1]}>
      <lineSegments>
        <edgesGeometry args={[geometry]} />
        <lineBasicMaterial color={INDIGO} transparent opacity={0.6} />
      </lineSegments>
      {nodes.map((point, index) => (
        <group key={index}>
          <Line
            points={[[0, 0, 0], point.toArray() as [number, number, number]]}
            color={CYAN}
            lineWidth={0.5}
            transparent
            opacity={0.28}
          />
          <mesh position={point}>
            <sphereGeometry args={[index % 3 === 0 ? 0.17 : 0.1, 16, 16]} />
            <meshStandardMaterial
              color={index % 3 === 0 ? CYAN : INDIGO}
              emissive={index % 3 === 0 ? CYAN : INDIGO}
              emissiveIntensity={0.5}
            />
          </mesh>
        </group>
      ))}
      <mesh ref={pulse}>
        <icosahedronGeometry args={[0.85, 1]} />
        <meshStandardMaterial color={NAVY} metalness={0.6} roughness={0.25} flatShading />
      </mesh>
      <mesh rotation={[Math.PI / 2.3, 0, 0]}>
        <torusGeometry args={[2.95, 0.014, 6, 140]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.65} />
      </mesh>
    </group>
  );
}

/* Technology: layered slabs with a packet travelling down */
function Stack({ reduced }: SceneProps) {
  const slabs = useRef<(THREE.Group | null)[]>([]);
  const packet = useRef<THREE.Mesh>(null);
  const root = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (reduced) return;
    const t = clock.elapsedTime;
    slabs.current.forEach((slab, index) => {
      if (!slab) return;
      slab.rotation.y = Math.sin(t * 0.5 + index) * 0.35;
      slab.position.y = (1.5 - index) * 0.95 + Math.sin(t * 1.2 + index) * 0.06;
    });
    if (packet.current) packet.current.position.y = 2.1 - ((t * 0.7) % 1) * 4.6;
    if (root.current) root.current.rotation.y = t * 0.18;
  });
  const colours = [INDIGO, "#6366f1", "#0891b2", CYAN];
  return (
    <group ref={root} rotation={[0.35, 0, 0]}>
      {colours.map((colour, index) => (
        <group
          key={colour}
          ref={(node) => {
            slabs.current[index] = node;
          }}
          position={[0, (1.5 - index) * 0.95, 0]}
        >
          <mesh>
            <boxGeometry args={[3.3, 0.24, 3.3]} />
            <meshStandardMaterial
              color={colour}
              metalness={0.35}
              roughness={0.3}
              transparent
              opacity={0.88}
            />
          </mesh>
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(3.3, 0.24, 3.3)]} />
            <lineBasicMaterial color="#ffffff" transparent opacity={0.7} />
          </lineSegments>
        </group>
      ))}
      <mesh ref={packet}>
        <sphereGeometry args={[0.16, 20, 20]} />
        <meshStandardMaterial color="#ffffff" emissive={CYAN} emissiveIntensity={1.4} />
      </mesh>
    </group>
  );
}

/* Business: a growing 3D bar chart */
function Bars({ reduced }: SceneProps) {
  const bars = useRef<(THREE.Mesh | null)[]>([]);
  const root = useRef<THREE.Group>(null);
  const cells = useMemo(
    () =>
      Array.from({ length: 25 }, (_, index) => ({
        x: (index % 5) - 2,
        z: Math.floor(index / 5) - 2,
      })),
    [],
  );
  useFrame(({ clock }) => {
    const t = reduced ? 0 : clock.elapsedTime;
    cells.forEach((cell, index) => {
      const bar = bars.current[index];
      if (!bar) return;
      const height = 0.5 + (Math.sin(t * 1.3 + cell.x * 0.8 + cell.z * 1.1) + 1) * 1.05;
      bar.scale.y = height;
      bar.position.y = height / 2 - 1.3;
    });
    if (root.current && !reduced) root.current.rotation.y = t * 0.22;
  });
  return (
    <group ref={root} rotation={[0.55, 0, 0]}>
      {cells.map((cell, index) => {
        const mix = (cell.x + cell.z + 4) / 8;
        return (
          <mesh
            key={index}
            ref={(node) => {
              bars.current[index] = node;
            }}
            position={[cell.x * 0.78, 0, cell.z * 0.78]}
          >
            <boxGeometry args={[0.56, 1, 0.56]} />
            <meshStandardMaterial
              color={new THREE.Color(INDIGO).lerp(new THREE.Color(CYAN), mix)}
              metalness={0.3}
              roughness={0.35}
            />
          </mesh>
        );
      })}
      <mesh position={[0, -1.34, 0]}>
        <boxGeometry args={[4.6, 0.08, 4.6]} />
        <meshStandardMaterial color={ICE} transparent opacity={0.75} />
      </mesh>
    </group>
  );
}

/* Solutions: an endless loop, idea to launch */
function Knot({ reduced }: SceneProps) {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!group.current || reduced) return;
    group.current.rotation.y = clock.elapsedTime * 0.3;
    group.current.rotation.x = 0.4 + Math.sin(clock.elapsedTime * 0.4) * 0.12;
  });
  return (
    <group ref={group}>
      <mesh>
        <torusKnotGeometry args={[1.55, 0.44, 240, 32, 2, 3]} />
        <meshStandardMaterial color={INDIGO} metalness={0.55} roughness={0.2} />
      </mesh>
      <mesh scale={1.04}>
        <torusKnotGeometry args={[1.55, 0.44, 90, 12, 2, 3]} />
        <meshBasicMaterial color={CYAN} wireframe transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

/* Industries: a small skyline of towers */
function City({ reduced }: SceneProps) {
  const root = useSpin(0.2, reduced);
  const towers = useMemo(() => {
    const heights = [
      1.1, 2.2, 1.4, 0.8, 1.9, 0.9, 2.7, 1.6, 1.2, 2.4, 1.0, 1.7, 0.7, 1.5, 2.0, 1.1,
    ];
    return heights.map((height, index) => ({
      height,
      x: (index % 4) - 1.5,
      z: Math.floor(index / 4) - 1.5,
      index,
    }));
  }, []);
  return (
    <group ref={root} rotation={[0.55, 0, 0]}>
      {towers.map((tower) => (
        <mesh key={tower.index} position={[tower.x * 0.95, tower.height / 2 - 1.2, tower.z * 0.95]}>
          <boxGeometry args={[0.7, tower.height, 0.7]} />
          <meshStandardMaterial
            color={tower.index % 3 === 0 ? CYAN : tower.index % 3 === 1 ? INDIGO : VIOLET}
            metalness={0.3}
            roughness={0.3}
            transparent
            opacity={0.92}
          />
        </mesh>
      ))}
      <mesh position={[0, -1.24, 0]}>
        <boxGeometry args={[4.4, 0.08, 4.4]} />
        <meshStandardMaterial color={ICE} transparent opacity={0.8} />
      </mesh>
    </group>
  );
}

/* Lab: nucleus with electrons on tilted orbits */
function Atom({ reduced }: SceneProps) {
  const electrons = useRef<(THREE.Group | null)[]>([]);
  const root = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (reduced) return;
    const t = clock.elapsedTime;
    electrons.current.forEach((electron, index) => {
      if (electron) electron.rotation.z = t * (0.9 + index * 0.25);
    });
    if (root.current) root.current.rotation.y = t * 0.2;
  });
  const tilts: [number, number, number][] = [
    [0, 0, 0],
    [Math.PI / 3, Math.PI / 6, 0],
    [-Math.PI / 3, -Math.PI / 6, 0],
  ];
  return (
    <group ref={root} rotation={[0.35, 0, 0]}>
      <mesh>
        <sphereGeometry args={[0.62, 32, 32]} />
        <meshStandardMaterial
          color={INDIGO}
          emissive={INDIGO}
          emissiveIntensity={0.45}
          metalness={0.4}
          roughness={0.2}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.95, 24, 24]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.12} />
      </mesh>
      {tilts.map((tilt, index) => (
        <group key={index} rotation={tilt}>
          <mesh>
            <torusGeometry args={[2.35, 0.014, 6, 140]} />
            <meshBasicMaterial color={index === 0 ? INDIGO : CYAN} transparent opacity={0.7} />
          </mesh>
          <group
            ref={(node) => {
              electrons.current[index] = node;
            }}
          >
            <mesh position={[2.35, 0, 0]}>
              <sphereGeometry args={[0.17, 20, 20]} />
              <meshStandardMaterial
                color="#ffffff"
                emissive={index === 0 ? INDIGO : CYAN}
                emissiveIntensity={1.1}
              />
            </mesh>
          </group>
        </group>
      ))}
    </group>
  );
}

/* About: an ecosystem of connected spheres */
function Cluster({ reduced }: SceneProps) {
  const root = useSpin(0.24, reduced);
  const orbs = useMemo(() => {
    const total = 18;
    return Array.from({ length: total }, (_, index) => {
      const y = 1 - (index / (total - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = Math.PI * (3 - Math.sqrt(5)) * index;
      const spread = 1.7 + (index % 3) * 0.45;
      return {
        position: [
          Math.cos(theta) * radius * spread,
          y * spread,
          Math.sin(theta) * radius * spread,
        ] as [number, number, number],
        size: 0.14 + (index % 4) * 0.07,
        colour: index % 3 === 0 ? CYAN : index % 3 === 1 ? INDIGO : VIOLET,
      };
    });
  }, []);
  return (
    <group ref={root} rotation={[0.25, 0, 0]}>
      <mesh>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial color={NAVY} metalness={0.5} roughness={0.2} />
      </mesh>
      {orbs.map((orb, index) => (
        <group key={index}>
          <Line
            points={[[0, 0, 0], orb.position]}
            color={INDIGO}
            lineWidth={0.5}
            transparent
            opacity={0.25}
          />
          <mesh position={orb.position}>
            <sphereGeometry args={[orb.size, 20, 20]} />
            <meshStandardMaterial
              color={orb.colour}
              emissive={orb.colour}
              emissiveIntensity={0.4}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* Contact: a wave of signal dots */
function Wave({ reduced }: SceneProps) {
  const points = useRef<THREE.Points>(null);
  const { positions, colours } = useMemo(() => {
    const size = 44;
    const pos = new Float32Array(size * size * 3);
    const col = new Float32Array(size * size * 3);
    const a = new THREE.Color(INDIGO);
    const b = new THREE.Color(CYAN);
    for (let i = 0; i < size; i += 1) {
      for (let j = 0; j < size; j += 1) {
        const index = (i * size + j) * 3;
        pos[index] = (i / (size - 1) - 0.5) * 6;
        pos[index + 2] = (j / (size - 1) - 0.5) * 6;
        const mixed = a.clone().lerp(b, i / (size - 1));
        col[index] = mixed.r;
        col[index + 1] = mixed.g;
        col[index + 2] = mixed.b;
      }
    }
    return { positions: pos, colours: col };
  }, []);
  useFrame(({ clock }) => {
    const cloud = points.current;
    if (!cloud) return;
    const t = reduced ? 0 : clock.elapsedTime;
    const attribute = cloud.geometry.getAttribute("position")!;
    for (let k = 0; k < attribute.count; k += 1) {
      const x = attribute.getX(k);
      const z = attribute.getZ(k);
      attribute.setY(k, Math.sin(x * 1.1 + t * 1.6) * 0.38 + Math.cos(z * 1.3 + t * 1.2) * 0.3);
    }
    attribute.needsUpdate = true;
    if (!reduced) cloud.rotation.y = t * 0.12;
  });
  return (
    <group rotation={[0.75, 0, 0]}>
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colours, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.075} vertexColors transparent opacity={0.95} sizeAttenuation />
      </points>
    </group>
  );
}

const SCENES: Record<SceneKind, (props: SceneProps) => React.JSX.Element> = {
  network: Network,
  stack: Stack,
  bars: Bars,
  knot: Knot,
  city: City,
  atom: Atom,
  cluster: Cluster,
  wave: Wave,
};

export default function SceneCanvas({
  kind,
  reduced,
  draggable,
}: {
  kind: SceneKind;
  reduced: boolean;
  draggable: boolean;
}) {
  const Scene = SCENES[kind];
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 8.4], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.9} />
      <directionalLight position={[4, 5, 5]} intensity={2.2} color="#ffffff" />
      <pointLight position={[-4, -1, 3]} intensity={12} color={CYAN} distance={12} />
      <Scene reduced={reduced} />
      {draggable && <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.4} />}
    </Canvas>
  );
}
