import type { Metadata } from 'next';
import StatusPage from '@/components/ui/status-page';

export const metadata: Metadata = {
  title: 'Writing | Emmanuel W. Wachira',
  robots: { index: false },
};

// Not linked from the navigation until there are real posts.
export default function BlogPage() {
  return (
    <StatusPage
      code="ls ./writing  # 0 posts, drafts in progress"
      title={
        <>
          Writing is coming soon<span className="text-accent">.</span>
        </>
      }
    >
      I&apos;m writing up what I learned building LogiFlow, FlixVideo and The Pour Is Right. Until then, the case
      studies tell the story.
    </StatusPage>
  );
}
