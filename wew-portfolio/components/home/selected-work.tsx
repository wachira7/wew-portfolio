"use client";

import Link from 'next/link';
import { FiArrowUpRight } from 'react-icons/fi';
import { featuredProjects } from '@/content/projects';
import { WorkCard } from '@/components/work/work-card';

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
