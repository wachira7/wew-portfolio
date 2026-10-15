import type { Metadata } from 'next';
import Reveal from '@/components/ui/reveal';
import StackGrid from '@/components/stack/stack-grid';
import { learning, technologies } from '@/content/stack';

export const metadata: Metadata = {
  title: 'Stack | Emmanuel W. Wachira',
  description: 'The technologies I have used in production, rated honestly, and what I am learning next.',
};

export default function TechStackPage() {
  return (
    <div className="pb-24 pt-36 md:pt-44">
      <div className="container">
        <Reveal className="mb-16 grid gap-8 md:mb-20 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="eyebrow mb-6 flex items-center gap-2">
              <span className="h-1.5 w-1.5 bg-accent" />
              Stack · {technologies.length} technologies
            </p>
            <h1 className="text-5xl font-semibold leading-[1.02] tracking-tightest text-fg md:text-7xl">
              The tools I trust in production<span className="text-accent">.</span>
            </h1>
          </div>
          <p className="max-w-md leading-relaxed text-muted lg:col-span-4">
            Everything here I have used in a real project. Ratings reflect honest, real-world experience, not
            aspirational self-assessment.
          </p>
        </Reveal>

        <StackGrid />

        <section className="mt-28">
          <Reveal className="mb-10">
            <p className="eyebrow mb-6 flex items-center gap-2">
              <span className="h-1.5 w-1.5 bg-accent" />
              Currently learning
            </p>
            <h2 className="text-3xl font-medium tracking-tight text-fg md:text-5xl">
              What I&apos;m building toward<span className="text-accent">.</span>
            </h2>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {learning.map((item, i) => (
              <Reveal
                key={item.name}
                delay={i * 0.08}
                className="relative overflow-hidden rounded-xl border border-dashed border-accent/30 bg-surface/60 p-6"
              >
                <div className="flex items-center justify-between">
                  <item.icon className="h-7 w-7 text-accent" />
                  <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                    </span>
                    In progress
                  </span>
                </div>
                <h3 className="mt-6 text-lg font-medium text-fg">{item.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
              </Reveal>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
