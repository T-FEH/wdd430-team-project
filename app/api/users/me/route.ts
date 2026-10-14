import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { jsonError, unauthorized } from '@/lib/http';

/** GET /api/users/me */
export async function GET() {
  const user = await getCurrentUser();
  if (!user) return unauthorized();

  return NextResponse.json({ user });
}

/** PATCH /api/users/me. Display name updates are tracked in #3. */
export async function PATCH() {
  return jsonError('Profile updates are not available yet.', 501);
}
