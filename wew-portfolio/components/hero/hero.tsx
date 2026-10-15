"use client";

import { useCallback, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { FiArrowDown, FiArrowUpRight, FiGithub, FiGlobe, FiLinkedin } from 'react-icons/fi';
import Button from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ease } from '@/lib/motion';
import { site } from '@/lib/site';
import { hasWebGL } from '@/lib/webgl';
import StackFallback from './stack-fallback';

const CircuitStack = dynamic(() => import('./circuit-stack'), { ssr: false });

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: ease.out, delay },
});

export default function Hero() {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion() ?? false;
  const [webgl, setWebgl] = useState<boolean | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => setWebgl(hasWebGL()), []);
  const onReady = useCallback(() => setReady(true), []);

  // 0 → 1 across the hero's scroll range; the stack spreads apart in the first part.
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end start'] });
  const hintOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  return (
    <section ref={section} className="relative md:h-[175vh]">
      <div ref={stage} className="noise relative h-[100svh] min-h-[640px] overflow-hidden md:sticky md:top-0">
        {/* Backdrop */}
        <div className="bg-grid absolute inset-0" />
        <div className="absolute right-[-10%] top-1/2 h-[80vh] w-[70vw] -translate-y-1/2 bg-[radial-gradient(closest-side,rgb(var(--accent)/0.10),transparent)]" />

        {/* 3D stage */}
        <div
          className={cn(
            'absolute inset-x-0 top-[6%] h-[58%] opacity-50 transition-opacity duration-[1400ms] ease-out',
            'md:inset-y-0 md:left-auto md:right-[-4%] md:top-0 md:h-full md:w-[62%] md:opacity-100',
            !ready && webgl && '!opacity-0'
          )}
        >
          {webgl === false && <StackFallback />}
          {webgl && (
            <CircuitStack
              progress={scrollYProgress}
              eventSource={stage}
              reducedMotion={reducedMotion}
              onReady={onReady}
            />
          )}
        </div>

        {/* Copy */}
        <div className="container relative z-10 flex h-full flex-col justify-end pb-28 pt-28 md:justify-center md:pb-0">
          <div className="max-w-xl">
            <motion.p {...rise(0.1)} className="eyebrow mb-8 flex items-center gap-3">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              <span className="text-accent">Open to opportunities</span>
              <span className="h-3 w-px bg-line/15" />
              {site.location}
            </motion.p>

            <motion.p {...rise(0.2)} className="mb-5 text-lg text-fg">
              Hey, I&apos;m {site.name}
            </motion.p>

            <motion.h1
              {...rise(0.3)}
              className="text-[2.75rem] font-semibold leading-[1.02] tracking-tightest text-fg sm:text-6xl lg:text-7xl"
            >
              I build AI and SaaS systems that <span className="text-accent">ship.</span>
            </motion.h1>

            <motion.p {...rise(0.45)} className="mt-7 max-w-md text-base leading-relaxed text-muted md:text-lg">
              Full-stack &amp; AI engineer. Production SaaS platforms with CI/CD and real-world payments,
              and LLM applications with fine-tuned models, RAG and agents.
            </motion.p>

            <motion.div {...rise(0.55)} className="mt-9 flex flex-wrap gap-3">
              <Button href="/projects" size="lg" trailingIcon={<FiArrowUpRight />}>
                Explore my work
              </Button>
              <Button href="/about" variant="outline" size="lg" trailingIcon={<FiArrowUpRight />}>
                A little about me
              </Button>
            </motion.div>

            <motion.div {...rise(0.65)} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted">
              {[
                { href: site.github, label: 'GitHub', icon: <FiGithub /> },
                { href: site.linkedin, label: 'LinkedIn', icon: <FiLinkedin /> },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 transition-colors hover:text-fg"
                >
                  {s.icon}
                  {s.label}
                  <FiArrowUpRight className="h-3 w-3 opacity-60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              ))}
              <span className="hidden h-4 w-px bg-line/15 sm:block" />
              <span className="inline-flex items-center gap-2">
                <FiGlobe /> Nairobi · UTC+3
              </span>
            </motion.div>
          </div>
        </div>

        {/* Bottom rail */}
        <motion.div
          style={{ opacity: hintOpacity }}
          className="container absolute inset-x-0 bottom-8 z-10 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-subtle"
        >
          <span className="flex items-center gap-3">
            <FiArrowDown className="animate-bounce" /> Scroll to explore
          </span>
          <span className="hidden normal-case tracking-normal md:inline">
            <span className="text-accent">&gt;_</span> git push origin main
            <span className="animate-blink ml-1 inline-block h-3 w-1.5 translate-y-0.5 bg-accent" />
          </span>
        </motion.div>
      </div>
    </section>
  );
}
