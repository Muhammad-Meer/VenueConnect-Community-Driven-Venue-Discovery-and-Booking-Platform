import { cn } from '@/lib/cn'

export type ToggleProps = {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  description?: string
  disabled?: boolean
  className?: string
  id?: string
}

export default function Toggle({
  checked,
  onChange,
  label,
  description,
  disabled,
  className,
  id,
}: ToggleProps) {
  return (
    <label
      htmlFor={id}
      className={cn(
        'inline-flex items-start gap-3 cursor-pointer select-none',
        disabled && 'opacity-50 cursor-not-allowed',
        className,
      )}
    >
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={cn(
          'relative mt-0.5 h-6 w-11 shrink-0 rounded-full transition-colors duration-normal ease-smooth',
          'focus-ring',
          checked ? 'bg-primary' : 'bg-gray-300',
        )}
      >
        <span
          className={cn(
            'absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-normal ease-smooth',
            checked && 'translate-x-5',
          )}
        />
      </button>
      {(label || description) && (
        <span className="flex flex-col gap-0.5">
          {label && <span className="text-small font-medium text-gray-800">{label}</span>}
          {description && <span className="text-caption text-muted">{description}</span>}
        </span>
      )}
    </label>
  )
}
