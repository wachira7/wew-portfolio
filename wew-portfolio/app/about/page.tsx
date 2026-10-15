"use client";

import { motion } from 'motion/react';
import Button from '@/components/ui/button';
import { FaDownload, FaGraduationCap, FaBriefcase, FaCertificate } from 'react-icons/fa';
import Image from 'next/image';

const timelineData = [
  {
    id: 9,
    year: "2026",
    month: "Sep",
    title: "AI Engineer Core Track: LLM Engineering, RAG, QLoRA, Agents",
    subtitle: "Udemy — Ed Donner",
    type: "certification",
    description: "Completed an 8-week AI engineering course covering LLM APIs, RAG, fine-tuning and agents. Built The Pour Is Right as my capstone: a QLoRA fine-tuned Qwen model served on Modal, RAG with Qdrant, an ensemble, and LangGraph agents that send Telegram alerts.",
    icon: FaCertificate,
    technologies: ["Python", "PyTorch", "Hugging Face", "QLoRA", "RAG", "Qdrant", "LangChain", "LangGraph", "Modal"]
  },
  {
    id: 1,
    year: "2025 - Present",
    month: "",
    title: "Full-Stack Developer",
    subtitle: "WaruTech",
    type: "project",
    description: "Building production-grade SaaS platforms and DevOps portfolio projects. Developed LogiFlow (multi-tenant logistics SaaS) and FlixVideo (AI-powered streaming platform), both deployed to production with CI/CD pipelines, monitoring, and multi-gateway payment integrations.",
    icon: FaBriefcase,
    technologies: ["Django", "Next.js", "Node.js", "TypeScript", "PostgreSQL", "Redis", "Docker", "Celery", "BullMQ", "Stripe", "M-Pesa", "Prometheus", "Grafana"]
  },
  {
    id: 2,
    year: "2025",
    month: "Nov",
    title: "DevOps Certification",
    subtitle: "Nairobi DevOps Community",
    type: "certification",
    description: "Completed DevOps certification covering containerization, CI/CD pipelines, cloud infrastructure, and monitoring. Applied skills immediately in production deployments of LogiFlow and FlixVideo.",
    icon: FaCertificate,
    technologies: ["Docker", "CI/CD", "GitHub Actions", "Prometheus", "Grafana", "Linux"]
  },
  {
    id: 3,
    year: "2025",
    month: "Jul",
    title: "AWS Academy Graduate — Cloud Architecting",
    subtitle: "Amazon Web Services (AWS)",
    type: "certification",
    description: "Completed AWS Academy Cloud Architecting program, covering advanced cloud architecture patterns, high availability, fault tolerance, and cost optimization across AWS services.",
    icon: FaCertificate,
    technologies: ["AWS", "EC2", "S3", "RDS", "VPC", "IAM", "CloudFormation", "Lambda"]
  },
  {
    id: 4,
    year: "2025",
    month: "Jun",
    title: "AWS Academy Graduate — Cloud Foundations",
    subtitle: "Amazon Web Services (AWS)",
    type: "certification",
    description: "Completed AWS Academy Cloud Foundations program, gaining solid understanding of AWS core services, global infrastructure, security, and the Well-Architected Framework.",
    icon: FaCertificate,
    technologies: ["AWS", "Cloud Computing", "Security", "Well-Architected Framework"]
  },
  {
    id: 5,
    year: "2025",
    month: "Mar",
    title: "Blockchain & Smart Contract Development",
    subtitle: "3-Month Intensive Program",
    type: "certification",
    description: "Completed comprehensive blockchain development program covering smart contract development, decentralized applications, and Web3 technologies. Built Vehicle Shield Insurance DApp as capstone project.",
    icon: FaCertificate,
    technologies: ["Solidity", "Next.js", "Ether.js", "Web3.js", "Hardhat", "Smart Contracts"]
  },
  {
    id: 6,
    year: "2024",
    month: "Nov",
    title: "Software Engineering Certification",
    subtitle: "Moringa School",
    type: "education",
    description: "Completed intensive software engineering bootcamp focused on full-stack web development, covering modern technologies and best practices in software development.",
    icon: FaGraduationCap,
    technologies: ["Full-Stack Development", "React", "Python", "PostgreSQL", "REST APIs"]
  },
  {
    id: 7,
    year: "2020 - 2026",
    month: "",
    title: "Service Engineer",
    subtitle: "KOKO Networks",
    type: "project",
    description: "Managed deployment and maintenance of smart energy infrastructure across Nairobi. Coordinated field operations, troubleshot hardware/software issues, and ensured reliable service delivery for thousands of customers.",
    icon: FaBriefcase,
    technologies: ["Field Operations", "IoT Devices", "Infrastructure Management", "Customer Support"]
  },
  {
    id: 8,
    year: "2022",
    month: "Aug",
    title: "Google Project Management Certificate",
    subtitle: "Coursera / Google",
    type: "certification",
    description: "Completed Google's Project Management Certificate program covering project planning, risk management, stakeholder communication, agile methodologies, and Scrum frameworks.",
    icon: FaCertificate,
    technologies: ["Project Management", "Agile", "Scrum", "Risk Management", "Stakeholder Communication"]
  },
];

