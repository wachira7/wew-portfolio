"use client";

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { categoryLabels, projects, type ProjectCategory } from '@/content/projects';
import { WorkCard } from '@/components/work/work-card';
import { cn } from '@/lib/utils';
import { ease } from '@/lib/motion';

type Filter = 'all' | ProjectCategory;

const filters: { id: Filter; label: string; count: number }[] = [
  { id: 'all', label: 'All', count: projects.length },
  ...(Object.keys(categoryLabels) as ProjectCategory[]).map((id) => ({
    id,
    label: categoryLabels[id],
    count: projects.filter((p) => p.category === id).length,
  })),
];

export default function WorkGrid() {
  const [filter, setFilter] = useState<Filter>('all');
  const shown = filter === 'all' ? projects : projects.filter((p) => p.category === filter);

  return (
    <>
      <div role="tablist" aria-label="Filter projects" className="mb-12 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.id}
            role="tab"
            aria-selected={filter === f.id}
            onClick={() => setFilter(f.id)}
            className={cn(
              'relative rounded-full border px-4 py-2 text-sm transition-colors duration-300',
              filter === f.id ? 'border-transparent text-accent-fg' : 'border-line/10 text-muted hover:text-fg'
            )}
          >
            {filter === f.id && (
              <motion.span
                layoutId="work-filter"
                transition={{ duration: 0.45, ease: ease.out }}
                className="absolute inset-0 rounded-full bg-accent"
              />
            )}
            <span className="relative">
              {f.label}
              <span className={cn('ml-2 font-mono text-[10px]', filter === f.id ? 'text-accent-fg/70' : 'text-subtle')}>
                {f.count}
              </span>
            </span>
          </button>
        ))}
      </div>

      <motion.div layout className="grid gap-6 md:grid-cols-2">
        <AnimatePresence mode="popLayout" initial={false}>
          {shown.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.5, ease: ease.out }}
            >
              <WorkCard project={project} index={projects.indexOf(project)} eager={projects.indexOf(project) < 2} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
