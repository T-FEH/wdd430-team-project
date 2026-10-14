# TaskTrack Design System

TaskTrack is a study tool, so the design aims to be calm, readable, and quick to scan. Task content is the priority. Color is used sparingly, to show the primary action and the state of a task.

All values are Tailwind CSS v4 classes. Hex values are Tailwind's defaults, listed for reference.

## Color Palette

| Role            | Tailwind class                    | Hex                   | Used for                                              |
| --------------- | --------------------------------- | --------------------- | ----------------------------------------------------- |
| Primary         | `bg-blue-600`, `text-blue-600`    | `#155dfc`             | Primary buttons, the "Track" in the logo, focus rings |
| Primary hover   | `hover:bg-blue-700`               | `#1447e6`             | Hover state for primary buttons                       |
| Primary tint    | `bg-blue-50` with `text-blue-700` | `#eff6ff` / `#1447e6` | Active navigation link                                |
| Page background | `bg-gray-50`                      | `#f9fafb`             | Body background                                       |
| Surface         | `bg-white` with `border-gray-200` | `#ffffff` / `#e5e7eb` | Cards, forms, header, footer                          |
| Text            | `text-gray-900`                   | `#101828`             | Headings and body text                                |
| Secondary text  | `text-gray-600`                   | `#4a5565`             | Dates, helper text, labels                            |
| Success         | `text-green-700` on `bg-green-50` | `#008236` / `#f0fdf4` | Completed badge, completed count                      |
| Warning         | `text-amber-800` on `bg-amber-50` | `#973c00` / `#fffbeb` | Due today, due soon, overdue count                    |
| Error           | `text-red-700` on `bg-red-50`     | `#c10007` / `#fef2f2` | Overdue badge, validation errors, delete actions      |

### Contrast

Every text and background pair meets WCAG AA (4.5:1 for normal text):

| Pair                      | Ratio   |
| ------------------------- | ------- |
| `gray-900` on white       | 17.75:1 |
| `gray-600` on white       | 7.56:1  |
| `gray-600` on `gray-50`   | 7.23:1  |
| White on `blue-600`       | 5.25:1  |
| `blue-700` on `blue-50`   | 6.28:1  |
| `amber-800` on `amber-50` | 6.84:1  |
| `red-700` on `red-50`     | 5.87:1  |
| `green-700` on `green-50` | 4.72:1  |

Lighter shades such as `text-gray-400` are not used for readable text.

## Typography

- **Geist Sans** for all interface text, and **Geist Mono** for counts and numbers. Both load through `next/font` in `app/layout.tsx` and are exposed as `font-sans` and `font-mono`.
- Each page has exactly one `h1`. The site name in the header is a link, not a heading.

| Element                | Classes                                         |
| ---------------------- | ----------------------------------------------- |
| Landing headline       | `text-4xl sm:text-5xl font-bold tracking-tight` |
| Page title (`h1`)      | `text-3xl font-bold`                            |
| Section heading (`h2`) | `text-xl font-semibold`                         |
| Card title (`h3`)      | `text-lg font-semibold`                         |
| Body                   | `text-base`                                     |
| Helper text, badges    | `text-sm` or `text-xs font-semibold`            |

## Layout and Spacing

- **Spacing scale:** Tailwind's 4px scale only, no arbitrary pixel values.
- **Page container:** `mx-auto w-full max-w-5xl px-4 sm:px-6 py-8`.
- **Cards:** `rounded-lg border border-gray-200 bg-white p-5 shadow-sm`.
- **Rhythm:** `gap-3` inside cards, `gap-4` between cards, `mb-8` below page headers, `mb-10` between dashboard sections.
- **Grids:** one column on mobile, `md:grid-cols-2` or `md:grid-cols-4` from the medium breakpoint.
- **Mobile first:** every layout works from 320px wide. Rows with several items use `flex-wrap`, so nothing forces horizontal scrolling.

## Shared UI Patterns

Button and card classes are defined once in `lib/ui.ts` and reused everywhere:

| Pattern          | Look                                                                |
| ---------------- | ------------------------------------------------------------------- |
| Primary button   | Blue fill, white text, `rounded-md px-4 py-2 text-sm font-semibold` |
| Secondary button | White fill, `border-gray-300`, dark text                            |
| Danger button    | White fill, `border-red-200`, red text                              |
| Status badge     | `rounded-full px-2.5 py-1 text-xs font-semibold`, tinted by state   |
| Empty state      | Dashed border card with a title, a short message, and one action    |

## Accessibility Conventions

- Every interactive element has a visible focus ring: `focus-visible:ring-2 focus-visible:ring-blue-600`.
- Form fields have real `<label>` elements, and invalid fields get `aria-invalid` with the error linked through `aria-describedby`.
- Error and success messages that appear after an action use `role="alert"`.
- A "Skip to main content" link is the first focusable element on every page.
