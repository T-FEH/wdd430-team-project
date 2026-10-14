import type { Metadata } from 'next';
import EmptyState from '@/components/EmptyState';
import FilterBar from '@/components/FilterBar';
import PageHeader from '@/components/PageHeader';
import TaskList from '@/components/TaskList';
import { requireUserId } from '@/lib/auth';
import { pageMetadata } from '@/lib/metadata';
import { toDateKey } from '@/lib/tasks/dates';
import { getTaskCounts, listTasks } from '@/lib/tasks/store';
import { isTaskFilter, type TaskFilter } from '@/lib/tasks/types';

export const metadata: Metadata = pageMetadata({
  title: 'Tasks',
  description: 'Create, edit, complete, and filter your schoolwork tasks.',
  path: '/tasks',
});

const emptyStates: Record<TaskFilter, { title: string; message: string }> = {
  all: {
    title: 'No tasks yet',
    message: 'Add your first task to start keeping track of your schoolwork.',
  },
  active: {
    title: 'No active tasks',
    message: 'Everything is done. Add a new task when something else comes up.',
  },
  completed: {
    title: 'No completed tasks',
    message: 'Tasks you mark complete will show up here.',
  },
};

const listHeadings: Record<TaskFilter, string> = {
  all: 'All tasks',
  active: 'Active tasks',
  completed: 'Completed tasks',
};

export default async function TasksPage({ searchParams }: PageProps<'/tasks'>) {
  const { status } = await searchParams;
  // Unknown or missing values fall back to showing everything.
  const filter: TaskFilter = isTaskFilter(status) ? status : 'all';

  const userId = await requireUserId();
  const [tasks, counts] = await Promise.all([listTasks(userId, filter), getTaskCounts(userId)]);
  const today = toDateKey(new Date());

  return (
    <>
      <PageHeader title="Tasks" description="Create, edit, and complete your schoolwork tasks." />

      <FilterBar current={filter} counts={counts} />

      <section aria-labelledby="task-list-heading">
        <h2 id="task-list-heading" className="sr-only">
          {listHeadings[filter]}
        </h2>
        <TaskList
          tasks={tasks}
          today={today}
          emptyState={
            <EmptyState
              {...emptyStates[filter]}
              action={
                filter === 'completed' ? undefined : { href: '/tasks/new', label: 'Add a task' }
              }
            />
          }
        />
      </section>
    </>
  );
}
