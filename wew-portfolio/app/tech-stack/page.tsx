"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/ui/animated-section';
import { FaStar } from 'react-icons/fa';

// Mock tech stack data
const techCategories = [
  { id: 'all', name: 'All Technologies' },
  { id: 'frontend', name: 'Frontend' },
  { id: 'backend', name: 'Backend' },
  { id: 'database', name: 'Databases' },
  { id: 'devops', name: 'DevOps' },
  { id: 'tools', name: 'Tools & Others' },
];

const technologies = [
  {
    name: 'React',
    description: 'A JavaScript library for building user interfaces',
    category: 'frontend',
    proficiency: 5,
    yearsOfExperience: 4,
    icon: '⚛️',
  },
  {
    name: 'Next.js',
    description: 'React framework for production with server-side rendering',
    category: 'frontend',
    proficiency: 5,
    yearsOfExperience: 3,
    icon: '▲',
  },
  {
    name: 'TypeScript',
    description: 'Typed superset of JavaScript that compiles to plain JavaScript',
    category: 'frontend',
    proficiency: 4,
    yearsOfExperience: 3,
    icon: '𝐓𝐒',
  },
  {
    name: 'Tailwind CSS',
    description: 'Utility-first CSS framework for rapid UI development',
    category: 'frontend',
    proficiency: 5,
    yearsOfExperience: 3,
    icon: '🎨',
  },
  {
    name: 'Redux',
    description: 'Predictable state container for JavaScript apps',
    category: 'frontend',
    proficiency: 4,
    yearsOfExperience: 3,
    icon: '🔄',
  },
  {
    name: 'Framer Motion',
    description: 'Production-ready motion library for React',
    category: 'frontend',
    proficiency: 4,
    yearsOfExperience: 2,
    icon: '🎭',
  },
  {
    name: 'Node.js',
    description: 'JavaScript runtime built on Chrome\'s V8 JavaScript engine',
    category: 'backend',
    proficiency: 4,
    yearsOfExperience: 4,
    icon: '⬢',
  },
  {
    name: 'Express',
    description: 'Fast, unopinionated, minimalist web framework for Node.js',
    category: 'backend',
    proficiency: 4,
    yearsOfExperience: 4,
    icon: '🚂',
  },
  {
    name: 'GraphQL',
    description: 'Query language for your API',
    category: 'backend',
    proficiency: 3,
    yearsOfExperience: 2,
    icon: '◯',
  },
  {
    name: 'MongoDB',
    description: 'NoSQL document database with scalability and flexibility',
    category: 'database',
    proficiency: 4,
    yearsOfExperience: 3,
    icon: '🍃',
  },
  {
    name: 'PostgreSQL',
    description: 'Advanced open source relational database',
    category: 'database',
    proficiency: 4,
    yearsOfExperience: 3,
    icon: '🐘',
  },
  {
    name: 'Redis',
    description: 'In-memory data structure store used as database, cache, and message broker',
    category: 'database',
    proficiency: 3,
    yearsOfExperience: 2,
    icon: '🔴',
  },
  {
    name: 'Docker',
    description: 'Platform for developing, shipping, and running applications in containers',
    category: 'devops',
    proficiency: 3,
    yearsOfExperience: 2,
    icon: '🐳',
  },
  {
    name: 'AWS',
    description: 'Cloud computing services for building, deploying, and managing applications',
    category: 'devops',
    proficiency: 3,
    yearsOfExperience: 2,
    icon: '☁️',
  },
  {
    name: 'GitHub Actions',
    description: 'CI/CD platform integrated with GitHub',
    category: 'devops',
    proficiency: 4,
    yearsOfExperience: 2,
    icon: '🔄',
  },
  {
    name: 'Git',
    description: 'Distributed version control system',
    category: 'tools',
    proficiency: 5,
    yearsOfExperience: 5,
    icon: '📊',
  },
  {
    name: 'Figma',
    description: 'Collaborative interface design tool',
    category: 'tools',
    proficiency: 4,
    yearsOfExperience: 3,
    icon: '🎨',
  },
  {
    name: 'Jest',
    description: 'JavaScript testing framework',
    category: 'tools',
    proficiency: 4,
    yearsOfExperience: 3,
    icon: '🧪',
  },
];

export default function TechStackPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Filter technologies based on the active category
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
            These are the technologies, frameworks, and tools I use to build modern applications.
            My focus is on creating performant, scalable, and maintainable solutions.
          </p>
        </AnimatedSection>

        {/* Category Filter */}
        <AnimatedSection
          className="mb-12 flex flex-wrap justify-center gap-2"
          delay={0.1}
        >
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
                  <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-2xl dark:bg-blue-900/30">
                    {tech.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{tech.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {tech.yearsOfExperience} {tech.yearsOfExperience === 1 ? 'year' : 'years'} of experience
                    </p>
                  </div>
                </div>
                <div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`${
                          i < tech.proficiency
                            ? 'text-yellow-400'
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                {tech.description}
              </p>
            </AnimatedSection>
          ))}
        </div>

        {/* No Results Message */}
        {filteredTechnologies.length === 0 && (
          <div className="my-12 text-center">
            <p className="text-lg text-gray-600 dark:text-gray-300">
              No technologies found in this category. Please try another filter.
            </p>
          </div>
        )}

        {/* Learning Next Section */}
        <AnimatedSection className="mt-16">
          <div className="rounded-lg bg-blue-50 p-8 dark:bg-blue-900/20">
            <h2 className="mb-4 text-2xl font-bold">What I'm Learning Next</h2>
            <p className="mb-6 text-lg text-gray-700 dark:text-gray-300">
              I'm always looking to expand my skill set and stay current with the latest technologies.
              Here are some technologies I'm currently learning or planning to learn:
            </p>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {[
                { name: 'Rust', description: 'A language empowering everyone to build reliable and efficient software.' },
                { name: 'WebAssembly', description: 'Binary instruction format for a stack-based virtual machine.' },
                { name: 'Svelte', description: 'Cybernetically enhanced web apps with less code.' },
              ].map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800"
                >
                  <h3 className="mb-2 font-bold">{tech.name}</h3>
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