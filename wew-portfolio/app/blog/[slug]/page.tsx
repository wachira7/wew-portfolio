"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function BlogPostPage() {
  const router = useRouter();
  
  // Redirect to the main blog page
  useEffect(() => {
    router.push('/blog');
  }, [router]);
  
  // Show loading spinner while redirecting
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
    </div>
  );
}