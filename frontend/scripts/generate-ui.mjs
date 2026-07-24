import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..', 'src', 'components');

const write = (rel, content) => {
  const p = path.join(root, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content.trimStart());
  console.log('wrote', rel);
};

write(
  'ui/Button.jsx',
  `
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import Spinner from './Spinner';

const variants = {
  primary: 'bg-brand-600 text-white hover:bg-brand-700 shadow-sm',
  secondary: 'bg-surface-muted text-content hover:bg-border border border-border',
  outline: 'border border-border bg-transparent text-content hover:bg-surface-muted',
  ghost: 'bg-transparent text-content-secondary hover:bg-surface-muted hover:text-content',
  danger: 'bg-danger text-white hover:bg-red-700',
  success: 'bg-success text-white hover:bg-green-700',
  soft: 'bg-brand-50 text-brand-700 hover:bg-brand-100 dark:bg-brand-950 dark:text-brand-200',
};

const sizes = {
  xs: 'h-8 px-2.5 text-xs',
  sm: 'h-9 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-11 px-5 text-base',
  xl: 'h-12 px-6 text-base',
  icon: 'h-10 w-10 p-0',
};

const Button = forwardRef(function Button(
  {
    className,
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled,
    leftIcon,
    rightIcon,
    children,
    type = 'button',
    fullWidth,
    ...props
  },
  ref
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      className={cn(
        'btn-base',
        variants[variant] || variants.primary,
        sizes[size] || sizes.md,
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {loading ? <Spinner size="sm" className="text-current" /> : leftIcon}
      {children}
      {!loading && rightIcon}
    </button>
  );
});

export default Button;
`
);

write(
  'ui/Input.jsx',
  `
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';

const Input = forwardRef(function Input(
  { label, error, hint, leftIcon, rightIcon, className, containerClassName, id, required, ...props },
  ref
) {
  const inputId = id || props.name;
  return (
    <div className={cn('w-full space-y-1.5', containerClassName)}>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-content">
          {label}
          {required && <span className="ml-0.5 text-danger">*</span>}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-content-muted">
            {leftIcon}
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'input-base',
            leftIcon && 'pl-10',
            rightIcon && 'pr-10',
            error && 'border-danger focus:border-danger focus:ring-danger/20',
            className
          )}
          aria-invalid={Boolean(error)}
          {...props}
        />
        {rightIcon && (
          <span className="absolute inset-y-0 right-3 flex items-center text-content-muted">{rightIcon}</span>
        )}
      </div>
      {error && <p className="text-xs text-danger">{error}</p>}
      {!error && hint && <p className="text-xs text-content-muted">{hint}</p>}
    </div>
  );
});

export default Input;
`
);

write(
  'ui/Textarea.jsx',
  `
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';

const Textarea = forwardRef(function Textarea(
  { label, error, hint, className, id, required, rows = 4, ...props },
  ref
) {
  const inputId = id || props.name;
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-content">
          {label}
          {required && <span className="ml-0.5 text-danger">*</span>}
        </label>
      )}
      <textarea
        ref={ref}
        id={inputId}
        rows={rows}
        className={cn(
          'input-base min-h-[96px] resize-y',
          error && 'border-danger focus:border-danger focus:ring-danger/20',
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-danger">{error}</p>}
      {!error && hint && <p className="text-xs text-content-muted">{hint}</p>}
    </div>
  );
});

export default Textarea;
`
);

write(
  'ui/Checkbox.jsx',
  `
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
`
);

write(
  'ui/Switch.jsx',
  `
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
`
);

write(
  'ui/Select.jsx',
  `
import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import { ChevronDown } from 'lucide-react';

const Select = forwardRef(function Select(
  { label, error, hint, options = [], placeholder = 'Select…', className, id, required, ...props },
  ref
) {
  const inputId = id || props.name;
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-content">
          {label}
          {required && <span className="ml-0.5 text-danger">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          id={inputId}
          className={cn(
            'input-base appearance-none pr-10',
            error && 'border-danger focus:border-danger focus:ring-danger/20',
            className
          )}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => {
            const value = typeof opt === 'string' ? opt : opt.value;
            const labelText = typeof opt === 'string' ? opt : opt.label;
            return (
              <option key={value} value={value}>
                {labelText}
              </option>
            );
          })}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-content-muted" />
      </div>
      {error && <p className="text-xs text-danger">{error}</p>}
      {!error && hint && <p className="text-xs text-content-muted">{hint}</p>}
    </div>
  );
});

export default Select;
`
);

