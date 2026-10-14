import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import ManageAccountButton from '@/components/ManageAccountButton';
import PageHeader from '@/components/PageHeader';
import { getCurrentUser } from '@/lib/auth';
import { pageMetadata } from '@/lib/metadata';
import { cardStyles } from '@/lib/ui';

export const metadata: Metadata = pageMetadata({
  title: 'Profile',
  description: 'View and update your TaskTrack account details.',
  path: '/profile',
});

export default async function ProfilePage() {
  const user = await getCurrentUser();
  if (!user) redirect('/sign-in');

  return (
    <div className="max-w-2xl">
      <PageHeader title="Profile" description="Your account details and settings." />

      <section aria-labelledby="account-heading" className={cardStyles}>
        <h2 id="account-heading" className="text-lg font-semibold text-gray-900">
          Account
        </h2>
        <dl className="mt-4 grid gap-4 sm:grid-cols-[10rem_1fr]">
          <dt className="text-sm font-medium text-gray-600">Display name</dt>
          <dd className="text-gray-900">{user.displayName}</dd>
          <dt className="text-sm font-medium text-gray-600">Email</dt>
          <dd className="break-all text-gray-900">{user.email ?? 'No email on file'}</dd>
        </dl>
        <p className="mb-4 mt-6 text-sm text-gray-600">
          Update your name, email address, or password, and review where you are signed in.
        </p>
        <ManageAccountButton />
      </section>
    </div>
  );
}
