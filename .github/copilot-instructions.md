# TaskTrack GitHub Copilot Instructions

## Project Overview

TaskTrack is a student task management web application for organizing and tracking schoolwork.

## Technology Stack

- Next.js using the App Router
- TypeScript in strict mode
- Tailwind CSS
- MongoDB
- Clerk for authentication and basic profile management
- Next.js API Route Handlers for server-side database operations

## Authentication

- Use Clerk for sign-up, sign-in, sign-out, and session management.
- Use the authenticated Clerk user ID as the application's user identifier.
- Protected pages include `/dashboard`, `/tasks`, and `/profile`.
- Protected API Route Handlers must verify the authenticated user.
- Users must only be able to access their own application data.
- Never expose authentication secrets or environment variables in client-side code.

## Data Model

### User

User identity and authentication are managed by Clerk.

Relevant information may include:

- `clerkUserId`
- `displayName`
- `createdAt`
- `updatedAt`

### Task

Tasks are stored in MongoDB.

Each task contains:

- `_id`
- `userId`
- `title`
- `details`
- `dueDate`
- `status`
- `createdAt`
- `updatedAt`

`userId` stores the authenticated Clerk user ID.

One user can have many tasks, and each task belongs to one user.

## Database

- Use MongoDB for application data.
- Store the MongoDB connection string in environment variables.
- Never commit database credentials or secrets to GitHub.
- Use a reusable MongoDB connection rather than creating unnecessary connections.
- Database operations must only be performed in server-side code.
- Client Components must never connect directly to MongoDB.
- API Route Handlers may be used as the server-side interface for client-driven database operations.

## API

Task API endpoints follow this structure:

- `GET /api/tasks?status=all|active|completed` - list the authenticated user's tasks with an optional status filter
- `POST /api/tasks`
- `GET /api/tasks/[taskId]`
- `PATCH /api/tasks/[taskId]`
- `DELETE /api/tasks/[taskId]`

API Route Handlers must:

- Verify authentication.
- Validate input.
- Restrict data access to the authenticated user.
- Return appropriate error responses.
- Never expose another user's tasks.

## API & Technical Requirements

- Implement the profile endpoints:
  - `GET /api/auth/session`
  - `GET /api/users/me`
  - `PATCH /api/users/me`
- At least one Next.js API Route Handler must perform a database operation and be consumed by a Client Component.
- Use at least five reusable components across multiple pages.
- Authentication screens must use Clerk's sign-up and sign-in functionality.
- The application must be deployable to Vercel or a similar hosting platform.
- Profile updates must validate input and provide clear validation and error feedback.
- Follow the implementation priorities in `spec.md`:
  - P1: Authentication, session protection, and profile management
  - P2: Task CRUD, completion, and reopening
  - P3: Dashboard, filtering, task counts, responsive design, and due-date ordering.

### Client/API Architecture

- Client Components may call API Route Handlers for interactive operations.
- At least one Client Component must consume a Next.js API Route Handler that performs a database operation.
- Do not bypass the required API architecture by accessing MongoDB directly from Client Components.

## Component Architecture

Prefer reusable components instead of duplicating UI.

The application must use at least five reusable components across multiple pages.

Important shared components include:

- `Header`
- `TaskCard`
- `TaskForm`
- `TaskList`
- `TaskStatusToggle`
- `FilterBar`
- `EmptyState`

Shared components should be placed in a reusable components directory rather than duplicated inside individual route directories.

Use Server Components by default for pages and components that do not require client-side interactivity.

Use Client Components only when client-side state, event handlers, browser APIs, or interactive behavior is required.

Interactive functionality that should use Client Components includes:

- Task creation forms
- Task editing forms
- Completing and reopening tasks
- Task filtering
- Interactive buttons and controls
- Client-side loading and error feedback where appropriate

Keep Client Components as small and focused as possible. Do not make an entire page a Client Component when only an individual interactive component requires client-side behavior.

Reusable components should receive typed props and should not directly access MongoDB or server-only secrets.

## Pages

Primary application pages:

- `/dashboard` — task overview, counts, upcoming tasks, and completed tasks
- `/tasks` — task list, task management, and filtering
- `/tasks/new` — create a new task
- `/tasks/[taskId]/edit` — edit an existing task
- `/profile` — profile information and display name management

## Route Structure

Use Next.js route groups to separate authentication pages from the authenticated application.

Recommended structure:

- `(auth)` — public authentication routes such as `/sign-in` and `/sign-up`
- `(app)` — protected application routes such as `/dashboard`, `/tasks`, and `/profile`
- `api` — Next.js API Route Handlers

Use these application routes:

