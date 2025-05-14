"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Button from '@/components/ui/button';
import AnimatedSection from '@/components/ui/animated-section';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';

// Mock project data - in a real app, you would fetch this from an API or CMS
const projectsData = [
  {
    id: 'project-1',
    title: 'E-Commerce Platform',
    description: 'A full-featured e-commerce platform with product listings, shopping cart, user authentication, and payment processing.',
    longDescription: `
      This e-commerce platform provides a comprehensive solution for online stores. It features a responsive design
      that works across all devices and a seamless shopping experience.
      
      Key features include:
      - User authentication and account management
      - Product catalog with search and filtering
      - Shopping cart and wishlist functionality
      - Secure checkout process with Stripe integration
      - Order history and tracking
      - Admin dashboard for product and order management
      
      The application is built with a modern tech stack, focusing on performance, security, and scalability.
      Server-side rendering ensures fast page loads and good SEO, while the database structure allows for 
      efficient queries and data management.
    `,
    challenges: `
      Some of the key challenges in this project included:
      - Implementing a secure payment processing system
      - Creating a responsive design that works across all devices
      - Building an efficient search and filtering system for products
      - Setting up user authentication with proper security measures
      - Optimizing database queries for performance
    `,
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'MongoDB', 'Stripe API'],
    category: 'web',
    image: '/placeholder.svg',
    githubUrl: 'https://github.com/yourusername/project1',
    liveUrl: 'https://project1-demo.com',
    screenshots: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
  },
  {
    id: 'project-2',
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates, task assignment, and progress tracking.',
    longDescription: `
      This task management application helps teams organize and track their work efficiently. It provides
      real-time collaboration features and a clean, intuitive interface.
      
      Key features include:
      - Project and task organization with custom categories
      - Real-time updates using WebSockets
      - Task assignment and deadline tracking
      - Comment threads for task discussion
      - File attachments and sharing
      - Progress tracking and reporting
      - Email notifications for important updates
      
      The app uses a modern architecture with a React frontend and Node.js backend, connected through
      a RESTful API and WebSockets for real-time features.
    `,
    challenges: `
      Some of the key challenges in this project included:
      - Implementing real-time updates across multiple clients
      - Creating an intuitive drag-and-drop interface for task management
      - Building a scalable backend to handle many concurrent users
      - Designing a responsive UI that works well on desktop and mobile
      - Setting up proper authentication and authorization systems
    `,
    technologies: ['React', 'Redux', 'Node.js', 'Socket.io', 'PostgreSQL'],
    category: 'web',
    image: '/placeholder.svg',
    githubUrl: 'https://github.com/yourusername/project2',
    liveUrl: 'https://project2-demo.com',
    screenshots: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
  },
  {
    id: 'project-3',
    title: 'Portfolio Website',
    description: 'A responsive portfolio website with animated sections, dark mode support, and contact form.',
    longDescription: `
      This portfolio website showcases my work and skills as a developer. It features a modern design with
      smooth animations and a seamless user experience.
      
      Key features include:
      - Responsive design that looks great on all devices
      - Dark mode support with automatic detection of system preferences
      - Animated sections and page transitions
      - Project showcase with filtering options
      - Contact form with email integration
      - Performance optimized images and assets
      
      The site is built with Next.js and Tailwind CSS, providing a fast, responsive experience while
      maintaining good SEO and accessibility.
    `,
    challenges: `
      Some of the key challenges in this project included:
      - Creating smooth animations that enhance rather than distract from the content
      - Implementing a theme system with proper color management
      - Building a responsive layout that works across all screen sizes
      - Optimizing performance to achieve high lighthouse scores
      - Setting up a secure contact form with spam protection
    `,
    technologies: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'TypeScript'],
    category: 'web',
    image: '/placeholder.svg',
    githubUrl: 'https://github.com/yourusername/portfolio',
    liveUrl: 'https://your-portfolio.com',
    screenshots: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
  },
];

export default function ProjectPage() {
  const params = useParams();
  const [project, setProject] = useState<typeof projectsData[0] | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // In a real application, you would fetch this data from an API
    // based on the slug parameter
    const slug = params.slug as string;
    const foundProject = projectsData.find(p => p.id === slug);
    
    if (foundProject) {
      setProject(foundProject);
    }
    
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
          The project you're looking for doesn't exist or has been removed.
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
        
        {/* Project Header */}
        <AnimatedSection className="mb-12">
          <h1 className="mb-4 text-3xl font-bold md:text-4xl">{project.title}</h1>
          <p className="mb-6 text-xl text-gray-600 dark:text-gray-300">
            {project.description}
          </p>
          
          <div className="mb-8 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800 dark:bg-blue-900 dark:text-blue-100"
              >
                {tech}
              </span>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-3">
            {project.githubUrl && (
              <Button
                href={project.githubUrl}
                variant="outline"
                icon={<FaGithub />}
                external
              >
                View Code
              </Button>
            )}
            {project.liveUrl && (
              <Button
                href={project.liveUrl}
                icon={<FaExternalLinkAlt />}
                external
              >
                Live Demo
              </Button>
            )}
          </div>
        </AnimatedSection>
        
        {/* Project Image */}
        <AnimatedSection className="mb-12 overflow-hidden rounded-lg border border-gray-200 shadow-md dark:border-gray-700" delay={0.1}>
          <div className="aspect-video w-full bg-gray-200 dark:bg-gray-700">
            {/* Main project image would go here */}
          </div>
        </AnimatedSection>
        
        {/* Project Details */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <AnimatedSection className="lg:col-span-2" delay={0.2}>
            <h2 className="mb-4 text-2xl font-bold">About This Project</h2>
            <div className="prose max-w-none text-gray-700 dark:text-gray-300">
              {project.longDescription.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph.trim()}
                </p>
              ))}
            </div>
            
            <h2 className="mb-4 mt-8 text-2xl font-bold">Challenges</h2>
            <div className="prose max-w-none text-gray-700 dark:text-gray-300">
              {project.challenges.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph.trim()}
                </p>
              ))}
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={0.3}>
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-4 text-xl font-bold">Project Details</h3>
              
              <div className="mb-4">
                <h4 className="font-medium text-gray-600 dark:text-gray-400">Category</h4>
                <p className="capitalize">
                  {project.category === 'web' ? 'Web Development' : 
                   project.category === 'mobile' ? 'Mobile App' : 
                   project.category === 'app' ? 'Application' : project.category}
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
            </div>
          </AnimatedSection>
        </div>
        
        {/* Project Screenshots */}
        <AnimatedSection className="mt-12" delay={0.4}>
          <h2 className="mb-6 text-2xl font-bold">Screenshots</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {project.screenshots.map((screenshot, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-lg border border-gray-200 shadow-md dark:border-gray-700"
              >
                <div className="aspect-video w-full bg-gray-200 dark:bg-gray-700">
                  {/* Screenshot would go here */}
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
        
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
                  <div className="h-40 bg-gray-200 dark:bg-gray-700">
                    {/* Project image placeholder */}
                  </div>
                  <div className="p-4">
                    <h3 className="mb-2 text-lg font-bold">
                      <Link
                        href={`/projects/${relatedProject.id}`}
                        className="hover:text-blue-600 dark:hover:text-blue-400"
                      >
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