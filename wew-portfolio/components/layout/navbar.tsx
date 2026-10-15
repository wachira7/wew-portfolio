"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { FiArrowUpRight } from 'react-icons/fi';
import { cn } from '@/lib/utils';
import { ease } from '@/lib/motion';
import { navItems, site } from '@/lib/site';
import { getLenis } from '@/components/providers/smooth-scroll';

function isActive(pathname: string, path: string) {
  return path === '/' ? pathname === '/' : pathname.startsWith(path);
}

export function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label={`${site.name}, home`}>
      <span className="text-[26px] font-bold leading-none tracking-tightest text-fg">
        ew<span className="text-accent transition-colors group-hover:text-fg">.</span>
      </span>
      <span className="hidden text-[15px] font-medium text-fg sm:inline">
        Emmanuel <span className="text-subtle">W. Wachira</span>
      </span>
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (y) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(y > 8);
    setHidden(y > 160 && y > previous && !menuOpen);
  });

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    const lenis = getLenis();
    if (menuOpen) lenis?.stop();
    else lenis?.start();
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }, [menuOpen]);

  return (
    <>
      <motion.header
        animate={{ y: hidden ? '-100%' : '0%' }}
        transition={{ duration: 0.35, ease: ease.out }}
        className={cn(
          'fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300',
          scrolled || menuOpen
            ? 'border-line/[0.08] bg-bg/75 backdrop-blur-xl'
            : 'border-transparent bg-transparent'
        )}
      >
        <nav className="container flex h-[72px] items-center justify-between">
          <Logo />

          <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
            {navItems.map((item) => {
              const active = isActive(pathname, item.path);
              return (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className={cn(
                      'relative block px-4 py-2 text-sm transition-colors',
                      active ? 'text-fg' : 'text-muted hover:text-fg'
                    )}
                  >
                    {item.name}
                    {active && (
                      <motion.span
                        layoutId="nav-dot"
                        transition={{ duration: 0.45, ease: ease.out }}
                        className="absolute bottom-0 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="group hidden items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-fg transition-[filter] hover:brightness-110 md:inline-flex"
            >
              Let&apos;s talk
              <FiArrowUpRight className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              className="relative flex h-10 w-10 items-center justify-center rounded-md border border-line/10 md:hidden"
            >
              <span
                className={cn(
                  'absolute h-px w-4 bg-fg transition-transform duration-300 ease-out',
                  menuOpen ? 'rotate-45' : '-translate-y-[3px]'
                )}
              />
              <span
                className={cn(
                  'absolute h-px w-4 bg-fg transition-transform duration-300 ease-out',
                  menuOpen ? '-rotate-45' : 'translate-y-[3px]'
                )}
              />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: ease.out }}
            className="fixed inset-0 z-40 flex flex-col bg-bg/95 pt-[72px] backdrop-blur-xl md:hidden"
          >
            <ul className="container flex flex-1 flex-col justify-center gap-2">
              {[...navItems, { name: 'Contact', path: '/contact' }].map((item, i) => (
                <motion.li
                  key={item.path}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: ease.out, delay: 0.05 + i * 0.05 }}
                >
                  <Link
                    href={item.path}
                    className={cn(
                      'flex items-baseline gap-4 py-2 text-4xl font-medium tracking-tight',
                      isActive(pathname, item.path) ? 'text-fg' : 'text-muted'
                    )}
                  >
                    <span className="font-mono text-xs text-subtle">0{i + 1}</span>
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="container flex items-center justify-between border-t border-line/[0.08] py-6 font-mono text-xs text-subtle">
              <span>{site.location}</span>
              <a href={`mailto:${site.email}`} className="text-muted">{site.email}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
