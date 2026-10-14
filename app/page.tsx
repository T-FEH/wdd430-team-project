import Link from 'next/link';
import { buttonStyles, cardStyles } from '@/lib/ui';

const features = [
  {
    title: 'Every assignment in one list',
    description: 'Add tasks with details and due dates instead of juggling notes and reminders.',
  },
  {
    title: 'See what is due next',
    description: 'The dashboard orders active work by deadline and flags anything overdue.',
  },
  {
    title: 'Track your progress',
    description: 'Mark tasks complete, reopen them if plans change, and filter by status.',
  },
];

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:px-6">
      <section className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Keep your schoolwork on track.
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          TaskTrack is a simple task manager for students. Write down what you need to do, see what
          is coming up, and check it off when it is done.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/dashboard" className={buttonStyles.primary}>
            Open your dashboard
          </Link>
          <Link href="/tasks/new" className={buttonStyles.secondary}>
            Add a task
          </Link>
        </div>
      </section>

      <section aria-labelledby="features-heading" className="mt-16">
        <h2 id="features-heading" className="sr-only">
          Features
        </h2>
        <ul className="grid gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <li key={feature.title} className={cardStyles}>
              <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
              <p className="mt-2 text-gray-600">{feature.description}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
