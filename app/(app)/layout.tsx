import type { Metadata } from 'next';
import type { ReactNode } from 'react';

// Everything in this group is personal to the signed-in user, so keep it out of search results.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AppLayout({ children }: { children: ReactNode }) {
  return <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">{children}</div>;
}
