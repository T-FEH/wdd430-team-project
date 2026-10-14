'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, type ChangeEvent, type FormEvent } from 'react';
import type { TaskInput } from '@/lib/tasks/types';
import {
  DETAILS_MAX_LENGTH,
  TITLE_MAX_LENGTH,
  validateTaskInput,
  type FieldErrors,
} from '@/lib/tasks/validation';
import { buttonStyles, cardStyles } from '@/lib/ui';

interface TaskFormProps {
  /** When set, the form edits this task. Otherwise it creates a new one. */
  taskId?: string;
  initialValues?: TaskInput;
}

interface FormValues {
  title: string;
  details: string;
  dueDate: string;
}

const FIX_FIELDS_MESSAGE = 'Please fix the highlighted fields.';

function inputClassName(hasError: boolean) {
  return `mt-1 block w-full rounded-md border bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
    hasError ? 'border-red-700' : 'border-gray-300'
  }`;
}

/** Turns an API error response into field errors the form can display. */
function errorsFromResponse(data: unknown, status: number): FieldErrors {
  if (status === 404) return { form: 'This task no longer exists.' };

  if (typeof data === 'object' && data !== null) {
    const { error, fieldErrors } = data as { error?: unknown; fieldErrors?: unknown };
    const form = typeof error === 'string' ? error : FIX_FIELDS_MESSAGE;
    if (typeof fieldErrors === 'object' && fieldErrors !== null) {
      return { ...(fieldErrors as FieldErrors), form };
    }
    return { form };
  }

  return { form: 'Something went wrong. Please try again.' };
}

export default function TaskForm({ taskId, initialValues }: TaskFormProps) {
  const router = useRouter();
  const isEditing = taskId !== undefined;

  const [values, setValues] = useState<FormValues>({
    title: initialValues?.title ?? '',
    details: initialValues?.details ?? '',
    dueDate: initialValues?.dueDate ?? '',
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Same rules the API enforces, checked first so most mistakes never leave the browser.
    const result = validateTaskInput(values);
    if (!result.ok) {
      setErrors({ ...result.errors, form: result.errors.form ?? FIX_FIELDS_MESSAGE });
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch(
        isEditing ? `/api/tasks/${encodeURIComponent(taskId)}` : '/api/tasks',
        {
          method: isEditing ? 'PATCH' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(result.value),
        },
      );

      if (!response.ok) {
        const data: unknown = await response.json().catch(() => null);
        setErrors(errorsFromResponse(data, response.status));
        setIsSubmitting(false);
        return;
      }

      router.push('/tasks');
      router.refresh();
    } catch {
      setErrors({ form: 'Could not reach the server. Check your connection and try again.' });
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={`${cardStyles} space-y-5`}>
      {errors.form && (
        <p role="alert" className="rounded-md bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {errors.form}
        </p>
      )}

      <div>
        <label htmlFor="task-title" className="block text-sm font-semibold text-gray-900">
          Title <span className="text-red-700">(required)</span>
        </label>
        <input
          id="task-title"
          name="title"
          type="text"
          required
          maxLength={TITLE_MAX_LENGTH}
          value={values.title}
          onChange={handleChange}
          aria-invalid={errors.title ? true : undefined}
          aria-describedby={errors.title ? 'task-title-error' : undefined}
          className={inputClassName(Boolean(errors.title))}
        />
        {errors.title && (
          <p id="task-title-error" className="mt-1 text-sm text-red-700">
            {errors.title}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="task-details" className="block text-sm font-semibold text-gray-900">
          Details <span className="font-normal text-gray-600">(optional)</span>
        </label>
        <textarea
          id="task-details"
          name="details"
          rows={4}
          maxLength={DETAILS_MAX_LENGTH}
          value={values.details}
          onChange={handleChange}
          aria-invalid={errors.details ? true : undefined}
          aria-describedby={errors.details ? 'task-details-error' : undefined}
          className={inputClassName(Boolean(errors.details))}
        />
        {errors.details && (
          <p id="task-details-error" className="mt-1 text-sm text-red-700">
            {errors.details}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="task-due-date" className="block text-sm font-semibold text-gray-900">
          Due date <span className="font-normal text-gray-600">(optional)</span>
        </label>
        <input
          id="task-due-date"
          name="dueDate"
          type="date"
          value={values.dueDate}
          onChange={handleChange}
          aria-invalid={errors.dueDate ? true : undefined}
          aria-describedby={errors.dueDate ? 'task-due-date-error' : undefined}
          className={`${inputClassName(Boolean(errors.dueDate))} sm:max-w-xs`}
        />
        {errors.dueDate && (
          <p id="task-due-date-error" className="mt-1 text-sm text-red-700">
            {errors.dueDate}
          </p>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        <button type="submit" disabled={isSubmitting} className={buttonStyles.primary}>
          {isSubmitting ? 'Saving...' : isEditing ? 'Save changes' : 'Create task'}
        </button>
        <Link href="/tasks" className={buttonStyles.secondary}>
          Cancel
        </Link>
      </div>
    </form>
  );
}
