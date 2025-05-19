//components/ui/project-card.tsx
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaClock } from 'react-icons/fa';

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image?: string;
  githubUrl?: string | null;
  liveUrl?: string | null;
  isUpcoming?: boolean;
  category: string;
}

export default function ProjectCard({
  id,
  title,
  description,
  technologies,
  image,
  githubUrl,
  liveUrl,
  isUpcoming = false,
  category,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white transition-all duration-300 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800"
    >
      {/* Image Container with Link */}
      <Link href={isUpcoming ? '#' : `/projects/${id}`} className={isUpcoming ? 'cursor-default' : ''}>
        <div className="relative h-48 overflow-hidden">
          {isUpcoming ? (
            // Custom placeholder for upcoming projects
            <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-4 text-white">
              <FaClock className="mb-2 h-10 w-10" />
              <h3 className="text-xl font-bold">{title}</h3>
              <p className="mt-2 text-center text-sm">Coming Soon</p>
            </div>
          ) : (
            <>
              {/* Project image */}
              <div className="relative h-full w-full transform transition-transform duration-500 group-hover:scale-110">
                {image ? (
                  <Image 
                    src={image} 
                    alt={`${title} screenshot`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                    Project Image
                  </div>
                )}
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
                      onClick={(e) => e.stopPropagation()}
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
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FaExternalLinkAlt className="h-4 w-4" />
                    </motion.a>
                  )}
                </div>
              </div>
            </>
          )}
          
          {/* Technology badges - only show for non-upcoming projects */}
          {!isUpcoming && (
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
          )}
        </div>
      </Link>
      
      {/* Content */}
      <div className="p-5">
        <Link href={isUpcoming ? '#' : `/projects/${id}`} className={isUpcoming ? 'cursor-default' : ''}>
          <h3 className="mb-2 text-xl font-bold transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
            {title}
          </h3>
        </Link>
        <p className="line-clamp-2 text-gray-600 dark:text-gray-300">
          {description}
        </p>
        
        {/* Technology tags for mobile and better accessibility */}
        <div className="mt-4 flex flex-wrap gap-2">
          {technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-800 dark:bg-blue-900 dark:text-blue-100"
            >
              {tech}
            </span>
          ))}
          {technologies.length > 3 && (
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-800 dark:bg-gray-700 dark:text-gray-300">
              +{technologies.length - 3} more
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}