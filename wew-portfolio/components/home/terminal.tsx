"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { projects } from '@/content/projects';
import { certifications } from '@/content/experience';
import { site } from '@/lib/site';
import { ease } from '@/lib/motion';

const PROMPT = 'emmanuel@nairobi:~$';

const stack: [string, string][] = [
  ['ai', 'Claude & OpenAI APIs · RAG (Qdrant) · LangChain / LangGraph · QLoRA · PyTorch · Modal'],
  ['frontend', 'React / Next.js · TypeScript · Tailwind CSS · Motion'],
  ['backend', 'Python · Django REST · Node.js / Express · Celery · BullMQ'],
  ['data', 'PostgreSQL · MongoDB · Redis · SQLite'],
  ['devops', 'Docker · GitHub Actions · AWS · Kubernetes · Terraform · Prometheus / Grafana'],
  ['payments', 'Stripe · M-Pesa (Daraja) · NOWPayments'],
];


const suggestions = ['whoami', 'projects', 'stack', 'certs', 'contact', 'resume', 'help'];

const Dim = ({ children }: { children: ReactNode }) => <span className="text-subtle">{children}</span>;
const Hi = ({ children }: { children: ReactNode }) => <span className="text-accent">{children}</span>;

const ext = (href: string, label: string) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-fg underline decoration-line/30 underline-offset-4 hover:decoration-accent">
    {label}
  </a>
);

interface Entry {
  id: number;
  command: string;
  output: ReactNode;
}

type Run = (args: string[], ctx: { navigate: (path: string) => void }) => ReactNode | 'clear';

const commands: Record<string, { description: string; run: Run }> = {
  help: {
    description: 'list available commands',
    run: () => (
      <div className="grid gap-x-6 gap-y-0.5 sm:grid-cols-[8rem_1fr]">
        {Object.entries(commands).map(([name, c]) => (
          <div key={name} className="contents">
            <Hi>{name}</Hi>
            <Dim>{c.description}</Dim>
          </div>
        ))}
      </div>
    ),
  },
  whoami: {
    description: 'who is behind this terminal',
    run: () => (
      <div className="space-y-2">
        <p>
          <span className="text-fg">{site.name}</span> <Dim>· {site.role} · {site.location}</Dim>
        </p>
        <p className="text-muted">
          I build and ship production systems end to end: multi-tenant SaaS with CI/CD, monitoring and
          real-world payments (Stripe, M-Pesa, crypto), and LLM applications with fine-tuned models, RAG and agents.
        </p>
        <p className="text-muted">
          Before software I worked field operations at KOKO Networks, so I care about systems that hold up in the real world.
        </p>
        <p>
          <Dim>try</Dim> <Hi>projects</Hi> <Dim>or</Dim> <Hi>stack</Hi>
        </p>
      </div>
    ),
  },
  projects: {
    description: 'things I have built and shipped',
    run: () => (
      <div className="space-y-1.5">
        {projects.map((p, i) => (
          <div key={p.id} className="grid grid-cols-[2rem_1fr] gap-2">
            <Dim>0{i + 1}</Dim>
            <div>
              <Link href={`/projects/${p.id}`} className="text-fg hover:text-accent">
                {p.title}
              </Link>
              {p.liveUrl && <span className="ml-2 text-[11px] text-accent">● live</span>}
              <div className="text-subtle">{p.description}</div>
            </div>
          </div>
        ))}
        <p className="pt-1">
          <Dim>open one with</Dim> <Hi>open {projects[0].id}</Hi>
        </p>
      </div>
    ),
  },
  open: {
    description: 'open a project, e.g. open logiflow',
    run: ([id], { navigate }) => {
      const project = projects.find((p) => p.id === id || p.title.toLowerCase() === id?.toLowerCase());
      if (!project) {
        return (
          <span>
            <Dim>usage:</Dim> open {'<'}
            {projects.map((p) => p.id).join(' | ')}
            {'>'}
          </span>
        );
      }
      setTimeout(() => navigate(`/projects/${project.id}`), 500);
      return <Dim>opening {project.title}…</Dim>;
    },
  },
  stack: {
    description: 'tools I use day to day',
    run: () => (
      <div className="grid gap-x-6 gap-y-1 sm:grid-cols-[6rem_1fr]">
        {stack.map(([group, items]) => (
          <div key={group} className="contents">
            <Hi>{group}</Hi>
            <span className="text-muted">{items}</span>
          </div>
        ))}
      </div>
    ),
  },
  certs: {
    description: 'certifications',
    run: () => (
      <ul className="space-y-0.5">
        {certifications.map((c) => (
          <li key={c.title} className="text-muted">
            <Hi>✓</Hi> {c.title} <Dim>· {c.subtitle}, {c.month} {c.year}</Dim>
          </li>
        ))}
      </ul>
    ),
  },
  contact: {
    description: 'ways to reach me',
    run: () => (
      <div className="grid gap-x-6 gap-y-0.5 sm:grid-cols-[6rem_1fr]">
        <Dim>email</Dim>
        <a href={`mailto:${site.email}`} className="text-fg hover:text-accent">{site.email}</a>
        <Dim>github</Dim>
        {ext(site.github, 'github.com/wachira7')}
        <Dim>linkedin</Dim>
        {ext(site.linkedin, 'in/emmanuelwaruts77')}
      </div>
    ),
  },
  resume: {
    description: 'open my résumé (PDF)',
    run: () => {
      window.open(site.resume, '_blank', 'noopener');
      return <Dim>opening resume.pdf in a new tab…</Dim>;
    },
  },
  ls: {
    description: 'list files',
    run: () => (
      <span>
        <Hi>projects/</Hi>  <Hi>stack/</Hi>  certs.txt  contact.txt  resume.pdf
      </span>
    ),
  },
  date: {
    description: 'current time in Nairobi',
    run: () => (
      <span className="text-muted">
        {new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'short', timeZone: site.timeZone }).format(new Date())} EAT
      </span>
    ),
  },
  clear: {
    description: 'clear the terminal',
    run: () => 'clear',
  },
};

