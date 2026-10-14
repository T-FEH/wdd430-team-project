import type { Metadata } from 'next';
import Link from 'next/link';
import { buttonStyles, cardStyles } from '@/lib/ui';

export const metadata: Metadata = {
  title: 'Create an account',
};

export default function SignUpPage() {
  return (
    <section className={cardStyles}>
      <h1 className="text-2xl font-bold text-gray-900">Create an account</h1>
      <p className="mt-2 text-gray-600">
        Account creation is coming soon. Until then you can explore TaskTrack with a demo account.
      </p>
      <Link href="/dashboard" className={`${buttonStyles.primary} mt-6`}>
        Continue to the dashboard
      </Link>
    </section>
  );
}
