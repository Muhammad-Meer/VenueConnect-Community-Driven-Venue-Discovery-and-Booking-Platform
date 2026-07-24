import { forwardRef } from 'react';
import { cn } from '../../lib/cn';

const Checkbox = forwardRef(function Checkbox(
  { label, description, className, error, id, ...props },
  ref
) {
  const inputId = id || props.name;
  return (
    <label htmlFor={inputId} className={cn('flex cursor-pointer items-start gap-3', className)}>
      <input
        ref={ref}
        id={inputId}
        type="checkbox"
        className="mt-0.5 h-4 w-4 rounded border-border text-brand-600 focus:ring-brand-500"
        {...props}
      />
      {(label || description) && (
        <span className="space-y-0.5">
          {label && <span className="block text-sm font-medium text-content">{label}</span>}
          {description && <span className="block text-xs text-content-muted">{description}</span>}
          {error && <span className="block text-xs text-danger">{error}</span>}
        </span>
      )}
    </label>
  );
});

export default Checkbox;
