//
"use client";

import { useEffect, useState } from 'react';

export default function ReadingProgress() {
  const [completion, setCompletion] = useState(0);

  useEffect(() => {
    const updateScrollCompletion = () => {
      const currentProgress = window.scrollY;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      
      if (scrollHeight) {
        setCompletion(Number((currentProgress / scrollHeight).toFixed(2)) * 100);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', updateScrollCompletion);
    
    // Initialize on mount
    updateScrollCompletion();
    
    // Clean up event listener
    return () => window.removeEventListener('scroll', updateScrollCompletion);
  }, []);

  return (
    <div className="fixed top-0 left-0 z-50 h-1 w-full bg-gray-200 dark:bg-gray-800">
      <div 
        className="h-1 bg-blue-600 transition-all duration-150 ease-out dark:bg-blue-400"
        style={{ width: `${completion}%` }}
      />
    </div>
  );
}