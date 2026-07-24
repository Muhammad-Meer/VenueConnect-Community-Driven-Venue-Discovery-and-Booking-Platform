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
  'ui/Modal.jsx',
  `
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '../../lib/cn';
import Button from './Button';

export default function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md',
  className,
}) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && onClose?.();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (typeof document === 'undefined') return null;

  const widths = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-6xl',
  };

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-modal flex items-end justify-center sm:items-center p-0 sm:p-4">
          <motion.div
            className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            className={cn(
              'relative z-10 flex max-h-[92vh] w-full flex-col rounded-t-2xl border border-border bg-surface shadow-xl sm:rounded-2xl',
              widths[size],
              className
            )}
          >
            <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4">
              <div>
                {title && <h3 className="text-lg font-semibold text-content">{title}</h3>}
                {description && <p className="mt-1 text-sm text-content-muted">{description}</p>}
              </div>
              <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close">
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="overflow-y-auto px-5 py-4">{children}</div>
            {footer && <div className="border-t border-border px-5 py-4">{footer}</div>}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
`
);

write(
  'ui/Drawer.jsx',
  `
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '../../lib/cn';
import Button from './Button';

export default function Drawer({ open, onClose, title, children, side = 'right', className }) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && onClose?.();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (typeof document === 'undefined') return null;

  const isRight = side === 'right';

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-modal">
          <motion.div
            className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: isRight ? '100%' : '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: isRight ? '100%' : '-100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className={cn(
              'absolute top-0 flex h-full w-full max-w-md flex-col border-border bg-surface shadow-xl',
              isRight ? 'right-0 border-l' : 'left-0 border-r',
              className
            )}
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <h3 className="text-lg font-semibold">{title}</h3>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">{children}</div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
`
);

write(
  'ui/Dropdown.jsx',
  `
import { useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/cn';

export default function Dropdown({ trigger, items = [], align = 'right', className }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  return (
    <div className={cn('relative inline-block', className)} ref={ref}>
      <div onClick={() => setOpen((v) => !v)}>{trigger}</div>
      {open && (
        <div
          className={cn(
            'absolute z-dropdown mt-2 min-w-[12rem] overflow-hidden rounded-xl border border-border bg-surface py-1 shadow-lg animate-scale-in',
            align === 'right' ? 'right-0' : 'left-0'
          )}
        >
          {items.map((item) =>
            item.divider ? (
              <div key={item.id || item.label} className="my-1 border-t border-border" />
            ) : (
              <button
                key={item.id || item.label}
                type="button"
                disabled={item.disabled}
                className={cn(
                  'flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-content hover:bg-surface-muted disabled:opacity-50',
                  item.danger && 'text-danger'
                )}
                onClick={() => {
                  item.onClick?.();
                  setOpen(false);
                }}
              >
                {item.icon}
                {item.label}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}
`
);

write(
  'ui/Popover.jsx',
  `
import { useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/cn';

export default function Popover({ trigger, children, className, align = 'left' }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="relative inline-block" ref={ref}>
      <div onClick={() => setOpen((v) => !v)}>{trigger}</div>
      {open && (
        <div
          className={cn(
            'absolute z-dropdown mt-2 w-72 rounded-xl border border-border bg-surface p-4 shadow-lg animate-scale-in',
            align === 'right' ? 'right-0' : 'left-0',
            className
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}
`
);

write(
  'ui/Tooltip.jsx',
  `
import { cn } from '../../lib/cn';

export default function Tooltip({ content, children, side = 'top', className }) {
  const pos = {
    top: 'bottom-full left-1/2 mb-2 -translate-x-1/2',
    bottom: 'top-full left-1/2 mt-2 -translate-x-1/2',
    left: 'right-full top-1/2 mr-2 -translate-y-1/2',
    right: 'left-full top-1/2 ml-2 -translate-y-1/2',
  };

  return (
    <span className={cn('group relative inline-flex', className)}>
      {children}
      <span
        role="tooltip"
        className={cn(
          'pointer-events-none absolute z-tooltip whitespace-nowrap rounded-md bg-surface-inverse px-2 py-1 text-xs text-content-inverse opacity-0 shadow transition group-hover:opacity-100',
          pos[side]
        )}
      >
        {content}
      </span>
    </span>
  );
}
`
);

