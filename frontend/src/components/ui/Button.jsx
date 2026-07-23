import { forwardRef } from 'react'
import { cn } from '../../lib/cn'
import Spinner from './Spinner'

const variants = {
  primary:
    'bg-primary text-white hover:bg-primary-800 active:bg-primary-900 shadow-sm border border-transparent',
  secondary:
    'bg-primary-50 text-primary hover:bg-primary-100 active:bg-primary-200 border border-transparent',
  accent:
    'bg-accent text-white hover:bg-accent-600 active:bg-accent-700 shadow-sm border border-transparent',
  outline:
    'bg-white text-neutral-700 border border-neutral-300 hover:bg-neutral-50 hover:border-neutral-400 active:bg-neutral-100',
  ghost:
    'bg-transparent text-neutral-700 hover:bg-neutral-100 active:bg-neutral-200 border border-transparent',
  danger:
    'bg-danger text-white hover:bg-danger-dark active:bg-red-700 shadow-sm border border-transparent',
  'danger-outline':
    'bg-white text-danger border border-red-200 hover:bg-danger-light active:bg-red-100',
  link: 'bg-transparent text-primary hover:text-primary-light underline-offset-4 hover:underline border border-transparent px-0',
}

const sizes = {
  xs: 'h-8 px-2.5 text-xs gap-1.5 rounded-md',
  sm: 'h-9 px-3 text-sm gap-1.5 rounded-md',
  md: 'h-10 px-4 text-sm gap-2 rounded-lg',
  lg: 'h-11 px-5 text-base gap-2 rounded-lg',
  xl: 'h-12 px-6 text-base gap-2.5 rounded-xl',
  icon: 'h-10 w-10 p-0 rounded-lg',
  'icon-sm': 'h-8 w-8 p-0 rounded-md',
  'icon-lg': 'h-12 w-12 p-0 rounded-xl',
}

const Button = forwardRef(function Button(
  {
    children,
    className,
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled = false,
    leftIcon,
    rightIcon,
    fullWidth = false,
    type = 'button',
    ...props
  },
  ref,
) {
  const isDisabled = disabled || loading

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      className={cn(
        'inline-flex items-center justify-center font-medium transition-all duration-200',
        'focus-ring disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
        variants[variant] || variants.primary,
        sizes[size] || sizes.md,
        fullWidth && 'w-full',
        className,
      )}
      {...props}
    >
      {loading ? (
        <Spinner size={size === 'xs' || size === 'sm' ? 'sm' : 'md'} />
      ) : (
        leftIcon
      )}
      {children && <span>{children}</span>}
      {!loading && rightIcon}
    </button>
  )
})

export default Button
