interface StatCardProps {
  label: string;
  value: number;
  tone?: 'default' | 'success' | 'warning';
}

const toneStyles = {
  default: 'text-gray-900',
  success: 'text-green-700',
  warning: 'text-amber-800',
} as const;

export default function StatCard({ label, value, tone = 'default' }: StatCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <dt className="text-sm font-medium text-gray-600">{label}</dt>
      <dd className={`mt-1 font-mono text-3xl font-semibold ${toneStyles[tone]}`}>{value}</dd>
    </div>
  );
}