write(
  'ui/Toast.jsx',
  `
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Info, TriangleAlert, X, XCircle } from 'lucide-react';
import { cn } from '../../lib/cn';

const ToastContext = createContext(null);

const icons = {
  success: CheckCircle2,
  error: XCircle,
  warning: TriangleAlert,
  info: Info,
};

const tones = {
  success: 'border-success/30',
  error: 'border-danger/30',
  warning: 'border-warning/30',
  info: 'border-info/30',
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const remove = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const push = useCallback(
    (toast) => {
      const id = toast.id || \`toast-\${Date.now()}-\${Math.random().toString(36).slice(2)}\`;
      setToasts((prev) => [...prev, { id, tone: 'info', duration: 3500, ...toast }]);
      const duration = toast.duration ?? 3500;
      if (duration > 0) setTimeout(() => remove(id), duration);
      return id;
    },
    [remove]
  );

  const api = useMemo(
    () => ({
      push,
      success: (title, description) => push({ tone: 'success', title, description }),
      error: (title, description) => push({ tone: 'error', title, description }),
      warning: (title, description) => push({ tone: 'warning', title, description }),
      info: (title, description) => push({ tone: 'info', title, description }),
      remove,
    }),
    [push, remove]
  );

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 top-4 z-toast flex flex-col items-center gap-2 px-4 sm:items-end sm:px-6">
        <AnimatePresence>
          {toasts.map((toast) => {
            const Icon = icons[toast.tone] || Info;
            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, y: -12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                className={cn(
                  'pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-xl border bg-surface p-4 shadow-lg',
                  tones[toast.tone]
                )}
              >
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-content-secondary" />
                <div className="min-w-0 flex-1">
                  {toast.title && <p className="text-sm font-semibold text-content">{toast.title}</p>}
                  {toast.description && (
                    <p className="mt-0.5 text-sm text-content-muted">{toast.description}</p>
                  )}
                </div>
                <button type="button" onClick={() => remove(toast.id)} className="text-content-muted hover:text-content">
                  <X className="h-4 w-4" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}

export default ToastProvider;
`
);

write(
  'ui/Tabs.jsx',
  `
import { cn } from '../../lib/cn';

export default function Tabs({ tabs = [], value, onChange, className }) {
  return (
    <div className={cn('w-full', className)}>
      <div className="flex gap-1 overflow-x-auto rounded-xl bg-surface-muted p-1" role="tablist">
        {tabs.map((tab) => {
          const active = value === tab.value;
          return (
            <button
              key={tab.value}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onChange?.(tab.value)}
              className={cn(
                'inline-flex min-w-max items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition',
                active
                  ? 'bg-surface text-content shadow-sm'
                  : 'text-content-muted hover:text-content'
              )}
            >
              {tab.icon}
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
`
);

write(
  'ui/Accordion.jsx',
  `
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/cn';

export default function Accordion({ items = [], allowMultiple = false, className }) {
  const [open, setOpen] = useState([]);

  const toggle = (id) => {
    setOpen((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      return allowMultiple ? [...prev, id] : [id];
    });
  };

  return (
    <div className={cn('divide-y divide-border rounded-xl border border-border bg-surface', className)}>
      {items.map((item) => {
        const isOpen = open.includes(item.id);
        return (
          <div key={item.id}>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left"
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
            >
              <span className="text-sm font-medium text-content">{item.title}</span>
              <ChevronDown className={cn('h-4 w-4 text-content-muted transition', isOpen && 'rotate-180')} />
            </button>
            {isOpen && <div className="px-4 pb-4 text-sm text-content-secondary">{item.content}</div>}
          </div>
        );
      })}
    </div>
  );
}
`
);

write(
  'ui/Pagination.jsx',
  `
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/cn';
import Button from './Button';

export default function Pagination({ page = 1, totalPages = 1, onChange, className }) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).slice(
    Math.max(0, page - 3),
    Math.min(totalPages, page + 2)
  );

  return (
    <div className={cn('flex items-center justify-center gap-1', className)}>
      <Button variant="outline" size="icon" disabled={page <= 1} onClick={() => onChange?.(page - 1)}>
        <ChevronLeft className="h-4 w-4" />
      </Button>
      {pages.map((p) => (
        <Button
          key={p}
          size="icon"
          variant={p === page ? 'primary' : 'ghost'}
          onClick={() => onChange?.(p)}
        >
          {p}
        </Button>
      ))}
      <Button
        variant="outline"
        size="icon"
        disabled={page >= totalPages}
        onClick={() => onChange?.(page + 1)}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
`
);

