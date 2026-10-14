import { Show, UserButton } from '@clerk/nextjs';
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

        <Show
          when="signed-in"
          fallback={
            <div className="flex flex-wrap gap-2">
              <Link href="/sign-in" className={buttonStyles.secondary}>
                Sign in
              </Link>
              <Link href="/sign-up" className={buttonStyles.primary}>
                Get started
              </Link>
            </div>
          }
        >
          <NavLinks />
          <div className="flex items-center gap-3">
            <Link href="/tasks/new" className={buttonStyles.primary}>
              New task
            </Link>
            <UserButton />
          </div>
        </Show>
      </div>
    </header>
  );
}
