import { cn } from '../../lib/cn'

const variants = {
  info: {
    box: 'bg-info-light border-blue-200 text-info-dark',
    icon: 'text-info',
  },
  success: {
    box: 'bg-success-light border-green-200 text-success-dark',
    icon: 'text-success',
  },
  warning: {
    box: 'bg-warning-light border-amber-200 text-warning-dark',
    icon: 'text-warning',
  },
  danger: {
    box: 'bg-danger-light border-red-200 text-danger-dark',
    icon: 'text-danger',
  },
}

const icons = {
  info: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  success: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  warning: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
    </svg>
  ),
  danger: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
}

function Alert({
  variant = 'info',
  title,
  children,
  onClose,
  className,
  ...props
}) {
  const styles = variants[variant] || variants.info

  return (
    <div
      role="alert"
      className={cn(
        'flex gap-3 rounded-xl border px-4 py-3.5',
        styles.box,
        className,
      )}
      {...props}
    >
      <span className={cn('shrink-0 mt-0.5', styles.icon)}>{icons[variant]}</span>

      <div className="min-w-0 flex-1">
        {title && <p className="text-sm font-semibold">{title}</p>}
        {children && (
          <div className={cn('text-sm opacity-90', title && 'mt-0.5')}>{children}</div>
        )}
      </div>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 rounded-md p-1 opacity-70 hover:opacity-100 transition-opacity"
          aria-label="Dismiss"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  )
}

export default Alert
