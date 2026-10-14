import 'server-only';
import { compareByDueDate } from './dates';
import type { Task, TaskCounts, TaskFilter, TaskInput, TaskUpdate } from './types';

/*
 * In-memory task store used until MongoDB is connected (#2, #4).
 *
 * Every function is async and takes the owner's Clerk user ID, matching the
 * shape the MongoDB implementation will have, so pages and API routes will not
 * change when the storage layer is swapped. Data resets whenever the server restarts.
 */

type StoreGlobal = typeof globalThis & { __tasktrackTasks?: Map<string, Task> };

// Keep the map on globalThis so it survives hot reloads in development.
const storeGlobal = globalThis as StoreGlobal;

function getTaskMap(): Map<string, Task> {
  storeGlobal.__tasktrackTasks ??= new Map();
  return storeGlobal.__tasktrackTasks;
}

function sortTasks(tasks: Task[]): Task[] {
  return tasks.sort((a, b) => {
    if (a.status !== b.status) return a.status === 'active' ? -1 : 1;
    return compareByDueDate(a, b);
  });
}

function findOwnedTask(userId: string, taskId: string): Task | undefined {
  const task = getTaskMap().get(taskId);
  // A task owned by someone else is treated exactly like a missing one.
  return task && task.userId === userId ? task : undefined;
}

/** Returns the user's tasks, active first, each group ordered by due date. */
export async function listTasks(userId: string, filter: TaskFilter = 'all'): Promise<Task[]> {
  const tasks = [...getTaskMap().values()].filter(
    (task) => task.userId === userId && (filter === 'all' || task.status === filter),
  );
  return sortTasks(tasks.map((task) => ({ ...task })));
}

export async function getTaskCounts(userId: string): Promise<TaskCounts> {
  const counts: TaskCounts = { all: 0, active: 0, completed: 0 };
  for (const task of getTaskMap().values()) {
    if (task.userId !== userId) continue;
    counts.all += 1;
    counts[task.status] += 1;
  }
  return counts;
}

export async function getTask(userId: string, taskId: string): Promise<Task | null> {
  const task = findOwnedTask(userId, taskId);
  return task ? { ...task } : null;
}

export async function createTask(userId: string, input: TaskInput): Promise<Task> {
  const now = new Date().toISOString();
  const task: Task = {
    _id: crypto.randomUUID(),
    userId,
    title: input.title,
    details: input.details,
    dueDate: input.dueDate,
    status: 'active',
    createdAt: now,
    updatedAt: now,
  };
  getTaskMap().set(task._id, task);
  return { ...task };
}

export async function updateTask(
  userId: string,
  taskId: string,
  update: TaskUpdate,
): Promise<Task | null> {
  const existing = findOwnedTask(userId, taskId);
  if (!existing) return null;

  const updated: Task = { ...existing, ...update, updatedAt: new Date().toISOString() };
  getTaskMap().set(taskId, updated);
  return { ...updated };
}

export async function deleteTask(userId: string, taskId: string): Promise<boolean> {
  if (!findOwnedTask(userId, taskId)) return false;
  return getTaskMap().delete(taskId);
}
