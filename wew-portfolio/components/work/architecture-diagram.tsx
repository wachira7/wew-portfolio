"use client";

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import type { Architecture, NodeKind } from '@/content/architecture';
import { cn } from '@/lib/utils';
import { ease } from '@/lib/motion';

const COL_W = 250;
const ROW_H = 92;
const NODE_W = 196;
const NODE_H = 62;
const PAD_X = 12;
const PAD_TOP = 44; // room for column headings
const PAD_BOTTOM = 40;

const kinds: Record<NodeKind, { label: string; color: string }> = {
  client: { label: 'Client', color: 'rgb(236 240 238)' },
  service: { label: 'Service', color: 'rgb(110 231 183)' },
  ai: { label: 'AI / ML', color: 'rgb(196 181 253)' },
  data: { label: 'Data', color: 'rgb(125 211 252)' },
  external: { label: 'External', color: 'rgb(252 211 77)' },
  ops: { label: 'Ops', color: 'rgb(253 164 175)' },
};

export default function ArchitectureDiagram({ arch }: { arch: Architecture }) {
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState<string | null>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [overflows, setOverflows] = useState(false);

  const layout = useMemo(() => {
    const rows = Math.max(...arch.nodes.map((n) => n.row)) + 1;
    const width = arch.columns.length * COL_W;
    const height = PAD_TOP + rows * ROW_H + PAD_BOTTOM;
    const pos = Object.fromEntries(
      arch.nodes.map((n) => [
        n.id,
        { x: n.col * COL_W + (COL_W - NODE_W) / 2, y: PAD_TOP + n.row * ROW_H + (ROW_H - NODE_H) / 2 },
      ])
    );

    const edges = arch.edges.map(([from, to], i) => {
      const a = pos[from];
      const b = pos[to];
      let d: string;
      if (b.x > a.x) {
        // Left-to-right: leave the right edge, enter the left edge.
        const x1 = a.x + NODE_W;
        const y1 = a.y + NODE_H / 2;
        const x2 = b.x;
        const y2 = b.y + NODE_H / 2;
        const mid = (x2 - x1) / 2;
        d = `M ${x1} ${y1} C ${x1 + mid} ${y1}, ${x2 - mid} ${y2}, ${x2} ${y2}`;
      } else {
        // Flowing back: loop underneath, bottom to bottom.
        const x1 = a.x + NODE_W / 2;
        const y1 = a.y + NODE_H;
        const x2 = b.x + NODE_W / 2;
        const y2 = b.y + NODE_H;
        const dip = Math.max(y1, y2) + 46;
        d = `M ${x1} ${y1} C ${x1} ${dip}, ${x2} ${dip}, ${x2} ${y2}`;
      }
      return { id: `${from}-${to}`, from, to, d, delay: i * 0.08 };
    });

    return { width, height, pos, edges, rows };
  }, [arch]);

  const connected = useMemo(() => {
    if (!active) return null;
    const set = new Set([active]);
    arch.edges.forEach(([a, b]) => {
      if (a === active) set.add(b);
      if (b === active) set.add(a);
    });
    return set;
  }, [active, arch.edges]);

  const natural = layout.width + PAD_X * 2;

  // Shrink to fit the column; below ~72% it would be unreadable, so scroll instead.
  useEffect(() => {
    const el = viewport.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const fit = entry.contentRect.width / natural;
      setScale(Math.min(1, Math.max(0.72, fit)));
      setOverflows(fit < 0.72);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [natural]);

  const activeNode = arch.nodes.find((n) => n.id === active);
  const usedKinds = [...new Set(arch.nodes.map((n) => n.kind))];

  return (
    <div className="overflow-hidden rounded-xl border border-line/[0.08] bg-surface">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line/[0.08] px-5 py-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">
          System architecture · {arch.title}
        </span>
        <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          {overflows ? 'Swipe →' : 'Interactive'}
        </span>
      </div>

      {/* Diagram — scrolls sideways on small screens */}
      <div ref={viewport} className="relative overflow-x-auto" data-lenis-prevent>
        <div className="bg-grid pointer-events-none absolute inset-0" />
        <div className="relative" style={{ width: natural * scale, height: layout.height * scale }}>
        <div
          className="absolute left-0 top-0 origin-top-left"
          style={{ width: natural, height: layout.height, transform: `scale(${scale})` }}
          onMouseLeave={() => setActive(null)}
        >
          <div className="absolute inset-0" style={{ left: PAD_X, right: PAD_X }}>
            {/* Column headings */}
            {arch.columns.map((c, i) => (
              <div
                key={c}
                className="absolute top-4 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-subtle"
                style={{ left: i * COL_W, width: COL_W }}
              >
                {c}
              </div>
            ))}

            <svg width={layout.width} height={layout.height} className="absolute inset-0 overflow-visible" aria-hidden>
              {layout.edges.map((e) => {
                const lit = !active || e.from === active || e.to === active;
                return (
                  <g key={e.id} style={{ opacity: lit ? 1 : 0.15, transition: 'opacity 300ms' }}>
                    <motion.path
                      id={`edge-${e.id}`}
                      d={e.d}
                      fill="none"
                      stroke="rgb(255 255 255 / 0.12)"
                      strokeWidth={1.25}
                      initial={{ pathLength: reducedMotion ? 1 : 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true, margin: '-15% 0px' }}
                      transition={{ duration: 1.1, ease: ease.inOut, delay: e.delay }}
                    />
                    <path
                      d={e.d}
                      fill="none"
                      stroke="rgb(110 231 183)"
                      strokeWidth={1.25}
                      strokeDasharray="3 9"
                      className={cn('opacity-50', !reducedMotion && 'animate-[dash_1.2s_linear_infinite]')}
                    />
                    {!reducedMotion && (
                      <circle r={2.6} fill="rgb(110 231 183)" style={{ filter: 'drop-shadow(0 0 4px rgb(110 231 183))' }}>
                        <animateMotion dur={`${2.2 + (e.delay % 1.3)}s`} begin={`${e.delay * 4}s`} repeatCount="indefinite">
                          <mpath href={`#edge-${e.id}`} />
                        </animateMotion>
                      </circle>
                    )}
                  </g>
                );
              })}
            </svg>

            {arch.nodes.map((n, i) => {
              const p = layout.pos[n.id];
              const dimmed = connected && !connected.has(n.id);
              const kind = kinds[n.kind];
              return (
                <motion.button
                  key={n.id}
                  type="button"
                  initial={{ opacity: 0, scale: 0.94 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-15% 0px' }}
                  transition={{ duration: 0.6, ease: ease.out, delay: 0.1 + i * 0.05 }}
                  onMouseEnter={() => setActive(n.id)}
                  onFocus={() => setActive(n.id)}
                  onClick={() => setActive((a) => (a === n.id ? null : n.id))}
                  aria-pressed={active === n.id}
                  className={cn(
                    'absolute flex flex-col justify-center rounded-lg border bg-bg/90 px-3.5 text-left backdrop-blur-sm transition-[opacity,border-color,box-shadow] duration-300',
                    active === n.id
                      ? 'border-accent/60 shadow-[0_0_0_4px_rgb(var(--accent)/0.08),0_0_40px_-8px_rgb(var(--accent)/0.5)]'
                      : 'border-line/10 hover:border-line/25',
                    dimmed && 'opacity-30'
                  )}
                  style={{ left: p.x, top: p.y, width: NODE_W, height: NODE_H }}
                >
                  <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-subtle">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: kind.color }} />
                    {kind.label}
                  </span>
                  <span className="mt-1 truncate text-sm font-medium text-fg">{n.label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
        </div>
      </div>

      {/* Detail bar */}
      <div className="flex min-h-[64px] flex-col justify-center gap-3 border-t border-line/[0.08] px-5 py-3 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-muted" aria-live="polite">
          {activeNode ? (
            <>
              <span className="text-fg">{activeNode.label}</span>
              <span className="text-subtle"> · </span>
              {activeNode.detail}
            </>
          ) : (
            <span className="text-subtle">Hover or tap a component to see what it does and what it talks to.</span>
          )}
        </p>
        <ul className="flex flex-wrap gap-x-4 gap-y-1">
          {usedKinds.map((k) => (
            <li key={k} className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-subtle">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: kinds[k].color }} />
              {kinds[k].label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
