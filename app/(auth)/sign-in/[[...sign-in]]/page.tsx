import { SignIn } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Sign in',
  description: 'Sign in to TaskTrack to see your tasks, deadlines, and progress.',
  path: '/sign-in',
});

export default function SignInPage() {
  // Clerk renders the heading (an h1) inside the card, set via localization in app/layout.tsx.
  return <SignIn />;
}
