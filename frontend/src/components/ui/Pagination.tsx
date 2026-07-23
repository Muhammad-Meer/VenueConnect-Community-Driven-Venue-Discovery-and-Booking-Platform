import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/cn'
import { iconSize } from '@/theme'
import Button from './Button'

export type PaginationProps = {
  page: number
  totalPages: number
  onChange: (page: number) => void
  className?: string
}

export default function Pagination({
  page,
  totalPages,
  onChange,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter((p) => {
    if (totalPages <= 7) return true
    return p === 1 || p === totalPages || Math.abs(p - page) <= 1
  })

  const items: (number | '…')[] = []
  pages.forEach((p, i) => {
    if (i > 0 && p - pages[i - 1] > 1) items.push('…')
    items.push(p)
  })

  return (
    <nav className={cn('flex items-center justify-center gap-1', className)} aria-label="Pagination">
      <Button
        variant="outline"
        size="sm"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        aria-label="Previous page"
      >
        <ChevronLeft size={iconSize.sm} />
      </Button>
      {items.map((item, i) =>
        item === '…' ? (
          <span key={`e-${i}`} className="px-2 text-muted text-small">
            …
          </span>
        ) : (
          <button
            key={item}
            type="button"
            onClick={() => onChange(item)}
            className={cn(
              'h-9 min-w-9 px-2 rounded-lg text-small font-medium transition-colors',
              item === page
                ? 'bg-primary text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-100',
            )}
          >
            {item}
          </button>
        ),
      )}
      <Button
        variant="outline"
        size="sm"
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
        aria-label="Next page"
      >
        <ChevronRight size={iconSize.sm} />
      </Button>
    </nav>
  )
}
