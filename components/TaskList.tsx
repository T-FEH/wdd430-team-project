import type { ReactNode } from 'react';
import TaskCard from '@/components/TaskCard';
import type { Task } from '@/lib/tasks/types';

interface TaskListProps {
  tasks: Task[];
  today: string;
  /** Shown instead of the list when there are no tasks. */
  emptyState: ReactNode;
  highlightId?: string | null;
}

export default function TaskList({ tasks, today, emptyState, highlightId = null }: TaskListProps) {
  if (tasks.length === 0) return <>{emptyState}</>;

  return (
    <ul className="grid gap-4">
      {tasks.map((task) => (
        <li key={task._id}>
          <TaskCard task={task} today={today} highlight={task._id === highlightId} />
        </li>
      ))}
    </ul>
  );
}
