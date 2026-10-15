"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { FiArrowUpRight, FiGithub } from 'react-icons/fi';
import { categoryLabels, featuredProjects, type Project } from '@/content/projects';
import { cn } from '@/lib/utils';
import { ease } from '@/lib/motion';

/** Sets --x/--y so the card's spotlight follows the pointer. */
function trackPointer(e: React.PointerEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--x', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--y', `${e.clientY - rect.top}px`);
}

function BrowserFrame({ project, wide }: { project: Project; wide?: boolean }) {
  return (
    <div
      className="relative overflow-hidden px-6 pt-6 sm:px-10 sm:pt-10"
      style={{
        background: `radial-gradient(120% 90% at 50% 0%, ${project.tint ?? '#6ee7b7'}33, transparent 70%)`,
      }}
    >
      <div className="relative overflow-hidden rounded-t-lg border border-b-0 border-line/10 bg-bg shadow-[0_30px_80px_-20px_rgb(0_0_0/0.8)]">
        <div className="flex items-center gap-3 border-b border-line/[0.08] px-3 py-2">
          <div className="flex gap-1">
            <span className="h-2 w-2 rounded-full bg-line/15" />
            <span className="h-2 w-2 rounded-full bg-line/15" />
            <span className="h-2 w-2 rounded-full bg-line/15" />
          </div>
          <span className="truncate font-mono text-[10px] text-subtle">{project.frameUrl}</span>
        </div>
        <div className={cn('relative overflow-hidden', wide ? 'aspect-[16/7]' : 'aspect-[16/8]')}>
          <Image
            src={project.image}
            alt={`${project.title} screenshot`}
            fill
            sizes={wide ? '(min-width: 1024px) 60vw, 100vw' : '(min-width: 768px) 45vw, 100vw'}
            className="object-cover object-left-top transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
          />
        </div>
      </div>
    </div>
  );
}

function WorkCard({ project, index, wide }: { project: Project; index: number; wide?: boolean }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.9, ease: ease.out, delay: wide ? 0 : index * 0.08 }}
      onPointerMove={trackPointer}
      className={cn(
        'group relative overflow-hidden rounded-xl border border-line/[0.08] bg-surface transition-colors duration-500 hover:border-line/20',
        wide && 'lg:grid lg:grid-cols-12'
      )}
    >
      {/* Pointer spotlight */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:radial-gradient(500px_circle_at_var(--x)_var(--y),rgb(var(--accent)/0.07),transparent_40%)]" />

      <div className={cn(wide && 'lg:col-span-7 lg:order-2')}>
        <BrowserFrame project={project} wide={wide} />
      </div>

      <div className={cn('flex flex-col p-6 sm:p-8', wide && 'lg:col-span-5 lg:justify-center lg:p-12')}>
        <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">
          <span>{categoryLabels[project.category]}</span>
          {project.liveUrl ? (
            <span className="flex items-center gap-1.5 text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Live
            </span>
          ) : (
            <span>Case study</span>
          )}
        </div>

        <h3 className="mt-5 flex items-start justify-between gap-4 text-2xl font-medium tracking-tight text-fg sm:text-3xl">
          {/* The title link covers the whole card. */}
          <Link href={`/projects/${project.id}`} className="after:absolute after:inset-0 after:z-10">
            {project.title}
          </Link>
          <FiArrowUpRight className="mt-1 h-6 w-6 shrink-0 text-subtle transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent" />
        </h3>

        <p className="mt-3 max-w-xl leading-relaxed text-muted">{project.description}</p>

        {project.proof && (
          <p className="mt-5 border-l border-accent/50 pl-3 font-mono text-xs leading-relaxed text-fg/90">
            {project.proof}
          </p>
        )}

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <ul className="flex flex-wrap gap-2">
            {project.highlights?.map((tag) => (
              <li key={tag} className="rounded border border-line/10 px-2 py-0.5 font-mono text-[11px] text-subtle">
                {tag}
              </li>
            ))}
          </ul>
          <div className="relative z-20 flex items-center gap-4 font-mono text-xs">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-subtle transition-colors hover:text-fg"
              >
                <FiGithub /> Code
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-subtle transition-colors hover:text-fg"
              >
                Visit <FiArrowUpRight />
              </a>
            )}
            <span className="text-subtle/70">0{index + 1}</span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function SelectedWork() {
  const [lead, ...rest] = featuredProjects;

  return (
    <section className="section-padding">
      <div className="container">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow mb-5 flex items-center gap-2">
              <span className="h-1.5 w-1.5 bg-accent" />
              Selected work
            </p>
            <h2 className="text-4xl font-medium tracking-tight text-fg md:text-6xl">
              Built for production<span className="text-accent">.</span>
            </h2>
            <p className="mt-5 max-w-lg text-muted">
              Systems I designed, built and deployed end to end, from data and models to payments and monitoring.
            </p>
          </div>
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
          >
            View all projects
            <FiArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="grid gap-6">
          <WorkCard project={lead} index={0} wide />
          <div className="grid gap-6 md:grid-cols-2">
            {rest.map((project, i) => (
              <WorkCard key={project.id} project={project} index={i + 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
