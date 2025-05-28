//app/tech-stack/page.tsx
"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/ui/animated-section';
import { FaStar, FaReact, FaNodeJs, FaDocker, FaAws, FaGit } from 'react-icons/fa';
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiFramer, SiExpress, 
  SiMongodb, SiPostgresql, SiGithubactions, SiJest, SiD, SiSolidity, SiPython, SiRust, SiSvelte, SiNpm, SiYarn, SiDjango, SiKubernetes, SiTerraform, SiGrafana, SiPrometheus, SiSupabase, SiSqlite } from 'react-icons/si';
import { TbBrandReactNative } from 'react-icons/tb';

// Tech stack data with react-icons
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
    proficiency: 4,
    yearsOfExperience: 2,
    icon: <FaReact className="h-8 w-8 text-[#61DAFB]" />,
  },
  {
    name: 'Next.js',
    description: 'React framework for production with server-side rendering',
    category: 'frontend',
    proficiency: 4,
    yearsOfExperience: 2,
    icon: <SiNextdotjs className="h-7 w-7" />,
  },
  {
    name: 'TypeScript',
    description: 'Typed superset of JavaScript that compiles to plain JavaScript',
    category: 'frontend',
    proficiency: 3.5,
    yearsOfExperience: 2,
    icon: <SiTypescript className="h-7 w-7 text-[#3178C6]" />,
  },
  {
      name: 'Python',
      description: 'A high-level, interpreted, general-purpose programming language',
      category: 'backend',
      proficiency: 3,
      yearsOfExperience: 2,
      icon: <SiPython className="h-7 w-7 text-[#E535AB]" />,
      
  },
  
  {
      name: 'Jenkins',
      description: 'An open source automation server',
      category: 'devops',
      proficiency: 3,
      yearsOfExperience: 1,
      icon: <SiD className="h-7 w-7 text-[#2496ED]" />,
     
  },
  {
      name: 'Solidity',
      description: 'A programming language for writing smart contracts on the Ethereum blockchain',
      category: 'backend',
      proficiency: 3,
      yearsOfExperience: 1,
      icon: <SiSolidity className="h-7 w-7 text-[#E535AB]" />
  },  
  {
    name: 'Tailwind CSS',
    description: 'Utility-first CSS framework for rapid UI development',
    category: 'frontend',
    proficiency: 5,
    yearsOfExperience: 3,
    icon: <SiTailwindcss className="h-7 w-7 text-[#38B2AC]" />,
  },
  {
    name: 'Framer Motion',
    description: 'Production-ready motion library for React',
    category: 'frontend',
    proficiency: 4,
    yearsOfExperience: 2,
    icon: <SiFramer className="h-7 w-7" />,
  },
  {
    name: 'React Native',
    description: 'Build native apps with React and JavaScript',
    category: 'frontend',
    proficiency: 3,
    yearsOfExperience: 1,
    icon: <TbBrandReactNative className="h-8 w-8 text-[#61DAFB]" />,
  },
  {
    name: 'Node.js',
    description: 'JavaScript runtime built on Chrome\'s V8 JavaScript engine',
    category: 'backend',
    proficiency: 3,
    yearsOfExperience: 2,
    icon: <FaNodeJs className="h-7 w-7 text-[#339933]" />,
  },
  {
    name: 'Express',
    description: 'Fast, unopinionated, minimalist web framework for Node.js',
    category: 'backend',
    proficiency: 3,
    yearsOfExperience: 2,
    icon: <SiExpress className="h-7 w-7" />,
  },
  {
    name: 'MongoDB',
    description: 'NoSQL document database with scalability and flexibility',
    category: 'database',
    proficiency: 3,
    yearsOfExperience: 2,
    icon: <SiMongodb className="h-7 w-7 text-[#47A248]" />,
  },
  {
    name: 'PostgreSQL',
    description: 'Advanced open source relational database',
    category: 'database',
    proficiency: 3,
    yearsOfExperience: 2,
    icon: <SiPostgresql className="h-7 w-7 text-[#336791]" />,
  },
  {
    name: 'Docker',
    description: 'Platform for developing, shipping, and running applications in containers',
    category: 'devops',
    proficiency: 3,
    yearsOfExperience: 1,
    icon: <FaDocker className="h-7 w-7 text-[#2496ED]" />,
  },
  {
    name: 'AWS',
    description: 'Cloud computing services for building, deploying, and managing applications',
    category: 'devops',
    proficiency: 3,
    yearsOfExperience: 1,
    icon: <FaAws className="h-7 w-7 text-[#FF9900]" />,
  },
  {
    name: 'GitHub Actions',
    description: 'CI/CD platform integrated with GitHub',
    category: 'devops',
    proficiency: 4,
    yearsOfExperience: 2,
    icon: <SiGithubactions className="h-7 w-7 text-[#2088FF]" />,
  },
  {
    name: 'Git',
    description: 'Distributed version control system',
    category: 'tools',
    proficiency: 3.5,
    yearsOfExperience: 2,
    icon: <FaGit className="h-7 w-7 text-[#F05032]" />,
  },
  {
    name: 'NPM',
    description: 'JavaScript package manager',
    category: 'tools',
    proficiency: 3,
    yearsOfExperience: 1,
    icon: <SiNpm className="h-7 w-7 text-[#CB3837]" />,
  },
  {
    name: 'Yarn',
    description: 'JavaScript package manager',
    category: 'tools',
    proficiency: 3,
    yearsOfExperience: 1,
    icon: <SiYarn className="h-7 w-7 text-[#2C8EBB]" />,
  },
  {
    name: 'Jest',
    description: 'JavaScript testing framework',
    category: 'tools',
    proficiency: 3,
    yearsOfExperience: 1,
    icon: <SiJest className="h-7 w-7 text-[#C21325]" />,
  },
  {
    name: 'Django REST Framework',
    description: 'Python framework for building APIs',
    category: 'backend',
    proficiency: 3,
    yearsOfExperience: 1,
    icon: <SiDjango className="h-7 w-7 text-[#092E20]" />,
  },
  {
    name: 'Terraform',
    description: 'Infrastructure as Code (IaC) tool for provisioning and managing cloud resources',
    category: 'devops',
    proficiency: 3,
    yearsOfExperience: 1,
    icon: <SiTerraform className="h-7 w-7 text-[#623CEA]" />,
  },
  {
    name: 'Kubernetes',
    description: 'Open-source container orchestration platform',
    category: 'devops',
    proficiency: 3,
    yearsOfExperience: 1,
    icon: <SiKubernetes className="h-7 w-7 text-[#326CE5]" />,
  },
  {
    name: 'Prometheus',
    description: 'Open-source monitoring and alerting system',
    category: 'devops',
    proficiency: 3,
    yearsOfExperience: 1,
    icon: <SiPrometheus className="h-7 w-7 text-[#E6522C]" />,
  },
  {
    name: 'Grafana',
    description: 'Open-source monitoring and alerting platform',
    category: 'devops',
    proficiency: 3,
    yearsOfExperience: 1,
    icon: <SiGrafana className="h-7 w-7 text-[#F46800]" />,
  },
  {
    name: 'Supabase',
    description: 'Open-source backend-as-a-service platform',
    category: 'backend',
    proficiency: 3,
    yearsOfExperience: 1.5,
    icon: <SiSupabase className="h-7 w-7 text-[#3ECF8E]" />,
  },
  {
    name: 'SQLite',
    description: 'In-memory database',
    category: 'database',
    proficiency: 3,
    yearsOfExperience: 2,
    icon: <SiSqlite className="h-7 w-7 text-[#4285F4]" />,
  }

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
                  <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
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
            <h2 className="mb-4 text-2xl font-bold">What I&apos;m Learning Next</h2>
            <p className="mb-6 text-lg text-gray-700 dark:text-gray-300">
              I&apos;m always a lifelong learner, looking to expand my skill set and stay current with the latest technologies.
              Here are some technologies I&apos;m currently learning or planning to learn:
            </p>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {[
                { 
                  name: 'Rust', 
                  description: 'A language empowering everyone to build reliable and efficient software.',
                  icon: <SiRust className="h-8 w-8 text-[#000000] dark:text-[#ffffff]" /> 
                },
                { 
                  name: 'Svelte', 
                  description: 'Cybernetically enhanced web apps with less code.',
                  icon: <SiSvelte className="h-8 w-8 text-[#FF3E00]" /> 
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