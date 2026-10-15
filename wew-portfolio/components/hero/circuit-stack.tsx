"use client";

import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  Environment,
  Grid,
  Lightformer,
  MeshTransmissionMaterial,
  PerformanceMonitor,
  RoundedBox,
} from '@react-three/drei';
import { Bloom, EffectComposer, ToneMapping, Vignette } from '@react-three/postprocessing';
import { ToneMappingMode } from 'postprocessing';
import type { MotionValue } from 'motion/react';
import { createBoardTextures, createRadialTexture } from './circuit-textures';

const MINT = new THREE.Color('#6ee7b7');
/** Over-bright mint: anything above 1 is picked up by the bloom pass. */
const MINT_HOT = MINT.clone().multiplyScalar(4);

const BOARD = 3;
const GLASS = 3.3;
const BASE_GAP = 1.05;
const SPREAD_GAP = 0.95;

const LAYERS = [
  { seed: 11, chip: 0.3, label: 'Interface', detail: 'Next.js · React · TypeScript' },
  { seed: 29, chip: 0.22, label: 'Services & AI', detail: 'Django · Node · LangGraph · RAG' },
  { seed: 47, chip: 0.26, label: 'Infrastructure', detail: 'Docker · CI/CD · Postgres · Redis' },
];

type Quality = 'high' | 'low';

interface StackProps {
  progress: MotionValue<number>;
  quality: Quality;
  animate: boolean;
  labels: React.RefObject<(HTMLDivElement | null)[]>;
}

/** Point on each layer's right-hand corner that its label is pinned to. */
const LABEL_ANCHOR = new THREE.Vector3(GLASS / 2 + 0.45, 0.05, -GLASS / 2 - 0.45);

const smooth = (t: number) => t * t * (3 - 2 * t);

/** Deterministic 0–1 generator, so the layout is identical on every load. */
function seededRandom(seed: number) {
  let state = seed;
  return () => (state = (state * 9301 + 49297) % 233280) / 233280;
}
const clamp01 = (t: number) => Math.min(1, Math.max(0, t));

