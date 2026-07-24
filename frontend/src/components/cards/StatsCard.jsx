import { cn } from '../../lib/cn';
import { Card } from '../ui/Card';

export default function StatsCard({ label, value, hint, icon, trend, className }) {
  return (
    <Card className={cn('p-5', className)}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-content-muted">{label}</p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-content">{value}</p>
          {hint && <p className="mt-1 text-xs text-content-muted">{hint}</p>}
          {trend && (
            <p className={cn('mt-2 text-xs font-medium', trend.up ? 'text-success' : 'text-danger')}>
              {trend.label}
            </p>
          )}
        </div>
        {icon && (
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-300">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}
