"use client";

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { animate, motion, useInView, useReducedMotion } from 'motion/react';
import { FiArrowUpRight } from 'react-icons/fi';
import { projects } from '@/content/projects';
import { ease } from '@/lib/motion';

const principles = [
  {
    title: 'End to end',
    body: 'I own the whole path: data model, APIs, interface, CI/CD and monitoring. Nothing is someone else’s problem.',
  },
  {
    title: 'Built to last',
    body: 'Background jobs, Prometheus and Grafana, tested billing flows. I build for production traffic, not for the demo.',
  },
  {
    title: 'Real-world first',
    body: 'Field operations at KOKO Networks taught me software has to work for real people on real networks, M-Pesa included.',
  },
];

// Every number here is backed by the projects and certifications on this site.
const stats = [
  { value: projects.length, suffix: '', label: 'projects shipped' },
  { value: 3, suffix: '', label: 'payment gateways in production' },
  { value: 63, suffix: '%', label: 'lower error with my LLM ensemble' },
  { value: 5, suffix: '', label: 'certifications, AWS to AI engineering' },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView) return;
    if (reducedMotion) {
      el.textContent = `${value}${suffix}`;
      return;
    }
    const controls = animate(0, value, {
      duration: 1.6,
      ease: ease.out,
      onUpdate: (v) => (el.textContent = `${Math.round(v)}${suffix}`),
    });
    return () => controls.stop();
  }, [inView, value, suffix, reducedMotion]);

  return (
    <span ref={ref} className="tabular-nums">
      0{suffix}
    </span>
  );
}

export default function BeyondCode() {
  return (
    <section className="section-padding border-t border-line/[0.08]">
      <div className="container">
        <div className="grid gap-14 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.9, ease: ease.out }}
            className="lg:col-span-4"
          >
            <p className="eyebrow mb-5 flex items-center gap-2">
              <span className="h-1.5 w-1.5 bg-accent" />
              Engineering with intention
            </p>
            <h2 className="text-4xl font-medium tracking-tight text-fg md:text-5xl">
              Beyond the code<span className="text-accent">.</span>
            </h2>
            <p className="mt-6 max-w-sm leading-relaxed text-muted">
              Full-stack and AI engineer in Nairobi, trained at Moringa School and shaped by field operations.
              I care about the whole system, and about the people who use it.
            </p>
            <Link
              href="/about"
              className="group mt-8 inline-flex items-center gap-2 text-sm text-fg transition-colors hover:text-accent"
            >
              More about me
              <FiArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </motion.div>

          <div className="grid gap-px overflow-hidden rounded-xl border border-line/[0.08] bg-line/[0.08] sm:grid-cols-3 lg:col-span-8">
            {principles.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.9, ease: ease.out, delay: 0.1 + i * 0.1 }}
                className="group flex flex-col bg-bg p-7 transition-colors duration-500 hover:bg-surface"
              >
                <span className="font-mono text-xs text-subtle transition-colors group-hover:text-accent">0{i + 1}</span>
                <h3 className="mt-10 text-xl font-medium text-fg">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{p.body}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <dl className="mt-20 grid grid-cols-2 gap-y-10 border-t border-line/[0.08] pt-12 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="pr-6">
              <dt className="sr-only">{s.label}</dt>
              <dd className="text-5xl font-medium tracking-tightest text-fg md:text-6xl">
                <Counter value={s.value} suffix={s.suffix} />
              </dd>
              <dd className="mt-3 max-w-[12rem] font-mono text-xs uppercase leading-relaxed tracking-[0.12em] text-subtle">
                {s.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
