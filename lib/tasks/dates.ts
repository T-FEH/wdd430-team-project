import type { Task } from './types';

export type DueState = 'overdue' | 'today' | 'soon' | 'upcoming';

/** Number of days ahead that still counts as "due soon". */
const SOON_WINDOW_DAYS = 2;

/** Formats a Date as a local YYYY-MM-DD key, matching how due dates are stored. */
export function toDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function addDays(dateKey: string, days: number): string {
  const date = new Date(`${dateKey}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

export function getDueState(dueDate: string, today: string): DueState {
  if (dueDate < today) return 'overdue';
  if (dueDate === today) return 'today';
  if (dueDate <= addDays(today, SOON_WINDOW_DAYS)) return 'soon';
  return 'upcoming';
}

/** Formats a YYYY-MM-DD date for display, e.g. "Tue, Oct 14". */
export function formatDueDate(dueDate: string): string {
  // Parse and format in UTC so the calendar day never shifts with the server's time zone.
  return new Date(`${dueDate}T00:00:00Z`).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

/** Sorts by due date, soonest first, with undated tasks last. Ties fall back to creation order. */
export function compareByDueDate(a: Task, b: Task): number {
  if (a.dueDate !== b.dueDate) {
    if (a.dueDate === null) return 1;
    if (b.dueDate === null) return -1;
    return a.dueDate < b.dueDate ? -1 : 1;
  }
  return a.createdAt.localeCompare(b.createdAt);
}
