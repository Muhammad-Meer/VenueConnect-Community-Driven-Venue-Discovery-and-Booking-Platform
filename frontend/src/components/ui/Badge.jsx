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
