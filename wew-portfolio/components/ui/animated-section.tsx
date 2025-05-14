//components/ui/animated-section.tsx
"use client";

import { ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
  once?: boolean;
}

const directions = {
  up: { initial: { y: 50 }, animate: { y: 0 } },
  down: { initial: { y: -50 }, animate: { y: 0 } },
  left: { initial: { x: 50 }, animate: { x: 0 } },
  right: { initial: { x: -50 }, animate: { x: 0 } },
  none: { initial: {}, animate: {} },
};

export default function AnimatedSection({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.5,
  once = true,
}: AnimatedSectionProps) {
  const variants: Variants = {
    initial: {
      opacity: 0,
      ...directions[direction].initial,
    },
    animate: {
      opacity: 1,
      ...directions[direction].animate,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1.0], // cubic-bezier easing
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}