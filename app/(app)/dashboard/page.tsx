import type { Metadata } from 'next';
import Link from 'next/link';
import EmptyState from '@/components/EmptyState';
import PageHeader from '@/components/PageHeader';
import StatCard from '@/components/StatCard';
import TaskList from '@/components/TaskList';
import { requireUserId } from '@/lib/auth';
import { pageMetadata } from '@/lib/metadata';
import { toDateKey } from '@/lib/tasks/dates';
import { listTasks } from '@/lib/tasks/store';
import { linkStyles } from '@/lib/ui';

export const metadata: Metadata = pageMetadata({
  title: 'Dashboard',
  description: 'See your upcoming deadlines, overdue work, and recently completed tasks.',
  path: '/dashboard',
});

const RECENTLY_COMPLETED_LIMIT = 5;

export default async function DashboardPage() {
  const userId = await requireUserId();
  const [activeTasks, completedTasks] = await Promise.all([
    listTasks(userId, 'active'),
    listTasks(userId, 'completed'),
  ]);

  const today = toDateKey(new Date());
  const overdueCount = activeTasks.filter((task) => task.dueDate && task.dueDate < today).length;

  // Active tasks are already ordered by due date, so the first one due today or
  // later is the closest upcoming deadline.
  const nextDeadline = activeTasks.find((task) => task.dueDate !== null && task.dueDate >= today);

  const recentlyCompleted = [...completedTasks]
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .slice(0, RECENTLY_COMPLETED_LIMIT);

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="What is coming up and what you have already finished."
      />

      <section aria-labelledby="summary-heading" className="mb-10">
        <h2 id="summary-heading" className="sr-only">
          Summary
        </h2>
        <dl className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatCard label="Active" value={activeTasks.length} />
          <StatCard label="Completed" value={completedTasks.length} tone="success" />
          <StatCard
            label="Overdue"
            value={overdueCount}
            tone={overdueCount > 0 ? 'warning' : 'default'}
          />
          <StatCard label="Total" value={activeTasks.length + completedTasks.length} />
        </dl>
      </section>

      <div className="grid gap-10 lg:grid-cols-[3fr_2fr]">
        <section aria-labelledby="upcoming-heading">
          <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
            <h2 id="upcoming-heading" className="text-xl font-semibold text-gray-900">
              Upcoming
            </h2>
            <Link href="/tasks?status=active" className={`text-sm ${linkStyles}`}>
              View all active tasks
            </Link>
          </div>
          <TaskList
            tasks={activeTasks}
            today={today}
            highlightId={nextDeadline?._id}
            emptyState={
              <EmptyState
                title="Nothing due"
                message="You have no active tasks. Add one to start tracking your schoolwork."
                action={{ href: '/tasks/new', label: 'Add a task' }}
              />
            }
          />
        </section>

        <section aria-labelledby="completed-heading">
          <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
            <h2 id="completed-heading" className="text-xl font-semibold text-gray-900">
              Recently completed
            </h2>
            <Link href="/tasks?status=completed" className={`text-sm ${linkStyles}`}>
              View all completed
            </Link>
          </div>
          <TaskList
            tasks={recentlyCompleted}
            today={today}
            emptyState={
              <EmptyState
                title="No completed tasks yet"
                message="Tasks you mark complete will show up here."
              />
            }
          />
        </section>
      </div>
    </>
  );
}
