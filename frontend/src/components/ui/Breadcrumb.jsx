import { Link } from 'react-router-dom'
import { cn } from '../../lib/cn'

function Breadcrumb({ items = [], className }) {
  if (!items.length) return null

  return (
    <nav aria-label="Breadcrumb" className={cn('', className)}>
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <li key={`${item.label}-${index}`} className="inline-flex items-center gap-1.5">
              {index > 0 && (
                <svg
                  className="h-3.5 w-3.5 text-neutral-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              )}

              {isLast || !item.href ? (
                <span
                  className={cn(
                    'font-medium',
                    isLast ? 'text-neutral-900' : 'text-neutral-500',
                  )}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.href}
                  className="text-neutral-500 hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default Breadcrumb
