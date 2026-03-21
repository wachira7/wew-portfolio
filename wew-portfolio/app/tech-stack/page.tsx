"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/ui/animated-section';
import { FaStar, FaReact, FaNodeJs, FaDocker, FaAws, FaGit, FaCloud } from 'react-icons/fa';
import {
  SiTypescript, SiTailwindcss, SiFramer, SiExpress,
  SiMongodb, SiPostgresql, SiGithubactions, SiSolidity, SiPython,
  SiDjango, SiKubernetes, SiTerraform, SiGrafana, SiPrometheus,
  SiSqlite, SiRedis, SiCelery, SiStripe, SiCloudinary, SiSentry,
  SiYarn,
} from 'react-icons/si';

const techCategories = [
  { id: 'all', name: 'All Technologies' },
  { id: 'frontend', name: 'Frontend' },
  { id: 'backend', name: 'Backend' },
  { id: 'database', name: 'Databases' },
  { id: 'devops', name: 'DevOps' },
  { id: 'storage', name: 'For storage' },
  { id: 'payments', name: 'Payments & Storage' },
  { id: 'tools', name: 'Tools' },
];

const technologies = [
  // ── Frontend ───────────────────────────────────────────
  {
    name: 'React / Next.js',
    description: 'Primary frontend framework — used in production across LogiFlow, FlixVideo, and portfolio.',
    category: 'frontend',
    proficiency: 4,
    yearsOfExperience: 2,
    icon: <FaReact className="h-8 w-8 text-[#61DAFB]" />,
  },
  {
    name: 'TypeScript',
    description: 'Used throughout all frontend projects for type safety and maintainability.',
    category: 'frontend',
    proficiency: 4,
    yearsOfExperience: 2,
    icon: <SiTypescript className="h-7 w-7 text-[#3178C6]" />,
  },
  {
    name: 'Tailwind CSS',
    description: 'Utility-first CSS framework used in every project for rapid, consistent UI development.',
    category: 'frontend',
    proficiency: 4.5,
    yearsOfExperience: 2,
    icon: <SiTailwindcss className="h-7 w-7 text-[#38B2AC]" />,
  },
  {
    name: 'Framer Motion',
    description: 'Used for page transitions and animations in portfolio and frontend projects.',
    category: 'frontend',
    proficiency: 3,
    yearsOfExperience: 1,
    icon: <SiFramer className="h-7 w-7" />,
  },

  // ── Backend ────────────────────────────────────────────
  {
    name: 'Django REST Framework',
    description: 'Primary Python backend framework — built LogiFlow\'s full multi-tenant API with DRF.',
    category: 'backend',
    proficiency: 4,
    yearsOfExperience: 1,
    icon: <SiDjango className="h-7 w-7 text-[#092E20]" />,
  },
  {
    name: 'Python',
    description: 'Core backend language used in Django projects and scripting.',
    category: 'backend',
    proficiency: 3.5,
    yearsOfExperience: 2,
    icon: <SiPython className="h-7 w-7 text-[#3776AB]" />,
  },
  {
    name: 'Node.js / Express',
    description: 'Used to build FlixVideo\'s full backend with 100+ REST API endpoints.',
    category: 'backend',
    proficiency: 3.5,
    yearsOfExperience: 1.5,
    icon: <FaNodeJs className="h-7 w-7 text-[#339933]" />,
  },
  {
    name: 'Celery',
    description: 'Used in LogiFlow for automated billing — trial expiration, recurring billing, email reminders.',
    category: 'backend',
    proficiency: 3,
    yearsOfExperience: 1,
    icon: <SiCelery className="h-7 w-7 text-[#37814A]" />,
  },
  {
    name: 'BullMQ',
    description: 'Used in FlixVideo for background job processing. Fixed production Redis connection limit issues.',
    category: 'backend',
    proficiency: 3,
    yearsOfExperience: 1,
    icon: <SiRedis className="h-7 w-7 text-[#DC382D]" />,
  },
  {
    name: 'Solidity',
    description: 'Used to build Vehicle Shield Insurance smart contracts on Ethereum.',
    category: 'backend',
    proficiency: 2.5,
    yearsOfExperience: 1,
    icon: <SiSolidity className="h-7 w-7 text-[#363636]" />,
  },

  // ── Databases ──────────────────────────────────────────
  {
    name: 'PostgreSQL',
    description: 'Primary relational database for both LogiFlow and FlixVideo in production.',
    category: 'database',
    proficiency: 3.5,
    yearsOfExperience: 2,
    icon: <SiPostgresql className="h-7 w-7 text-[#336791]" />,
  },
  {
    name: 'MongoDB',
    description: 'Used in FlixVideo alongside PostgreSQL for flexible document storage.',
    category: 'database',
    proficiency: 3,
    yearsOfExperience: 1.5,
    icon: <SiMongodb className="h-7 w-7 text-[#47A248]" />,
  },
  {
    name: 'Redis',
    description: 'Used for caching, session management, and BullMQ job queues. Migrated to Redis Cloud in production.',
    category: 'database',
    proficiency: 3,
    yearsOfExperience: 1,
    icon: <SiRedis className="h-7 w-7 text-[#DC382D]" />,
  },
  {
    name: 'SQLite',
    description: 'Used in early logistics project and local development environments.',
    category: 'database',
    proficiency: 3,
    yearsOfExperience: 2,
    icon: <SiSqlite className="h-7 w-7 text-[#4285F4]" />,
  },

  // ── DevOps ─────────────────────────────────────────────
  {
    name: 'Docker',
    description: 'Used to containerize both LogiFlow and FlixVideo with multi-service Docker Compose setups.',
    category: 'devops',
    proficiency: 3.5,
    yearsOfExperience: 1,
    icon: <FaDocker className="h-7 w-7 text-[#2496ED]" />,
  },
  {
    name: 'GitHub Actions',
    description: 'Primary CI/CD tool — built production pipelines for LogiFlow (Northflank) and FlixVideo (Render).',
    category: 'devops',
    proficiency: 3.5,
    yearsOfExperience: 1.5,
    icon: <SiGithubactions className="h-7 w-7 text-[#2088FF]" />,
  },
  {
    name: 'AWS',
    description: 'AWS Certified (Cloud Architecting + Cloud Foundations). Used S3 for file storage in production.',
    category: 'devops',
    proficiency: 3,
    yearsOfExperience: 1,
    icon: <FaAws className="h-7 w-7 text-[#FF9900]" />,
  },
  {
    name: 'Prometheus',
    description: 'Deployed on Oracle Cloud Free Tier for metrics collection across FlixVideo and LogiFlow.',
    category: 'devops',
    proficiency: 3,
    yearsOfExperience: 1,
    icon: <SiPrometheus className="h-7 w-7 text-[#E6522C]" />,
  },
  {
    name: 'Grafana',
    description: 'Used alongside Prometheus for visualizing production metrics and dashboards.',
    category: 'devops',
    proficiency: 3,
    yearsOfExperience: 1,
    icon: <SiGrafana className="h-7 w-7 text-[#F46800]" />,
  },
  {
    name: 'Kubernetes',
    description: 'Actively learning with Andela program. Practiced K3s deployments with Prometheus/Grafana stacks.',
    category: 'devops',
    proficiency: 2.5,
    yearsOfExperience: 1,
    icon: <SiKubernetes className="h-7 w-7 text-[#326CE5]" />,
  },
  {
    name: 'Terraform',
    description: 'Used for infrastructure as code in DevOps learning track.',
    category: 'devops',
    proficiency: 2.5,
    yearsOfExperience: 1,
    icon: <SiTerraform className="h-7 w-7 text-[#623CEA]" />,
  },

  {
    name: 'Oracle Cloud',
    description: 'Deployed Prometheus + Grafana monitoring stack for FlixVideo on Oracle Cloud Free Tier VM (Ubuntu 22.04) via Docker Compose.',
    category: 'devops',
    proficiency: 2.5,
    yearsOfExperience: 1,
    icon: <FaCloud className="h-7 w-7 text-[#F80000]" />,
  },

  // ── Payments & Storage ─────────────────────────────────
  {
    name: 'Stripe',
    description: 'Integrated in both LogiFlow and FlixVideo for card payments and subscription billing.',
    category: 'payments',
    proficiency: 3,
    yearsOfExperience: 1,
    icon: <SiStripe className="h-7 w-7 text-[#635BFF]" />,
  },
  {
    name: 'M-Pesa (Daraja API)',
    description: 'Integrated Safaricom M-Pesa STK Push for mobile payments in both platforms.',
    category: 'payments',
    proficiency: 3,
    yearsOfExperience: 1,
    icon: <FaNodeJs className="h-7 w-7 text-[#00B300]" />,
  },
  {
    name: 'Cloudinary',
    description: 'Used in LogiFlow for profile picture and company logo uploads.',
    category: 'storage',
    proficiency: 3,
    yearsOfExperience: 1,
    icon: <SiCloudinary className="h-7 w-7 text-[#3448C5]" />,
  },
  {
    name: 'AWS S3',
    description: 'Used in FlixVideo for avatar and media file storage with presigned URLs.',
    category: 'storage',
    proficiency: 3,
    yearsOfExperience: 1,
    icon: <FaAws className="h-7 w-7 text-[#FF9900]" />,
  },
  {
    name: 'Sentry',
    description: 'Error tracking and monitoring for production applications.',
    category: 'storage',
    proficiency: 2.5,
    yearsOfExperience: 1,
    icon: <SiSentry className="h-7 w-7 text-[#362D59]" />,
  },

  // ── Tools ──────────────────────────────────────────────
  {
    name: 'Git / GitHub',
    description: 'Daily driver for version control across all projects.',
    category: 'tools',
    proficiency: 4,
    yearsOfExperience: 2,
    icon: <FaGit className="h-7 w-7 text-[#F05032]" />,
  },
  {
    name: 'Yarn',
    description: 'Preferred package manager for all JavaScript/TypeScript projects.',
    category: 'tools',
    proficiency: 3.5,
    yearsOfExperience: 2,
    icon: <SiYarn className="h-7 w-7 text-[#2C8EBB]" />,
  },
  {
    name: 'Express',
    description: 'Used as the web framework for the FlixVideo Node.js backend.',
    category: 'tools',
    proficiency: 3.5,
    yearsOfExperience: 1.5,
    icon: <SiExpress className="h-7 w-7" />,
  },
];

