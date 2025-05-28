//app/page.tsx
"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import Button from '@/components/ui/button';
import { FaArrowRight, FaGithub, FaLinkedin, FaTwitter, FaDiscord } from 'react-icons/fa';
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

interface techItems {
  name: string;
  icon?: string;
  color?: string;
}

const techItems = [
  { name: 'React' },
  { name: 'TypeScript' },
  { name: 'Next.js' },
  { name: 'Tailwind' },
  { name: 'Node.js' },
  { name: 'Express' },
  { name: 'Docker' },
  { name: 'Jenkins' },
  { name: 'Kubernetes' },
  { name: 'MongoDB' },
  { name: 'AWS' },
  { name: 'Python' },
  { name: 'SQLite' },
  { name: 'Flask' },
  { name: 'PostgreSQL' },
  { name: 'React Native' },
  { name: 'Solidity' },
  { name: 'Git' },
  { name: 'GitHub' },
  { name: 'Slack' },
  { name: 'Notion' },
  { name: 'Figma' },
  { name: 'Django'},
  { name: 'Terraform' },
  { name: 'Grafana' },
  { name: 'Prometheus' },
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
                    href="https://github.com/wachira7"
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
                    href="https://www.linkedin.com/in/emmanuelwaruts77/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaLinkedin className="h-6 w-6" />
                    <span className="sr-only">LinkedIn</span>
                  </motion.a>
                  <motion.a
                    href="https://x.com/nationalist_ke"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaTwitter className="h-6 w-6" />
                    <span className="sr-only">Twitter</span>
                  </motion.a>
                  <motion.a
                    href="https://discord.com/users/EmmanuelWachira#0001"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaDiscord className="h-6 w-6" />
                    <span className="sr-only">Discord</span>
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
              {/* Project Card 1 - Logistics App */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="overflow-hidden rounded-lg bg-white shadow-lg transition-transform hover:scale-105 dark:bg-gray-800"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src="/images/projects/logistics-app.jpg"
                    alt="Logistics App - A comprehensive logistics management application"
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
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

              {/* Project Card 2 - Vehicle Shield */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="overflow-hidden rounded-lg bg-white shadow-lg transition-transform hover:scale-105 dark:bg-gray-800"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src="/images/projects/vehicle-shield.jpg"
                    alt="Vehicle Shield Insurance DApp - Decentralized insurance application"
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-bold">Vehicle-shield-Insurance Dapp</h3>
                  <p className="mb-4 text-gray-600 dark:text-gray-300">
                    A comprehensive Vehicle shield Insurance Decentralized app built with React, Firebase, Tailwind, Solidity.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-800 dark:bg-blue-900 dark:text-blue-100">React/Nextjs</span>
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-800 dark:bg-blue-900 dark:text-blue-100">Firebase</span>
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-800 dark:bg-blue-900 dark:text-blue-100">Tailwind</span>
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-800 dark:bg-blue-900 dark:text-blue-100">Solidity</span>
                  </div>
                  <div className="mt-4">
                    <Button href="/projects/vehicle-shield" variant="link" size="sm">
                      View Details <FaArrowRight className="ml-2" />
                    </Button>
                  </div>
                </div>
              </motion.div>

              {/* Project Card 3 - 3D Portfolio */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="overflow-hidden rounded-lg bg-white shadow-lg transition-transform hover:scale-105 dark:bg-gray-800"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src="/images/projects/3d-portfolio.jpg"
                    alt="3D Portfolio Website - Interactive portfolio with Three.js"
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
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
                  On the backend, I am proficient with Python, Django,Node.js, Express, and MongoDB, as well as SQL tech like SQLite and PostgreSQL.
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
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                  <Image
                    src="/images/profile/cape.jpg"
                    alt="Emmanuel W. Wachira - Full-stack Developer"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
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

            {/* Using the improved FloatingTechStack with simplified tech items */}
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
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">Let&apos;s Work Together</h2>
              <p className="mx-auto mb-8 max-w-2xl text-lg">
                Have a project in mind? Let&apos;s discuss how I can help bring your ideas to life.
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