import { forwardRef } from 'react';
import { cn } from '../../lib/cn';
import Spinner from './Spinner';

const variants = {
  primary:
    'bg-gradient-to-r from-teal-500 to-cyan-600 text-white hover:from-teal-600 hover:to-cyan-700 shadow-lg',

  secondary:
    'bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-300',

  outline:
    'border border-teal-500 text-teal-600 bg-transparent hover:bg-teal-50',

  ghost:
    'bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900',

  danger:
    'bg-red-600 text-white hover:bg-red-700',

  success:
    'bg-emerald-600 text-white hover:bg-emerald-700',

  soft:
    'bg-teal-50 text-teal-700 hover:bg-teal-100',
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
