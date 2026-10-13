/** Shared Tailwind class strings so buttons and cards look the same everywhere. */

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2';

const buttonBase = `inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${focusRing}`;

export const buttonStyles = {
  primary: `${buttonBase} bg-blue-600 text-white hover:bg-blue-700`,
  secondary: `${buttonBase} border border-gray-300 bg-white text-gray-900 hover:bg-gray-100`,
  danger: `${buttonBase} border border-red-200 bg-white text-red-700 hover:bg-red-50`,
} as const;

export const cardStyles = 'rounded-lg border border-gray-200 bg-white p-5 shadow-sm';

export const linkStyles = `rounded font-semibold text-blue-700 underline-offset-4 hover:underline ${focusRing}`;

export { focusRing };
