import { cn } from '../../lib/cn'

const sizes = {
  xs: 'h-6 w-6 text-2xs',
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
  xl: 'h-16 w-16 text-lg',
  '2xl': 'h-20 w-20 text-xl',
}

function getInitials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')
}

function Avatar({
  src,
  alt = '',
  name,
  size = 'md',
  className,
  status,
  ...props
}) {
  const initials = getInitials(name || alt)

  return (
    <span className={cn('relative inline-flex shrink-0', className)} {...props}>
      {src ? (
        <img
          src={src}
          alt={alt || name || 'Avatar'}
          className={cn(
            'rounded-full object-cover ring-2 ring-white',
            sizes[size] || sizes.md,
          )}
        />
      ) : (
        <span
          className={cn(
            'inline-flex items-center justify-center rounded-full',
            'bg-primary-100 text-primary font-semibold ring-2 ring-white',
            sizes[size] || sizes.md,
          )}
          aria-label={alt || name || 'Avatar'}
        >
          {initials || '?'}
        </span>
      )}

      {status && (
        <span
          className={cn(
            'absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full ring-2 ring-white',
            status === 'online' && 'bg-success',
            status === 'offline' && 'bg-neutral-400',
            status === 'busy' && 'bg-danger',
            status === 'away' && 'bg-warning',
          )}
        />
      )}
    </span>
  )
}

export default Avatar
