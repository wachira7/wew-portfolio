"use client";

import Link from 'next/link';
import { useSyncExternalStore } from 'react';
import { FiArrowUpRight } from 'react-icons/fi';
import { navItems, site } from '@/lib/site';

const formatTime = () =>
  new Intl.DateTimeFormat('en-GB', { timeZone: site.timeZone, hour: '2-digit', minute: '2-digit' }).format(new Date());

const subscribeClock = (tick: () => void) => {
  const id = setInterval(tick, 30_000);
  return () => clearInterval(id);
};

function LocalTime() {
  const time = useSyncExternalStore(subscribeClock, formatTime, () => null);
  return <span>{time ?? '--:--'} EAT</span>;
}

const socials = [
  { name: 'GitHub', href: site.github },
  { name: 'LinkedIn', href: site.linkedin },
  { name: 'Résumé', href: site.resume },
];

export default function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden border-t border-line/[0.08]">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[420px] bg-[radial-gradient(ellipse_at_bottom,rgb(var(--accent)/0.08),transparent_70%)]" />

      <div className="container relative">
        {/* Closing call to action */}
        <div className="flex flex-col gap-10 py-20 md:flex-row md:items-end md:justify-between md:py-28">
          <div>
            <p className="eyebrow mb-6 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Have something in mind?
            </p>
            <h2 className="max-w-2xl text-4xl font-medium leading-[1.05] tracking-tight text-fg md:text-6xl">
              Good things start with a <span className="text-accent">conversation.</span>
            </h2>
          </div>
          <div className="flex flex-col items-start gap-3 md:items-end">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3.5 font-medium text-accent-fg transition-[filter] hover:brightness-110"
            >
              Start a conversation
              <FiArrowUpRight className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <a
              href={`mailto:${site.email}`}
              className="font-mono text-sm text-muted transition-colors hover:text-fg"
            >
              {site.email}
            </a>
            {site.phones.map((phone) => (
              <a
                key={phone.tel}
                href={`tel:${phone.tel}`}
                className="font-mono text-sm tabular-nums text-muted transition-colors hover:text-fg"
              >
                {phone.display}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="grid grid-cols-2 gap-8 border-t border-line/[0.08] py-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <p className="text-sm font-medium text-fg">{site.name}</p>
            <p className="mt-1 text-sm text-muted">{site.role}</p>
          </div>

          <div>
            <p className="eyebrow mb-4">Navigate</p>
            <ul className="space-y-2 text-sm">
              {[...navItems, { name: 'Contact', path: '/contact' }].map((item) => (
                <li key={item.path}>
                  <Link href={item.path} className="text-muted transition-colors hover:text-fg">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-4">Elsewhere</p>
            <ul className="space-y-2 text-sm">
              {socials.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1 text-muted transition-colors hover:text-fg"
                  >
                    {s.name}
                    <FiArrowUpRight className="h-3 w-3 opacity-60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1">
            <p className="eyebrow mb-4">Local time</p>
            <p className="font-mono text-sm text-muted">
              Nairobi · <LocalTime />
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-2 border-t border-line/[0.08] py-6 font-mono text-[11px] text-subtle sm:flex-row">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <span>Designed &amp; built in Nairobi</span>
        </div>
      </div>
    </footer>
  );
}
