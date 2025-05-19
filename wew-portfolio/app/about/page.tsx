//app/about/page.tsx
"use client";

import { motion } from 'framer-motion';
import Button from '@/components/ui/button';
import { FaDownload, FaGraduationCap, FaBriefcase } from 'react-icons/fa';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="pt-24">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <h1 className="mb-4 text-3xl font-bold md:text-4xl">About Me</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Learn more about my background, skills, and experience.
          </p>
        </motion.div>

        {/* About Content */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative h-80 w-80 overflow-hidden rounded-lg bg-white p-2 shadow-lg dark:bg-gray-800">
              <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                 <Image
                    src="/image/CAPE.jpg" 
                    alt="Emmanuel W. Wachira"
                    width={300}
                    height={300}
                    className="h-full w-full object-cover"
                    sizes="(max-width: 768px) 100vw, 320px"
                    priority
                  />
              </div>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="mb-4 text-2xl font-bold">Hi, I am Emmanuel W. Wachira</h2>
            <p className="mb-4 text-lg text-gray-600 dark:text-gray-300">
              I am a passionate Full-Stack Developer with 1+ years of experience building web applications
              with a focus on security and functional design.
            </p>
            <p className="mb-4 text-lg text-gray-600 dark:text-gray-300">
              My development journey has led me to work on diverse projects including a logistics application 
              using Python with SQL databases and implementing JWT authentication with RBAC security. I have also 
              developed a blockchain-based vehicle shield insurance project using Solidity, Web3.js, and Hardhat, 
              with Next.js for frontend and Firebase Auth for user management.
            </p>
            <p className="mb-6 text-lg text-gray-600 dark:text-gray-300">
              I am continuously expanding my tech stack to include Node.js (Express), MongoDB, and DevOps tools 
              like Docker, Jenkins, Kubernetes, and AWS. I am always eager to learn and take on new challenges.
            </p>
            <Button
              href="/resume.pdf"
              variant="primary"
              icon={<FaDownload />}
              external={true}
            >
              Download Resume
            </Button>
          </motion.div>
        </div>

        {/* Experience Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <h2 className="mb-8 text-center text-3xl font-bold">Experience</h2>
          
          <div className="relative mx-auto max-w-3xl">
            {/* Timeline Line */}
            <div className="absolute left-0 top-0 h-full w-px bg-gray-200 dark:bg-gray-700 md:left-1/2 md:-ml-px"></div>
            
            {/* Timeline Items */}
            <div className="space-y-12">
              {/* Project 1 */}
              <div className="relative md:flex md:items-center md:justify-between">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="mb-8 md:mb-0 md:w-5/12 md:pr-8 md:text-right"
                >
                  <h3 className="text-xl font-bold">Logistics Application</h3>
                  <p className="text-blue-600 dark:text-blue-400">Full Stack Developer</p>
                  <p className="text-gray-600 dark:text-gray-300">2024</p>
                </motion.div>
                
                <div className="absolute left-0 top-1 z-10 flex h-8 w-8 -translate-x-3 items-center justify-center rounded-full bg-blue-600 text-white md:left-1/2 md:-translate-x-4">
                  <FaBriefcase />
                </div>
                
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="md:w-5/12 md:pl-8"
                >
                  <p className="text-gray-600 dark:text-gray-300">
                    Developed a logistics application using Python with SQLite and PostgreSQL. Implemented
                    JWT authentication and Role-Based Access Control (RBAC) for enhanced security.
                  </p>
                </motion.div>
              </div>
              
              {/* Project 2 */}
              <div className="relative md:flex md:items-center md:justify-between">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="mb-8 md:mb-0 md:w-5/12 md:pr-8 md:text-right"
                >
                  <h3 className="text-xl font-bold">Vehicle Shield Insurance</h3>
                  <p className="text-blue-600 dark:text-blue-400">Blockchain Developer</p>
                  <p className="text-gray-600 dark:text-gray-300">2025</p>
                </motion.div>
                
                <div className="absolute left-0 top-1 z-10 flex h-8 w-8 -translate-x-3 items-center justify-center rounded-full bg-blue-600 text-white md:left-1/2 md:-translate-x-4">
                  <FaBriefcase />
                </div>
                
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="md:w-5/12 md:pl-8"
                >
                  <p className="text-gray-600 dark:text-gray-300">
                    Built a blockchain-based vehicle insurance platform using Solidity smart contracts.
                    Integrated Web3.js and Hardhat for backend functionality, with Next.js for the frontend
                    and Firebase Auth for user authentication.
                  </p>
                </motion.div>
              </div>
              
              {/* Education */}
              <div className="relative md:flex md:items-center md:justify-between">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="mb-8 md:mb-0 md:w-5/12 md:pr-8 md:text-right"
                >
                  <h3 className="text-xl font-bold">Software Engineering</h3>
                  <p className="text-blue-600 dark:text-blue-400">Moringa School</p>
                  <p className="text-gray-600 dark:text-gray-300">Graduation Year:2024</p>
                </motion.div>
                
                <div className="absolute left-0 top-1 z-10 flex h-8 w-8 -translate-x-3 items-center justify-center rounded-full bg-blue-600 text-white md:left-1/2 md:-translate-x-4">
                  <FaGraduationCap />
                </div>
                
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="md:w-5/12 md:pl-8"
                >
                  <p className="text-gray-600 dark:text-gray-300">
                    Focused on Mechatronics and web technologies.
                    Continuously expanding my knowledge through online courses and practical projects.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <h2 className="mb-8 text-center text-3xl font-bold">Skills</h2>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {/* Skill Category 1 */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-4 text-xl font-bold">Frontend</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <div className="mr-2 h-2 w-2 rounded-full bg-blue-600"></div>
                  <span>React / Next.js</span>
                </li>
                <li className="flex items-center">
                  <div className="mr-2 h-2 w-2 rounded-full bg-blue-600"></div>
                  <span>TypeScript / JavaScript</span>
                </li>
                <li className="flex items-center">
                  <div className="mr-2 h-2 w-2 rounded-full bg-blue-600"></div>
                  <span>Tailwind CSS</span>
                </li>
                <li className="flex items-center">
                  <div className="mr-2 h-2 w-2 rounded-full bg-blue-600"></div>
                  <span>Framer Motion</span>
                </li>
                <li className="flex items-center">
                  <div className="mr-2 h-2 w-2 rounded-full bg-blue-600"></div>
                  <span>Web3.js</span>
                </li>
              </ul>
            </div>
            
            {/* Skill Category 2 */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-4 text-xl font-bold">Backend</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <div className="mr-2 h-2 w-2 rounded-full bg-blue-600"></div>
                  <span>Python</span>
                </li>
                <li className="flex items-center">
                  <div className="mr-2 h-2 w-2 rounded-full bg-blue-600"></div>
                  <span>Solidity</span>
                </li>
                <li className="flex items-center">
                  <div className="mr-2 h-2 w-2 rounded-full bg-blue-600"></div>
                  <span>SQLite / PostgreSQL</span>
                </li>
                <li className="flex items-center">
                  <div className="mr-2 h-2 w-2 rounded-full bg-blue-600"></div>
                  <span>JWT / RBAC Security</span>
                </li>
                <li className="flex items-center">
                  <div className="mr-2 h-2 w-2 rounded-full bg-blue-600"></div>
                  <span>Firebase</span>
                </li>
              </ul>
            </div>
            
            {/* Skill Category 3 */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-4 text-xl font-bold">Learning & Tools</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <div className="mr-2 h-2 w-2 rounded-full bg-blue-600"></div>
                  <span>Git / GitHub</span>
                </li>
                <li className="flex items-center">
                  <div className="mr-2 h-2 w-2 rounded-full bg-blue-600"></div>
                  <span>Hardhat</span>
                </li>
                <li className="flex items-center">
                  <div className="mr-2 h-2 w-2 rounded-full bg-blue-600"></div>
                  <span>Node.js / Express (Learning)</span>
                </li>
                <li className="flex items-center">
                  <div className="mr-2 h-2 w-2 rounded-full bg-blue-600"></div>
                  <span>MongoDB (Learning)</span>
                </li>
                <li className="flex items-center">
                  <div className="mr-2 h-2 w-2 rounded-full bg-blue-600"></div>
                  <span>Docker / CI/CD (Learning)</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}