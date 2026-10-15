"use client";

import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { ease } from '@/lib/motion';

/** Fades and lifts its children in the first time they scroll into view. */
export default function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.9, ease: ease.out, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
