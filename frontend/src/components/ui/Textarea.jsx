import { forwardRef, useId } from 'react'
import { cn } from '../../lib/cn'

const Textarea = forwardRef(function Textarea(
  {
    label,
    helperText,
    error,
    className,
    textareaClassName,
    id,
    required,
    disabled,
    rows = 4,
    ...props
  },
  ref,
) {
  const generatedId = useId()
  const textareaId = id || generatedId
  const hasError = Boolean(error)

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label
          htmlFor={textareaId}
          className="mb-1.5 block text-sm font-medium text-neutral-700"
        >
          {label}
          {required && <span className="ml-0.5 text-danger">*</span>}
        </label>
      )}

      <textarea
        ref={ref}
        id={textareaId}
        rows={rows}
        disabled={disabled}
        required={required}
        aria-invalid={hasError}
        className={cn(
          'w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-neutral-900',
          'placeholder:text-neutral-400 transition-colors duration-200 resize-y min-h-[100px]',
          'focus:outline-none focus:ring-2 focus:ring-primary-light/40 focus:border-primary-light',
          'disabled:bg-neutral-50 disabled:text-neutral-400 disabled:cursor-not-allowed',
          hasError
            ? 'border-danger focus:ring-danger/30 focus:border-danger'
            : 'border-neutral-300 hover:border-neutral-400',
          textareaClassName,
        )}
        {...props}
      />

      {hasError ? (
        <p className="mt-1.5 text-xs text-danger">{error}</p>
      ) : helperText ? (
        <p className="mt-1.5 text-xs text-neutral-500">{helperText}</p>
      ) : null}
    </div>
  )
})

export default Textarea
