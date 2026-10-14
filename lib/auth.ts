import 'server-only';
import { auth, currentUser } from '@clerk/nextjs/server';

export interface CurrentUser {
  id: string;
  displayName: string;
  email: string | null;
}

/** The signed-in user's Clerk ID, or null when nobody is signed in. Use in API routes. */
export async function getCurrentUserId(): Promise<string | null> {
  const { userId } = await auth();
  return userId;
}

/**
 * The signed-in user's Clerk ID for protected pages. proxy.ts already sends
 * signed-out visitors to /sign-in, so the redirect here is a second line of defense.
 */
export async function requireUserId(): Promise<string> {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) return redirectToSignIn();
  return userId;
}

/** Basic profile details for the signed-in user, or null when nobody is signed in. */
export async function getCurrentUser(): Promise<CurrentUser | null> {
  const user = await currentUser();
  if (!user) return null;

  const email = user.primaryEmailAddress?.emailAddress ?? null;
  return {
    id: user.id,
    displayName: user.fullName ?? user.username ?? email ?? 'TaskTrack user',
    email,
  };
}
