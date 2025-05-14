"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import AnimatedSection from '@/components/ui/animated-section';
import Button from '@/components/ui/button';
import { FaArrowLeft, FaCalendarAlt, FaClock, FaTag } from 'react-icons/fa';
import { formatDate } from '@/lib/utils';
import ReadingProgress from '@/components/ui/reading-progress';
import PageTransition from '@/components/ui/page-transition';

// Mock blog posts data
const blogPostsData = [
  {
    id: 'getting-started-with-next-js',
    title: 'Getting Started with Next.js: A Beginner\'s Guide',
    excerpt: 'Learn how to set up your first Next.js project and understand the core concepts of this powerful React framework.',
    date: '2023-05-15',
    category: 'development',
    readTime: 8,
    author: 'Your Name',
    tags: ['Next.js', 'React', 'Web Development'],
    image: '/placeholder.svg',
    content: `
      ## Introduction

      Next.js is a popular React framework that enables functionality such as server-side rendering, static site generation, and more. It simplifies the development of React applications by providing a structured and opinionated approach.

      In this guide, we'll walk through setting up a new Next.js project and explore the key features that make Next.js a powerful choice for modern web development.

      ## Prerequisites

      Before we begin, make sure you have the following installed:

      - Node.js (version 12 or later)
      - npm or yarn

      ## Creating a New Next.js Project

      The easiest way to get started with Next.js is to use the create-next-app command. Open your terminal and run:

      \`\`\`bash
      npx create-next-app@latest my-next-app
      # or
      yarn create next-app my-next-app
      \`\`\`

      This command creates a new Next.js project with a default template. You'll be prompted to choose between using TypeScript, ESLint, and other configuration options.

      ## Key Features of Next.js

      ### 1. File-based Routing

      Next.js uses a file-based routing system. Files in the \`pages\` directory automatically become routes.

      ### 2. Server-side Rendering

      Next.js allows for both static site generation (SSG) and server-side rendering (SSR).

      ### 3. Static Site Generation

      For SSG, use the \`getStaticProps\` and \`getStaticPaths\` functions.

      ### 4. API Routes

      Next.js allows you to create API endpoints as part of your application.

      ## Conclusion

      Next.js provides a robust framework for building React applications with features like server-side rendering, static site generation, and file-based routing.
    `,
  },
  {
    id: 'why-typescript-is-worth-learning',
    title: 'Why TypeScript is Worth Learning in 2023',
    excerpt: 'Discover the benefits of TypeScript and how it can improve your development workflow and code quality.',
    date: '2023-04-22',
    category: 'development',
    readTime: 6,
    author: 'Your Name',
    tags: ['TypeScript', 'JavaScript', 'Programming'],
    image: '/placeholder.svg',
    content: `
      ## Introduction

      TypeScript has been steadily growing in popularity since its introduction by Microsoft in 2012. As a superset of JavaScript, it adds static typing and other features that make code more predictable and easier to maintain.

      ## What is TypeScript?

      TypeScript is a strongly typed programming language that builds on JavaScript. It adds optional static typing and other features that help catch errors early and make your code more robust.

      ## Benefits of TypeScript

      ### 1. Better Developer Experience
      
      TypeScript provides excellent tooling support.

      ### 2. Catch Errors Early
      
      One of the biggest advantages of TypeScript is catching errors at compile time rather than runtime.

      ### 3. Better Documentation
      
      Types serve as documentation that is always in sync with your code.

      ## Conclusion

      TypeScript continues to gain popularity for good reasons. It improves developer experience, reduces bugs, enhances collaboration, and integrates well with the modern JavaScript ecosystem.
    `,
  },
];

