import type { ReactNode } from 'react'
import { TrendingDown, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/cn'
import { iconSize } from '@/theme'
import Card from '@/components/ui/Card'

export type StatsCardProps = {
  label: string
  value: string | number
  change?: number
  icon?: ReactNode
  className?: string
  hint?: string
}

export default function StatsCard({
  label,
  value,
  change,
  icon,
  className,
  hint,
}: StatsCardProps) {
  const positive = change != null && change >= 0

  return (
    <Card hover className={cn('relative overflow-hidden', className)}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-small font-medium text-muted">{label}</p>
          <p className="mt-2 text-h2 font-bold tracking-tight text-primary">{value}</p>
          {change != null && (
            <p
              className={cn(
                'mt-2 inline-flex items-center gap-1 text-caption font-medium',
                positive ? 'text-success' : 'text-danger',
              )}
            >
              {positive ? (
                <TrendingUp size={iconSize.xs} />
              ) : (
                <TrendingDown size={iconSize.xs} />
              )}
              {positive ? '+' : ''}
              {change}%
              <span className="text-muted font-normal">vs last period</span>
            </p>
          )}
          {hint && !change && (
            <p className="mt-2 text-caption text-muted">{hint}</p>
          )}
        </div>
        {icon && (
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary">
            {icon}
          </div>
        )}
      </div>
    </Card>
  )
}
