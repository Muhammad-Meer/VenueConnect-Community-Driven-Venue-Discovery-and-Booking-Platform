import { forwardRef, useId } from 'react'
import { cn } from '../../lib/cn'

const Input = forwardRef(function Input(
  {
    label,
    helperText,
    error,
    leftIcon,
    rightIcon,
    className,
    inputClassName,
    id,
    required,
    disabled,
    type = 'text',
    ...props
  },
  ref,
) {
  const generatedId = useId()
  const inputId = id || generatedId
  const hasError = Boolean(error)

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label
          htmlFor={inputId}
          className="mb-1.5 block text-sm font-medium text-neutral-700"
        >
          {label}
          {required && <span className="ml-0.5 text-danger">*</span>}
        </label>
      )}

      <div className="relative">
        {leftIcon && (
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-400">
            {leftIcon}
          </span>
        )}

        <input
          ref={ref}
          id={inputId}
          type={type}
          disabled={disabled}
          required={required}
          aria-invalid={hasError}
          aria-describedby={
            hasError ? `${inputId}-error` : helperText ? `${inputId}-help` : undefined
          }
          className={cn(
            'w-full h-10 rounded-lg border bg-white px-3 text-sm text-neutral-900',
            'placeholder:text-neutral-400 transition-colors duration-200',
            'focus:outline-none focus:ring-2 focus:ring-primary-light/40 focus:border-primary-light',
            'disabled:bg-neutral-50 disabled:text-neutral-400 disabled:cursor-not-allowed',
            hasError
              ? 'border-danger focus:ring-danger/30 focus:border-danger'
              : 'border-neutral-300 hover:border-neutral-400',
            leftIcon && 'pl-10',
            rightIcon && 'pr-10',
            inputClassName,
          )}
          {...props}
        />

        {rightIcon && (
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-400">
            {rightIcon}
          </span>
        )}
      </div>

      {hasError ? (
        <p id={`${inputId}-error`} className="mt-1.5 text-xs text-danger">
          {error}
        </p>
      ) : helperText ? (
        <p id={`${inputId}-help`} className="mt-1.5 text-xs text-neutral-500">
          {helperText}
        </p>
      ) : null}
    </div>
  )
})

export default Input
