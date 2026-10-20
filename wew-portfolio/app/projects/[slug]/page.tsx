import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FiArrowLeft, FiArrowUpRight, FiGithub } from 'react-icons/fi';
import { categoryLabels, getProject, projects } from '@/content/projects';
import { architectures } from '@/content/architecture';
import ArchitectureDiagram from '@/components/work/architecture-diagram';
import Reveal from '@/components/ui/reveal';
import Button from '@/components/ui/button';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return {
    title: `${project.title} · Case study | Emmanuel W. Wachira`,
    description: project.description,
    openGraph: { images: [project.image] },
  };
}

/** Splits a write-up into the prose before the bullets, the "- " bullets, and the prose after. */
function parse(text: string) {
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
  const isBullet = (l: string) => l.startsWith('- ');
  const first = lines.findIndex(isBullet);
  const last = lines.findLastIndex(isBullet);
  const prose = (ls: string[]) => {
    const kept = ls.filter((l) => !l.endsWith(':'));
    return kept.length ? [kept.join(' ')] : [];
  };
  if (first === -1) return { intro: prose(lines), bullets: [], outro: [] };
  return {
    intro: prose(lines.slice(0, first)),
    bullets: lines.filter(isBullet).map((l) => l.slice(2)),
    outro: prose(lines.slice(last + 1)),
  };
}

