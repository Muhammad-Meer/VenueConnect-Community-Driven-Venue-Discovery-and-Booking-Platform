import type { ReactNode } from 'react'
import { AlertTriangle, CheckCircle2, Info, XCircle } from 'lucide-react'
import { cn } from '@/lib/cn'
import { iconSize } from '@/theme'

export type AlertProps = {
  variant?: 'info' | 'success' | 'warning' | 'danger'
  title?: string
  children?: ReactNode
  className?: string
}

const styles = {
  info: 'bg-info-light border-info/20 text-info',
  success: 'bg-success-light border-success/20 text-success-dark',
  warning: 'bg-warning-light border-warning/20 text-warning-dark',
  danger: 'bg-danger-light border-danger/20 text-danger-dark',
}

const icons = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  danger: XCircle,
}

export default function Alert({
  variant = 'info',
  title,
  children,
  className,
}: AlertProps) {
  const Icon = icons[variant]
  return (
    <div
      className={cn(
        'flex gap-3 rounded-xl border px-4 py-3.5',
        styles[variant],
        className,
      )}
      role="alert"
    >
      <Icon size={iconSize.md} className="shrink-0 mt-0.5" />
      <div className="min-w-0">
        {title && <p className="text-small font-semibold">{title}</p>}
        {children && (
          <div className={cn('text-small opacity-90', title && 'mt-0.5')}>{children}</div>
        )}
      </div>
    </div>
  )
}
