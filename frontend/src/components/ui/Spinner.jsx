import { cn } from '../../lib/cn'

const sizes = {
  sm: 'h-4 w-4 border-2',
  md: 'h-5 w-5 border-2',
  lg: 'h-8 w-8 border-[3px]',
  xl: 'h-12 w-12 border-4',
}

function Spinner({ size = 'md', className, label = 'Loading' }) {
  return (
    <span
      role="status"
      aria-label={label}
      className={cn(
        'inline-block rounded-full border-current border-r-transparent animate-spin',
        sizes[size] || sizes.md,
        className,
      )}
    />
  )
}

export default Spinner
