import { formatDueDate, getDueState, type DueState } from '@/lib/tasks/dates';
import type { TaskStatus } from '@/lib/tasks/types';

interface DueDateBadgeProps {
  dueDate: string | null;
  status: TaskStatus;
  today: string;
}

const stateStyles: Record<DueState, string> = {
  overdue: 'bg-red-50 text-red-700',
  today: 'bg-amber-50 text-amber-800',
  soon: 'bg-amber-50 text-amber-800',
  upcoming: 'bg-gray-100 text-gray-700',
};

export default function DueDateBadge({ dueDate, status, today }: DueDateBadgeProps) {
  if (!dueDate) {
    return <span className="text-sm text-gray-600">No due date</span>;
  }

  const formatted = formatDueDate(dueDate);

  // Completed work is never overdue, so it gets a neutral label.
  if (status === 'completed') {
    return (
      <span className="text-sm text-gray-600">
        Due <time dateTime={dueDate}>{formatted}</time>
      </span>
    );
  }

  const state = getDueState(dueDate, today);
  const label = state === 'overdue' ? 'Overdue' : state === 'today' ? 'Due today' : 'Due';

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${stateStyles[state]}`}
    >
      {label}
      {state !== 'today' && (
        <>
          {' '}
          <time dateTime={dueDate}>{formatted}</time>
        </>
      )}
    </span>
  );
}
