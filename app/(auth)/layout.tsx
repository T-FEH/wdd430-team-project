import type { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <div className="mx-auto w-full max-w-md px-4 py-16 sm:px-6">{children}</div>;
}
