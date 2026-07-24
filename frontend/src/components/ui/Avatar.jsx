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