write(
  'ui/Spinner.jsx',
  `
import { cn } from '../../lib/cn';

const sizes = {
  xs: 'h-3 w-3 border',
  sm: 'h-4 w-4 border-2',
  md: 'h-6 w-6 border-2',
  lg: 'h-8 w-8 border-[3px]',
  xl: 'h-12 w-12 border-4',
};

export default function Spinner({ size = 'md', className }) {
  return (
    <span
      className={cn(
        'inline-block animate-spin rounded-full border-brand-600 border-r-transparent',
        sizes[size],
        className
      )}
      role="status"
      aria-label="Loading"
    />
  );
}
`
);

write(
  'ui/Loader.jsx',
  `
import Spinner from './Spinner';
import { cn } from '../../lib/cn';

export default function Loader({ label = 'Loading…', className, fullPage = false }) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-3 text-content-muted',
        fullPage ? 'min-h-[50vh]' : 'py-12',
        className
      )}
    >
      <Spinner size="lg" />
      <p className="text-sm">{label}</p>
    </div>
  );
}
`
);

write(
  'ui/Skeleton.jsx',
  `
import { cn } from '../../lib/cn';

export default function Skeleton({ className, ...props }) {
  return <div className={cn('skeleton-shimmer rounded-md', className)} {...props} />;
}

export function SkeletonCard() {
  return (
    <div className="card-surface overflow-hidden">
      <Skeleton className="h-44 w-full rounded-none" />
      <div className="space-y-3 p-4">
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/3" />
      </div>
    </div>
  );
}
`
);

write(
  'ui/Badge.jsx',
  `
import { cn } from '../../lib/cn';

const tones = {
  brand: 'bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-200',
  success: 'bg-success-soft text-success',
  warning: 'bg-warning-soft text-warning',
  danger: 'bg-danger-soft text-danger',
  info: 'bg-info-soft text-info',
  neutral: 'bg-surface-muted text-content-secondary',
};

const sizes = {
  sm: 'px-2 py-0.5 text-2xs',
  md: 'px-2.5 py-0.5 text-xs',
  lg: 'px-3 py-1 text-sm',
};

export default function Badge({ children, tone = 'neutral', size = 'md', className, leftIcon, ...props }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full font-medium',
        tones[tone] || tones.neutral,
        sizes[size],
        className
      )}
      {...props}
    >
      {leftIcon}
      {children}
    </span>
  );
}
`
);

write(
  'ui/Avatar.jsx',
  `
import { cn } from '../../lib/cn';
import { initials } from '../../lib/format';

const sizes = {
  xs: 'h-6 w-6 text-2xs',
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
  xl: 'h-16 w-16 text-lg',
};

export default function Avatar({ src, name = '', size = 'md', className, status }) {
  return (
    <span className={cn('relative inline-flex shrink-0', className)}>
      {src ? (
        <img
          src={src}
          alt={name}
          className={cn('rounded-full object-cover ring-2 ring-surface', sizes[size])}
        />
      ) : (
        <span
          className={cn(
            'inline-flex items-center justify-center rounded-full bg-brand-100 font-semibold text-brand-700 ring-2 ring-surface dark:bg-brand-900 dark:text-brand-200',
            sizes[size]
          )}
        >
          {initials(name) || '?'}
        </span>
      )}
      {status && (
        <span
          className={cn(
            'absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full ring-2 ring-surface',
            status === 'online' ? 'bg-success' : 'bg-content-muted'
          )}
        />
      )}
    </span>
  );
}
`
);

write(
  'ui/Alert.jsx',
  `
import { AlertCircle, CheckCircle2, Info, TriangleAlert, X } from 'lucide-react';
import { cn } from '../../lib/cn';

const styles = {
  info: 'bg-info-soft text-info border-info/20',
  success: 'bg-success-soft text-success border-success/20',
  warning: 'bg-warning-soft text-warning border-warning/20',
  danger: 'bg-danger-soft text-danger border-danger/20',
};

const icons = {
  info: Info,
  success: CheckCircle2,
  warning: TriangleAlert,
  danger: AlertCircle,
};

export default function Alert({ tone = 'info', title, children, onClose, className }) {
  const Icon = icons[tone] || Info;
  return (
    <div className={cn('flex gap-3 rounded-xl border px-4 py-3', styles[tone], className)} role="alert">
      <Icon className="mt-0.5 h-5 w-5 shrink-0" />
      <div className="min-w-0 flex-1">
        {title && <p className="text-sm font-semibold">{title}</p>}
        {children && <div className="mt-0.5 text-sm opacity-90">{children}</div>}
      </div>
      {onClose && (
        <button type="button" onClick={onClose} className="rounded p-1 opacity-70 hover:opacity-100">
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
`
);

console.log('UI batch A complete');
