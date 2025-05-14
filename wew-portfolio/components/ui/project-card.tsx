"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  githubUrl?: string;
  liveUrl?: string;
}

export default function ProjectCard({
  id,
  title,
  description,
  technologies,
  image,
  githubUrl,
  liveUrl,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white transition-all duration-300 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800"
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <div className="h-full w-full transform bg-gray-200 transition-transform duration-500 group-hover:scale-110 dark:bg-gray-700">
          {/* Project image would go here */}
          <div className="flex h-full w-full items-center justify-center text-gray-500 dark:text-gray-400">
            {image.includes('placeholder') ? 'Project Image' : ''}
          </div>
        </div>
        
        {/* Overlay with links */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-blue-600/80 to-indigo-900/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex space-x-3">
            {githubUrl && (
              <motion.a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-blue-700 transition-transform hover:scale-110 dark:bg-gray-800 dark:text-blue-400"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
                aria-label="View source code on GitHub"
              >
                <FaGithub className="h-5 w-5" />
              </motion.a>
            )}
            
            {liveUrl && (
              <motion.a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-blue-700 transition-transform hover:scale-110 dark:bg-gray-800 dark:text-blue-400"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
                aria-label="View live demo"
              >
                <FaExternalLinkAlt className="h-4 w-4" />
              </motion.a>
            )}
          </div>
        </div>
        
        {/* Technology badges */}
        <div className="absolute bottom-0 left-0 w-full transform translate-y-full transition-transform duration-300 group-hover:translate-y-0">
          <div className="flex flex-wrap gap-1 bg-gradient-to-t from-black/70 to-transparent p-2 pt-8">
            {technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-white/20 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm"
              >
                {tech}
              </span>
            ))}
            {technologies.length > 3 && (
              <span className="rounded-full bg-white/20 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
                +{technologies.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
      
      {/* Content */}
      <Link href={`/projects/${id}`} className="block p-5">
        <div className="group-hover:text-blue-500">
          <h3 className="mb-2 text-xl font-bold transition-colors duration-300">
            {title}
          </h3>
          <p className="line-clamp-2 text-gray-600 dark:text-gray-300">
            {description}
          </p>
        </div>
        
        {/* View details button */}
        <div className="mt-4 flex justify-end">
          <motion.span
            className="inline-flex items-center text-sm font-medium text-blue-600 transition-all dark:text-blue-400"
            initial={{ x: 0 }}
            whileHover={{ x: 5 }}
          >
            View Details
            <svg
              className="ml-1 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </motion.span>
        </div>
      </Link>
    </motion.div>
  );
}