"use client";

import {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Billboard, Environment } from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  type RapierRigidBody,
} from "@react-three/rapier";
import * as THREE from "three";

type Tech = {
  name: string;
  category: "ai-ml" | "genai" | "backend" | "frontend" | "infra" | "lang";
  size?: number;
};

/** Sizes bumped so long-named techs have enough surface area for a readable label. */
const techs: Tech[] = [
  { name: "PyTorch", category: "ai-ml", size: 1.45 },
  { name: "TensorFlow", category: "ai-ml", size: 1.45 },
  { name: "HuggingFace", category: "ai-ml", size: 1.55 },
  { name: "OpenCV", category: "ai-ml", size: 0.95 },

  { name: "LangChain", category: "genai", size: 1.4 },
  { name: "LangGraph", category: "genai", size: 1.3 },
  { name: "LlamaIndex", category: "genai", size: 1.4 },
  { name: "Gemini", category: "genai", size: 1.35 },
  { name: "Claude", category: "genai", size: 1.15 },
  { name: "RAG", category: "genai", size: 0.85 },

  { name: "Python", category: "lang", size: 1.5 },
  { name: "TypeScript", category: "lang", size: 1.4 },
  { name: "C++", category: "lang", size: 0.85 },

  { name: "Next.js", category: "frontend", size: 1.3 },
  { name: "React", category: "frontend", size: 1.0 },
  { name: "Tailwind", category: "frontend", size: 1.15 },

  { name: "FastAPI", category: "backend", size: 1.2 },
  { name: "Node.js", category: "backend", size: 1.05 },
  { name: "Postgres", category: "backend", size: 1.25 },
  { name: "Supabase", category: "backend", size: 1.2 },
  { name: "Redis", category: "backend", size: 0.9 },
  { name: "Neo4j", category: "backend", size: 0.9 },

  { name: "GCP", category: "infra", size: 0.9 },
  { name: "AWS", category: "infra", size: 0.85 },
  { name: "Docker", category: "infra", size: 1.15 },
  { name: "Vercel", category: "infra", size: 0.95 },
  { name: "Render", category: "infra", size: 0.95 },
];

const BASE_SCALE = 0.72;

const categoryColor: Record<Tech["category"], string> = {
  "ai-ml": "#ee4c2c",
  genai: "#a78bfa",
  backend: "#34d399",
  frontend: "#22d3ee",
  infra: "#f59e0b",
  lang: "#f472b6",
};

/** Shared state so <Pointer /> can drive the currently-grabbed ball. */
type GrabState = { current: RapierRigidBody | null };

export default function TechSpheres() {
  const grabRef = useRef<GrabState>({ current: null });

  useEffect(() => {
    const onUp = () => {
      grabRef.current.current = null;
      document.body.style.cursor = "";
    };
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    window.addEventListener("blur", onUp);
    return () => {
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      window.removeEventListener("blur", onUp);
    };
  }, []);

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true, stencil: false }}
      camera={{ position: [0, 0, 14], fov: 45, near: 1, far: 100 }}
    >
      <color attach="background" args={["#07080c"]} />
      <ambientLight intensity={0.6} />
      <spotLight
        position={[10, 12, 18]}
        angle={0.22}
        penumbra={1}
        intensity={1.1}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-10, -6, -8]} intensity={0.3} color="#a78bfa" />
      <Suspense fallback={null}>
        <Physics gravity={[0, 0, 0]}>
          <Bounds />
          <Pointer grabRef={grabRef} />
          {techs.map((t, i) => (
            <TechBall key={t.name} tech={t} seed={i} grabRef={grabRef} />
          ))}
        </Physics>
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}

