"use client";

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FaChevronLeft, FaChevronRight, FaQuoteLeft } from 'react-icons/fa';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar?: string;
  content: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
  autoPlay?: boolean;
  interval?: number;
  className?: string;
}

export default function Testimonials({
  testimonials,
  autoPlay = true,
  interval = 5000,
  className = '',
}: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const defaultTestimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      role: 'CEO',
      company: 'TechStart Inc.',
      content: 'Working with this developer was an absolute pleasure. They delivered our project on time and exceeded our expectations in terms of quality and attention to detail.'
    },
    {
      id: '2',
      name: 'Michael Chen',
      role: 'Product Manager',
      company: 'Innovate Solutions',
      content: 'An exceptional talent who brings both technical expertise and creative problem-solving to the table. They were able to translate our vision into reality with impressive efficiency.'
    },
    {
      id: '3',
      name: 'Jessica Williams',
      role: 'Marketing Director',
      company: 'GrowthLabs',
      content: 'We\'ve worked with many developers over the years, but few have demonstrated the level of professionalism and skill as this one. Our website performance improved dramatically after their work.'
    },
  ];

  const items = testimonials?.length ? testimonials : defaultTestimonials;

  const handlePrevious = () => {
    setDirection(-1);
    setCurrentIndex(prevIndex => 
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex(prevIndex => 
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  }, [items, setDirection, setCurrentIndex]);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || isPaused) return;
  
    const timer = setInterval(() => {
      handleNext();
    }, interval);
  
    return () => clearInterval(timer);
  }, [autoPlay, isPaused, interval, handleNext]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  };

  return (
    <div 
      className={`relative overflow-hidden rounded-lg ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative min-h-[300px]">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-full max-w-4xl rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
              <div className="mb-4 flex justify-center">
                <FaQuoteLeft className="text-4xl text-blue-500 opacity-50" />
              </div>
              
              <blockquote className="mb-8 text-center text-lg font-medium italic text-gray-700 dark:text-gray-300">
                &quot;{items[currentIndex].content}
              </blockquote>
              
              <div className="flex flex-col items-center">
                <div className="mb-2 h-16 w-16 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                  {/* Avatar placeholder - replace with actual image if available */}
                  {items[currentIndex].avatar ? (
                    <div className="h-full w-full bg-gray-300">Avatar</div>
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-blue-100 text-xl font-semibold uppercase text-blue-600 dark:bg-blue-900 dark:text-blue-200">
                      {items[currentIndex].name.charAt(0)}
                    </div>
                  )}
                </div>
                
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    {items[currentIndex].name}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {items[currentIndex].role}, {items[currentIndex].company}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Navigation buttons */}
      <button
        onClick={handlePrevious}
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-md transition-transform hover:scale-110 focus:outline-none dark:bg-gray-800"
        aria-label="Previous testimonial"
      >
        <FaChevronLeft className="text-blue-600 dark:text-blue-400" />
      </button>
      
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-md transition-transform hover:scale-110 focus:outline-none dark:bg-gray-800"
        aria-label="Next testimonial"
      >
        <FaChevronRight className="text-blue-600 dark:text-blue-400" />
      </button>
      
      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 space-x-2">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`h-2 w-8 rounded-full transition-colors ${
              index === currentIndex
                ? 'bg-blue-600 dark:bg-blue-400'
                : 'bg-gray-300 dark:bg-gray-600'
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}