// Aliases and a little fun; not listed in help.
const aliases: Record<string, string> = {
  about: 'whoami',
  work: 'projects',
  skills: 'stack',
  cv: 'resume',
  email: 'contact',
  'cat resume.pdf': 'resume',
  'cat contact.txt': 'contact',
  'cat certs.txt': 'certs',
  'cd projects': 'projects',
  'cd stack': 'stack',
};

function execute(input: string, navigate: (path: string) => void): ReactNode | 'clear' {
  const trimmed = input.trim();
  const lower = trimmed.toLowerCase();
  if (!trimmed) return null;
  if (lower === 'sudo hire-me' || lower === 'sudo hire me') {
    setTimeout(() => navigate('/contact'), 900);
    return (
      <span>
        <Hi>[sudo]</Hi> <Dim>permission granted. Redirecting you to a conversation…</Dim>
      </span>
    );
  }
  if (lower.startsWith('sudo')) return <Dim>nice try. Maybe sudo hire-me?</Dim>;
  if (lower.startsWith('echo ')) return <span className="text-muted">{trimmed.slice(5)}</span>;

  const resolved = aliases[lower] ?? lower;
  const [name, ...args] = resolved.split(/\s+/);
  const command = commands[name];
  if (!command) {
    return (
      <span>
        <Dim>command not found:</Dim> {name}. <Dim>Type</Dim> <Hi>help</Hi> <Dim>to see what I can do.</Dim>
      </span>
    );
  }
  return command.run(args, { navigate });
}

