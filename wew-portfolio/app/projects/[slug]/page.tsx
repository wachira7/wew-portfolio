//app/projects/[slug]/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'motion/react';
import Button from '@/components/ui/button';
import AnimatedSection from '@/components/ui/animated-section';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';
import { projects as projectsData, getProject, categoryLabels, type Project } from '@/content/projects';

export default function ProjectPage() {
  const params = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const slug = params.slug as string;
    const foundProject = getProject(slug);
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
                  {categoryLabels[project.category]}
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