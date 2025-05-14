"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import ThemeToggle from './theme-toggle';
import { Bars3Icon, XMarkIcon } from 'react-icons/hi2';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Tech Stack', path: '/tech-stack' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 z-50 w-full transition-all duration-300 ${
      scrolled ? 'bg-white/80 backdrop-blur-md dark:bg-gray-900/80 shadow-md' : 'bg-transparent'
    }`}>
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            Portfolio
          </motion.div>
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:block">
          <ul className="flex space-x-8">
            {navItems.map((item, i) => (
              <motion.li
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  href={item.path}
                  className={`relative pb-1 ${
                    pathname === item.path
                      ? 'font-medium text-primary'
                      : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
                  }`}
                >
                  {item.name}
                  {pathname === item.path && (
                    <motion.span
                      layoutId="underline"
                      className="absolute bottom-0 left-0 h-0.5 w-full bg-primary"
                    />
                  )}
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="flex items-center space-x-4">
          <ThemeToggle />

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden"
        >
          <div className="container mx-auto px-4 py-2">
            <ul className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    className={`block py-2 ${
                      pathname === item.path
                        ? 'font-medium text-primary'
                        : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </nav>
  );
}