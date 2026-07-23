import { cn } from '@/lib/cn'

export type AvatarProps = {
  name?: string
  src?: string | null
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  status?: 'online' | 'offline' | 'away'
  className?: string
}

const sizes = {
  xs: 'h-7 w-7 text-[10px]',
  sm: 'h-8 w-8 text-caption',
  md: 'h-10 w-10 text-small',
  lg: 'h-12 w-12 text-body',
  xl: 'h-16 w-16 text-h4',
}

function initials(name?: string) {
  if (!name) return '?'
  return name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export default function Avatar({
  name,
  src,
  size = 'md',
  status,
  className,
}: AvatarProps) {
  return (
    <span className={cn('relative inline-flex shrink-0', className)}>
      {src ? (
        <img
          src={src}
          alt={name || 'Avatar'}
          className={cn('rounded-full object-cover ring-2 ring-white', sizes[size])}
        />
      ) : (
        <span
          className={cn(
            'inline-flex items-center justify-center rounded-full bg-primary-100 text-primary-700 font-semibold ring-2 ring-white',
            sizes[size],
          )}
        >
          {initials(name)}
        </span>
      )}
      {status && (
        <span
          className={cn(
            'absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full ring-2 ring-white',
            status === 'online' && 'bg-success',
            status === 'offline' && 'bg-gray-400',
            status === 'away' && 'bg-warning',
          )}
        />
      )}
    </span>
  )
}
