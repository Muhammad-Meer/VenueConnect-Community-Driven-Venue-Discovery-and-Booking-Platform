import { cn } from '../../lib/cn'
import Button from './Button'

function getPageRange(current, total, siblingCount = 1) {
  const pages = []
  const start = Math.max(2, current - siblingCount)
  const end = Math.min(total - 1, current + siblingCount)

  pages.push(1)
  if (start > 2) pages.push('…')
  for (let i = start; i <= end; i += 1) pages.push(i)
  if (end < total - 1) pages.push('…')
  if (total > 1) pages.push(total)

  return pages
}

function Pagination({
  page = 1,
  totalPages = 1,
  onChange,
  className,
  showEdges = true,
}) {
  if (totalPages <= 1) return null

  const pages = getPageRange(page, totalPages)

  return (
    <nav
      aria-label="Pagination"
      className={cn('flex items-center justify-center gap-1', className)}
    >
      {showEdges && (
        <Button
          variant="outline"
          size="sm"
          disabled={page <= 1}
          onClick={() => onChange?.(page - 1)}
          aria-label="Previous page"
        >
          Previous
        </Button>
      )}

      {pages.map((item, index) =>
        item === '…' ? (
          <span
            key={`ellipsis-${index}`}
            className="px-2 text-sm text-neutral-400"
          >
            …
          </span>
        ) : (
          <Button
            key={item}
            variant={item === page ? 'primary' : 'ghost'}
            size="icon-sm"
            onClick={() => onChange?.(item)}
            aria-current={item === page ? 'page' : undefined}
            aria-label={`Page ${item}`}
          >
            {item}
          </Button>
        ),
      )}

      {showEdges && (
        <Button
          variant="outline"
          size="sm"
          disabled={page >= totalPages}
          onClick={() => onChange?.(page + 1)}
          aria-label="Next page"
        >
          Next
        </Button>
      )}
    </nav>
  )
}

export default Pagination
