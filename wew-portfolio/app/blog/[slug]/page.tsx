import { redirect } from 'next/navigation';

// No posts yet; send any post URL to the writing page.
export default function BlogPostPage() {
  redirect('/blog');
}
