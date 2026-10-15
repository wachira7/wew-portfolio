import * as THREE from 'three';

// Procedurally drawn PCB textures, so the hero needs no image or model downloads.

function rng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface BoardTextures {
  /** Board colour: dark substrate, copper-green traces, pads. */
  map: THREE.CanvasTexture;
  /** White-on-black trace mask, used for the glow and the signal ripple. */
  glow: THREE.CanvasTexture;
}

const SIZE = 1024;
const DIRS: [number, number][] = [
  [1, 0], [-1, 0], [0, 1], [0, -1],
  [1, 1], [1, -1], [-1, 1], [-1, -1],
];

export function createBoardTextures(seed: number, chipSize = 0.32): BoardTextures {
  const random = rng(seed);
  const base = document.createElement('canvas');
  const glow = document.createElement('canvas');
  base.width = base.height = glow.width = glow.height = SIZE;
  const b = base.getContext('2d')!;
  const g = glow.getContext('2d')!;

  // Substrate with a faint vignette.
  const bg = b.createRadialGradient(SIZE / 2, SIZE / 2, 0, SIZE / 2, SIZE / 2, SIZE * 0.7);
  bg.addColorStop(0, '#0b1a15');
  bg.addColorStop(1, '#050b09');
  b.fillStyle = bg;
  b.fillRect(0, 0, SIZE, SIZE);
  g.fillStyle = '#000';
  g.fillRect(0, 0, SIZE, SIZE);

  b.lineCap = g.lineCap = 'round';
  b.lineJoin = g.lineJoin = 'round';

  const chip = (SIZE * chipSize) / 2;
  const c = SIZE / 2;

  // Traces: start at the central chip's pins and route outwards with 45° bends.
  const traces = 170;
  for (let i = 0; i < traces; i++) {
    const side = Math.floor(random() * 4);
    const along = (random() - 0.5) * 2 * chip * 0.9;
    let x = side === 0 ? c + chip : side === 1 ? c - chip : c + along;
    let y = side === 2 ? c + chip : side === 3 ? c - chip : c + along;
    let dir = side;
    const width = 1.5 + random() * 2.5;
    const lit = random() < 0.55;
    const alpha = 0.35 + random() * 0.65;

    b.beginPath();
    g.beginPath();
    b.moveTo(x, y);
    g.moveTo(x, y);
    const segments = 3 + Math.floor(random() * 4);
    for (let s = 0; s < segments; s++) {
      const len = 30 + random() * 150;
      const [dx, dy] = DIRS[dir];
      const norm = dx && dy ? Math.SQRT1_2 : 1;
      x = Math.min(SIZE - 24, Math.max(24, x + dx * len * norm));
      y = Math.min(SIZE - 24, Math.max(24, y + dy * len * norm));
      b.lineTo(x, y);
      g.lineTo(x, y);
      // Bend 45° left/right, or keep going, but never double back.
      const turn = Math.floor(random() * 3) - 1;
      const order = [0, 4, 2, 6, 1, 7, 3, 5]; // compass order of DIRS
      dir = order[(order.indexOf(dir) + turn * 1 + 8) % 8];
    }
    b.strokeStyle = `rgba(42, 110, 86, ${0.55 + alpha * 0.4})`;
    b.lineWidth = width;
    b.stroke();
    if (lit) {
      g.strokeStyle = `rgba(255,255,255,${alpha})`;
      g.lineWidth = width * 0.9;
      g.stroke();
    }

    // Pad / via at the end of each trace.
    const r = width + 2 + random() * 3;
    b.fillStyle = '#3d8a6c';
    b.beginPath();
    b.arc(x, y, r, 0, Math.PI * 2);
    b.fill();
    b.fillStyle = '#050b09';
    b.beginPath();
    b.arc(x, y, r * 0.45, 0, Math.PI * 2);
    b.fill();
    if (lit) {
      g.fillStyle = `rgba(255,255,255,${alpha})`;
      g.beginPath();
      g.arc(x, y, r, 0, Math.PI * 2);
      g.fill();
    }
  }

  // Rows of SMD pads along the edges.
  for (let i = 0; i < 26; i++) {
    const horizontal = random() < 0.5;
    const count = 4 + Math.floor(random() * 10);
    let x = 40 + random() * (SIZE - 200);
    let y = 40 + random() * (SIZE - 200);
    if (Math.abs(x - c) < chip + 40 && Math.abs(y - c) < chip + 40) continue;
    b.fillStyle = 'rgba(120, 170, 150, 0.35)';
    for (let k = 0; k < count; k++) {
      b.fillRect(x, y, horizontal ? 6 : 14, horizontal ? 14 : 6);
      if (horizontal) x += 11;
      else y += 11;
    }
  }

  // Chip footprint with pin fans.
  b.strokeStyle = 'rgba(110, 231, 183, 0.25)';
  b.lineWidth = 2;
  b.strokeRect(c - chip - 14, c - chip - 14, (chip + 14) * 2, (chip + 14) * 2);
  g.strokeStyle = 'rgba(255,255,255,0.9)';
  g.lineWidth = 3;
  g.strokeRect(c - chip - 14, c - chip - 14, (chip + 14) * 2, (chip + 14) * 2);
  b.fillStyle = 'rgba(160, 200, 185, 0.5)';
  for (let k = -chip + 8; k < chip - 4; k += 12) {
    b.fillRect(c + k, c - chip - 10, 5, 10);
    b.fillRect(c + k, c + chip, 5, 10);
    b.fillRect(c - chip - 10, c + k, 10, 5);
    b.fillRect(c + chip, c + k, 10, 5);
  }

  // Fine silkscreen grid dots.
  b.fillStyle = 'rgba(255,255,255,0.04)';
  for (let x = 16; x < SIZE; x += 32) for (let y = 16; y < SIZE; y += 32) b.fillRect(x, y, 2, 2);

  const map = new THREE.CanvasTexture(base);
  map.colorSpace = THREE.SRGBColorSpace;
  map.anisotropy = 8;
  const glowTex = new THREE.CanvasTexture(glow);
  glowTex.anisotropy = 8;
  return { map, glow: glowTex };
}

/** Soft radial falloff, for the light pool under the stack. */
export function createRadialTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 256;
  const ctx = canvas.getContext('2d')!;
  const grad = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(0.4, 'rgba(255,255,255,0.25)');
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 256);
  return new THREE.CanvasTexture(canvas);
}
