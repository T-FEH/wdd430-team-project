import { NextResponse } from 'next/server';
import { getCurrentUserId } from '@/lib/auth';

/** GET /api/auth/session. Reports whether the request has a signed-in Clerk session. */
export async function GET() {
  const userId = await getCurrentUserId();
  return NextResponse.json({ authenticated: userId !== null, userId });
}
