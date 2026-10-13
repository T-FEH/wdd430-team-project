import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { jsonError } from '@/lib/http';

/** GET /api/users/me */
export async function GET() {
  const user = await getCurrentUser();
  return NextResponse.json({ user });
}

/** PATCH /api/users/me. Profile editing depends on Clerk and is tracked in #3. */
export async function PATCH() {
  return jsonError('Profile updates are not available yet.', 501);
}
