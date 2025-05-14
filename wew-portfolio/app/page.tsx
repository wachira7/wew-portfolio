//app/page.tsx
"use client";

import { motion } from 'framer-motion';
import Button from '@/components/ui/button';
import { FaArrowRight, FaGithub, FaLinkedin } from 'react-icons/fa';
import PageTransition from '@/components/ui/page-transition';
import FloatingTechStack from '@/components/interactive/floating-tech-stack';
import Testimonials from '@/components/interactive/testimonials';
import dynamic from 'next/dynamic';

// Dynamically import Scene with SSR disabled to prevent React Three Fiber issues
const DynamicScene = dynamic(() => import('@/components/3d/scene'), {
  ssr: false,
  loading: () => (
    <div className="flex h-64 w-full items-center justify-center md:h-80">
      <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
    </div>
  ),
});

// Tech Stack items for floating display
const techItems = [
  { name: 'React', icon: '⚛️', color: '#61DAFB' },
  { name: 'TypeScript', icon: 'TS', color: '#3178C6' },
  { name: 'Next.js', icon: '▲', color: '#000000' },
  { name: 'Tailwind', icon: '🎨', color: '#38B2AC' },
  { name: 'Node.js', icon: '⬢', color: '#339933' },
  { name: 'Express', icon: '🚂', color: '#000000' },
  { name: 'Docker', icon: '🐳', color: '#2496ED' },
  { name: 'Jenkins', icon: '🔧', color: '#D33833' },
  { name: 'Kubernetes', icon: '☸️', color: '#326CE5' },
  { name: 'MongoDB', icon: '🍃', color: '#47A248' },
  { name: 'AWS', icon: '☁️', color: '#FF9900' },
  { name: 'Python', icon: '🐍', color: '#3776AB' },
  { name: 'SQLite', icon: '🗃️', color: '#003B57' },
  { name: 'Flask', icon: '🧪', color: '#000000' },
  { name: 'PostgreSQL', icon: '🐘', color: '#336791' },
  { name: 'Solidity', icon: '🔨', color: '#000000' },
  { name: 'Git', icon: '📊', color: '#F05032' },
  { name: 'GitHub', icon: '👨‍💻', color: '#181717' },
  { name: 'Slack', icon: '👪', color: '#36A2EB' },
  { name: 'Notion', icon: '📝', color: '#000000' },
  { name: 'Figma', icon: '🎨', color: '#000000' },
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
                  <span className="text-gradient">Emmanuel W. Wachira</span>
                </h1>
                <h2 className="mb-6 text-2xl font-medium text-gray-600 dark:text-gray-300 md:text-3xl">
                  An enthusiastic Full-stack Developer.
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
                {/* Use dynamic import for Three.js scene */}
                <DynamicScene />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Featured Projects Section */}
        <section className="section-padding">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">Featured Projects</h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
                Check out some of my recent work that showcases my skills and expertise.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Project Card 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="overflow-hidden rounded-lg bg-white shadow-lg transition-transform hover:scale-105 dark:bg-gray-800"
              >
                <div className="aspect-w-16 aspect-h-9 relative h-48 bg-gray-200 dark:bg-gray-700">
                  {/* Project Image Placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl text-gray-500 dark:text-gray-400">Project Image</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-bold">A logistics app</h3>
                  <p className="mb-4 text-gray-600 dark:text-gray-300">
                    A comprehensive logistics app built with python,flask,SQLite,postgres and React.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-800 dark:bg-blue-900 dark:text-blue-100">React</span>
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-800 dark:bg-blue-900 dark:text-blue-100">Python</span>
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-800 dark:bg-blue-900 dark:text-blue-100">Postgres</span>
                  </div>
                  <div className="mt-4">
                    <Button href="/projects/logistics" variant="link" size="sm">
                      View Details <FaArrowRight className="ml-2" />
                    </Button>
                  </div>
                </div>
              </motion.div>

              {/* Project Card 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="overflow-hidden rounded-lg bg-white shadow-lg transition-transform hover:scale-105 dark:bg-gray-800"
              >
                <div className="aspect-w-16 aspect-h-9 relative h-48 bg-gray-200 dark:bg-gray-700">
                  {/* Project Image Placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl text-gray-500 dark:text-gray-400">Project Image</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-bold">Vehicle-shield-Insurance Dapp</h3>
                  <p className="mb-4 text-gray-600 dark:text-gray-300">
                    A comprehensive Vehicle shield Insurance Decentralized app built with React, Firebase, Tailwind, Solidity.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-800 dark:bg-blue-900 dark:text-blue-100">React</span>
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-800 dark:bg-blue-900 dark:text-blue-100">Firebase</span>
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-800 dark:bg-blue-900 dark:text-blue-100">Tailwind</span>
                  </div>
                  <div className="mt-4">
                    <Button href="/projects/vehicle-shield" variant="link" size="sm">
                      View Details <FaArrowRight className="ml-2" />
                    </Button>
                  </div>
                </div>
              </motion.div>

              {/* Project Card 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="overflow-hidden rounded-lg bg-white shadow-lg transition-transform hover:scale-105 dark:bg-gray-800"
              >
                <div className="aspect-w-16 aspect-h-9 relative h-48 bg-gray-200 dark:bg-gray-700">
                  {/* Project Image Placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl text-gray-500 dark:text-gray-400">Project Image</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-bold">3D Portfolio Website</h3>
                  <p className="mb-4 text-gray-600 dark:text-gray-300">
                    An interactive portfolio website with Three.js and React Three Fiber.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-800 dark:bg-blue-900 dark:text-blue-100">Three.js</span>
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-800 dark:bg-blue-900 dark:text-blue-100">React</span>
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-800 dark:bg-blue-900 dark:text-blue-100">Next.js</span>
                  </div>
                  <div className="mt-4">
                    <Button href="/projects/3d-portfolio" variant="link" size="sm">
                      View Details <FaArrowRight className="ml-2" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="mt-12 text-center">
              <Button href="/projects" variant="outline">
                View All Projects <FaArrowRight className="ml-2" />
              </Button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="section-padding bg-gray-50 dark:bg-gray-800/50">
          <div className="container">
            <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="order-2 md:order-1"
              >
                <h2 className="mb-6 text-3xl font-bold md:text-4xl">About Me</h2>
                <p className="mb-4 text-lg text-gray-600 dark:text-gray-300">
                  I am a passionate full-stack developer with over 1+ years of experience building web applications.
                  I specialize in creating modern, responsive, and user-friendly interfaces with React, Next.js, and TypeScript.
                </p>
                <p className="mb-6 text-lg text-gray-600 dark:text-gray-300">
                  On the backend, I am proficient with Python,Node.js, Express, and MongoDB, as well as SQL tech like SQlite and Postgress.
                  I also have experience with DevOps tools like Docker, Jenkins, and Kubernetes.
                </p>
                <div>
                  <Button href="/about">
                    More About Me <FaArrowRight className="ml-2" />
                  </Button>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="order-1 md:order-2"
              >
                <div className="aspect-w-4 aspect-h-3 overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-700">
                  {/* About Image Placeholder */}
                  <div className="flex h-full items-center justify-center">
                    <span className="text-2xl text-gray-500 dark:text-gray-400">Profile Image</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

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
                Feedback from people I have worked with on various projects.
              </p>
            </motion.div>

            <Testimonials testimonials={[]} /* Will use default testimonials */ />
          </div>
        </section>

        {/* Contact CTA Section */}
        <section className="section-padding">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 p-8 text-center text-white md:p-12"
            >
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">Let us Work Together</h2>
              <p className="mx-auto mb-8 max-w-2xl text-lg">
                Have a project in mind? Let us discuss how I can help bring your ideas to life.
              </p>
              <Button href="/contact" variant="white" size="lg">
                Get In Touch <FaArrowRight className="ml-2" />
              </Button>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}