write(
  'ui/Table.jsx',
  `
import { cn } from '../../lib/cn';

export default function Table({ columns = [], data = [], empty = 'No data', className, onRowClick }) {
  return (
    <div className={cn('overflow-x-auto rounded-xl border border-border bg-surface', className)}>
      <table className="min-w-full text-left text-sm">
        <thead className="border-b border-border bg-surface-muted/70">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3 font-semibold text-content-secondary">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-10 text-center text-content-muted">
                {empty}
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr
                key={row.id || row._id || idx}
                className={cn(
                  'border-b border-border last:border-0',
                  onRowClick && 'cursor-pointer hover:bg-surface-muted/60'
                )}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3 text-content">
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
`
);

write(
  'ui/SearchBar.jsx',
  `
import { Search, X } from 'lucide-react';
import { cn } from '../../lib/cn';
import Input from './Input';
import Button from './Button';

export default function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = 'Search venues, cities, neighborhoods…',
  className,
  size = 'md',
}) {
  return (
    <form
      className={cn('flex w-full items-center gap-2', className)}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.(value);
      }}
    >
      <Input
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        leftIcon={<Search className="h-4 w-4" />}
        rightIcon={
          value ? (
            <button type="button" onClick={() => onChange?.('')} className="text-content-muted hover:text-content">
              <X className="h-4 w-4" />
            </button>
          ) : null
        }
        className={size === 'lg' ? 'h-12 text-base' : undefined}
      />
      <Button type="submit" size={size === 'lg' ? 'lg' : 'md'}>
        Search
      </Button>
    </form>
  );
}
`
);

write(
  'ui/EmptyState.jsx',
  `
import { Inbox } from 'lucide-react';
import { cn } from '../../lib/cn';
import Button from './Button';

export default function EmptyState({
  icon,
  title = 'Nothing here yet',
  description,
  actionLabel,
  onAction,
  className,
}) {
  return (
    <div className={cn('flex flex-col items-center justify-center px-6 py-16 text-center', className)}>
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-muted text-content-muted">
        {icon || <Inbox className="h-7 w-7" />}
      </div>
      <h3 className="text-lg font-semibold text-content">{title}</h3>
      {description && <p className="mt-2 max-w-md text-sm text-content-muted">{description}</p>}
      {actionLabel && onAction && (
        <Button className="mt-5" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
`
);

write(
  'ui/ErrorState.jsx',
  `
import { AlertTriangle } from 'lucide-react';
import { cn } from '../../lib/cn';
import Button from './Button';

export default function ErrorState({
  title = 'Something went wrong',
  description = 'Please try again in a moment.',
  onRetry,
  className,
}) {
  return (
    <div className={cn('flex flex-col items-center justify-center px-6 py-16 text-center', className)}>
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-danger-soft text-danger">
        <AlertTriangle className="h-7 w-7" />
      </div>
      <h3 className="text-lg font-semibold text-content">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-content-muted">{description}</p>
      {onRetry && (
        <Button className="mt-5" variant="outline" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}
`
);

write(
  'ui/Card.jsx',
  `
import { cn } from '../../lib/cn';

export function Card({ className, children, hover, ...props }) {
  return (
    <div
      className={cn(
        'card-surface',
        hover && 'transition hover:-translate-y-0.5 hover:shadow-md',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children }) {
  return <div className={cn('border-b border-border px-5 py-4', className)}>{children}</div>;
}

export function CardTitle({ className, children }) {
  return <h3 className={cn('text-base font-semibold text-content', className)}>{children}</h3>;
}

export function CardDescription({ className, children }) {
  return <p className={cn('mt-1 text-sm text-content-muted', className)}>{children}</p>;
}

export function CardContent({ className, children }) {
  return <div className={cn('p-5', className)}>{children}</div>;
}

export function CardFooter({ className, children }) {
  return <div className={cn('border-t border-border px-5 py-4', className)}>{children}</div>;
}

export default Card;
`
);

write(
  'ui/Breadcrumb.jsx',
  `
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { cn } from '../../lib/cn';

export default function Breadcrumb({ items = [], className }) {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex flex-wrap items-center gap-1 text-sm', className)}>
      {items.map((item, index) => {
        const last = index === items.length - 1;
        return (
          <span key={item.href || item.label} className="inline-flex items-center gap-1">
            {index > 0 && <ChevronRight className="h-3.5 w-3.5 text-content-muted" />}
            {last || !item.href ? (
              <span className="font-medium text-content">{item.label}</span>
            ) : (
              <Link to={item.href} className="text-content-muted hover:text-brand-600">
                {item.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
`
);