export default function AboutPage() {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'project': return 'bg-blue-600';
      case 'education': return 'bg-green-600';
      case 'certification': return 'bg-purple-600';
      default: return 'bg-blue-600';
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
              <Image
                src="/images/profile/cape.jpg"
                alt="Emmanuel W. Wachira"
                width={300}
                height={300}
                className="h-full w-full object-cover rounded"
                sizes="(max-width: 768px) 100vw, 320px"
                priority
              />
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
              I am a Full-Stack and AI Engineer who builds and ships production systems end to end. With a
              background in field operations at KOKO Networks and formal training from Moringa School, I bring
              both technical depth and real-world deployment experience.
            </p>
            <p className="mb-4 text-lg text-gray-600 dark:text-gray-300">
              I recently shipped two full-scale platforms: <strong>LogiFlow</strong> — a multi-tenant logistics SaaS
              built with Django and Next.js — and <strong>FlixVideo</strong> — an AI-powered streaming and movie
              discovery platform built with Node.js and Next.js. Both are in production with CI/CD pipelines,
              Prometheus + Grafana monitoring, and multi-gateway payment integrations (Stripe, M-Pesa, crypto).
              Most recently I built <strong>The Pour Is Right</strong>, an LLM application that prices wine with a
              fine-tuned open-source model, RAG and an ensemble, with LangGraph agents that hunt for real deals.
            </p>
            <p className="mb-6 text-lg text-gray-600 dark:text-gray-300">
              I completed Ed Donner&apos;s AI Engineer Core Track, and hold AWS Cloud Architecting and Cloud
              Foundations certifications, a Google Project Management Certificate, and a DevOps certification
              from the Nairobi DevOps Community. I am open to full-stack, DevOps and AI engineering roles.
            </p>
            <Button href="/resume.pdf" variant="primary" icon={<FaDownload />} external>
              Download Resume
            </Button>
          </motion.div>
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <h2 className="mb-8 text-center text-3xl font-bold">Experience & Education</h2>
          <p className="mb-12 text-center text-gray-600 dark:text-gray-300">
            My journey through projects, certifications, and professional experience
          </p>

          <div className="relative mx-auto max-w-4xl">
            <div className="absolute left-8 top-0 h-full w-px bg-gray-200 dark:bg-gray-700 md:left-1/2 md:-ml-px"></div>

            <div className="space-y-12">
              {timelineData.map((item, index) => (
                <div key={item.id} className="relative md:flex md:items-start md:justify-between">
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
                      <span className={`rounded-full px-2 py-1 text-xs ${
                        item.type === 'project' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100' :
                        item.type === 'education' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' :
                        'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100'
                      }`}>
                        {item.type}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <p className="text-blue-600 dark:text-blue-400 font-medium">{item.subtitle}</p>
                  </motion.div>

                  <div className={`absolute left-8 top-2 z-10 flex h-12 w-12 -translate-x-6 items-center justify-center rounded-full text-white md:left-1/2 md:-translate-x-6 ${getTypeColor(item.type)}`}>
                    <item.icon className="h-5 w-5" />
                  </div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`md:w-5/12 ${index % 2 === 0 ? 'md:pl-8' : 'md:pr-8 md:text-right'}`}
                  >
                    <p className="mb-4 text-gray-600 dark:text-gray-300">{item.description}</p>
                    {item.technologies && (
                      <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? '' : 'md:justify-end'}`}>
                        {item.technologies.map((tech, techIndex) => (
                          <span key={techIndex} className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-300">
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

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-4 text-xl font-bold">Frontend</h3>
              <ul className="space-y-2">
                {['React / Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'React Native'].map(skill => (
                  <li key={skill} className="flex items-center">
                    <div className="mr-2 h-2 w-2 rounded-full bg-blue-600"></div>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-4 text-xl font-bold">Backend</h3>
              <ul className="space-y-2">
                {['Django REST Framework', 'Node.js / Express', 'Python', 'PostgreSQL', 'MongoDB', 'Redis / BullMQ', 'Celery'].map(skill => (
                  <li key={skill} className="flex items-center">
                    <div className="mr-2 h-2 w-2 rounded-full bg-blue-600"></div>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-4 text-xl font-bold">DevOps & Cloud</h3>
              <ul className="space-y-2">
                {['Docker', 'GitHub Actions', 'AWS (Certified)', 'Prometheus / Grafana', 'Kubernetes', 'Terraform', 'Linux / Bash'].map(skill => (
                  <li key={skill} className="flex items-center">
                    <div className="mr-2 h-2 w-2 rounded-full bg-blue-600"></div>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
              <h3 className="mb-4 text-xl font-bold">Payments & Other</h3>
              <ul className="space-y-2">
                {['Stripe', 'M-Pesa (Daraja API)', 'NOWPayments (Crypto)', 'Solidity / Web3.js', 'Cloudinary / AWS S3', 'Sentry', 'Git / GitHub'].map(skill => (
                  <li key={skill} className="flex items-center">
                    <div className="mr-2 h-2 w-2 rounded-full bg-blue-600"></div>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}