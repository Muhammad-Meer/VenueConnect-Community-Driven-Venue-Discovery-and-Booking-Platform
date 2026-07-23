import { forwardRef, useId } from 'react'
import { cn } from '../../lib/cn'

const Checkbox = forwardRef(function Checkbox(
  { label, description, className, id, disabled, error, ...props },
  ref,
) {
  const generatedId = useId()
  const checkboxId = id || generatedId

  return (
    <label
      htmlFor={checkboxId}
      className={cn(
        'flex items-start gap-3 cursor-pointer select-none',
        disabled && 'opacity-50 cursor-not-allowed',
        className,
      )}
    >
      <input
        ref={ref}
        id={checkboxId}
        type="checkbox"
        disabled={disabled}
        className={cn(
          'mt-0.5 h-4 w-4 shrink-0 rounded border-neutral-300 text-primary',
          'focus:ring-2 focus:ring-primary-light/40 focus:ring-offset-0',
          'checked:bg-primary checked:border-primary',
          'cursor-pointer disabled:cursor-not-allowed',
          error && 'border-danger',
        )}
        {...props}
      />
      {(label || description) && (
        <span className="min-w-0">
          {label && (
            <span className="block text-sm font-medium text-neutral-800">{label}</span>
          )}
          {description && (
            <span className="block text-xs text-neutral-500 mt-0.5">{description}</span>
          )}
        </span>
      )}
    </label>
  )
})

export default Checkbox