write(
  'ui/FilterPanel.jsx',
  `
import { cn } from '../../lib/cn';
import Checkbox from './Checkbox';
import Select from './Select';
import Switch from './Switch';
import Button from './Button';
import { AMENITIES, BUDGET_RANGES, TEAM_SIZES, WORKSPACE_TYPES, CITIES } from '../../constants/venues';

export default function FilterPanel({ filters, onChange, onReset, className, compact = false }) {
  const set = (key, value) => onChange?.({ ...filters, [key]: value });

  const toggleAmenity = (value) => {
    const current = filters.amenities || [];
    const next = current.includes(value)
      ? current.filter((a) => a !== value)
      : [...current, value];
    set('amenities', next);
  };

  return (
    <div className={cn('space-y-5', className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-content">Filters</h3>
        <Button variant="ghost" size="sm" onClick={onReset}>
          Reset
        </Button>
      </div>

      <Select
        label="City"
        value={filters.city || ''}
        onChange={(e) => set('city', e.target.value)}
        options={CITIES}
        placeholder="Any city"
      />

      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-content">Neighborhood</label>
        <input
          className="input-base"
          value={filters.neighborhood || ''}
          onChange={(e) => set('neighborhood', e.target.value)}
          placeholder="e.g. SoHo"
        />
      </div>

      <Select
        label="Budget"
        value={filters.budget || ''}
        onChange={(e) => set('budget', e.target.value)}
        options={BUDGET_RANGES}
        placeholder="Any budget"
      />

      <Select
        label="Team size"
        value={filters.teamSize || ''}
        onChange={(e) => set('teamSize', e.target.value)}
        options={TEAM_SIZES}
        placeholder="Any size"
      />

      <Select
        label="Workspace type"
        value={filters.workspaceType || ''}
        onChange={(e) => set('workspaceType', e.target.value)}
        options={WORKSPACE_TYPES}
        placeholder="Any type"
      />

      {!compact && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-content">Amenities</p>
          <div className="space-y-2">
            {AMENITIES.map((a) => (
              <Checkbox
                key={a.value}
                label={a.label}
                checked={(filters.amenities || []).includes(a.value)}
                onChange={() => toggleAmenity(a.value)}
              />
            ))}
          </div>
        </div>
      )}

      <Switch
        label="Verified only"
        checked={Boolean(filters.verifiedOnly)}
        onChange={(e) => set('verifiedOnly', e.target.checked)}
      />

      <Select
        label="Sort by"
        value={filters.sortBy || 'featured'}
        onChange={(e) => set('sortBy', e.target.value)}
        options={[
          { value: 'featured', label: 'Featured' },
          { value: 'rating', label: 'Top rated' },
          { value: 'price_asc', label: 'Price: low to high' },
          { value: 'price_desc', label: 'Price: high to low' },
          { value: 'capacity', label: 'Largest capacity' },
          { value: 'newest', label: 'Newest' },
        ]}
        placeholder={null}
      />
    </div>
  );
}
`
);

write(
  'ui/Calendar.jsx',
  `
import { useMemo, useState } from 'react';
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isBefore,
  isSameDay,
  isSameMonth,
  startOfDay,
  startOfMonth,
  startOfWeek,
  subMonths,
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/cn';
import Button from './Button';

export default function Calendar({
  value,
  onChange,
  unavailable = [],
  className,
  minDate = startOfDay(new Date()),
}) {
  const selected = value ? new Date(value) : null;
  const [month, setMonth] = useState(selected || new Date());

  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(month));
    const end = endOfWeek(endOfMonth(month));
    return eachDayOfInterval({ start, end });
  }, [month]);

  const unavailableSet = useMemo(
    () => new Set(unavailable.map((d) => format(new Date(d), 'yyyy-MM-dd'))),
    [unavailable]
  );

  return (
    <div className={cn('rounded-xl border border-border bg-surface p-4', className)}>
      <div className="mb-3 flex items-center justify-between">
        <Button variant="ghost" size="icon" onClick={() => setMonth((m) => subMonths(m, 1))}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <p className="text-sm font-semibold">{format(month, 'MMMM yyyy')}</p>
        <Button variant="ghost" size="icon" onClick={() => setMonth((m) => addMonths(m, 1))}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="mb-1 grid grid-cols-7 gap-1 text-center text-2xs font-medium uppercase tracking-wide text-content-muted">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
          <div key={d} className="py-1">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => {
          const key = format(day, 'yyyy-MM-dd');
          const disabled =
            isBefore(day, minDate) || unavailableSet.has(key) || !isSameMonth(day, month);
          const active = selected && isSameDay(day, selected);
          return (
            <button
              key={key}
              type="button"
              disabled={disabled}
              onClick={() => onChange?.(key)}
              className={cn(
                'h-9 rounded-lg text-sm transition',
                !isSameMonth(day, month) && 'text-content-muted/40',
                disabled && 'cursor-not-allowed opacity-40',
                active && 'bg-brand-600 text-white shadow-sm',
                !active && !disabled && 'hover:bg-brand-50 dark:hover:bg-brand-950'
              )}
            >
              {format(day, 'd')}
            </button>
          );
        })}
      </div>
    </div>
  );
}
`
);

