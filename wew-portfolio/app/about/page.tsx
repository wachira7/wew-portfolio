import type { Metadata } from 'next';
import Image from 'next/image';
import { FiArrowUpRight, FiCloud, FiCode, FiCpu, FiDownload } from 'react-icons/fi';
import Reveal from '@/components/ui/reveal';
import Button from '@/components/ui/button';
import Journey from '@/components/about/journey';
import { site } from '@/lib/site';
import { featuredProjects } from '@/content/projects';
import { certifications } from '@/content/experience';

export const metadata: Metadata = {
  title: 'About | Emmanuel W. Wachira',
  description:
    'Full-Stack and AI Engineer in Nairobi: from six years of field operations at KOKO Networks to shipping production SaaS and LLM systems.',
};

const pillars = [
  {
    icon: FiCode,
    title: 'Full-stack',
    body: 'Interfaces, APIs and the data models underneath them, built to handle real users and real money.',
    skills: ['Next.js', 'TypeScript', 'Django REST', 'Node / Express', 'PostgreSQL', 'MongoDB', 'Redis'],
  },
  {
    icon: FiCloud,
    title: 'Cloud & DevOps',
    body: 'Containers, CI/CD and monitoring, so what I ship stays up and I find out first when it does not.',
    skills: ['Docker', 'GitHub Actions', 'AWS (certified)', 'Prometheus / Grafana', 'Kubernetes', 'Terraform'],
  },
  {
    icon: FiCpu,
    title: 'AI engineering',
    body: 'Fine-tuning, retrieval, ensembles and agents, measured against baselines rather than vibes.',
    skills: ['PyTorch', 'Hugging Face', 'QLoRA', 'RAG / Qdrant', 'LangGraph', 'Claude & OpenAI', 'Modal'],
  },
];