function Section({ index, label, children }: { index: number; label: string; children: ReactNode }) {
  return (
    <section className="grid gap-8 border-t border-line/[0.08] py-16 md:py-24 lg:grid-cols-12">
      <div className="lg:col-span-3">
        <p className="eyebrow lg:sticky lg:top-28">
          <span className="text-accent">0{index}</span> — {label}
        </p>
      </div>
      <div className="min-w-0 lg:col-span-9">{children}</div>
    </section>
  );
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const about = parse(project.longDescription);
  const challenges = parse(project.challenges);
  const arch = architectures[project.id];
  const index = projects.findIndex((p) => p.id === project.id);
  const next = projects[(index + 1) % projects.length];
  let section = 0;

  return (
    <article className="pt-32">
      <div className="container">
        {/* Header */}
        <Reveal>
          <Link href="/projects" className="group inline-flex items-center gap-2 font-mono text-xs text-subtle transition-colors hover:text-fg">
            <FiArrowLeft className="transition-transform group-hover:-translate-x-0.5" /> All work
          </Link>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:items-end">
          <Reveal delay={0.05} className="lg:col-span-8">
            <p className="eyebrow mb-6 flex items-center gap-3">
              <span>{categoryLabels[project.category]}</span>
              <span className="h-3 w-px bg-line/15" />
              {project.liveUrl ? (
                <span className="flex items-center gap-1.5 text-accent">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Live
                </span>
              ) : (
                <span>Case study</span>
              )}
            </p>
            <h1 className="text-5xl font-semibold leading-[1.02] tracking-tightest text-fg md:text-7xl">{project.title}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{project.description}</p>
          </Reveal>

          <Reveal delay={0.15} className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
            {project.demoUrl && (
              <Button href={project.demoUrl} external size="lg" trailingIcon={<FiArrowUpRight />}>
                Try the live demo
              </Button>
            )}
            {project.liveUrl && (
              <Button href={project.liveUrl} external variant={project.demoUrl ? 'outline' : undefined} size="lg" trailingIcon={<FiArrowUpRight />}>
                Visit live site
              </Button>
            )}
            {project.githubUrl && (
              <Button href={project.githubUrl} external variant="outline" size="lg" icon={<FiGithub />}>
                Source
              </Button>
            )}
          </Reveal>
        </div>

        {/* Facts */}
        <Reveal delay={0.2}>
          <dl className="mt-14 grid grid-cols-2 gap-6 border-y border-line/[0.08] py-6 md:grid-cols-4">
            <div>
              <dt className="eyebrow mb-2">Category</dt>
              <dd className="text-sm text-fg">{categoryLabels[project.category]}</dd>
            </div>
            <div>
              <dt className="eyebrow mb-2">Status</dt>
              <dd className="text-sm text-fg">{project.liveUrl ? 'Live' : 'Case study'}</dd>
            </div>
            <div className="col-span-2">
              <dt className="eyebrow mb-2">Core stack</dt>
              <dd className="text-sm text-fg">{project.technologies.slice(0, 5).join(' · ')}</dd>
            </div>
          </dl>
        </Reveal>

        {/* Hero screenshot */}
        <Reveal delay={0.25} className="mt-14">
          <div
            className="overflow-hidden rounded-xl border border-line/[0.08] px-4 pt-6 sm:px-12 sm:pt-12"
            style={{ background: `radial-gradient(120% 90% at 50% 0%, ${project.tint ?? '#6ee7b7'}40, rgb(var(--surface)) 70%)` }}
          >
            <div className="overflow-hidden rounded-t-lg border border-b-0 border-line/10 bg-bg shadow-[0_40px_100px_-20px_rgb(0_0_0/0.8)]">
              <div className="flex items-center gap-3 border-b border-line/[0.08] px-4 py-2.5">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-line/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-line/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-line/15" />
                </div>
                <span className="truncate font-mono text-[11px] text-subtle">
                  {project.frameUrl ?? (project.liveUrl ? new URL(project.liveUrl).host : project.id)}
                </span>
              </div>
              <Image
                src={project.image}
                alt={`${project.title} screenshot`}
                width={1920}
                height={800}
                priority
                sizes="(min-width: 1280px) 1200px, 100vw"
                className="h-auto w-full"
              />
            </div>
          </div>
        </Reveal>

        {project.proof && (
          <Reveal className="mx-auto max-w-3xl py-20 text-center md:py-28">
            <p className="text-3xl font-medium leading-snug tracking-tight text-fg md:text-4xl">
              <span className="text-accent">“</span>
              {project.proof}
              <span className="text-accent">”</span>
            </p>
          </Reveal>
        )}

        <Section index={++section} label="Overview">
          <Reveal className="space-y-5 text-xl leading-relaxed text-fg/90 md:text-2xl">
            {about.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
            {about.outro.map((p) => (
              <p key={p} className="text-lg text-muted md:text-xl">
                {p}
              </p>
            ))}
          </Reveal>
        </Section>

        {project.demoUrl && (
          <Section index={++section} label="Try it yourself">
            <Reveal className="space-y-6">
              <p className="text-lg leading-relaxed text-muted">
                No sign-up: the demo gives you a private company full of sample data, just for you, and deletes it after a day.
              </p>
              {project.demoGuide && (
                <ol className="grid gap-px overflow-hidden rounded-xl border border-line/[0.08] bg-line/[0.08] md:grid-cols-2">
                  {project.demoGuide.map((step, i) => (
                    <li key={step} className="flex gap-4 bg-bg p-5">
                      <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, '0')}</span>
                      <span className="text-muted">{step}</span>
                    </li>
                  ))}
                </ol>
              )}
              <Button href={project.demoUrl} external size="lg" trailingIcon={<FiArrowUpRight />}>
                Open the live demo
              </Button>
            </Reveal>
          </Section>
        )}

        {project.evaluation && (
          <Section index={++section} label="How it's measured">
            <Reveal className="space-y-6">
              <p className="text-lg leading-relaxed text-muted">{project.evaluation.method}</p>
              <p className="text-lg leading-relaxed text-muted">{project.evaluation.baseline}</p>
              <div className="overflow-hidden rounded-xl border border-line/[0.08]">
                <table className="w-full text-left text-sm">
                  <thead className="bg-line/[0.04] font-mono text-xs uppercase tracking-wider text-muted">
                    <tr>
                      <th className="px-5 py-3 font-normal">Model</th>
                      <th className="px-5 py-3 text-right font-normal">Avg. error</th>
                      <th className="px-5 py-3 text-right font-normal">vs. baseline</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line/[0.08]">
                    <tr>
                      <td className="px-5 py-3 text-muted">Baseline: always predict the average</td>
                      <td className="px-5 py-3 text-right font-mono">${project.evaluation.baselineError.toFixed(2)}</td>
                      <td className="px-5 py-3 text-right font-mono text-muted">—</td>
                    </tr>
                    {project.evaluation.results.map((r) => {
                      const change = Math.round(((project.evaluation!.baselineError - r.error) / project.evaluation!.baselineError) * 100);
                      return (
                        <tr key={r.label}>
                          <td className="px-5 py-3">{r.label}</td>
                          <td className="px-5 py-3 text-right font-mono">${r.error.toFixed(2)}</td>
                          <td className="px-5 py-3 text-right font-mono text-accent">
                            {change > 0 ? `${change}% lower` : `${-change}% higher`}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Reveal>
          </Section>
        )}

        {about.bullets.length > 0 && (
          <Section index={++section} label="What it does">
            <ul className="grid gap-px overflow-hidden rounded-xl border border-line/[0.08] bg-line/[0.08] md:grid-cols-2">
              {about.bullets.map((b, i) => (
                <li key={b} className="flex gap-4 bg-bg p-6">
                  <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-muted">{b}</span>
                </li>
              ))}
              {about.bullets.length % 2 === 1 && <li aria-hidden className="hidden bg-bg md:block" />}
            </ul>
          </Section>
        )}

        {arch && (
          <Section index={++section} label="Architecture">
            <Reveal>
              <p className="mb-8 max-w-2xl text-lg leading-relaxed text-muted">{arch.summary}</p>
              <ArchitectureDiagram arch={arch} />
            </Reveal>
          </Section>
        )}

        {challenges.bullets.length > 0 && (
          <Section index={++section} label="Engineering challenges">
            <ol>
              {challenges.bullets.map((c, i) => (
                <li key={c} className="group grid grid-cols-[3rem_1fr] gap-4 border-b border-line/[0.08] py-6 first:pt-0">
                  <span className="font-mono text-sm text-subtle transition-colors group-hover:text-accent">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-lg leading-relaxed text-fg/90">{c}</span>
                </li>
              ))}
            </ol>
          </Section>
        )}

        <Section index={++section} label="Stack">
          <ul className="flex flex-wrap gap-2">
            {project.technologies.map((t) => (
              <li key={t} className="rounded-md border border-line/10 px-3 py-1.5 font-mono text-xs text-muted">
                {t}
              </li>
            ))}
          </ul>
        </Section>
      </div>

      {/* Next project */}
      <Link
        href={`/projects/${next.id}`}
        className="group block border-t border-line/[0.08] transition-colors duration-500 hover:bg-surface"
      >
        <div className="container flex items-end justify-between gap-6 py-16 md:py-24">
          <div>
            <p className="eyebrow mb-4">Next project</p>
            <p className="text-4xl font-medium tracking-tight text-fg transition-colors duration-500 group-hover:text-accent md:text-7xl">
              {next.title}
            </p>
          </div>
          <FiArrowUpRight className="h-10 w-10 shrink-0 text-subtle transition-all duration-500 ease-out group-hover:-translate-y-2 group-hover:translate-x-2 group-hover:text-accent md:h-16 md:w-16" />
        </div>
      </Link>
    </article>
  );
}
