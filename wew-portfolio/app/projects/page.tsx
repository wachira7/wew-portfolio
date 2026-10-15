import type { Metadata } from 'next';
import Reveal from '@/components/ui/reveal';
import WorkGrid from '@/components/work/work-grid';
import { projects } from '@/content/projects';

export const metadata: Metadata = {
  title: 'Work | Emmanuel W. Wachira',
  description: 'AI applications, multi-tenant SaaS platforms and web systems built and shipped end to end.',
};

export default function ProjectsPage() {
  const live = projects.filter((p) => p.liveUrl).length;

  return (
    <div className="pb-24 pt-36 md:pt-44">
      <div className="container">
        <Reveal className="mb-16 grid gap-8 md:mb-20 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="eyebrow mb-6 flex items-center gap-2">
              <span className="h-1.5 w-1.5 bg-accent" />
              Work · {projects.length} projects · {live} live
            </p>
            <h1 className="text-5xl font-semibold leading-[1.02] tracking-tightest text-fg md:text-7xl">
              Everything I&apos;ve built<span className="text-accent">.</span>
            </h1>
          </div>
          <p className="max-w-md leading-relaxed text-muted lg:col-span-4">
            From LLM agents to multi-tenant SaaS and smart contracts. Each one has a case study with its
            architecture, the problems I hit and how I solved them.
          </p>
        </Reveal>

        <WorkGrid />
      </div>
    </div>
  );
}
