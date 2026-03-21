//app/projects/[slug]/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Button from '@/components/ui/button';
import AnimatedSection from '@/components/ui/animated-section';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';

const projectsData = [
  {
    id: 'logiflow',
    title: 'LogiFlow',
    description: 'Multi-tenant logistics SaaS platform with inventory, warehousing, production, distribution, billing, and platform admin modules.',
    longDescription: `
      LogiFlow is a production-grade multi-tenant logistics SaaS platform built to serve companies of varying scales.
      Each tenant gets isolated data, custom branding, and role-based access for their teams.

      Key features include:
      - Multi-tenant architecture with full data isolation per company
      - Inventory management with stock tracking, reorder points, and transaction history
      - Warehousing module with stock transfers and approval workflows
      - Production module with orders, steps, and materials tracking
      - Distribution module with real-time route tracking via Leaflet.js and geocoding
      - Billing system with automated trial expiration and recurring billing via Celery
      - Platform Admin module for managing tenants, subscriptions, and system health
      - Prometheus and Grafana monitoring stack

      The backend is built with Django REST Framework and the frontend with Next.js and TypeScript,
      using a services + hooks state management pattern without Redux or Zustand.
    `,
    challenges: `
      Building LogiFlow presented several interesting engineering challenges:
      - Designing a clean multi-tenant architecture that scales without data leakage between tenants
      - Implementing a centralized auth guard architecture using layout.tsx to avoid repetition across pages
      - Fixing a critical auth bug where verifyAuth() hardcoded all role fields to false on token refresh
      - Replacing mock SVG maps with real Leaflet.js maps using dynamic imports to avoid SSR issues
      - Handling HTTP 204 empty responses that caused JSON parse errors in the API layer
      - Building automated billing workflows with Celery including trial expiration and payment reminders
      - Integrating Stripe, M-Pesa, and NOWPayments crypto into a unified billing experience
    `,
    technologies: ['Django', 'Django REST Framework', 'Next.js', 'TypeScript', 'PostgreSQL', 'Redis', 'Celery', 'Docker', 'Stripe', 'M-Pesa', 'NOWPayments', 'Leaflet.js', 'Prometheus', 'Grafana'],
    category: 'saas',
    image: '/images/projects/logistics-app.jpg',
    githubUrl: 'https://github.com/wachira7/LogiFlow',
    liveUrl: 'https://logi-flow-three.vercel.app/',
    screenshots: [],
  },
  {
    id: 'flixvideo',
    title: 'FlixVideo',
    description: 'AI-powered movie and TV discovery platform with subscriptions, watch parties, real-time search, and multi-gateway payments.',
    longDescription: `
      FlixVideo is a full-featured AI-powered streaming and movie discovery platform. It combines
      real-time content data from TMDB with AI recommendations and a rich social experience.

      Key features include:
      - AI-powered movie and TV recommendations using Claude AI/OpenAI
      - Real-time search with autocomplete and Redis caching
      - Watch party system with WebSocket-based synchronized playback and live chat
      - Subscription tiers (Free, Basic, Premium) with usage-based feature gating
      - Multi-gateway payment support: Stripe (card), M-Pesa (mobile money), and NOWPayments (crypto)
      - Social features: following, lists, ratings, and reviews with nested comments
      - Admin dashboard with moderation tools, analytics, and user management
      - Background job processing with BullMQ and Redis for async tasks
      - Avatar storage on AWS S3 with presigned URLs
      - Prometheus and Grafana monitoring deployed on Oracle Cloud Free Tier

      The backend is Node.js/Express with a PostgreSQL + MongoDB hybrid database architecture.
      The frontend is Next.js with TypeScript deployed on Vercel, backend on Render.
    `,
    challenges: `
      FlixVideo was built iteratively over several months with many interesting challenges:
      - Migrating from Upstash Redis to Redis Cloud after hitting command limits in production
      - Fixing ERR max number of clients reached by refactoring BullMQ to use two shared IORedis connections
      - Resolving avatar hydration errors using a custom AvatarEventEmitter pattern
      - Fixing PostgreSQL date timezone shifts using ::text and ::date casts
      - Building a complete subscription system with real-time usage tracking across three payment providers
      - Implementing watch party synchronization so all participants stay in sync during playback
      - Setting up Prometheus metrics collection and Grafana dashboards on Oracle Cloud Free Tier VM
    `,
    technologies: ['Node.js', 'Express', 'Next.js', 'TypeScript', 'PostgreSQL', 'MongoDB', 'Redis', 'BullMQ', 'Stripe', 'M-Pesa', 'NOWPayments', 'AWS S3', 'Socket.io', 'Prometheus', 'Grafana', 'Docker'],
    category: 'saas',
    image: '/images/projects/3d-portfolio.jpg',
    githubUrl: 'https://github.com/wachira7/Flix-video',
    liveUrl: 'https://flix-video-ten.vercel.app/',
    screenshots: [],
  },
  {
    id: 'logistics-app',
    title: 'Logistics Application',
    description: 'A comprehensive logistics management system with authentication and role-based access control.',
    longDescription: `
      This logistics management system provides core tools for managing shipments, routes, and users.
      It features role-based access control to ensure the right people have the right permissions.

      Key features include:
      - User authentication with JWT
      - Role-based access control (RBAC)
      - Shipment tracking and management
      - Route planning and optimization
      - PostgreSQL database with efficient query design
    `,
    challenges: `
      Key challenges in this project included:
      - Designing a flexible RBAC system that can accommodate different organizational structures
      - Building efficient database queries for logistics data at scale
      - Implementing secure JWT authentication with proper token management
    `,
    technologies: ['Python', 'SQLite', 'PostgreSQL', 'JWT', 'RBAC Security'],
    category: 'web',
    image: '/images/projects/logistics-app.jpg',
    githubUrl: 'https://github.com/Fuata-tech/logistic_management_system',
    liveUrl: 'https://fuata-tech-client.onrender.com/',
    screenshots: [],
  },
  {
    id: 'vehicle-shield-insurance',
    title: 'Vehicle Shield Insurance',
    description: 'Blockchain-based vehicle insurance platform with smart contracts and secure user authentication.',
    longDescription: `
      Vehicle Shield Insurance leverages blockchain technology to create a transparent and secure
      vehicle insurance platform. Smart contracts automate policy management and claims processing.

      Key features include:
      - Smart contract-based policy management on Ethereum
      - Web3 wallet integration for secure transactions
      - Automated claims processing via smart contracts
      - Firebase authentication for user management
      - Next.js frontend with real-time blockchain event listening
    `,
    challenges: `
      Key challenges in this project included:
      - Writing secure Solidity smart contracts to handle financial transactions
      - Integrating Web3.js with a Next.js frontend for wallet connectivity
      - Testing smart contracts thoroughly using Hardhat before deployment
      - Managing blockchain transaction states and handling failures gracefully
    `,
    technologies: ['Solidity', 'Web3.js', 'Next.js', 'Hardhat', 'Firebase Auth'],
    category: 'blockchain',
    image: '/images/projects/vehicle-shield.jpg',
    githubUrl: 'https://github.com/wachira7/vehicle-shield-insurance',
    liveUrl: 'https://vsi-app.vercel.app/',
    screenshots: [],
  },
];

