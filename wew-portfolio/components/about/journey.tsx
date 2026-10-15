"use client";

import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { experience, type ExperienceType } from '@/content/experience';
import { ease } from '@/lib/motion';

const typeStyle: Record<ExperienceType, { label: string; color: string }> = {
  work: { label: 'Work', color: 'rgb(110 231 183)' },
  education: { label: 'Education', color: 'rgb(125 211 252)' },
  certification: { label: 'Certification', color: 'rgb(196 181 253)' },
};

export default function Journey() {
  const list = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: list, offset: ['start 70%', 'end 60%'] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <ol ref={list} className="relative">
      {/* Rail, and the part of it that fills as you scroll */}
      <div className="absolute bottom-0 left-[7px] top-2 w-px bg-line/10 md:left-[calc(11rem+7px)]" />
      <motion.div
        style={{ scaleY: fill }}
        className="absolute bottom-0 left-[7px] top-2 w-px origin-top bg-accent md:left-[calc(11rem+7px)]"
      />

      {experience.map((item, i) => {
        const type = typeStyle[item.type];
        return (
          <motion.li
            key={`${item.title}-${item.year}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.8, ease: ease.out, delay: Math.min(i, 2) * 0.05 }}
            className="group relative grid gap-3 pb-14 pl-10 md:grid-cols-[11rem_1fr] md:gap-0 md:pl-0"
          >
            <div className="font-mono text-xs uppercase tracking-[0.15em] text-subtle md:pr-10 md:pt-1 md:text-right">
              {item.month} {item.year}
            </div>

            <span
              className="absolute left-0 top-1 h-[15px] w-[15px] rounded-full border-2 border-bg transition-transform duration-500 group-hover:scale-125 md:left-[11rem]"
              style={{ background: type.color, boxShadow: `0 0 0 1px ${type.color}55, 0 0 16px ${type.color}66` }}
            />

            <div className="md:pl-12">
              <p className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: type.color }}>
                {type.label}
              </p>
              <h3 className="text-xl font-medium text-fg md:text-2xl">{item.title}</h3>
              <p className="mt-1 text-sm text-subtle">{item.subtitle}</p>
              <p className="mt-4 max-w-2xl leading-relaxed text-muted">{item.description}</p>
              <ul className="mt-5 flex flex-wrap gap-1.5">
                {item.technologies.map((t) => (
                  <li key={t} className="rounded border border-line/10 px-2 py-0.5 font-mono text-[11px] text-subtle">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </motion.li>
        );
      })}
    </ol>
  );
}
