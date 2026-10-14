import Link from 'next/link';
import DueDateBadge from '@/components/DueDateBadge';
import TaskStatusToggle from '@/components/TaskStatusToggle';
import type { Task } from '@/lib/tasks/types';
import { buttonStyles, cardStyles } from '@/lib/ui';

interface TaskCardProps {
  task: Task;
  /** Today's date as YYYY-MM-DD, used to flag overdue and due-soon tasks. */
  today: string;
  /** Marks the task with the closest upcoming deadline. */
  highlight?: boolean;
}

export default function TaskCard({ task, today, highlight = false }: TaskCardProps) {
  const titleId = `task-${task._id}-title`;

  return (
    <article
      aria-labelledby={titleId}
      className={`${cardStyles} flex flex-col gap-3 ${highlight ? 'ring-2 ring-blue-600' : ''}`}
    >
      {highlight && (
        <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">Next deadline</p>
      )}

      <div className="flex flex-wrap items-start justify-between gap-2">
        <h3 id={titleId} className="min-w-0 break-words text-lg font-semibold text-gray-900">
          {task.title}
        </h3>
        {task.status === 'completed' && (
          <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
            Completed
          </span>
        )}
      </div>

      {task.details && (
        <p className="whitespace-pre-line break-words text-gray-600">{task.details}</p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <DueDateBadge dueDate={task.dueDate} status={task.status} today={today} />

        <div className="flex flex-wrap items-start gap-2">
          <Link
            href={`/tasks/${task._id}/edit`}
            aria-label={`Edit ${task.title}`}
            className={buttonStyles.secondary}
          >
            Edit
          </Link>
          <TaskStatusToggle taskId={task._id} title={task.title} status={task.status} />
        </div>
      </div>
    </article>
  );
}
