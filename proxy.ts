import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Pages that need a signed-in user. API routes check the session themselves so
// they can answer with a JSON 401 instead of an HTML redirect.
const isProtectedPage = createRouteMatcher(['/dashboard(.*)', '/tasks(.*)', '/profile(.*)']);

export default clerkMiddleware(
  async (auth, request) => {
    if (isProtectedPage(request)) {
      await auth.protect();
    }
  },
  { signInUrl: '/sign-in', signUpUrl: '/sign-up' },
);

export const config = {
  matcher: [
    // Skip Next.js internals and static files unless they appear in search params.
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes.
    '/(api|trpc)(.*)',
  ],
};
