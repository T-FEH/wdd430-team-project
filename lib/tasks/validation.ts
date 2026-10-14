import { isTaskStatus, type TaskInput, type TaskUpdate } from './types';

export const TITLE_MAX_LENGTH = 120;
export const DETAILS_MAX_LENGTH = 1000;

export type TaskField = 'title' | 'details' | 'dueDate' | 'status';
export type FieldErrors = Partial<Record<TaskField | 'form', string>>;

export type ValidationResult<T> = { ok: true; value: T } | { ok: false; errors: FieldErrors };

type FieldResult<T> = { value: T; error?: undefined } | { value?: undefined; error: string };

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function validateTitle(raw: unknown): FieldResult<string> {
  if (typeof raw !== 'string' || raw.trim() === '') {
    return { error: 'Title is required.' };
  }
  const title = raw.trim();
  if (title.length > TITLE_MAX_LENGTH) {
    return { error: `Title must be ${TITLE_MAX_LENGTH} characters or fewer.` };
  }
  return { value: title };
}

function validateDetails(raw: unknown): FieldResult<string> {
  if (raw === undefined || raw === null) return { value: '' };
  if (typeof raw !== 'string') return { error: 'Details must be text.' };
  const details = raw.trim();
  if (details.length > DETAILS_MAX_LENGTH) {
    return { error: `Details must be ${DETAILS_MAX_LENGTH} characters or fewer.` };
  }
  return { value: details };
}

function validateDueDate(raw: unknown): FieldResult<string | null> {
  if (raw === undefined || raw === null || raw === '') return { value: null };
  if (typeof raw !== 'string' || !DATE_PATTERN.test(raw)) {
    return { error: 'Due date must be a valid date.' };
  }
  // Reject dates like 2026-02-30 that match the pattern but do not exist.
  const parsed = new Date(`${raw}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== raw) {
    return { error: 'Due date must be a valid date.' };
  }
  return { value: raw };
}

function isRecord(raw: unknown): raw is Record<string, unknown> {
  return typeof raw === 'object' && raw !== null && !Array.isArray(raw);
}

/** Validates the body of a create request. Shared by TaskForm and POST /api/tasks. */
export function validateTaskInput(raw: unknown): ValidationResult<TaskInput> {
  if (!isRecord(raw)) {
    return { ok: false, errors: { form: 'Task data is missing.' } };
  }

  const title = validateTitle(raw.title);
  const details = validateDetails(raw.details);
  const dueDate = validateDueDate(raw.dueDate);

  const errors: FieldErrors = {};
  if (title.error) errors.title = title.error;
  if (details.error) errors.details = details.error;
  if (dueDate.error) errors.dueDate = dueDate.error;

  if (title.error !== undefined || details.error !== undefined || dueDate.error !== undefined) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    value: { title: title.value, details: details.value, dueDate: dueDate.value },
  };
}

/** Validates the body of a partial update. Only fields that are present are checked. */
export function validateTaskUpdate(raw: unknown): ValidationResult<TaskUpdate> {
  if (!isRecord(raw)) {
    return { ok: false, errors: { form: 'Task data is missing.' } };
  }

  const update: TaskUpdate = {};
  const errors: FieldErrors = {};

  if ('title' in raw) {
    const result = validateTitle(raw.title);
    if (result.error !== undefined) errors.title = result.error;
    else update.title = result.value;
  }
  if ('details' in raw) {
    const result = validateDetails(raw.details);
    if (result.error !== undefined) errors.details = result.error;
    else update.details = result.value;
  }
  if ('dueDate' in raw) {
    const result = validateDueDate(raw.dueDate);
    if (result.error !== undefined) errors.dueDate = result.error;
    else update.dueDate = result.value;
  }
  if ('status' in raw) {
    if (isTaskStatus(raw.status)) update.status = raw.status;
    else errors.status = 'Status must be either active or completed.';
  }

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  if (Object.keys(update).length === 0) {
    return { ok: false, errors: { form: 'Provide at least one field to update.' } };
  }
  return { ok: true, value: update };
}