- `/`
- `/sign-in`
- `/sign-up`
- `/dashboard`
- `/tasks`
- `/tasks/new`
- `/tasks/[taskId]/edit`
- `/profile`

Use these API routes:

- `/api/auth/session`
- `/api/users/me`
- `/api/tasks`
- `/api/tasks/[taskId]`

Route groups such as `(auth)` and `(app)` must not appear in the public URL.

## Task Rules

- Task status is either `active` or `completed`.
- Active tasks should be ordered by due date on the dashboard.
- The closest upcoming deadline should appear first.
- Users can create, edit, delete, complete, and reopen their own tasks.
- Do not allow users to access or modify another user's tasks.

### Task Filtering

- The `/tasks` page must support filtering by `all`, `active`, and `completed`.
- Use the `status` URL query parameter:
  - `/tasks?status=all`
  - `/tasks?status=active`
  - `/tasks?status=completed`
- Filtering must only return tasks belonging to the authenticated user.
- A filter with no matching tasks must display the `EmptyState` component rather than an error.

### Profile Management

- Authenticated users can view their basic profile information.
- Authenticated users can update their display name.
- Profile changes must be validated before being saved.
- Profile API routes must verify the authenticated Clerk user.
- Users must only be able to access and modify their own profile.

## Important Constraints

- Never trust a `userId` supplied by the client.
- Always derive the current user from the authenticated Clerk session.
- Every task query, update, and deletion must be scoped to the authenticated user's Clerk ID.
- Never expose another user's data.
- Never expose Clerk, MongoDB, or other server-side secrets to Client Components.
- Do not use `any` unless there is a documented justification.

## Styling and Design

Use Tailwind CSS consistently throughout the application.

### Color Palette

Use these Tailwind classes so colors stay consistent across components:

| Role                | Tailwind class                    | Use                                       |
| ------------------- | --------------------------------- | ----------------------------------------- |
| Primary             | `bg-blue-600` / `text-blue-600`   | Primary buttons, links, active navigation |
| Primary hover       | `hover:bg-blue-700`               | Hover state for primary buttons           |
| Background          | `bg-gray-50`                      | Page background                           |
| Cards / surfaces    | `bg-white` with `border-gray-200` | Cards, forms, panels                      |
| Text                | `text-gray-900`                   | Headings and body text                    |
| Secondary text      | `text-gray-600`                   | Dates, helper text, labels                |
| Completed / success | `text-green-700` on `bg-green-50` | Completed status badges                   |
| Error               | `text-red-700` on `bg-red-50`     | Validation errors, delete actions         |
| Upcoming / warning  | `text-amber-800` on `bg-amber-50` | Due-soon and overdue indicators           |

Do not use lighter text shades (such as `text-gray-400`) for readable content. Text must meet WCAG AA contrast (4.5:1).

### Typography

- Use Geist Sans for all UI text and Geist Mono for dates and counts. Both are loaded with `next/font` in `app/layout.tsx` and exposed as `font-sans` and `font-mono`.
- Type scale: page title `text-3xl font-bold`, section heading `text-xl font-semibold`, card title `text-lg font-semibold`, body `text-base`, helper text `text-sm`.
- Each page has exactly one `h1`. The site name in the header is not a heading.
- Prioritize readability on desktop and mobile.

### Layout

- Use responsive centered containers.
- Use consistent spacing between sections and components.
- Use reusable card, form, button, and status styles.
- Support desktop and mobile layouts.
- Avoid horizontal scrolling on mobile.
- Page container: `mx-auto w-full max-w-5xl px-4 sm:px-6 py-8`.
- Cards: `rounded-lg border border-gray-200 bg-white p-5 shadow-sm`.
- Use the Tailwind spacing scale only. Avoid arbitrary pixel values.
- Flex rows that hold several items must wrap (`flex-wrap`) so they never force horizontal scrolling.
- Interactive elements must show a visible focus ring (`focus-visible:ring-2 focus-visible:ring-blue-600`).

## Folder Conventions

- `app/` contains routes only. Pages stay thin and delegate to components and `lib/`.
- `components/` contains shared UI components, one component per file, named in PascalCase.
- `lib/` contains shared types, validation, and server-side data access. Client Components must not import server-only modules from `lib/`.

## Code Quality

- Use TypeScript strict mode.
- Follow consistent TypeScript typing.
- Use ESLint and Prettier.
- Keep components focused and reusable.
- Handle loading, validation, empty, and error states.
- Do not use `any` unless there is a clear justification.
- Keep secrets and environment variables out of source code.

## Git Workflow

- Use feature branches for development.
- Submit changes through pull requests.
- Pull requests should be reviewed by at least one other team member before merging.
- Keep commits focused on the related feature or fix.
