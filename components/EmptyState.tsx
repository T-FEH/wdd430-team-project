import Link from 'next/link';
import { buttonStyles } from '@/lib/ui';

interface EmptyStateProps {
  title: string;
  message: string;
  action?: { href: string; label: string };
}

export default function EmptyState({ title, message, action }: EmptyStateProps) {
  return (
    <div className="rounded-lg border border-dashed border-gray-300 bg-white px-6 py-10 text-center">
      <p className="text-lg font-semibold text-gray-900">{title}</p>
      <p className="mt-2 text-gray-600">{message}</p>
      {action && (
        <Link href={action.href} className={`${buttonStyles.primary} mt-5`}>
          {action.label}
        </Link>
      )}
    </div>
  );
}
