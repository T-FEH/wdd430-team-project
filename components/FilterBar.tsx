import Link from 'next/link';
import { TASK_FILTERS, type TaskCounts, type TaskFilter } from '@/lib/tasks/types';
import { focusRing } from '@/lib/ui';

interface FilterBarProps {
  current: TaskFilter;
  counts: TaskCounts;
}

const labels: Record<TaskFilter, string> = {
  all: 'All',
  active: 'Active',
  completed: 'Completed',
};

/**
 * Filters are plain links to /tasks?status=..., so the selected filter lives
 * in the URL, can be bookmarked, and works before any JavaScript loads.
 */
export default function FilterBar({ current, counts }: FilterBarProps) {
  return (
    <nav aria-label="Filter tasks by status" className="mb-6">
      <ul className="flex flex-wrap gap-2">
        {TASK_FILTERS.map((filter) => {
          const isActive = filter === current;

          return (
            <li key={filter}>
              <Link
                href={`/tasks?status=${filter}`}
                aria-current={isActive ? 'page' : undefined}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium ${focusRing} ${
                  isActive
                    ? 'border-blue-600 bg-blue-600 text-white'
                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {labels[filter]}
                <span className="font-mono text-xs">{counts[filter]}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