export default function BlogPostPage() {
  const params = useParams();
  const [post, setPost] = useState<typeof blogPostsData[0] | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // In a real application, you would fetch this data from an API
    // based on the slug parameter
    const slug = params.slug as string;
    const foundPost = blogPostsData.find(p => p.id === slug);
    
    if (foundPost) {
      setPost(foundPost);
    }
    
    setLoading(false);
  }, [params]);

  // Function to convert markdown to HTML (basic implementation)
  const renderMarkdown = (markdown: string) => {
    // Split by line breaks
    return markdown.split('\n').map((line, index) => {
      // Headings
      if (line.startsWith('## ')) {
        return <h2 key={index} className="mb-4 mt-8 text-2xl font-bold">{line.replace('## ', '')}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={index} className="mb-4 mt-6 text-xl font-bold">{line.replace('### ', '')}</h3>;
      }
      
      // Code blocks
      if (line.startsWith('```') && line.endsWith('```')) {
        return (
          <pre key={index} className="my-4 overflow-x-auto rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
            <code>{line.replace(/```/g, '')}</code>
          </pre>
        );
      }
      
      if (line.startsWith('```')) {
        // Start of code block - language is the rest of the line
        return null; // Skip this line, handled by a later check
      }
      
      if (line.endsWith('```')) {
        // End of code block
        return null; // Skip this line, handled by a later check
      }
      
      // Lists
      if (line.startsWith('- ')) {
        return <li key={index} className="ml-6">{line.replace('- ', '')}</li>;
      }
      
      // Regular paragraph (skip empty lines)
      if (line.trim() === '') {
        return null;
      }
      
      return <p key={index} className="mb-4">{line}</p>;
    });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-24">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center pt-24 text-center">
        <h1 className="mb-4 text-2xl font-bold">Blog Post Not Found</h1>
        <p className="mb-8 text-gray-600 dark:text-gray-300">
          The blog post you're looking for doesn't exist or has been removed.
        </p>
        <Link href="/blog">
          <Button icon={<FaArrowLeft />}>Back to Blog</Button>
        </Link>
      </div>
    );
  }

  return (
    <PageTransition>
      {/* Reading Progress Bar */}
      <ReadingProgress />
      
      <div className="pt-24">
        <div className="container mx-auto px-4 py-12">
          {/* Back Button */}
          <div className="mb-8">
            <Link href="/blog">
              <Button variant="outline" icon={<FaArrowLeft />}>
                Back to Blog
              </Button>
            </Link>
          </div>
          
          {/* Post Header */}
          <AnimatedSection className="mb-8">
            <h1 className="mb-4 text-3xl font-bold md:text-4xl">{post.title}</h1>
            
            <div className="mb-6 flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400">
              <div className="flex items-center">
                <FaCalendarAlt className="mr-2" />
                <span>{formatDate(post.date)}</span>
              </div>
              <div className="flex items-center">
                <FaClock className="mr-2" />
                <span>{post.readTime} min read</span>
              </div>
              <div>
                <span className="rounded-full bg-blue-100 px-3 py-1 text-sm capitalize text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                  {post.category}
                </span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                  <FaTag className="mr-1 h-3 w-3" />
                  {tag}
                </span>
              ))}
            </div>
          </AnimatedSection>
          
          {/* Featured Image */}
          <AnimatedSection className="mb-8 overflow-hidden rounded-lg shadow-md" delay={0.1}>
            <div className="aspect-video w-full bg-gray-200 dark:bg-gray-700">
              {/* Post featured image would go here */}
            </div>
          </AnimatedSection>
          
          {/* Post Content */}
          <AnimatedSection 
            className="prose mx-auto max-w-3xl dark:prose-invert lg:prose-lg" 
            delay={0.2}
          >
            <div className="text-gray-800 dark:text-gray-200">
              {renderMarkdown(post.content)}
            </div>
          </AnimatedSection>
          
          {/* Author Bio */}
          <AnimatedSection className="mx-auto mt-12 max-w-3xl rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800" delay={0.3}>
            <div className="flex items-center">
              <div className="mr-4 h-16 w-16 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                {/* Author avatar would go here */}
              </div>
              <div>
                <h3 className="text-lg font-bold">About the Author</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {post.author} is a web developer and technical writer with expertise in modern JavaScript frameworks and libraries.
                </p>
              </div>
            </div>
          </AnimatedSection>
          
          {/* Next/Previous Posts */}
          <AnimatedSection className="mx-auto mt-12 max-w-3xl" delay={0.4}>
            <h3 className="mb-6 text-2xl font-bold">Continue Reading</h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {blogPostsData
                .filter(p => p.id !== post.id)
                .slice(0, 2)
                .map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    href={`/blog/${relatedPost.id}`}
                    className="group overflow-hidden rounded-lg border border-gray-200 bg-white transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
                  >
                    <div className="h-40 bg-gray-200 dark:bg-gray-700">
                      {/* Post image placeholder */}
                    </div>
                    <div className="p-4">
                      <h3 className="mb-2 text-lg font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {relatedPost.excerpt.length > 100
                          ? `${relatedPost.excerpt.slice(0, 100)}...`
                          : relatedPost.excerpt}
                      </p>
                    </div>
                  </Link>
                ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </PageTransition>
  );
}