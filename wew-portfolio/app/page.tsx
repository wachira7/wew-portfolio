"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/button';
import { FaArrowRight, FaGithub, FaLinkedin, FaExternalLinkAlt } from 'react-icons/fa';
import PageTransition from '@/components/ui/page-transition';
import FloatingTechStack from '@/components/interactive/floating-tech-stack';
import dynamic from 'next/dynamic';

const DynamicScene = dynamic(() => import('@/components/3d/scene'), {
  ssr: false,
  loading: () => (
    <div className="flex h-64 w-full items-center justify-center md:h-80">
      <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
    </div>
  ),
});

const techItems = [
  { name: 'React' }, { name: 'TypeScript' }, { name: 'Next.js' },
  { name: 'Tailwind' }, { name: 'Node.js' }, { name: 'Express' },
  { name: 'Docker' }, { name: 'Kubernetes' }, { name: 'MongoDB' },
  { name: 'AWS' }, { name: 'Python' }, { name: 'Django' },
  { name: 'PostgreSQL' }, { name: 'Redis' }, { name: 'Celery' },
  { name: 'React Native' }, { name: 'Solidity' }, { name: 'Git' },
  { name: 'GitHub Actions' }, { name: 'Grafana' }, { name: 'Prometheus' },
  { name: 'Terraform' }, { name: 'Stripe' }, { name: 'Figma' },
  { name: 'PyTorch' }, { name: 'Hugging Face' }, { name: 'LangGraph' },
  { name: 'LangChain' }, { name: 'Qdrant' }, { name: 'OpenAI' },
];

const featuredProjects = [
  {
    id: 'the-pour-is-right',
    title: 'The Pour Is Right',
    description: 'LLM wine pricer and deal-hunting agents: a QLoRA fine-tuned Qwen model served on Modal, RAG with Qdrant, an ensemble, and LangGraph agents that send Telegram alerts.',
    image: '/images/projects/wine-pricer.jpg',
    tags: ['PyTorch', 'Hugging Face', 'LangGraph', 'Qdrant'],
    githubUrl: null,
    liveUrl: null,
  },
  {
    id: 'logiflow',
    title: 'LogiFlow',
    description: 'Multi-tenant logistics SaaS with inventory, warehousing, production, distribution, billing, and platform admin — built with Django + Next.js.',
    image: '/images/projects/logiflow-app.png',
    tags: ['Django', 'Next.js', 'PostgreSQL', 'Docker'],
    githubUrl: 'https://github.com/wachira7/LogiFlow',
    liveUrl: 'https://logi-flow-three.vercel.app/',
  },
  {
    id: 'flixvideo',
    title: 'FlixVideo',
    description: 'AI-powered movie and TV discovery platform with watch parties, subscriptions, real-time search, and Stripe/M-Pesa/crypto payments.',
    image: '/images/projects/flix-video.png',
    tags: ['Node.js', 'Next.js', 'Redis', 'BullMQ'],
    githubUrl: 'https://github.com/wachira7/Flix-video',
    liveUrl: 'https://flix-video-ten.vercel.app/',
  },
];

export default function Home() {
  return (
    <PageTransition>
      <div className="relative min-h-screen">

        {/* ── Hero ─────────────────────────────────────────── */}
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
                  Full-Stack &amp; AI Engineer · DevOps
                </h2>
                <p className="mb-8 max-w-lg text-lg text-gray-600 dark:text-gray-300">
                  I build and ship production systems end to end: SaaS platforms with
                  CI/CD and real-world payments, and LLM applications with fine-tuned
                  models, RAG and agents.
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
                  {[
                    { href: 'https://github.com/wachira7', icon: <FaGithub className="h-6 w-6" />, label: 'GitHub' },
                    { href: 'https://www.linkedin.com/in/emmanuelwaruts77/', icon: <FaLinkedin className="h-6 w-6" />, label: 'LinkedIn' },
                  ].map(({ href, icon, label }) => (
                    <motion.a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {icon}
                      <span className="sr-only">{label}</span>
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex justify-center"
              >
                <DynamicScene />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Featured Projects ────────────────────────────── */}
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
                Systems built end to end — from data and models to architecture and deployment.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                  viewport={{ once: true }}
                  className="group overflow-hidden rounded-lg bg-white shadow-lg transition-transform hover:scale-105 dark:bg-gray-800"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="mb-2 text-xl font-bold">{project.title}</h3>
                    <p className="mb-4 text-gray-600 dark:text-gray-300 text-sm">
                      {project.description}
                    </p>
                    <div className="mb-4 flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <span key={tag} className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm" icon={<FaGithub />}>Code</Button>
                        </a>
                      )}
                      {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm" icon={<FaExternalLinkAlt />}>Demo</Button>
                        </a>
                      )}
                      <Link href={`/projects/${project.id}`}>
                        <Button variant="primary" size="sm">Details</Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button href="/projects" variant="outline">
                View All Projects <FaArrowRight className="ml-2" />
              </Button>
            </div>
          </div>
        </section>

        {/* ── About ────────────────────────────────────────── */}
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
                  Full-Stack and AI Engineer with a background in field operations at KOKO Networks and
                  formal training from Moringa School. I build complete, deployable products — not just
                  prototypes.
                </p>
                <p className="mb-6 text-lg text-gray-600 dark:text-gray-300">
                  I completed Ed Donner&apos;s AI Engineer Core Track (LLM engineering, RAG, QLoRA and agents),
                  and hold AWS Cloud Architecting and Cloud Foundations certifications, a Google Project
                  Management Certificate, and a DevOps certification. Open to full-stack, DevOps and AI
                  engineering roles.
                </p>
                <Button href="/about">
                  More About Me <FaArrowRight className="ml-2" />
                </Button>
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

        {/* ── Tech Stack ───────────────────────────────────── */}
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
                Technologies I use to build modern, scalable, production-ready applications.
              </p>
            </motion.div>

            <FloatingTechStack items={techItems} className="min-h-[400px] mb-12" />

            <div className="mt-12 text-center">
              <Button href="/tech-stack" variant="outline">
                Explore My Tech Stack <FaArrowRight className="ml-2" />
              </Button>
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────── */}
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
                Have a project in mind or an open role? Let&apos;s talk.
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