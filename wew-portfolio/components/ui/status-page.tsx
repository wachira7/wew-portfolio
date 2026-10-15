import type { ReactNode } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import Button from '@/components/ui/button';

/** Centred page for 404s and placeholders, with a terminal-style status line. */
export default function StatusPage({
  code,
  title,
  children,
}: {
  code: string;
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="relative flex min-h-[80vh] items-center overflow-hidden pt-32">
      <div className="bg-grid absolute inset-0" />
      <div className="container relative">
        <p className="mb-8 font-mono text-sm text-subtle">
          <span className="text-accent">emmanuel@nairobi:~$</span> {code}
          <span className="animate-blink ml-1 inline-block h-3.5 w-2 translate-y-0.5 bg-accent" />
        </p>
        <h1 className="max-w-3xl text-5xl font-semibold leading-[1.02] tracking-tightest text-fg md:text-7xl">{title}</h1>
        <div className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{children}</div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/" size="lg" icon={<FiArrowLeft />}>
            Back home
          </Button>
          <Button href="/projects" variant="outline" size="lg">
            See my work
          </Button>
        </div>
      </div>
    </div>
  );
}
