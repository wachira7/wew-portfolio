"use client";

import { motion } from 'framer-motion';
import Button from '@/components/ui/button';
import Link from 'next/link';
import { FaArrowRight, FaGithub, FaLinkedin } from 'react-icons/fa';
import PageTransition from '@/components/ui/page-transition';
import Scene from '@/components/3d/scene';
import FloatingTechStack from '@/components/interactive/floating-tech-stack';
import Testimonials from '@/components/interactive/testimonials';

// Tech Stack items for floating display
const techItems = [
  { name: 'React', icon: '⚛️', color: '#61DAFB' },
  { name: 'TypeScript', icon: 'TS', color: '#3178C6' },
  { name: 'Next.js', icon: '▲', color: '#000000' },
  { name: 'Tailwind', icon: '🎨', color: '#38B2AC' },
  { name: 'Node.js', icon: '⬢', color: '#339933' },
  { name: 'GraphQL', icon: '◯', color: '#E535AB' },
  { name: 'MongoDB', icon: '🍃', color: '#47A248' },
  { name: 'AWS', icon: '☁️', color: '#FF9900' },
];

export default function Home() {
  return (
    <PageTransition>
      <div className="relative min-h-screen">
        {/* Hero Section with 3D element */}
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800"></div>
          
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                  <span>Hi, I&apos;m </span>
                  <span className="text-gradient">Your Name</span>
                </h1>
                <h2 className="mb-6 text-2xl font-medium text-gray-600 dark:text-gray-300 md:text-3xl">
                  Full-Stack Developer & Designer
                </h2>
                <p className="mb-8 max-w-lg text-lg text-gray-600 dark:text-gray-300">
                  I build modern, responsive web applications with cutting-edge technologies. 
                  Let&apos;s create something amazing together.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Button href="/projects" size="lg">
                    View My Work <FaArrowRight className="ml-2" />
                  </Button>
                  <Button href="/contact" variant="outline" size="lg">
                    Get In Touch
                  </Button>
                </div>
                
                <div className="mt-8 flex space-x-4">
                  <motion.a
                    href="https://github.com/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaGithub className="h-6 w-6" />
                    <span className="sr-only">GitHub</span>
                  </motion.a>
                  <motion.a
                    href="https://linkedin.com/in/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaLinkedin className="h-6 w-6" />
                    <span className="sr-only">LinkedIn</span>
                  </motion.a>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex justify-center"
              >
                {/* Replace static profile image with 3D scene */}
                <Scene />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Featured Projects Section */}
        {/* ... existing featured projects code ... */}

        {/* About Section */}
        {/* ... existing about section code ... */}

        {/* Tech Stack Section with Floating Tech Stack */}
        <section className="section-padding">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">My Tech Stack</h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
                These are the technologies I work with to build modern, responsive, and scalable applications.
              </p>
            </motion.div>

            {/* Replace static tech icons with FloatingTechStack */}
            <FloatingTechStack items={techItems} className="min-h-[400px] mb-12" />

            <div className="mt-12 text-center">
              <Button href="/tech-stack" variant="outline">
                Explore My Tech Stack <FaArrowRight className="ml-2" />
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="section-padding bg-gray-50 dark:bg-gray-800/50">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">What Clients Say</h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
                Feedback from people I've worked with on various projects.
              </p>
            </motion.div>

            <Testimonials testimonials={[]} /* Will use default testimonials */ />
          </div>
        </section>

        {/* Contact CTA Section */}
        {/* ... existing contact section code ... */}
      </div>
    </PageTransition>
  );
}