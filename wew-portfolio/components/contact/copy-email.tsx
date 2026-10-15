"use client";

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { FiCheck, FiCopy } from 'react-icons/fi';
import { site } from '@/lib/site';

export default function CopyEmail() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };

  return (
    <div className="group flex flex-wrap items-center gap-4">
      <a
        href={`mailto:${site.email}`}
        className="text-2xl font-medium tracking-tight text-fg underline decoration-line/20 underline-offset-8 transition-colors hover:decoration-accent sm:text-3xl"
      >
        {site.email}
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label="Copy email address"
        className="relative flex h-10 items-center gap-2 overflow-hidden rounded-md border border-line/10 px-3 font-mono text-xs text-muted transition-colors hover:border-accent/40 hover:text-accent"
      >
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.span key="done" initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -12, opacity: 0 }} className="flex items-center gap-2 text-accent">
              <FiCheck /> Copied
            </motion.span>
          ) : (
            <motion.span key="copy" initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -12, opacity: 0 }} className="flex items-center gap-2">
              <FiCopy /> Copy
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
