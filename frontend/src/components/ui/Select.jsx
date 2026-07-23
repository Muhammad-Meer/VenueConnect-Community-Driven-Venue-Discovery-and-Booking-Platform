import { forwardRef, useId } from 'react'
import { cn } from '../../lib/cn'

const Select = forwardRef(function Select(
  {
    label,
    helperText,
    error,
    options = [],
    placeholder = 'Select an option',
    className,
    selectClassName,
    id,
    required,
    disabled,
    ...props
  },
  ref,
) {
  const generatedId = useId()
  const selectId = id || generatedId
  const hasError = Boolean(error)

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label
          htmlFor={selectId}
          className="mb-1.5 block text-sm font-medium text-neutral-700"
        >
          {label}
          {required && <span className="ml-0.5 text-danger">*</span>}
        </label>
      )}

      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          disabled={disabled}
          required={required}
          aria-invalid={hasError}
          className={cn(
            'w-full h-10 appearance-none rounded-lg border bg-white pl-3 pr-10 text-sm text-neutral-900',
            'transition-colors duration-200 cursor-pointer',
            'focus:outline-none focus:ring-2 focus:ring-primary-light/40 focus:border-primary-light',
            'disabled:bg-neutral-50 disabled:text-neutral-400 disabled:cursor-not-allowed',
            hasError
              ? 'border-danger focus:ring-danger/30 focus:border-danger'
              : 'border-neutral-300 hover:border-neutral-400',
            selectClassName,
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => {
            const value = typeof option === 'string' ? option : option.value
            const labelText = typeof option === 'string' ? option : option.label
            return (
              <option key={value} value={value}>
                {labelText}
              </option>
            )
          })}
        </select>

        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-400">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </div>

      {hasError ? (
        <p className="mt-1.5 text-xs text-danger">{error}</p>
      ) : helperText ? (
        <p className="mt-1.5 text-xs text-neutral-500">{helperText}</p>
      ) : null}
    </div>
  )
})

export default Select
