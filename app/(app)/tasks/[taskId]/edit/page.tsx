import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import DeleteTaskButton from '@/components/DeleteTaskButton';
import PageHeader from '@/components/PageHeader';
import TaskForm from '@/components/TaskForm';
import { getCurrentUserId } from '@/lib/auth';
import { getTask } from '@/lib/tasks/store';

export const metadata: Metadata = {
  title: 'Edit task',
};

export default async function EditTaskPage({ params }: PageProps<'/tasks/[taskId]/edit'>) {
  const { taskId } = await params;
  const userId = await getCurrentUserId();

  const task = await getTask(userId, taskId);
  if (!task) notFound();

  return (
    <div className="max-w-2xl">
      <PageHeader title="Edit task" description="Update the details or deadline for this task." />
      <TaskForm
        taskId={task._id}
        initialValues={{ title: task.title, details: task.details, dueDate: task.dueDate }}
      />

      <section
        aria-labelledby="danger-heading"
        className="mt-8 rounded-lg border border-red-200 bg-white p-5"
      >
        <h2 id="danger-heading" className="text-lg font-semibold text-gray-900">
          Delete this task
        </h2>
        <p className="mb-4 mt-1 text-sm text-gray-600">
          Deleting removes the task permanently. This cannot be undone.
        </p>
        <DeleteTaskButton taskId={task._id} title={task.title} />
      </section>
    </div>
  );
}