export default function Terminal() {
  const router = useRouter();
  const reducedMotion = useReducedMotion();
  const section = useRef<HTMLElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const inView = useInView(section, { once: true, margin: '-30% 0px' });

  const [entries, setEntries] = useState<Entry[]>([]);
  const [value, setValue] = useState('');
  const [typing, setTyping] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);
  const nextId = useRef(0);

  const navigate = useCallback((path: string) => router.push(path), [router]);

  const submit = useCallback(
    (input: string) => {
      const output = execute(input, navigate);
      if (output === 'clear') {
        setEntries([]);
      } else {
        setEntries((e) => [...e, { id: nextId.current++, command: input, output }]);
      }
      if (input.trim()) setHistory((h) => [...h, input]);
      setCursor(-1);
      setValue('');
    },
    [navigate]
  );

  /** Types a command into the prompt character by character, then runs it. */
  const typeAndRun = useCallback(
    (command: string) => {
      if (typing) return;
      if (reducedMotion) return submit(command);
      setTyping(true);
      let i = 0;
      const tick = () => {
        i++;
        setValue(command.slice(0, i));
        if (i < command.length) setTimeout(tick, 45 + Math.random() * 45);
        else
          setTimeout(() => {
            submit(command);
            setTyping(false);
          }, 220);
      };
      setValue('');
      setTimeout(tick, 120);
    },
    [typing, reducedMotion, submit]
  );

  // First time the terminal scrolls into view, introduce yourself.
  useEffect(() => {
    if (inView) typeAndRun('whoami');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  // Keep the newest output in view.
  useEffect(() => {
    body.current?.scrollTo({ top: body.current.scrollHeight, behavior: reducedMotion ? 'auto' : 'smooth' });
  }, [entries, reducedMotion]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submit(value);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!history.length) return;
      const next = cursor === -1 ? history.length - 1 : Math.max(0, cursor - 1);
      setCursor(next);
      setValue(history[next]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (cursor === -1) return;
      const next = cursor + 1;
      if (next >= history.length) {
        setCursor(-1);
        setValue('');
      } else {
        setCursor(next);
        setValue(history[next]);
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const all = [...Object.keys(commands), ...projects.map((p) => `open ${p.id}`)];
      const match = all.find((c) => value && c.startsWith(value.toLowerCase()));
      if (match) setValue(match);
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setEntries([]);
    }
  };

  return (
    <section ref={section} className="section-padding relative">
      <div className="container">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow mb-5 flex items-center gap-2">
              <span className="h-1.5 w-1.5 bg-accent" />
              Interactive
            </p>
            <h2 className="text-4xl font-medium tracking-tight text-fg md:text-5xl">
              Prefer the command line<span className="text-accent">?</span>
            </h2>
          </div>
          <p className="max-w-sm text-muted">
            Ask my terminal anything it knows. Type a command, or tap one below.{' '}
            <span className="font-mono text-xs text-subtle">psst: try sudo hire-me</span>
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.9, ease: ease.out }}
          className="relative overflow-hidden rounded-xl border border-line/10 bg-surface/80 shadow-[0_40px_120px_-40px_rgb(var(--accent)/0.25)]"
          onClick={() => inputRef.current?.focus({ preventScroll: true })}
        >
          {/* Title bar */}
          <div className="flex items-center gap-4 border-b border-line/[0.08] px-4 py-3">
            <div className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-line/10" />
              <span className="h-3 w-3 rounded-full bg-line/10" />
              <span className="h-3 w-3 rounded-full bg-accent/70" />
            </div>
            <span className="flex-1 text-center font-mono text-xs text-subtle">emmanuel@nairobi: ~ — zsh</span>
            <span className="hidden font-mono text-[10px] text-subtle sm:inline">tab · ↑↓</span>
          </div>

          {/* Output */}
          <div
            ref={body}
            data-lenis-prevent
            className="h-[380px] overflow-y-auto px-5 py-5 font-mono text-[13px] leading-relaxed text-fg md:h-[420px]"
          >
            <p className="mb-4 text-subtle">
              Last login: {site.location} · type <Hi>help</Hi> to see all commands
            </p>
            {entries.map((entry) => (
              <div key={entry.id} className="mb-4">
                <div>
                  <Hi>{PROMPT}</Hi> <span>{entry.command}</span>
                </div>
                {entry.output && <div className="mt-1.5">{entry.output}</div>}
              </div>
            ))}
            <label className="flex items-center gap-2">
              <span className="shrink-0 text-accent">{PROMPT}</span>
              <span className="sr-only">Terminal command</span>
              <input
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={onKeyDown}
                readOnly={typing}
                spellCheck={false}
                autoComplete="off"
                autoCapitalize="off"
                className="min-w-0 flex-1 bg-transparent text-fg caret-accent outline-none"
              />
            </label>
          </div>

          {/* Suggestions */}
          <div className="flex flex-wrap gap-2 border-t border-line/[0.08] px-4 py-3">
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                disabled={typing}
                onClick={(e) => {
                  e.stopPropagation();
                  typeAndRun(s);
                }}
                className="rounded-md border border-line/10 px-2.5 py-1 font-mono text-xs text-muted transition-colors hover:border-accent/40 hover:text-accent disabled:opacity-40"
              >
                {s}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
