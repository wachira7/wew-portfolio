"use client";

import { ReactNode } from 'react';
import { motion, Variants } from 'motion/react';
import { slideUpAnimation } from '@/animations/page-transitions';

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
  variants?: Variants;
}

export default function PageTransition({
  children,
  className = '',
  variants = slideUpAnimation,
}: PageTransitionProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}