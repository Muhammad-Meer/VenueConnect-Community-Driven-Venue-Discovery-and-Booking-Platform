import { cn } from '../../lib/cn'

function Star({ filled, half, size }) {
  const sizeClass = size === 'sm' ? 'h-3.5 w-3.5' : size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'

  if (half) {
    return (
      <span className={cn('relative inline-block', sizeClass)}>
        <svg className={cn(sizeClass, 'text-neutral-200')} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        <svg
          className={cn(sizeClass, 'absolute inset-0 text-warning overflow-hidden')}
          style={{ clipPath: 'inset(0 50% 0 0)' }}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      </span>
    )
  }

  return (
    <svg
      className={cn(sizeClass, filled ? 'text-warning' : 'text-neutral-200')}
      fill="currentColor"
      viewBox="0 0 20 20"
      aria-hidden="true"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )
}

function Rating({
  value = 0,
  max = 5,
  size = 'md',
  showValue = false,
  reviewCount,
  className,
  interactive = false,
  onChange,
}) {
  const stars = Array.from({ length: max }, (_, index) => {
    const starValue = index + 1
    const filled = value >= starValue
    const half = !filled && value >= starValue - 0.5

    if (interactive) {
      return (
        <button
          key={starValue}
          type="button"
          onClick={() => onChange?.(starValue)}
          className="p-0.5 rounded focus-ring"
          aria-label={`Rate ${starValue} star${starValue > 1 ? 's' : ''}`}
        >
          <Star filled={filled || half} half={false} size={size} />
        </button>
      )
    }

    return <Star key={starValue} filled={filled} half={half} size={size} />
  })

  return (
    <div className={cn('inline-flex items-center gap-1.5', className)}>
      <div className="inline-flex items-center gap-0.5" aria-label={`${value} out of ${max} stars`}>
        {stars}
      </div>
      {showValue && (
        <span className="text-sm font-medium text-neutral-700">{Number(value).toFixed(1)}</span>
      )}
      {typeof reviewCount === 'number' && (
        <span className="text-sm text-neutral-400">({reviewCount})</span>
      )}
    </div>
  )
}

export default Rating
