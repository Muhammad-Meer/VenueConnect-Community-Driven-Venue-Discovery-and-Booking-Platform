import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  hint?: string
  error?: string
  success?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  fullWidth?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    className,
    label,
    hint,
    error,
    success,
    leftIcon,
    rightIcon,
    fullWidth = true,
    id,
    disabled,
    ...props
  },
  ref,
) {
  const inputId = id || props.name
  const hasError = Boolean(error)

  return (
    <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full')}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-small font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {leftIcon}
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          className={cn(
            'h-11 w-full rounded-lg border bg-surface px-3.5 text-body text-primary',
            'placeholder:text-gray-400 transition-all duration-normal ease-smooth',
            'focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary',
            'disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed',
            leftIcon && 'pl-10',
            rightIcon && 'pr-10',
            hasError
              ? 'border-danger focus:ring-danger/25 focus:border-danger'
              : success
                ? 'border-success focus:ring-success/25 focus:border-success'
                : 'border-border hover:border-border-strong',
            className,
          )}
          {...props}
        />
        {rightIcon && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            {rightIcon}
          </span>
        )}
      </div>
      {error && <p className="text-caption text-danger">{error}</p>}
      {!error && success && <p className="text-caption text-success">{success}</p>}
      {!error && !success && hint && (
        <p className="text-caption text-muted">{hint}</p>
      )}
    </div>
  )
})

export default Input