export default function ProjectPage() {
  const params = useParams();
  const [project, setProject] = useState<typeof projectsData[0] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const slug = params.slug as string;
    const foundProject = projectsData.find(p => p.id === slug);
    if (foundProject) setProject(foundProject);
    setLoading(false);
  }, [params]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-24">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center pt-24 text-center">
        <h1 className="mb-4 text-2xl font-bold">Project Not Found</h1>
        <p className="mb-8 text-gray-600 dark:text-gray-300">
          The project you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <Link href="/projects">
          <Button icon={<FaArrowLeft />}>Back to Projects</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24">
      <div className="container mx-auto px-4 py-12">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/projects">
            <Button variant="outline" icon={<FaArrowLeft />}>
              Back to Projects
            </Button>
          </Link>
        </div>

        {/* Project Header — uses motion directly to fix unused import warning */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="mb-4 text-3xl font-bold md:text-4xl">{project.title}</h1>
          <p className="mb-6 text-xl text-gray-600 dark:text-gray-300">{project.description}</p>

          <div className="mb-8 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span key={tech} className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                {tech}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            {project.githubUrl && (
              <Button href={project.githubUrl} variant="outline" icon={<FaGithub />} external>
                View Code
              </Button>
            )}
            {project.liveUrl && (
              <Button href={project.liveUrl} icon={<FaExternalLinkAlt />} external>
                Live Demo
              </Button>
            )}
          </div>
        </motion.div>

        {/* Project Details */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <AnimatedSection className="lg:col-span-2" delay={0.2}>
            <h2 className="mb-4 text-2xl font-bold">About This Project</h2>
            <div className="prose max-w-none text-gray-700 dark:text-gray-300">
              {project.longDescription.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4">{paragraph.trim()}</p>
              ))}
            </div>

            <h2 className="mb-4 mt-8 text-2xl font-bold">Challenges</h2>
            <div className="prose max-w-none text-gray-700 dark:text-gray-300">
              {project.challenges.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4">{paragraph.trim()}</p>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-4 text-xl font-bold">Project Details</h3>

              <div className="mb-4">
                <h4 className="font-medium text-gray-600 dark:text-gray-400">Category</h4>
                <p className="capitalize">
                  {project.category === 'saas' ? 'SaaS Platform' :
                   project.category === 'web' ? 'Web Development' :
                   project.category === 'blockchain' ? 'Blockchain' : project.category}
                </p>
              </div>

              <div className="mb-4">
                <h4 className="font-medium text-gray-600 dark:text-gray-400">Technologies</h4>
                <ul className="list-inside list-disc">
                  {project.technologies.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              </div>

              {project.liveUrl && (
                <div className="mb-4">
                  <h4 className="font-medium text-gray-600 dark:text-gray-400">Live URL</h4>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline dark:text-blue-400 text-sm break-all">
                    {project.liveUrl}
                  </a>
                </div>
              )}
            </div>
          </AnimatedSection>
        </div>

        {/* Related Projects */}
        <AnimatedSection className="mt-16" delay={0.5}>
          <h2 className="mb-6 text-2xl font-bold">Related Projects</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projectsData
              .filter(p => p.id !== project.id && p.category === project.category)
              .slice(0, 3)
              .map((relatedProject) => (
                <div
                  key={relatedProject.id}
                  className="overflow-hidden rounded-lg border border-gray-200 bg-white transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
                >
                  <div className="h-40 bg-gray-200 dark:bg-gray-700" />
                  <div className="p-4">
                    <h3 className="mb-2 text-lg font-bold">
                      <Link href={`/projects/${relatedProject.id}`} className="hover:text-blue-600 dark:hover:text-blue-400">
                        {relatedProject.title}
                      </Link>
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {relatedProject.description.length > 100
                        ? `${relatedProject.description.slice(0, 100)}...`
                        : relatedProject.description}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}