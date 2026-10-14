import 'server-only';
import { connection } from 'next/server';

export interface CurrentUser {
  id: string;
  displayName: string;
  email: string;
}

/**
 * Temporary stand-in for the signed-in user until Clerk is connected (#1).
 * Every task query is already scoped to this ID, so switching to Clerk only
 * means replacing the body of getCurrentUser().
 */
const DEMO_USER: CurrentUser = {
  id: 'demo-student',
  displayName: 'Demo Student',
  email: 'demo.student@example.com',
};

export async function getCurrentUser(): Promise<CurrentUser> {
  // Clerk's auth() reads request headers, which makes any page that calls it
  // render per request. connection() does the same here so task pages are
  // never served from a stale build-time render.
  await connection();
  return DEMO_USER;
}

export async function getCurrentUserId(): Promise<string> {
  const user = await getCurrentUser();
  return user.id;
}
