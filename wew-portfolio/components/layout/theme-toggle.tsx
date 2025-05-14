"use client";

import { useTheme } from '@/context/theme-context';
import { useState, useEffect } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { FaLaptop } from 'react-icons/fa6';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Wait for component to mount to prevent hydration errors
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex items-center space-x-2 rounded-md border p-1">
      <button
        onClick={() => setTheme('light')}
        className={`rounded-md p-2 ${
          theme === 'light' ? 'bg-gray-200 dark:bg-gray-700' : ''
        }`}
        aria-label="Light mode"
      >
        <FaSun className="h-5 w-5" />
      </button>
      
      <button
        onClick={() => setTheme('dark')}
        className={`rounded-md p-2 ${
          theme === 'dark' ? 'bg-gray-200 dark:bg-gray-700' : ''
        }`}
        aria-label="Dark mode"
      >
        <FaMoon className="h-5 w-5" />
      </button>
      
      <button
        onClick={() => setTheme('system')}
        className={`rounded-md p-2 ${
          theme === 'system' ? 'bg-gray-200 dark:bg-gray-700' : ''
        }`}
        aria-label="System preference"
      >
        <FaLaptop className="h-5 w-5" />
      </button>
    </div>
  );
}