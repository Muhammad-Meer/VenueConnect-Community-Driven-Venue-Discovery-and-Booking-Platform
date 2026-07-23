import { forwardRef, useId } from 'react'
import { cn } from '../../lib/cn'

const Toggle = forwardRef(function Toggle(
  { label, description, className, id, disabled, checked, onChange, ...props },
  ref,
) {
  const generatedId = useId()
  const toggleId = id || generatedId

  return (
    <label
      htmlFor={toggleId}
      className={cn(
        'inline-flex items-start gap-3 cursor-pointer select-none',
        disabled && 'opacity-50 cursor-not-allowed',
        className,
      )}
    >
      <span className="relative mt-0.5 inline-flex shrink-0">
        <input
          ref={ref}
          id={toggleId}
          type="checkbox"
          role="switch"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="peer sr-only"
          {...props}
        />
        <span
          className={cn(
            'h-6 w-11 rounded-full bg-neutral-300 transition-colors duration-200',
            'peer-focus-visible:ring-2 peer-focus-visible:ring-primary-light peer-focus-visible:ring-offset-2',
            'peer-checked:bg-primary',
          )}
        />
        <span
          className={cn(
            'pointer-events-none absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-sm',
            'transition-transform duration-200 peer-checked:translate-x-5',
          )}
        />
      </span>

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

export default Toggle
