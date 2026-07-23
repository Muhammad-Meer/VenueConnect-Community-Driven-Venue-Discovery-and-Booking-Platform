import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

export type RadioProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label?: string
  description?: string
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { className, label, description, id, disabled, ...props },
  ref,
) {
  const inputId = id || `${props.name}-${props.value}`

  return (
    <label
      htmlFor={inputId}
      className={cn(
        'inline-flex items-start gap-3 cursor-pointer select-none',
        disabled && 'opacity-50 cursor-not-allowed',
        className,
      )}
    >
      <input
        ref={ref}
        id={inputId}
        type="radio"
        disabled={disabled}
        className="mt-0.5 h-4 w-4 shrink-0 border-border text-primary focus:ring-primary/30 accent-primary"
        {...props}
      />
      {(label || description) && (
        <span className="flex flex-col gap-0.5">
          {label && <span className="text-small font-medium text-gray-800">{label}</span>}
          {description && <span className="text-caption text-muted">{description}</span>}
        </span>
      )}
    </label>
  )
})

export default Radio