function Bounds() {
  const { viewport, size } = useThree();
  const isWide = size.width >= 768;
  const rightInset = isWide ? viewport.width * 0.24 : 0;
  const w = viewport.width / 2;
  const h = viewport.height / 2;
  const rightX = w - rightInset;
  const th = 1;
  const depth = 3;

  return (
    <RigidBody type="fixed" colliders={false} restitution={0.8} friction={0.05}>
      <CuboidCollider args={[w + th, th, depth]} position={[0, -h - th + 0.1, 0]} />
      <CuboidCollider args={[w + th, th, depth]} position={[0, h + th - 0.1, 0]} />
      <CuboidCollider args={[th, h + th, depth]} position={[-w - th + 0.1, 0, 0]} />
      <CuboidCollider args={[th, h + th, depth]} position={[rightX + th, 0, 0]} />
      <CuboidCollider args={[w, h, th]} position={[0, 0, -depth]} />
      <CuboidCollider args={[w, h, th]} position={[0, 0, depth]} />
    </RigidBody>
  );
}

/**
 * Fixed-font-size label: canvas grows horizontally to fit the text at a constant
 * font size, so text on every sphere has the same visual height.
 * Returns {texture, aspect} — use aspect to size the plane.
 */
function makeLabelTexture(
  text: string,
  color: string
): { texture: THREE.CanvasTexture; aspect: number } {
  const stack =
    '"Geist", "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';
  const fontSize = 200;
  const padX = 80;
  const padY = 60;

  const measurer = document.createElement("canvas").getContext("2d")!;
  measurer.font = `900 ${fontSize}px ${stack}`;
  const textW = Math.ceil(measurer.measureText(text).width);

  const canvasW = textW + padX * 2;
  const canvasH = fontSize + padY * 2;

  const c = document.createElement("canvas");
  c.width = canvasW;
  c.height = canvasH;
  const ctx = c.getContext("2d")!;
  ctx.clearRect(0, 0, canvasW, canvasH);
  ctx.font = `900 ${fontSize}px ${stack}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.lineJoin = "round";

  // Dark halo stroke for contrast against the white sphere
  ctx.strokeStyle = "rgba(10, 11, 16, 0.95)";
  ctx.lineWidth = fontSize * 0.14;
  ctx.strokeText(text, canvasW / 2, canvasH / 2);

  // Fill in category color
  ctx.fillStyle = color;
  ctx.fillText(text, canvasW / 2, canvasH / 2);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  tex.needsUpdate = true;

  return { texture: tex, aspect: canvasW / canvasH };
}

function TechBall({
  tech,
  seed,
  grabRef,
}: {
  tech: Tech;
  seed: number;
  grabRef: RefObject<GrabState>;
}) {
  const api = useRef<RapierRigidBody>(null);
  const visualRef = useRef<THREE.Group>(null);
  const [clicked, setClicked] = useState(false);
  const { viewport, size } = useThree();

  const baseScale = BASE_SCALE * (tech.size ?? 1);
  const targetScale = clicked ? baseScale * 1.6 : baseScale;

  const rand = useMemo(() => {
    return (n: number) => {
      const x = Math.sin((seed + 1) * (n + 1) * 12.9898) * 43758.5453;
      return x - Math.floor(x);
    };
  }, [seed]);

  const initialPos = useMemo(() => {
    const isWide = size.width >= 768;
    const rightInset = isWide ? viewport.width * 0.24 : 0;
    const usableW = viewport.width - rightInset;
    const usableH = viewport.height;
    const cx = -rightInset / 2;
    return [
      cx + (rand(1) - 0.5) * (usableW - 2),
      (rand(2) - 0.5) * (usableH - 2),
      (rand(3) - 0.5) * 2,
    ] as [number, number, number];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rand]);

  useEffect(() => {
    if (!api.current) return;
    const vx = (rand(4) - 0.5) * 4;
    const vy = (rand(5) - 0.5) * 4;
    const vz = (rand(6) - 0.5) * 1.2;
    api.current.setLinvel({ x: vx, y: vy, z: vz }, true);
    api.current.setAngvel(
      { x: (rand(7) - 0.5) * 1.5, y: (rand(8) - 0.5) * 1.5, z: (rand(9) - 0.5) * 1.5 },
      true
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame(() => {
    if (visualRef.current) {
      const s = visualRef.current.scale;
      const next = THREE.MathUtils.lerp(s.x, targetScale, 0.18);
      s.setScalar(next);
    }
    if (!api.current) return;

    // Don't auto-nudge the ball that is currently grabbed — Pointer is driving it.
    if (grabRef.current.current === api.current) return;

    const v = api.current.linvel();
    const speed = Math.hypot(v.x, v.y, v.z);
    if (speed < 0.5) {
      const bucket = Math.floor(performance.now() / 500) + seed;
      const px = (rand(bucket) - 0.5) * 0.6;
      const py = (rand(bucket + 50) - 0.5) * 0.6;
      api.current.applyImpulse({ x: px, y: py, z: 0 }, true);
    }
    if (speed > 9) {
      const k = 9 / speed;
      api.current.setLinvel({ x: v.x * k, y: v.y * k, z: v.z * k }, true);
    }
  });

  const color = categoryColor[tech.category];
  const { texture: labelTex, aspect: labelAspect } = useMemo(
    () => makeLabelTexture(tech.name, color),
    [tech.name, color]
  );

  useEffect(() => () => labelTex.dispose(), [labelTex]);

  // Constant text height across all spheres (in local/group units);
  // plane width tracks canvas aspect so long names get wider planes.
  const planeH = 0.55;
  const planeW = planeH * labelAspect;

  return (
    <RigidBody
      ref={api}
      position={initialPos}
      linearDamping={0.25}
      angularDamping={0.5}
      friction={0.15}
      restitution={0.7}
      colliders={false}
    >
      <BallCollider args={[baseScale]} />
      <group
        ref={visualRef}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = "grab";
        }}
        onPointerOut={() => {
          if (!grabRef.current.current) document.body.style.cursor = "";
        }}
        onPointerDown={(e) => {
          e.stopPropagation();
          // Grab this ball — Pointer will steer it toward the cursor each frame.
          grabRef.current.current = api.current;
          document.body.style.cursor = "grabbing";
          setClicked(true);
          window.setTimeout(() => setClicked(false), 900);
        }}
      >
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[1, 64, 64]} />
          <meshStandardMaterial
            color="#f4f5f7"
            roughness={0.35}
            metalness={0.08}
            envMapIntensity={0.85}
            emissive={clicked ? color : "#000000"}
            emissiveIntensity={clicked ? 0.18 : 0}
          />
        </mesh>

        <Billboard follow>
          <mesh position={[0, 0, 1.01]} renderOrder={1}>
            <planeGeometry args={[planeW, planeH]} />
            <meshBasicMaterial
              map={labelTex}
              transparent
              depthWrite={false}
              toneMapped={false}
            />
          </mesh>
        </Billboard>

        <mesh position={[0, -0.65, -0.7]}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshBasicMaterial color={color} />
        </mesh>
      </group>
    </RigidBody>
  );
}

/**
 * Kinematic ball that tracks the mouse. If a sphere is grabbed, drives its
 * velocity toward the cursor so the grabbed sphere follows — and keeps its
 * trailing velocity on release so it flies off ("throw").
 */
function Pointer({ grabRef }: { grabRef: RefObject<GrabState> }) {
  const ref = useRef<RapierRigidBody>(null);
  const vec = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ pointer, viewport }) => {
    if (!ref.current) return;
    vec.set(
      (pointer.x * viewport.width) / 2,
      (pointer.y * viewport.height) / 2,
      0
    );
    ref.current.setNextKinematicTranslation(vec);

    const grabbed = grabRef.current.current;
    if (grabbed) {
      const t = grabbed.translation();
      // Velocity scales with distance from cursor — fast mouse = fast throw on release.
      const follow = 20;
      grabbed.setLinvel(
        {
          x: (vec.x - t.x) * follow,
          y: (vec.y - t.y) * follow,
          z: (0 - t.z) * 6,
        },
        true
      );
      // Cancel any spin the user-physics built up so the ball stays readable while held.
      grabbed.setAngvel({ x: 0, y: 0, z: 0 }, true);
    }
  });

  return (
    <RigidBody
      ref={ref}
      type="kinematicPosition"
      colliders={false}
      position={[0, 0, 0]}
    >
      <BallCollider args={[0.8]} />
    </RigidBody>
  );
}
