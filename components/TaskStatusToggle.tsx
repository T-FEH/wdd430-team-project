'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import type { TaskStatus } from '@/lib/tasks/types';
import { buttonStyles } from '@/lib/ui';

interface TaskStatusToggleProps {
  taskId: string;
  title: string;
  status: TaskStatus;
}

export default function TaskStatusToggle({ taskId, title, status }: TaskStatusToggleProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [isRefreshing, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const isCompleted = status === 'completed';
  const nextStatus: TaskStatus = isCompleted ? 'active' : 'completed';
  const label = isCompleted ? 'Reopen' : 'Mark complete';
  const isBusy = isSaving || isRefreshing;

  async function handleClick() {
    setIsSaving(true);
    setError(null);

    try {
      const response = await fetch(`/api/tasks/${encodeURIComponent(taskId)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
      });
      if (!response.ok) throw new Error(`Status update failed with ${response.status}`);

      // Re-render the server components so counts and lists pick up the change.
      startTransition(() => router.refresh());
    } catch {
      setError('Could not update this task. Please try again.');
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        disabled={isBusy}
        aria-label={`${label}: ${title}`}
        className={isCompleted ? buttonStyles.secondary : buttonStyles.primary}
      >
        {isBusy ? 'Saving...' : label}
      </button>
      {error && (
        <p role="alert" className="mt-2 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
