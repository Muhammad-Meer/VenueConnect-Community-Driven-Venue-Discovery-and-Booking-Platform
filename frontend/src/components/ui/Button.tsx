import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import Spinner from './Spinner'

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'danger'
  | 'success'
  | 'icon'

export type ButtonSize = 'sm' | 'md' | 'lg'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  fullWidth?: boolean
}

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-white hover:bg-primary-hover active:bg-primary-700 shadow-sm border border-transparent',
  secondary:
    'bg-secondary text-primary hover:bg-primary-50 active:bg-primary-100 border border-transparent',
  outline:
    'bg-surface text-gray-700 border border-border hover:bg-gray-50 hover:border-border-strong active:bg-gray-100',
  ghost:
    'bg-transparent text-gray-700 hover:bg-gray-100 active:bg-gray-200 border border-transparent',
  danger:
    'bg-danger text-white hover:bg-danger-dark active:bg-red-700 shadow-sm border border-transparent',
  success:
    'bg-success text-white hover:bg-success-dark active:bg-green-700 shadow-sm border border-transparent',
  icon:
    'bg-surface text-gray-700 border border-border hover:bg-gray-50 hover:border-primary-200 hover:text-primary',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-3 text-small gap-1.5 rounded-lg',
  md: 'h-10 px-4 text-small gap-2 rounded-lg',
  lg: 'h-12 px-6 text-body gap-2.5 rounded-xl',
}

const iconSizes: Record<ButtonSize, string> = {
  sm: 'h-9 w-9 p-0 rounded-lg',
  md: 'h-10 w-10 p-0 rounded-lg',
  lg: 'h-12 w-12 p-0 rounded-xl',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
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
  const isIcon = variant === 'icon'

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      className={cn(
        'inline-flex items-center justify-center font-semibold transition-all duration-normal ease-smooth',
        'focus-ring disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
        variants[variant],
        isIcon ? iconSizes[size] : sizes[size],
        fullWidth && 'w-full',
        className,
      )}
      {...props}
    >
      {loading ? <Spinner size={size === 'sm' ? 'sm' : 'md'} /> : leftIcon}
      {children && !isIcon && <span>{children}</span>}
      {isIcon && !loading && children}
      {!loading && rightIcon}
    </button>
  )
})

export default Button
