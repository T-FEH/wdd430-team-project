import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import TaskForm from '@/components/TaskForm';

export const metadata: Metadata = {
  title: 'New task',
};

export default function NewTaskPage() {
  return (
    <div className="max-w-2xl">
      <PageHeader title="New task" description="Add something you need to get done." />
      <TaskForm />
    </div>
  );
}
