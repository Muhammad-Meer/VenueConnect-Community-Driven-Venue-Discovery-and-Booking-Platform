import { Link } from 'react-router-dom'
import { cn } from '../../lib/cn'

function Logo({ className, size = 'md', showText = true, to = '/' }) {
  const iconSizes = {
    sm: 'h-7 w-7',
    md: 'h-9 w-9',
    lg: 'h-11 w-11',
  }
  const textSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl',
  }

  return (
    <Link to={to} className={cn('inline-flex items-center gap-2.5 group', className)}>
      <span
        className={cn(
          'flex items-center justify-center rounded-xl bg-primary text-white shadow-sm',
          'group-hover:bg-primary-light transition-colors',
          iconSizes[size],
        )}
      >
        <svg className="h-[55%] w-[55%]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      </span>
      {showText && (
        <span className={cn('font-semibold tracking-tight text-neutral-900', textSizes[size])}>
          Venue<span className="text-primary">Book</span>
        </span>
      )}
    </Link>
  )
}

export default Logo
