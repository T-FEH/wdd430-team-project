import { NextResponse } from 'next/server';
import { getCurrentUserId } from '@/lib/auth';

/** GET /api/auth/session. Reports the demo session until Clerk is connected (#1). */
export async function GET() {
  const userId = await getCurrentUserId();
  return NextResponse.json({ authenticated: true, userId, provider: 'demo' });
}
