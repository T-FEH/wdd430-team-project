import type { Metadata } from 'next';
import EmptyState from '@/components/EmptyState';

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'The page you are looking for does not exist.',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6">
      <h1 className="sr-only">Page not found</h1>
      <EmptyState
        title="We could not find that page"
        message="The task may have been deleted, or the link may be out of date."
        action={{ href: '/tasks', label: 'Back to your tasks' }}
      />
    </div>
  );
}
