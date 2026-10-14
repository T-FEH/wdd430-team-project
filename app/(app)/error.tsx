'use client';

import { useEffect } from 'react';
import { buttonStyles } from '@/lib/ui';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div role="alert" className="rounded-lg border border-red-200 bg-red-50 px-6 py-10 text-center">
      <h1 className="text-xl font-semibold text-red-700">Something went wrong</h1>
      <p className="mt-2 text-gray-700">We could not load this page. Please try again.</p>
      <button type="button" onClick={reset} className={`${buttonStyles.primary} mt-5`}>
        Try again
      </button>
    </div>
  );
}
