import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import TaskForm from '@/components/TaskForm';
import { pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = pageMetadata({
  title: 'New task',
  description: 'Add a new schoolwork task with optional details and a due date.',
  path: '/tasks/new',
});

export default function NewTaskPage() {
  return (
    <div className="max-w-2xl">
      <PageHeader title="New task" description="Add something you need to get done." />
      <TaskForm />
    </div>
  );
}
