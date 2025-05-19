"use client";

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isActive, setIsActive] = useState(false);

  // Use useCallback to memoize event handlers
  const handleMouseMove = useCallback((e: MouseEvent) => {
    // Batch state updates
    requestAnimationFrame(() => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Check if cursor is over a clickable element
      const target = e.target as HTMLElement;
      const computedStyle = window.getComputedStyle(target);
      setIsPointer(computedStyle.cursor === 'pointer');
    });
  }, []);

  const handleMouseDown = useCallback(() => setIsActive(true), []);
  const handleMouseUp = useCallback(() => setIsActive(false), []);
  const handleMouseLeave = useCallback(() => setIsHidden(true), []);
  const handleMouseEnter = useCallback(() => setIsHidden(false), []);

  useEffect(() => {
    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Remove native cursor
    document.documentElement.classList.add('no-cursor');

    // Clean up event listeners
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      
      // Restore native cursor
      document.documentElement.classList.remove('no-cursor');
    };
  }, [handleMouseMove, handleMouseDown, handleMouseUp, handleMouseLeave, handleMouseEnter]);

  // Only render on client-side
  if (typeof window === 'undefined') return null;

  return (
    <>
      {/* Add the following to your globals.css */}
      <style jsx global>{`
        .no-cursor {
          cursor: none !important;
        }
      `}</style>

      {/* Cursor dot */}
      <motion.div
        className="pointer-events-none fixed z-[9999] h-3 w-3 rounded-full bg-blue-600 mix-blend-difference dark:bg-blue-400"
        animate={{
          x: position.x - 6,
          y: position.y - 6,
          opacity: isHidden ? 0 : 1,
          scale: isActive ? 0.5 : 1,
        }}
        transition={{
          type: "tween",
          ease: "backOut",
          duration: 0.15,
        }}
      />

      {/* Cursor ring */}
      <motion.div
        className="pointer-events-none fixed z-[9999] h-8 w-8 rounded-full border-2 border-blue-600 mix-blend-difference dark:border-blue-400"
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          opacity: isHidden ? 0 : 0.5,
          scale: isPointer ? 1.5 : isActive ? 0.8 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.1,
        }}
      />
    </>
  );
}