export default function TechStackPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredTechnologies = activeCategory === 'all'
    ? technologies
    : technologies.filter(tech => tech.category === activeCategory);

  return (
    <div className="pt-24">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <AnimatedSection className="mx-auto mb-12 max-w-3xl text-center">
          <h1 className="mb-4 text-3xl font-bold md:text-4xl">My Tech Stack</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Technologies I have used in production. Ratings reflect honest, real-world experience —
            not aspirational self-assessment.
          </p>
        </AnimatedSection>

        {/* Category Filter */}
        <AnimatedSection className="mb-12 flex flex-wrap justify-center gap-2" delay={0.1}>
          {techCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`rounded-full px-4 py-2 font-medium transition-colors ${
                activeCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              {category.name}
            </button>
          ))}
        </AnimatedSection>

        {/* Tech Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTechnologies.map((tech, index) => (
            <AnimatedSection
              key={tech.name}
              delay={0.1 + index * 0.05}
              className="rounded-lg border border-gray-200 bg-white p-6 shadow-md hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                    {tech.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{tech.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {tech.yearsOfExperience} {tech.yearsOfExperience === 1 ? 'year' : 'years'}
                    </p>
                  </div>
                </div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`${
                        i < Math.floor(tech.proficiency)
                          ? 'text-yellow-400'
                          : i < tech.proficiency
                          ? 'text-yellow-400 opacity-50'
                          : 'text-gray-300 dark:text-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="mt-4 text-gray-600 dark:text-gray-300 text-sm">
                {tech.description}
              </p>
            </AnimatedSection>
          ))}
        </div>

        {filteredTechnologies.length === 0 && (
          <div className="my-12 text-center">
            <p className="text-lg text-gray-600 dark:text-gray-300">
              No technologies found in this category.
            </p>
          </div>
        )}

        {/* Currently Learning */}
        <AnimatedSection className="mt-16">
          <div className="rounded-lg bg-blue-50 p-8 dark:bg-blue-900/20">
            <h2 className="mb-4 text-2xl font-bold">Currently Learning</h2>
            <p className="mb-6 text-lg text-gray-700 dark:text-gray-300">
              Technologies I am actively studying and building with right now.
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {[
                {
                  name: 'Kubernetes (Advanced)',
                  description: 'Deepening K8s knowledge through Andela\'s program — multi-cluster deployments, RBAC, Helm charts, and production-grade orchestration.',
                  icon: <SiKubernetes className="h-8 w-8 text-[#326CE5]" />,
                },
                {
                  name: 'React Native',
                  description: 'Building the FlixVideo mobile app with React Native — currently in planning phase after the web platform is complete.',
                  icon: <FaReact className="h-8 w-8 text-[#61DAFB]" />,
                },
                {
                  name: 'LeetCode / DSA',
                  description: 'Practicing data structures and algorithms in preparation for software engineering job applications.',
                  icon: <FaNodeJs className="h-8 w-8 text-[#339933]" />,
                },
              ].map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800"
                >
                  <div className="mb-3 flex items-center">
                    <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                      {tech.icon}
                    </div>
                    <h3 className="font-bold">{tech.name}</h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{tech.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}