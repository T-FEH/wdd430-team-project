import Link from 'next/link';
import NavLinks from '@/components/NavLinks';
import { buttonStyles, focusRing } from '@/lib/ui';

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-4 sm:px-6">
        <Link href="/" className={`rounded text-xl font-bold text-gray-900 ${focusRing}`}>
          Task<span className="text-blue-600">Track</span>
        </Link>

        <NavLinks />

        <Link href="/tasks/new" className={buttonStyles.primary}>
          New task
        </Link>
      </div>
    </header>
  );
}
