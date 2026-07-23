import { forwardRef, type SelectHTMLAttributes } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/cn'
import { iconSize } from '@/theme'

export type SelectOption = { value: string; label: string; disabled?: boolean }

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string
  hint?: string
  error?: string
  options: SelectOption[]
  placeholder?: string
  fullWidth?: boolean
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  {
    className,
    label,
    hint,
    error,
    options,
    placeholder = 'Select…',
    fullWidth = true,
    id,
    disabled,
    ...props
  },
  ref,
) {
  const inputId = id || props.name

  return (
    <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full', className)}>
      {label && (
        <label htmlFor={inputId} className="text-small font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          id={inputId}
          disabled={disabled}
          className={cn(
            'h-11 w-full appearance-none rounded-lg border bg-surface pl-3.5 pr-10 text-body text-primary',
            'transition-all duration-normal ease-smooth',
            'focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary',
            'disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed',
            error
              ? 'border-danger focus:ring-danger/25 focus:border-danger'
              : 'border-border hover:border-border-strong',
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled={props.defaultValue !== undefined ? !props.defaultValue : !props.value}>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={iconSize.sm}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
      </div>
      {error ? (
        <p className="text-caption text-danger">{error}</p>
      ) : hint ? (
        <p className="text-caption text-muted">{hint}</p>
      ) : null}
    </div>
  )
})

export default Select
