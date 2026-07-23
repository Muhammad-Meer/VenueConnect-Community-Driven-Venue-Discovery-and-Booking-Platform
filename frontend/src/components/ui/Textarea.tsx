import { forwardRef, type TextareaHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string
  hint?: string
  error?: string
  fullWidth?: boolean
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, label, hint, error, fullWidth = true, id, disabled, rows = 4, ...props },
  ref,
) {
  const inputId = id || props.name

  return (
    <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full')}>
      {label && (
        <label htmlFor={inputId} className="text-small font-medium text-gray-700">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={inputId}
        rows={rows}
        disabled={disabled}
        className={cn(
          'w-full rounded-lg border bg-surface px-3.5 py-3 text-body text-primary resize-y',
          'placeholder:text-gray-400 transition-all duration-normal ease-smooth',
          'focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary',
          'disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed',
          error
            ? 'border-danger focus:ring-danger/25 focus:border-danger'
            : 'border-border hover:border-border-strong',
          className,
        )}
        {...props}
      />
      {error ? (
        <p className="text-caption text-danger">{error}</p>
      ) : hint ? (
        <p className="text-caption text-muted">{hint}</p>
      ) : null}
    </div>
  )
})

export default Textarea