/** A small "source file" about me, syntax-coloured by hand. */
function CodeCard() {
  const k = 'text-[rgb(196_181_253)]'; // keys
  const s = 'text-accent'; // strings
  const p = 'text-subtle'; // punctuation
  return (
    <div className="overflow-hidden rounded-xl border border-line/10 bg-surface">
      <div className="flex items-center gap-3 border-b border-line/[0.08] px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-line/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-line/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-line/15" />
        </div>
        <span className="font-mono text-[11px] text-subtle">emmanuel.ts</span>
      </div>
      <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed text-fg">
        <code>
          <span className={k}>const</span> emmanuel <span className={p}>=</span> <span className={p}>{'{'}</span>
          {'\n  '}
          <span className={k}>based</span>
          <span className={p}>:</span> <span className={s}>&quot;Nairobi, KE&quot;</span>
          <span className={p}>,</span>
          {'\n  '}
          <span className={k}>focus</span>
          <span className={p}>: [</span>
          <span className={s}>&quot;full-stack&quot;</span>
          <span className={p}>, </span>
          <span className={s}>&quot;AI&quot;</span>
          <span className={p}>, </span>
          <span className={s}>&quot;DevOps&quot;</span>
          <span className={p}>],</span>
          {'\n  '}
          <span className={k}>shipped</span>
          <span className={p}>: [</span>
          {featuredProjects.map((proj, i) => (
            <span key={proj.id}>
              {'\n    '}
              <span className={s}>&quot;{proj.title}&quot;</span>
              <span className={p}>{i < featuredProjects.length - 1 ? ',' : ''}</span>
            </span>
          ))}
          {'\n  '}
          <span className={p}>],</span>
          {'\n  '}
          <span className={k}>certifications</span>
          <span className={p}>:</span> <span className="text-[rgb(252_211_77)]">{certifications.length}</span>
          <span className={p}>,</span>
          {'\n  '}
          <span className={k}>always</span>
          <span className={p}>:</span> <span className={s}>&quot;learning&quot;</span>
          <span className={p}>,</span>
          {'\n'}
          <span className={p}>{'};'}</span>
        </code>
      </pre>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="pb-24 pt-36 md:pt-44">
      <div className="container">
        {/* Intro */}
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow mb-6 flex items-center gap-2">
                <span className="h-1.5 w-1.5 bg-accent" />
                About
              </p>
              <h1 className="text-5xl font-semibold leading-[1.02] tracking-tightest text-fg md:text-7xl">
                From field operations to production systems<span className="text-accent">.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.1} className="mt-10 max-w-2xl space-y-5 text-lg leading-relaxed text-muted">
              <p>
                I&apos;m <span className="text-fg">{site.name}</span>, a full-stack and AI engineer in Nairobi. I spent six
                years as a service engineer at KOKO Networks, keeping smart energy infrastructure running for thousands of
                customers across the city. That is where I learned that software only matters when it works in the field.
              </p>
              <p>
                Since training at Moringa School I&apos;ve shipped two full-scale platforms:{' '}
                <span className="text-fg">LogiFlow</span>, a multi-tenant logistics SaaS on Django and Next.js, and{' '}
                <span className="text-fg">FlixVideo</span>, an AI-powered streaming and discovery platform on Node.js and
                Next.js. Both run with CI/CD, Prometheus and Grafana monitoring, and Stripe, M-Pesa and crypto payments.
              </p>
              <p>
                Most recently I built <span className="text-fg">The Pour Is Right</span>: a fine-tuned open-source model,
                RAG and an ensemble that price wine, with LangGraph agents that hunt for real deals. I&apos;m open to
                full-stack, DevOps and AI engineering roles.
              </p>
            </Reveal>

            <Reveal delay={0.2} className="mt-10 flex flex-wrap gap-3">
              <Button href={site.resume} external size="lg" icon={<FiDownload />}>
                Download résumé
              </Button>
              <Button href="/contact" variant="outline" size="lg" trailingIcon={<FiArrowUpRight />}>
                Let&apos;s talk
              </Button>
            </Reveal>
          </div>

          <div className="space-y-6 lg:col-span-5">
            <Reveal delay={0.15}>
              <figure className="group relative overflow-hidden rounded-xl border border-line/10 bg-surface">
                <div className="relative aspect-[4/5]">
                  <Image
                    src="/images/profile/cape.jpg"
                    alt={site.name}
                    fill
                    priority
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover object-[50%_15%] grayscale contrast-[1.15] transition-[filter] duration-700 group-hover:grayscale-0 group-hover:contrast-100"
                  />
                  {/* Mint duotone; lifts off on hover to show the original photo. */}
                  <div className="absolute inset-0 bg-[rgb(46_120_95)] mix-blend-multiply transition-opacity duration-700 group-hover:opacity-0" />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/10 to-transparent" />
                </div>
                <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between p-5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                  <span>{site.location}</span>
                  <span className="text-accent">● Available</span>
                </figcaption>
              </figure>
            </Reveal>
            <Reveal delay={0.25}>
              <CodeCard />
            </Reveal>
          </div>
        </div>

        {/* Pillars */}
        <section className="mt-28 md:mt-36">
          <Reveal>
            <p className="eyebrow mb-10 flex items-center gap-2">
              <span className="h-1.5 w-1.5 bg-accent" />
              What I do
            </p>
          </Reveal>
          <div className="grid gap-px overflow-hidden rounded-xl border border-line/[0.08] bg-line/[0.08] md:grid-cols-3">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08} className="group flex flex-col bg-bg p-8 transition-colors duration-500 hover:bg-surface">
                <p.icon className="h-6 w-6 text-accent" />
                <h2 className="mt-8 text-2xl font-medium text-fg">{p.title}</h2>
                <p className="mt-3 leading-relaxed text-muted">{p.body}</p>
                <ul className="mt-6 flex flex-wrap gap-1.5">
                  {p.skills.map((sk) => (
                    <li key={sk} className="rounded border border-line/10 px-2 py-0.5 font-mono text-[11px] text-subtle">
                      {sk}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Journey */}
        <section className="mt-28 md:mt-36">
          <Reveal className="mb-16 grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="eyebrow mb-6 flex items-center gap-2">
                <span className="h-1.5 w-1.5 bg-accent" />
                Journey
              </p>
              <h2 className="text-4xl font-medium tracking-tight text-fg md:text-6xl">
                The path so far<span className="text-accent">.</span>
              </h2>
            </div>
            <p className="max-w-md leading-relaxed text-muted lg:col-span-5">
              Work, education and {certifications.length} certifications, from AWS cloud architecture to LLM engineering.
            </p>
          </Reveal>
          <Journey />
        </section>
      </div>
    </div>
  );
}
