import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import { getCurrentUser } from '@/lib/auth';
import { cardStyles } from '@/lib/ui';

export const metadata: Metadata = {
  title: 'Profile',
};

export default async function ProfilePage() {
  const user = await getCurrentUser();

  return (
    <div className="max-w-2xl">
      <PageHeader title="Profile" description="Your basic account information." />

      <section aria-labelledby="account-heading" className={cardStyles}>
        <h2 id="account-heading" className="text-lg font-semibold text-gray-900">
          Account
        </h2>
        <dl className="mt-4 grid gap-4 sm:grid-cols-[10rem_1fr]">
          <dt className="text-sm font-medium text-gray-600">Display name</dt>
          <dd className="text-gray-900">{user.displayName}</dd>
          <dt className="text-sm font-medium text-gray-600">Email</dt>
          <dd className="break-all text-gray-900">{user.email}</dd>
        </dl>
        <p className="mt-6 rounded-md bg-gray-100 px-4 py-3 text-sm text-gray-700">
          You are using a demo account. Editing your profile will be available once account sign-in
          is added.
        </p>
      </section>
    </div>
  );
}
