import { SignUp } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Create an account',
  description: 'Create a free TaskTrack account to keep all of your schoolwork in one place.',
  path: '/sign-up',
});

export default function SignUpPage() {
  // Clerk renders the heading (an h1) inside the card, set via localization in app/layout.tsx.
  return <SignUp />;
}
