export const TASK_STATUSES = ['active', 'completed'] as const;
export type TaskStatus = (typeof TASK_STATUSES)[number];

export const TASK_FILTERS = ['all', 'active', 'completed'] as const;
export type TaskFilter = (typeof TASK_FILTERS)[number];

export interface Task {
  _id: string;
  /** Clerk user ID of the owner. Always taken from the session, never from the client. */
  userId: string;
  title: string;
  details: string;
  /** Calendar date in YYYY-MM-DD format, or null when the task has no deadline. */
  dueDate: string | null;
  status: TaskStatus;
  /** ISO 8601 timestamp. */
  createdAt: string;
  /** ISO 8601 timestamp. */
  updatedAt: string;
}

/** Fields a user can set when creating or editing a task. */
export interface TaskInput {
  title: string;
  details: string;
  dueDate: string | null;
}

/** Partial update accepted by PATCH /api/tasks/[taskId]. */
export type TaskUpdate = Partial<TaskInput> & { status?: TaskStatus };

export interface TaskCounts {
  all: number;
  active: number;
  completed: number;
}

export function isTaskStatus(value: unknown): value is TaskStatus {
  return typeof value === 'string' && (TASK_STATUSES as readonly string[]).includes(value);
}

export function isTaskFilter(value: unknown): value is TaskFilter {
  return typeof value === 'string' && (TASK_FILTERS as readonly string[]).includes(value);
}
