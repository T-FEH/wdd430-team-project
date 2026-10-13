import { NextResponse, type NextRequest } from 'next/server';
import { getCurrentUserId } from '@/lib/auth';
import { jsonError, parseJsonBody } from '@/lib/http';
import { createTask, listTasks } from '@/lib/tasks/store';
import { isTaskFilter } from '@/lib/tasks/types';
import { validateTaskInput } from '@/lib/tasks/validation';

/** GET /api/tasks?status=all|active|completed */
export async function GET(request: NextRequest) {
  const userId = await getCurrentUserId();
  const status = request.nextUrl.searchParams.get('status') ?? 'all';

  if (!isTaskFilter(status)) {
    return jsonError('Status must be one of: all, active, completed.', 400);
  }

  const tasks = await listTasks(userId, status);
  return NextResponse.json({ tasks });
}

/** POST /api/tasks */
export async function POST(request: NextRequest) {
  const userId = await getCurrentUserId();
  const body = await parseJsonBody(request);

  if (!body.ok) {
    return jsonError('Request body must be valid JSON.', 400);
  }

  const result = validateTaskInput(body.data);
  if (!result.ok) {
    return jsonError('Please fix the highlighted fields.', 400, result.errors);
  }

  const task = await createTask(userId, result.value);
  return NextResponse.json({ task }, { status: 201 });
}
