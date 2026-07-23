import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type BadgeVariant =
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'outline'
  | 'muted'

export type BadgeProps = {
  children: ReactNode
  variant?: BadgeVariant
  className?: string
  dot?: boolean
}

const variants: Record<BadgeVariant, string> = {
  default: 'bg-gray-100 text-gray-700',
  primary: 'bg-primary-50 text-primary-700',
  success: 'bg-success-light text-success-dark',
  warning: 'bg-warning-light text-warning-dark',
  danger: 'bg-danger-light text-danger-dark',
  outline: 'bg-surface text-gray-600 border border-border',
  muted: 'bg-secondary text-muted',
}

export default function Badge({
  children,
  variant = 'default',
  className,
  dot,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-caption font-medium',
        variants[variant],
        className,
      )}
    >
      {dot && (
        <span
          className={cn(
            'h-1.5 w-1.5 rounded-full',
            variant === 'success' && 'bg-success',
            variant === 'warning' && 'bg-warning',
            variant === 'danger' && 'bg-danger',
            variant === 'primary' && 'bg-primary',
            !['success', 'warning', 'danger', 'primary'].includes(variant) && 'bg-gray-400',
          )}
        />
      )}
      {children}
    </span>
  )
}
