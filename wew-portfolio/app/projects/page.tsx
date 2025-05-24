"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AnimatedSection from '@/components/ui/animated-section';
import Button from '@/components/ui/button';
import { FaGithub, FaExternalLinkAlt, FaClock } from 'react-icons/fa';

// Project data without image paths for upcoming projects
const projects = [
  {
    id: 'logistics-app',
    title: 'Logistics Application',
    description: 'A comprehensive logistics management system with authentication and role-based access control.',
    technologies: ['Python', 'SQLite', 'PostgreSQL', 'JWT', 'RBAC Security'],
    category: 'web',
    image: '/images/projects/logistics-app.jpg',
    githubUrl: 'https://github.com/Fuata-tech/logistic_management_system',
    liveUrl: 'https://fuata-tech-client.onrender.com/',
  },
  {
    id: 'vehicle-shield-insurance',
    title: 'Vehicle Shield Insurance',
    description: 'Blockchain-based vehicle insurance platform with smart contracts and secure user authentication.',
    technologies: ['Solidity', 'Web3.js', 'Next.js', 'Hardhat', 'Firebase Auth'],
    category: 'blockchain',
    image: '/images/projects/vehicle-shield.jpg',
    githubUrl: 'https://github.com/wachira7/vehicle-shield-insurance',
    liveUrl: 'https://vsi-app.vercel.app/',
  },
  {
    id: 'tourism-wildlife-app',
    title: 'Tourism & Wildlife App',
    description: 'Upcoming project: An application to showcase wildlife attractions and facilitate tourism bookings.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Google Maps API'],
    category: 'upcoming',
    githubUrl: null,
    liveUrl: null,
  },
  {
    id: 'movie-website',
    title: 'Movie Website',
    description: 'Upcoming project: A platform for browsing, reviewing and tracking movies with personalized recommendations.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Movie Database API'],
    category: 'upcoming',
    githubUrl: null,
    liveUrl: null,
  }
];

// Project categories for filtering
const categories = [
  { id: 'all', name: 'All Projects' },
  { id: 'web', name: 'Web Development' },
  { id: 'blockchain', name: 'Blockchain' },
  { id: 'upcoming', name: 'Upcoming Projects' },
];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Filter projects based on active category
  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(project => project.category === activeCategory);

  return (
    <div className="pt-24">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <AnimatedSection className="mx-auto mb-16 max-w-3xl text-center">
          <h1 className="mb-4 text-3xl font-bold md:text-4xl">My Projects</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Browse through my work and upcoming projects. Each project showcases different skills and technologies.
          </p>
        </AnimatedSection>

        {/* Category Filter */}
        <AnimatedSection
          className="mb-12 flex flex-wrap justify-center gap-2"
          delay={0.1}
        >
          {categories.map((category) => (
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

        {/* Projects Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <AnimatedSection
              key={project.id}
              delay={0.1 + index * 0.05}
              className="group overflow-hidden rounded-lg border border-gray-200 bg-white transition-all hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="relative h-48 overflow-hidden">
                {project.category === 'upcoming' ? (
                  // Custom placeholder for upcoming projects
                  <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-4 text-white">
                    <FaClock className="mb-2 h-10 w-10" />
                    <h3 className="text-xl font-bold">{project.title}</h3>
                    <p className="mt-2 text-center text-sm">Coming Soon</p>
                  </div>
                ) : (
                  // Image for completed projects
                  <>
                    <Image
                      src={project.image ?? '/placeholder.svg'}
                      alt={`${project.title} screenshot`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      onError={(e) => {
                        // Fallback to placeholder if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = '/placeholder.svg';
                      }}
                    />
                    <div className="absolute inset-0 bg-blue-600 bg-opacity-80 opacity-0 transition-opacity group-hover:opacity-100">
                      <div className="flex h-full items-center justify-center space-x-4">
                        {project.githubUrl && (
                          <Button
                            href={project.githubUrl}
                            variant="outline"
                            className="bg-white hover:bg-gray-100"
                            icon={<FaGithub />}
                            external
                          >
                            Code
                          </Button>
                        )}
                        {project.liveUrl && (
                          <Button
                            href={project.liveUrl}
                            variant="outline"
                            className="bg-white hover:bg-gray-100"
                            icon={<FaExternalLinkAlt />}
                            external
                          >
                            Demo
                          </Button>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
              
              <div className="p-5">
                {/* Separate clickable title for completed projects */}
                {project.category === 'upcoming' ? (
                  <h3 className="mb-2 text-xl font-bold">{project.title}</h3>
                ) : (
                  <h3 className="mb-2 text-xl font-bold">
                    <Link 
                      href={`/projects/${project.id}`}
                      className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {project.title}
                    </Link>
                  </h3>
                )}
                
                <p className="mb-4 text-gray-600 dark:text-gray-300">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>

                {/* Action buttons for completed projects - outside of any link wrapper */}
                {project.category !== 'upcoming' && (
                  <div className="flex flex-wrap gap-2">
                    {project.githubUrl && (
                      <Button
                        href={project.githubUrl}
                        variant="outline"
                        size="sm"
                        icon={<FaGithub />}
                        external
                      >
                        Code
                      </Button>
                    )}
                    {project.liveUrl && (
                      <Button
                        href={project.liveUrl}
                        variant="outline"
                        size="sm"
                        icon={<FaExternalLinkAlt />}
                        external
                      >
                        Demo
                      </Button>
                    )}
                    <Link href={`/projects/${project.id}`}>
                      <Button variant="primary" size="sm">
                        Details
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* No Results Message */}
        {filteredProjects.length === 0 && (
          <div className="my-12 text-center">
            <p className="text-lg text-gray-600 dark:text-gray-300">
              No projects found in this category. Please try another filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}