write(
  'ui/Gallery.jsx',
  `
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Expand } from 'lucide-react';
import { cn } from '../../lib/cn';
import Modal from './Modal';
import Button from './Button';

export default function Gallery({ images = [], alt = 'Venue', className }) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  if (!images.length) {
    return (
      <div className={cn('flex h-72 items-center justify-center rounded-2xl bg-surface-muted text-content-muted', className)}>
        No images
      </div>
    );
  }

  const current = images[index] || images[0];
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  return (
    <div className={cn('space-y-3', className)}>
      <div className="relative overflow-hidden rounded-2xl bg-surface-muted">
        <img src={current} alt={alt} className="h-72 w-full object-cover md:h-96" />
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-3">
          <div className="flex gap-2">
            <Button size="icon" variant="secondary" onClick={prev}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="secondary" onClick={next}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <Button size="sm" variant="secondary" leftIcon={<Expand className="h-4 w-4" />} onClick={() => setOpen(true)}>
            View
          </Button>
        </div>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {images.map((src, i) => (
          <button
            key={src + i}
            type="button"
            onClick={() => setIndex(i)}
            className={cn(
              'h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2',
              i === index ? 'border-brand-600' : 'border-transparent'
            )}
          >
            <img src={src} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={alt} size="xl">
        <img src={current} alt={alt} className="max-h-[70vh] w-full rounded-xl object-contain" />
      </Modal>
    </div>
  );
}
`
);

write(
  'ui/MapEmbed.jsx',
  `
import { cn } from '../../lib/cn';

export default function MapEmbed({
  lat,
  lng,
  address,
  city,
  className,
  zoom = 14,
  height = 'h-64',
}) {
  const query = lat && lng ? \`\${lat},\${lng}\` : encodeURIComponent(\`\${address || ''} \${city || ''}\`);
  const src = \`https://maps.google.com/maps?q=\${query}&z=\${zoom}&output=embed\`;

  return (
    <div className={cn('overflow-hidden rounded-2xl border border-border bg-surface-muted', height, className)}>
      <iframe title="Venue map" src={src} className="h-full w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
    </div>
  );
}
`
);

write(
  'ui/ChartCard.jsx',
  `
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './Card';
import { formatCurrency, formatNumber } from '../../lib/format';

export default function ChartCard({
  title,
  description,
  data = [],
  dataKey = 'revenue',
  xKey = '_id',
  type = 'area',
  currency = false,
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          {type === 'bar' ? (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--color-border))" />
              <XAxis dataKey={xKey} tick={{ fontSize: 12 }} stroke="rgb(var(--color-content-muted))" />
              <YAxis tick={{ fontSize: 12 }} stroke="rgb(var(--color-content-muted))" />
              <Tooltip
                formatter={(v) => (currency ? formatCurrency(v) : formatNumber(v))}
                contentStyle={{
                  borderRadius: 12,
                  border: '1px solid rgb(var(--color-border))',
                  background: 'rgb(var(--color-surface))',
                }}
              />
              <Bar dataKey={dataKey} fill="rgb(var(--color-brand-500))" radius={[8, 8, 0, 0]} />
            </BarChart>
          ) : (
            <AreaChart data={data}>
              <defs>
                <linearGradient id="brandFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgb(var(--color-brand-500))" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="rgb(var(--color-brand-500))" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--color-border))" />
              <XAxis dataKey={xKey} tick={{ fontSize: 12 }} stroke="rgb(var(--color-content-muted))" />
              <YAxis tick={{ fontSize: 12 }} stroke="rgb(var(--color-content-muted))" />
              <Tooltip
                formatter={(v) => (currency ? formatCurrency(v) : formatNumber(v))}
                contentStyle={{
                  borderRadius: 12,
                  border: '1px solid rgb(var(--color-border))',
                  background: 'rgb(var(--color-surface))',
                }}
              />
              <Area
                type="monotone"
                dataKey={dataKey}
                stroke="rgb(var(--color-brand-600))"
                fill="url(#brandFill)"
                strokeWidth={2}
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
`
);

console.log('UI batch B complete');
