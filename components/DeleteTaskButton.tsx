'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { buttonStyles } from '@/lib/ui';

interface DeleteTaskButtonProps {
  taskId: string;
  title: string;
}

export default function DeleteTaskButton({ taskId, title }: DeleteTaskButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;

    setIsDeleting(true);
    setError(null);

    try {
      const response = await fetch(`/api/tasks/${encodeURIComponent(taskId)}`, {
        method: 'DELETE',
      });
      // A 404 means the task is already gone, which is the outcome the user wanted.
      if (!response.ok && response.status !== 404) {
        throw new Error(`Delete failed with ${response.status}`);
      }

      router.push('/tasks');
      router.refresh();
    } catch {
      setError('Could not delete this task. Please try again.');
      setIsDeleting(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        disabled={isDeleting}
        className={buttonStyles.danger}
      >
        {isDeleting ? 'Deleting...' : 'Delete task'}
      </button>
      {error && (
        <p role="alert" className="mt-2 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
