import { forwardRef } from 'react';
import { cn } from '../../lib/cn';

const Switch = forwardRef(function Switch({ label, description, className, id, checked, onChange, ...props }, ref) {
  const inputId = id || props.name;
  return (
    <label htmlFor={inputId} className={cn('flex cursor-pointer items-center justify-between gap-4', className)}>
      {(label || description) && (
        <span className="space-y-0.5">
          {label && <span className="block text-sm font-medium text-content">{label}</span>}
          {description && <span className="block text-xs text-content-muted">{description}</span>}
        </span>
      )}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        id={inputId}
        onClick={() => onChange?.({ target: { checked: !checked, name: props.name } })}
        className={cn(
          'relative inline-flex h-6 w-11 shrink-0 rounded-full transition',
          checked ? 'bg-brand-600' : 'bg-border'
        )}
      >
        <span
          className={cn(
            'pointer-events-none absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition',
            checked ? 'left-[22px]' : 'left-0.5'
          )}
        />
      </button>
      <input ref={ref} type="checkbox" className="sr-only" checked={checked} onChange={onChange} {...props} />
    </label>
  );
});

export default Switch;
