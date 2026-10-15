"use client";

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { stackCategories, technologies, type StackCategory } from '@/content/stack';
import { cn } from '@/lib/utils';
import { ease } from '@/lib/motion';

type Filter = 'all' | StackCategory;

function years(n: number) {
  if (n < 1) return '< 1 yr';
  return `${n} ${n === 1 ? 'yr' : 'yrs'}`;
}

/** Five segments; a half point lights half a segment. */
function Proficiency({ value }: { value: number }) {
  return (
    <div className="flex gap-1" role="img" aria-label={`Proficiency ${value} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => {
        const fill = Math.max(0, Math.min(1, value - i));
        return (
          <span key={i} className="relative h-1 w-5 overflow-hidden rounded-full bg-line/10">
            <span className="absolute inset-y-0 left-0 bg-accent" style={{ width: `${fill * 100}%` }} />
          </span>
        );
      })}
    </div>
  );
}

export default function StackGrid() {
  const [filter, setFilter] = useState<Filter>('all');
  const shown = filter === 'all' ? technologies : technologies.filter((t) => t.category === filter);

  return (
    <>
      <div role="tablist" aria-label="Filter technologies" className="mb-12 flex flex-wrap gap-2">
        {stackCategories.map((c) => {
          const count = c.id === 'all' ? technologies.length : technologies.filter((t) => t.category === c.id).length;
          const active = filter === c.id;
          return (
            <button
              key={c.id}
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(c.id)}
              className={cn(
                'relative rounded-full border px-4 py-2 text-sm transition-colors duration-300',
                active ? 'border-transparent text-accent-fg' : 'border-line/10 text-muted hover:text-fg'
              )}
            >
              {active && (
                <motion.span
                  layoutId="stack-filter"
                  transition={{ duration: 0.45, ease: ease.out }}
                  className="absolute inset-0 rounded-full bg-accent"
                />
              )}
              <span className="relative">
                {c.id === 'all' ? 'All' : c.name}
                <span className={cn('ml-2 font-mono text-[10px]', active ? 'text-accent-fg/70' : 'text-subtle')}>{count}</span>
              </span>
            </button>
          );
        })}
      </div>

      <motion.ul layout className="grid gap-px overflow-hidden rounded-xl border border-line/[0.08] bg-line/[0.08] sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.map((t) => (
            <motion.li
              key={t.name}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: ease.out }}
              className="group flex flex-col bg-bg p-6 transition-colors duration-500 hover:bg-surface"
            >
              <div className="flex items-start justify-between gap-4">
                <t.icon className="h-7 w-7 text-muted transition-colors duration-500 group-hover:text-accent" />
                <span className="font-mono text-[11px] text-subtle">{years(t.yearsOfExperience)}</span>
              </div>
              <h3 className="mt-6 text-lg font-medium text-fg">{t.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{t.description}</p>
              <div className="mt-6 flex items-center justify-between">
                <Proficiency value={t.proficiency} />
                <span className="font-mono text-[10px] text-subtle">{t.proficiency.toFixed(1)} / 5</span>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
        {/* Blank cells so an incomplete last row doesn't show the grid's hairline colour. */}
        {Array.from({ length: (2 - (shown.length % 2)) % 2 }, (_, i) => (
          <li key={`sm-${i}`} aria-hidden className="hidden bg-bg sm:block lg:hidden" />
        ))}
        {Array.from({ length: (3 - (shown.length % 3)) % 3 }, (_, i) => (
          <li key={`lg-${i}`} aria-hidden className="hidden bg-bg lg:block" />
        ))}
      </motion.ul>
    </>
  );
}
