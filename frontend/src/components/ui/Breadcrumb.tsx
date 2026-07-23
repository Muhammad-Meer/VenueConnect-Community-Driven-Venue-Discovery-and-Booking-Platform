import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/cn'
import { iconSize } from '@/theme'

export type BreadcrumbItem = {
  label: string
  href?: string
}

export type BreadcrumbProps = {
  items: BreadcrumbItem[]
  className?: string
}

export default function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center flex-wrap gap-1.5', className)}>
      {items.map((item, i) => {
        const isLast = i === items.length - 1
        return (
          <span key={`${item.label}-${i}`} className="inline-flex items-center gap-1.5">
            {i > 0 && <ChevronRight size={iconSize.xs} className="text-gray-400" />}
            {isLast || !item.href ? (
              <span className={cn('text-small', isLast ? 'text-primary font-medium' : 'text-muted')}>
                {item.label}
              </span>
            ) : (
              <Link
                to={item.href}
                className="text-small text-muted hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            )}
          </span>
        )
      })}
    </nav>
  )
}
