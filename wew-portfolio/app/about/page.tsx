//app/about/page.tsx
"use client";

import { motion } from 'framer-motion';
import Button from '@/components/ui/button';
import { FaDownload, FaGraduationCap, FaBriefcase,  FaCertificate } from 'react-icons/fa';
import Image from 'next/image';

// Timeline data structure for easy future additions
const timelineData = [
  {
    id: 1,
    year: "2025",
    month: "May - Jul",
    title: "DevOps Engineering Learning Track",
    subtitle: "Self-Directed Learning",
    type: "education",
    description: "Currently pursuing intensive DevOps training focusing on containerization, cloud infrastructure, CI/CD pipelines, and monitoring. Building expertise in modern deployment and operations practices.",
    icon: FaGraduationCap,
    technologies: ["Docker", "AWS", "Jenkins", "EC2", "Terraform", "Prometheus", "Grafana", "Bash Scripting", "Cron Jobs"]
  },
  {
    id: 2,
    year: "2025",
    month: "Mar",
    title: "Blockchain & Smart Contract Development Certification",
    subtitle: "3-Month Intensive Program",
    type: "certification",
    description: "Completed comprehensive blockchain development program covering smart contract development, decentralized applications, and modern Web3 technologies. Gained expertise in building secure and efficient blockchain solutions.",
    icon: FaCertificate,
    technologies: ["Solidity", "Next.js", "Ether.js", "Web3.js", "Thirdweb", "Smart Contracts", "DApp Development"]
  },
  {
    id: 3,
    year: "2025",
    month: "Jan",
    title: "Vehicle Shield Insurance DApp",
    subtitle: "Blockchain Developer",
    type: "project",
    description: "Built a blockchain-based vehicle insurance platform using Solidity smart contracts. Integrated Web3.js and Hardhat for backend functionality, with Next.js for the frontend and Firebase Auth for user authentication.",
    icon: FaBriefcase,
    technologies: ["Solidity", "Web3.js", "Next.js", "Firebase", "Hardhat"]
  },
  {
    id: 4,
    year: "2024",
    month: "Dec",
    title: "Logistics Application",
    subtitle: "Full Stack Developer",
    type: "project",
    description: "Developed a comprehensive logistics application using Python with SQLite and PostgreSQL. Implemented JWT authentication and Role-Based Access Control (RBAC) for enhanced security.",
    icon: FaBriefcase,
    technologies: ["Python", "SQLite", "PostgreSQL", "JWT", "RBAC"]
  },
  {
    id: 5,
    year: "2024",
    month: "Nov",
    title: "Software Engineering Certification",
    subtitle: "Moringa School",
    type: "education",
    description: "Completed intensive software engineering bootcamp focused on full-stack web development, covering modern technologies and best practices in software development.",
    icon: FaGraduationCap,
    technologies: ["Full-Stack Development", "Web Technologies", "Software Engineering Principles"]
  }
  
];

export default function AboutPage() {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'project':
        return 'bg-blue-600';
      case 'education':
        return 'bg-green-600';
      case 'certification':
        return 'bg-purple-600';
      case 'achievement':
        return 'bg-orange-600';
      default:
        return 'bg-blue-600';
    }
  };

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
                    src="/image/cape.jpg" 
                    alt="Emmanuel W. Wachira"
                    width={300}
                    height={300}
                    className="h-full w-full object-cover rounded"
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
              I am continuously expanding my tech stack to include Node.js (Express), Django Rest Framework, MongoDB, and DevOps tools 
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

        {/* Experience & Education Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <h2 className="mb-8 text-center text-3xl font-bold">Experience & Education</h2>
          <p className="mb-12 text-center text-gray-600 dark:text-gray-300">
            My journey through projects, education, and professional development
          </p>
          
          <div className="relative mx-auto max-w-4xl">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 h-full w-px bg-gray-200 dark:bg-gray-700 md:left-1/2 md:-ml-px"></div>
            
            {/* Timeline Items */}
            <div className="space-y-12">
              {timelineData.map((item, index) => (
                <div key={item.id} className="relative md:flex md:items-start md:justify-between">
                  {/* Left side content for desktop */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`mb-8 md:mb-0 md:w-5/12 ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:order-2'}`}
                  >
                    <div className="mb-2 flex items-center gap-2 md:justify-end">
                      <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                        {item.month} {item.year}
                      </span>
                      <span className={`rounded-full px-2 py-1 text-xs text-white ${
                        item.type === 'project' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100' :
                        item.type === 'education' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' :
                        item.type === 'certification' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100' :
                        'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100'
                      }`}>
                        {item.type}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <p className="text-blue-600 dark:text-blue-400 font-medium">{item.subtitle}</p>
                  </motion.div>
                  
                  {/* Timeline Icon */}
                  <div className={`absolute left-8 top-2 z-10 flex h-12 w-12 -translate-x-6 items-center justify-center rounded-full text-white md:left-1/2 md:-translate-x-6 ${getTypeColor(item.type)}`}>
                    <item.icon className="h-5 w-5" />
                  </div>
                  
                  {/* Right side content for desktop */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`md:w-5/12 ${index % 2 === 0 ? 'md:pl-8' : 'md:pr-8 md:text-right'}`}
                  >
                    <p className="mb-4 text-gray-600 dark:text-gray-300">
                      {item.description}
                    </p>
                    {item.technologies && (
                      <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? '' : 'md:justify-end'}`}>
                        {item.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Add Achievement Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Timeline is continuously updated with new achievements and experiences
            </p>
          </motion.div>
        </motion.div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <h2 className="mb-8 text-center text-3xl font-bold">Skills & Technologies</h2>
          
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