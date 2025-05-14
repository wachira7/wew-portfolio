"use client";

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface ImageLightboxProps {
  images: string[];
  alt?: string;  // Keeping this for API consistency, even if not used
  className?: string;
}

export default function ImageLightbox({ 
  images, 
  className = "" 
}: ImageLightboxProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  
  // Wrap functions in useCallback to avoid recreation on every render
  const openLightbox = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);
  
  const closeLightbox = useCallback(() => {
    setSelectedIndex(null);
  }, []);
  
  const navigateImage = useCallback((direction: number) => {
    if (selectedIndex === null) return;
    
    const newIndex = selectedIndex + direction;
    if (newIndex >= 0 && newIndex < images.length) {
      setSelectedIndex(newIndex);
    }
  }, [selectedIndex, images.length]);
  
  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          navigateImage(-1);
          break;
        case 'ArrowRight':
          navigateImage(1);
          break;
        case 'Escape':
          closeLightbox();
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    // If lightbox is open, prevent body scrolling
    if (selectedIndex !== null) {
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedIndex, navigateImage, closeLightbox]);
  
  return (
    <div className={className}>
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {images.map((image, index) => (
          <div 
            key={index} 
            className="cursor-pointer overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700"
            onClick={() => openLightbox(index)}
          >
            <div className="aspect-video bg-gray-200 dark:bg-gray-700">
              {/* Replace with actual image */}
              <div className="flex h-full w-full items-center justify-center text-gray-500 dark:text-gray-400">
                {image.includes('placeholder') ? 'Image Placeholder' : 'Image'}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              className="absolute right-4 top-4 z-[60] rounded-full bg-black bg-opacity-50 p-2 text-white hover:bg-opacity-75"
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
              aria-label="Close lightbox"
            >
              <FaTimes size={24} />
            </button>
            
            {/* Navigation buttons */}
            {images.length > 1 && (
              <>
                <button
                  className="absolute left-4 z-[60] rounded-full bg-black bg-opacity-50 p-3 text-white hover:bg-opacity-75 disabled:opacity-30"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage(-1);
                  }}
                  disabled={selectedIndex === 0}
                  aria-label="Previous image"
                >
                  <FaChevronLeft size={24} />
                </button>
                
                <button
                  className="absolute right-4 z-[60] rounded-full bg-black bg-opacity-50 p-3 text-white hover:bg-opacity-75 disabled:opacity-30"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage(1);
                  }}
                  disabled={selectedIndex === images.length - 1}
                  aria-label="Next image"
                >
                  <FaChevronRight size={24} />
                </button>
              </>
            )}
            
            {/* Image container */}
            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="max-h-full max-w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-auto max-h-[80vh] w-auto max-w-[90vw] overflow-hidden bg-gray-200 dark:bg-gray-700">
                {/* Replace with actual image */}
                <div className="flex h-[60vh] w-[80vw] max-w-4xl items-center justify-center text-gray-500 dark:text-gray-400">
                  {images[selectedIndex].includes('placeholder') ? 'Image Placeholder' : 'Image'}
                </div>
              </div>
              
              {/* Image counter */}
              <div className="mt-2 text-center text-sm text-white">
                {selectedIndex + 1} / {images.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}