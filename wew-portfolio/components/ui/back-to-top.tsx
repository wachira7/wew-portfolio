"use client";

import { useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { FiArrowUp } from 'react-icons/fi';
import { getLenis } from '@/components/providers/smooth-scroll';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollY, 'change', (y) => setIsVisible(y > 600));

  const scrollToTop = () => {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { duration: 1.4 });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          aria-label="Back to top"
          className="group fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-line/10 bg-surface/80 text-muted backdrop-blur-md transition-colors hover:text-fg"
        >
          {/* Ring fills as you scroll through the page. */}
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 44 44" aria-hidden>
            <motion.circle
              cx="22"
              cy="22"
              r="21"
              fill="none"
              strokeWidth="1.5"
              className="stroke-accent"
              style={{ pathLength: scrollYProgress }}
            />
          </svg>
          <FiArrowUp className="transition-transform duration-300 group-hover:-translate-y-0.5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
