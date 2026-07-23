import { Link } from 'react-router-dom'
import { cn } from '../../lib/cn'
import Badge from '../ui/Badge'
import Rating from '../ui/Rating'
import Button from '../ui/Button'

function VenueCard({
  venue,
  className,
  onBook,
  compact = false,
}) {
  const {
    id,
    name,
    location,
    city,
    image,
    price,
    currency = 'PKR',
    capacity,
    rating = 0,
    reviewCount = 0,
    category,
    featured = false,
  } = venue || {}

  return (
    <article
      className={cn(
        'group flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-card',
        'transition-all duration-250 ease-smooth',
        'hover:shadow-card-hover hover:border-primary-200 hover:-translate-y-0.5',
        className,
      )}
    >
      <Link to={id ? `/venues/${id}` : '#'} className="relative block overflow-hidden">
        <div
          className={cn(
            'bg-neutral-100 overflow-hidden',
            compact ? 'aspect-[16/10]' : 'aspect-[16/11]',
          )}
        >
          {image ? (
            <img
              src={image}
              alt={name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary-50 to-accent-50 text-primary/40">
              <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.25}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          )}
        </div>

        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {featured && <Badge variant="accent" size="sm">Featured</Badge>}
          {category && <Badge variant="primary" size="sm">{category}</Badge>}
        </div>
      </Link>

      <div className={cn('flex flex-1 flex-col', compact ? 'p-3.5' : 'p-4 sm:p-5')}>
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <Link to={id ? `/venues/${id}` : '#'}>
              <h3 className="text-base font-semibold text-neutral-900 truncate group-hover:text-primary transition-colors">
                {name || 'Untitled venue'}
              </h3>
            </Link>
            <p className="mt-0.5 text-sm text-neutral-500 truncate">
              {[location, city].filter(Boolean).join(', ') || 'Location TBD'}
            </p>
          </div>
        </div>

        <div className="mt-2.5 flex items-center gap-3 text-sm text-neutral-500">
          <Rating value={rating} showValue size="sm" reviewCount={reviewCount} />
        </div>

        {capacity != null && (
          <p className="mt-2 text-xs text-neutral-400">
            Up to <span className="font-medium text-neutral-600">{capacity}</span> guests
          </p>
        )}

        <div className="mt-auto pt-4 flex items-center justify-between gap-3 border-t border-neutral-100">
          <div>
            {price != null ? (
              <>
                <span className="text-lg font-semibold text-neutral-900">
                  {currency} {Number(price).toLocaleString()}
                </span>
                <span className="text-xs text-neutral-400"> / day</span>
              </>
            ) : (
              <span className="text-sm text-neutral-400">Price on request</span>
            )}
          </div>

          <Button
            size="sm"
            variant="secondary"
            onClick={(e) => {
              e.preventDefault()
              onBook?.(venue)
            }}
          >
            Book now
          </Button>
        </div>
      </div>
    </article>
  )
}

export default VenueCard
