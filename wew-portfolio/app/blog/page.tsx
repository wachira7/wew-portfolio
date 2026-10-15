"use client";

import Link from 'next/link';
import { motion } from 'motion/react';
import Button from '@/components/ui/button';
import { FaArrowLeft, FaNewspaper } from 'react-icons/fa';
import PageTransition from '@/components/ui/page-transition';

export default function BlogPage() {
  return (
    <PageTransition>
      <div className="flex min-h-screen flex-col items-center justify-center pt-24 text-center">
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl"
          >
            <div className="mb-8 flex justify-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                <FaNewspaper className="h-12 w-12" />
              </div>
            </div>
            
            <h1 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">Blog Coming Soon</h1>
            <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">
              I'm currently working on some interesting articles and tutorials for this section.
              Stay tuned for content about web development, programming tips, and tech insights.
            </p>
            
            <div className="mb-12 rounded-lg bg-blue-50 p-6 dark:bg-blue-900/20">
              <h2 className="mb-2 text-xl font-bold">What to Expect</h2>
              <ul className="mx-auto max-w-md list-inside list-disc text-left text-gray-700 dark:text-gray-300">
                <li className="mb-2">Tutorials on React, Next.js, and TypeScript</li>
                <li className="mb-2">Insights into modern web development practices</li>
                <li className="mb-2">Tips and tricks for becoming a better developer</li>
                <li className="mb-2">Project case studies and lessons learned</li>
              </ul>
            </div>
            
            <Link href="/">
              <Button variant="outline" icon={<FaArrowLeft />}>
                Back to Home
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}