/** Additive shader that sends a ripple of light outwards along the traces. */
function SignalMaterial({ glow, offset }: { glow: THREE.Texture; offset: number }) {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        toneMapped: false,
        uniforms: {
          uGlow: { value: glow },
          uTime: { value: 0 },
          uOffset: { value: offset },
          uColor: { value: MINT.clone() },
        },
        vertexShader: /* glsl */ `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: /* glsl */ `
          uniform sampler2D uGlow;
          uniform float uTime;
          uniform float uOffset;
          uniform vec3 uColor;
          varying vec2 vUv;
          void main() {
            float mask = texture2D(uGlow, vUv).r;
            float d = length(vUv - 0.5);
            float front = fract(uTime * 0.16 + uOffset) * 0.95;
            float wave = exp(-pow((d - front) * 16.0, 2.0));
            float idle = 0.18 + 0.06 * sin(uTime * 1.3 + uOffset * 6.0);
            gl_FragColor = vec4(uColor * mask * (idle + wave * 3.2), 1.0);
          }
        `,
      }),
    [glow, offset]
  );

  const ref = useRef<THREE.ShaderMaterial>(null);

  useFrame((state) => {
    if (ref.current) ref.current.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return <primitive ref={ref} object={material} attach="material" />;
}

function Chips({ seed, chip }: { seed: number; chip: number }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const count = 22;

  useEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    const random = seededRandom(seed * 9301);
    const m = new THREE.Matrix4();
    const keepOut = (BOARD * chip) / 2 + 0.18;
    for (let i = 0; i < count; i++) {
      let x = 0;
      let z = 0;
      do {
        x = (random() - 0.5) * (BOARD - 0.5);
        z = (random() - 0.5) * (BOARD - 0.5);
      } while (Math.abs(x) < keepOut && Math.abs(z) < keepOut);
      const w = 0.08 + random() * 0.28;
      const d = 0.08 + random() * 0.22;
      const h = 0.025 + random() * 0.05;
      m.compose(new THREE.Vector3(x, 0.02 + h / 2, z), new THREE.Quaternion(), new THREE.Vector3(w, h, d));
      mesh.setMatrixAt(i, m);
    }
    mesh.instanceMatrix.needsUpdate = true;
  }, [seed, chip]);

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <boxGeometry />
      <meshStandardMaterial color="#0d1613" metalness={0.65} roughness={0.32} />
    </instancedMesh>
  );
}

function Layer({
  index,
  layer,
  quality,
}: {
  index: number;
  layer: (typeof LAYERS)[number];
  quality: Quality;
}) {
  const textures = useMemo(() => createBoardTextures(layer.seed, layer.chip), [layer.seed, layer.chip]);
  const glassEdges = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(GLASS, 0.3, GLASS)), []);
  const chipSize = BOARD * layer.chip * 0.92;

  useEffect(
    () => () => {
      textures.map.dispose();
      textures.glow.dispose();
      glassEdges.dispose();
    },
    [textures, glassEdges]
  );

  return (
    <group>
      {/* Board */}
      <mesh>
        <boxGeometry args={[BOARD, 0.04, BOARD]} />
        <meshStandardMaterial
          map={textures.map}
          emissiveMap={textures.glow}
          emissive={MINT}
          emissiveIntensity={0.35}
          metalness={0.35}
          roughness={0.55}
        />
      </mesh>
      {/* Signal ripple along the traces */}
      <mesh position={[0, 0.021, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[BOARD, BOARD]} />
        <SignalMaterial glow={textures.glow} offset={index * 0.33} />
      </mesh>

      <Chips seed={layer.seed} chip={layer.chip} />

      {/* Central processor with a glowing outline */}
      <mesh position={[0, 0.06, 0]}>
        <boxGeometry args={[chipSize, 0.08, chipSize]} />
        <meshStandardMaterial color="#0a1210" metalness={0.8} roughness={0.25} />
      </mesh>
      <mesh position={[0, 0.101, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[chipSize * 0.28, chipSize * 0.3, 4, 1]} />
        <meshBasicMaterial color={MINT_HOT} toneMapped={false} />
      </mesh>

      {/* Corner standoffs */}
      {[-1, 1].flatMap((sx) =>
        [-1, 1].map((sz) => (
          <mesh key={`${sx}${sz}`} position={[sx * (GLASS / 2 - 0.14), 0.02, sz * (GLASS / 2 - 0.14)]}>
            <cylinderGeometry args={[0.06, 0.06, 0.34, 20]} />
            <meshStandardMaterial color="#9fb3ab" metalness={1} roughness={0.22} />
          </mesh>
        ))
      )}

      {/* Glass slab */}
      <RoundedBox args={[GLASS, 0.3, GLASS]} radius={0.05} smoothness={4} position={[0, 0.04, 0]}>
        <MeshTransmissionMaterial
          transmissionSampler
          samples={quality === 'high' ? 8 : 4}
          thickness={0.25}
          roughness={0.02}
          ior={1.4}
          chromaticAberration={0.02}
          anisotropicBlur={0.02}
          distortion={0.02}
          distortionScale={0.4}
          temporalDistortion={0}
          color="#d9fff0"
          attenuationColor="#6ee7b7"
          attenuationDistance={3}
          clearcoat={1}
          clearcoatRoughness={0.1}
          envMapIntensity={1.2}
        />
      </RoundedBox>
      <lineSegments geometry={glassEdges} position={[0, 0.04, 0]}>
        <lineBasicMaterial color={MINT_HOT} transparent opacity={0.22} toneMapped={false} />
      </lineSegments>

    </group>
  );
}

/** Light columns linking the layers, with pulses travelling up them. */
function DataColumns({ spanRef, animate }: { spanRef: React.RefObject<[number, number]>; animate: boolean }) {
  const columns = useRef<THREE.InstancedMesh>(null);
  const pulses = useRef<THREE.InstancedMesh>(null);

  const data = useMemo(() => {
    const random = seededRandom(7);
    const cols = Array.from({ length: 34 }, (_, i) => {
      const inner = i < 24;
      const r = inner ? 0.42 : 1.25;
      return { x: (random() - 0.5) * 2 * r, z: (random() - 0.5) * 2 * r };
    });
    const ps = Array.from({ length: 22 }, () => ({
      col: Math.floor(random() * cols.length),
      speed: 0.25 + random() * 0.45,
      phase: random(),
    }));
    return { cols, ps };
  }, []);

  const m = useMemo(() => new THREE.Matrix4(), []);
  const pos = useMemo(() => new THREE.Vector3(), []);
  const scale = useMemo(() => new THREE.Vector3(), []);
  const q = useMemo(() => new THREE.Quaternion(), []);

  useFrame((state) => {
    const [bottom, top] = spanRef.current;
    const height = top - bottom;
    const t = state.clock.elapsedTime;
    data.cols.forEach((c, i) => {
      m.compose(pos.set(c.x, bottom + height / 2, c.z), q, scale.set(1, height, 1));
      columns.current?.setMatrixAt(i, m);
    });
    data.ps.forEach((p, i) => {
      const c = data.cols[p.col];
      const f = animate ? (t * p.speed + p.phase) % 1 : p.phase;
      const fade = Math.sin(f * Math.PI);
      m.compose(pos.set(c.x, bottom + f * height, c.z), q, scale.set(fade, 1 + fade * 2, fade));
      pulses.current?.setMatrixAt(i, m);
    });
    if (columns.current) columns.current.instanceMatrix.needsUpdate = true;
    if (pulses.current) pulses.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      <instancedMesh ref={columns} args={[undefined, undefined, data.cols.length]} frustumCulled={false}>
        <cylinderGeometry args={[0.006, 0.006, 1, 6]} />
        <meshBasicMaterial color={MINT} transparent opacity={0.28} toneMapped={false} depthWrite={false} />
      </instancedMesh>
      <instancedMesh ref={pulses} args={[undefined, undefined, data.ps.length]} frustumCulled={false}>
        <capsuleGeometry args={[0.014, 0.06, 4, 8]} />
        <meshBasicMaterial color={MINT_HOT} toneMapped={false} />
      </instancedMesh>
    </>
  );
}

function Stack({ progress, quality, animate, labels }: StackProps) {
  const root = useRef<THREE.Group>(null);
  const layers = useRef<(THREE.Group | null)[]>([]);
  const anchor = useMemo(() => new THREE.Vector3(), []);
  const span = useRef<[number, number]>([-BASE_GAP, BASE_GAP]);
  const pool = useMemo(() => createRadialTexture(), []);
  const start = useRef<number | null>(null);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (start.current === null) start.current = t;
    const since = t - start.current;

    const spread = animate ? smooth(clamp01(progress.get() / 0.42)) : 0.35;
    const gap = BASE_GAP + spread * SPREAD_GAP;

    layers.current.forEach((g, i) => {
      if (!g) return;
      // Bottom layer is index 2; it sits lowest.
      const slot = 1 - i;
      const intro = animate ? smooth(clamp01((since - (2 - i) * 0.18) / 1.3)) : 1;
      const target = slot * gap - (1 - intro) * 3.5;
      g.position.y = THREE.MathUtils.damp(g.position.y, target, 7, delta);
      g.position.y = intro < 1 ? target : g.position.y;
      const s = 0.85 + 0.15 * intro;
      g.scale.setScalar(s);
      const label = labels.current[i];
      if (label) {
        anchor.copy(LABEL_ANCHOR);
        g.localToWorld(anchor).project(state.camera);
        const x = ((anchor.x + 1) / 2) * state.size.width;
        const y = ((1 - anchor.y) / 2) * state.size.height;
        label.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
        label.style.opacity = String(clamp01((spread - 0.25) / 0.5));
      }
    });

    const top = layers.current[0]?.position.y ?? gap;
    const bottom = layers.current[2]?.position.y ?? -gap;
    span.current = [bottom, top];

    if (root.current) {
      const px = animate ? state.pointer.x : 0;
      const py = animate ? state.pointer.y : 0;
      const idle = animate ? Math.sin(t * 0.4) * 0.04 : 0;
      root.current.rotation.y = THREE.MathUtils.damp(root.current.rotation.y, px * 0.22 + spread * 0.35 + idle, 3, delta);
      root.current.rotation.x = THREE.MathUtils.damp(root.current.rotation.x, -py * 0.08, 3, delta);
      root.current.position.y = THREE.MathUtils.damp(root.current.position.y, (animate ? Math.sin(t * 0.6) * 0.05 : 0) - spread * 0.2, 4, delta);
    }
  });

  return (
    <group ref={root}>
      {LAYERS.map((layer, i) => (
        <group key={layer.seed} ref={(g) => { layers.current[i] = g; }} position={[0, (1 - i) * BASE_GAP - 3.5, 0]}>
          <Layer index={i} layer={layer} quality={quality} />
        </group>
      ))}
      <DataColumns spanRef={span} animate={animate} />

      {/* Light pool and engineering grid below the stack */}
      <mesh position={[0, -2.6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[9, 9]} />
        <meshBasicMaterial map={pool} color={MINT} transparent opacity={0.16} depthWrite={false} toneMapped={false} />
      </mesh>
      <Grid
        position={[0, -2.62, 0]}
        args={[30, 30]}
        cellSize={0.4}
        cellThickness={0.6}
        cellColor="#14231e"
        sectionSize={2}
        sectionThickness={1}
        sectionColor="#1f3d33"
        fadeDistance={16}
        fadeStrength={2}
        infiniteGrid
      />
    </group>
  );
}

function Lighting() {
  return (
    <>
      <ambientLight intensity={0.25} />
      <directionalLight position={[4, 8, 3]} intensity={1.4} />
      <pointLight position={[-4, 3, 2]} intensity={2.5} color={MINT} distance={12} />
      {/* In-code studio environment: reflections on the glass, no HDR download. */}
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={3} position={[0, 6, -4]} scale={[10, 2, 1]} />
        <Lightformer form="rect" intensity={1.5} position={[-6, 2, 2]} rotation-y={Math.PI / 2} scale={[8, 1.5, 1]} />
        <Lightformer form="rect" intensity={2.5} color="#6ee7b7" position={[6, 1, 0]} rotation-y={-Math.PI / 2} scale={[6, 0.6, 1]} />
      </Environment>
    </>
  );
}

/** Pause rendering while the hero is off-screen or the tab is hidden. */
function useShouldRender(ref: React.RefObject<HTMLElement | null>) {
  const [inView, setInView] = useState(true);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin: '100px' });
    io.observe(el);
    const onVisibility = () => setVisible(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [ref]);

  return inView && visible;
}

function Ready({ onReady }: { onReady: () => void }) {
  const gl = useThree((s) => s.gl);
  useEffect(() => {
    // Wait a couple of frames so the first paint is complete before fading in.
    const id = requestAnimationFrame(() => requestAnimationFrame(onReady));
    return () => cancelAnimationFrame(id);
  }, [gl, onReady]);
  return null;
}

export default function CircuitStack({
  progress,
  eventSource,
  reducedMotion,
  onReady,
}: {
  progress: MotionValue<number>;
  eventSource: React.RefObject<HTMLElement | null>;
  reducedMotion: boolean;
  onReady: () => void;
}) {
  const container = useRef<HTMLDivElement>(null);
  const active = useShouldRender(container);
  const [quality, setQuality] = useState<Quality>('high');
  const [dpr, setDpr] = useState(1.5);
  const labels = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <div ref={container} className="relative h-full w-full">
      <Canvas
        dpr={dpr}
        frameloop={active ? 'always' : 'never'}
        eventSource={eventSource as React.RefObject<HTMLElement>}
        eventPrefix="client"
        camera={{ position: [8.6, 6.6, 8.6], fov: 30, near: 0.1, far: 60 }}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        onCreated={({ camera }) => camera.lookAt(0, -0.2, 0)}
      >
        <PerformanceMonitor
          bounds={() => [45, 58]}
          flipflops={3}
          onDecline={() => {
            setDpr((d) => Math.max(1, d - 0.25));
            setQuality('low');
          }}
          onIncline={() => setDpr((d) => Math.min(1.75, d + 0.25))}
          onFallback={() => {
            setDpr(1);
            setQuality('low');
          }}
        />
        <Lighting />
        <Stack progress={progress} quality={quality} animate={!reducedMotion} labels={labels} />
        <EffectComposer multisampling={quality === 'high' ? 4 : 0}>
          <Bloom mipmapBlur intensity={0.9} luminanceThreshold={1} luminanceSmoothing={0.2} />
          <Vignette offset={0.3} darkness={0.55} />
          <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
        </EffectComposer>
        <Ready onReady={onReady} />
      </Canvas>

      {/* Layer labels: plain DOM, positioned from the 3D scene every frame. */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {LAYERS.map((layer, i) => (
          <div
            key={layer.seed}
            ref={(el) => { labels.current[i] = el; }}
            className="absolute left-0 top-0 w-56 will-change-transform"
            style={{ opacity: 0 }}
          >
            <div className="-translate-y-1/2 pl-3">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                <span className="h-px w-6 bg-accent/60" />0{i + 1} · {layer.label}
              </div>
              <div className="mt-1 pl-8 font-mono text-[10px] tracking-wide text-subtle">{layer.detail}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
