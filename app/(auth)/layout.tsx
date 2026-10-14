import type { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <div className="flex w-full justify-center px-4 py-12 sm:px-6">{children}</div>;
}
