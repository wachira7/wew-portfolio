"use client";

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TechItem {
  name: string;
  icon: string;
  color: string;
}

interface FloatingTechStackProps {
  items: TechItem[];
  className?: string;
}

export default function FloatingTechStack({ items, className = '' }: FloatingTechStackProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Example tech stack if none provided
  const defaultItems: TechItem[] = [
    { name: 'React', icon: '⚛️', color: '#61DAFB' },
    { name: 'TypeScript', icon: 'TS', color: '#3178C6' },
    { name: 'JavaScript', icon: 'JS', color: '#F7DF1E' },
    { name: 'Next.js', icon: '▲', color: '#000000' },
    { name: 'Tailwind', icon: '🎨', color: '#38B2AC' },
    { name: 'Node.js', icon: '⬢', color: '#339933' },
    { name: 'Python', icon: '🐍', color: '#E535AB' },  
    { name: 'React Native', icon: '📱', color: '#61DAFB' },
    { name: 'Flask', icon: '🌊', color: '#000000' },
    { name: 'PostgreSQL', icon: '🐘', color: '#336791' },
    { name: 'MongoDB', icon: '🍃', color: '#47A248' },
    { name: 'AWS', icon: '☁️', color: '#FF9900' },
    { name: 'Docker', icon: '🐳', color: '#2496ED' },
    { name: 'Git', icon: '📊', color: '#F05032' },
  ];
  
  const techItems = items?.length ? items : defaultItems;
  
  // Create a random position within the container
  const getRandomPosition = () => {
    if (!containerRef.current) return { x: 0, y: 0 };
    
    const width = containerRef.current.offsetWidth;
    const height = containerRef.current.offsetHeight;
    
    return {
      x: Math.random() * (width - 80),
      y: Math.random() * (height - 80),
    };
  };
  
  // Generate initial random positions for each item
  const initialPositions = techItems.map(() => getRandomPosition());
  
  useEffect(() => {
    // Re-render on window resize
    const handleResize = () => {
      if (containerRef.current) {
        // Force re-render by updating the ref
        containerRef.current.style.height = `${containerRef.current.offsetHeight - 1}px`;
        setTimeout(() => {
          if (containerRef.current) {
            containerRef.current.style.height = '';
          }
        }, 0);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <div 
      ref={containerRef}
      className={`relative min-h-[300px] w-full overflow-hidden rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 ${className}`}
    >
      {techItems.map((item, index) => {
        // Generate random duration between 15-25 seconds
        const duration = 15 + Math.random() * 10;
        
        // Generate random delay
        const delay = Math.random() * 5;
        
        // Generate random initial position
        const initialPosition = initialPositions[index];
        
        return (
          <motion.div
            key={item.name}
            className="absolute flex h-16 w-16 flex-col items-center justify-center rounded-lg bg-white p-2 shadow-md dark:bg-gray-700"
            initial={{ 
              x: initialPosition.x, 
              y: initialPosition.y,
              rotate: -10 + Math.random() * 20
            }}
            animate={{
              y: [
                initialPosition.y,
                initialPosition.y - 20,
                initialPosition.y + 20,
                initialPosition.y - 10,
                initialPosition.y,
              ],
              x: [
                initialPosition.x,
                initialPosition.x + 20,
                initialPosition.x - 15,
                initialPosition.x + 10,
                initialPosition.x,
              ],
              rotate: [
                -5 + Math.random() * 10,
                5 + Math.random() * 10,
                -10 + Math.random() * 20,
                0 + Math.random() * 5,
                -5 + Math.random() * 10,
              ]
            }}
            transition={{
              duration: duration,
              delay: delay,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            style={{
              backgroundColor: `${item.color}20`, // Add transparency
              borderColor: item.color,
              borderWidth: 2,
            }}
          >
            <div className="text-2xl">{item.icon}</div>
            <div className="mt-1 text-xs font-medium">{item.name}</div>
          </motion.div>
        );
      })}
    </div>
  );
}