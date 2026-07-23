import { cn } from '../../lib/cn'

const variants = {
  primary: 'bg-primary-50 text-primary border-primary-100',
  accent: 'bg-accent-50 text-accent-700 border-accent-100',
  success: 'bg-success-light text-success-dark border-green-100',
  warning: 'bg-warning-light text-warning-dark border-amber-100',
  danger: 'bg-danger-light text-danger-dark border-red-100',
  info: 'bg-info-light text-info-dark border-blue-100',
  neutral: 'bg-neutral-100 text-neutral-700 border-neutral-200',
  outline: 'bg-white text-neutral-600 border-neutral-300',
}

const sizes = {
  sm: 'px-1.5 py-0.5 text-2xs',
  md: 'px-2 py-0.5 text-xs',
  lg: 'px-2.5 py-1 text-sm',
}

function Badge({
  children,
  variant = 'neutral',
  size = 'md',
  dot = false,
  className,
  ...props
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-medium rounded-full border whitespace-nowrap',
        variants[variant] || variants.neutral,
        sizes[size] || sizes.md,
        className,
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn(
            'h-1.5 w-1.5 rounded-full',
            variant === 'success' && 'bg-success',
            variant === 'warning' && 'bg-warning',
            variant === 'danger' && 'bg-danger',
            variant === 'info' && 'bg-info',
            variant === 'primary' && 'bg-primary',
            variant === 'accent' && 'bg-accent',
            (variant === 'neutral' || variant === 'outline') && 'bg-neutral-400',
          )}
        />
      )}
      {children}
    </span>
  )
}

export default Badge
