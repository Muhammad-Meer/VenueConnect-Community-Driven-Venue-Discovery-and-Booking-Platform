import { forwardRef } from 'react'
import { cn } from '../../lib/cn'

const SearchInput = forwardRef(function SearchInput(
  {
    className,
    inputClassName,
    placeholder = 'Search venues, cities, events…',
    onClear,
    value,
    ...props
  },
  ref,
) {
  return (
    <div className={cn('relative w-full', className)}>
      <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-neutral-400">
        <svg className="h-4.5 w-4.5 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z" />
        </svg>
      </span>

      <input
        ref={ref}
        type="search"
        value={value}
        placeholder={placeholder}
        className={cn(
          'w-full h-11 rounded-xl border border-neutral-300 bg-white pl-10 pr-10',
          'text-sm text-neutral-900 placeholder:text-neutral-400',
          'transition-colors duration-200 shadow-xs',
          'focus:outline-none focus:ring-2 focus:ring-primary-light/40 focus:border-primary-light',
          'hover:border-neutral-400',
          inputClassName,
        )}
        {...props}
      />

      {value && onClear && (
        <button
          type="button"
          onClick={onClear}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-400 hover:text-neutral-600"
          aria-label="Clear search"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  )
})

export default SearchInput
