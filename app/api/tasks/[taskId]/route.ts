import { NextResponse, type NextRequest } from 'next/server';
import { getCurrentUserId } from '@/lib/auth';
import { jsonError, parseJsonBody, unauthorized } from '@/lib/http';
import { deleteTask, getTask, updateTask } from '@/lib/tasks/store';
import { validateTaskUpdate } from '@/lib/tasks/validation';

const NOT_FOUND_MESSAGE = 'Task not found.';

/** GET /api/tasks/[taskId] */
export async function GET(_request: NextRequest, context: RouteContext<'/api/tasks/[taskId]'>) {
  const { taskId } = await context.params;
  const userId = await getCurrentUserId();
  if (!userId) return unauthorized();

  const task = await getTask(userId, taskId);
  if (!task) return jsonError(NOT_FOUND_MESSAGE, 404);

  return NextResponse.json({ task });
}

/** PATCH /api/tasks/[taskId] */
export async function PATCH(request: NextRequest, context: RouteContext<'/api/tasks/[taskId]'>) {
  const { taskId } = await context.params;
  const userId = await getCurrentUserId();
  if (!userId) return unauthorized();
  const body = await parseJsonBody(request);

  if (!body.ok) {
    return jsonError('Request body must be valid JSON.', 400);
  }

  const result = validateTaskUpdate(body.data);
  if (!result.ok) {
    return jsonError('Please fix the highlighted fields.', 400, result.errors);
  }

  const task = await updateTask(userId, taskId, result.value);
  if (!task) return jsonError(NOT_FOUND_MESSAGE, 404);

  return NextResponse.json({ task });
}

/** DELETE /api/tasks/[taskId] */
export async function DELETE(_request: NextRequest, context: RouteContext<'/api/tasks/[taskId]'>) {
  const { taskId } = await context.params;
  const userId = await getCurrentUserId();
  if (!userId) return unauthorized();

  const deleted = await deleteTask(userId, taskId);
  if (!deleted) return jsonError(NOT_FOUND_MESSAGE, 404);

  return new NextResponse(null, { status: 204 });
}
