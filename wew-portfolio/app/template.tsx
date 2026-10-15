"use client";

import { motion } from 'motion/react';
import { ease } from '@/lib/motion';

// Re-mounts on every navigation, so each route fades in the same way.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: ease.out }}
    >
      {children}
    </motion.div>
  );
}
