import { Search, X } from 'lucide-react'
import { cn } from '@/lib/cn'
import { iconSize } from '@/theme'

export type SearchInputProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  onSubmit?: () => void
}

export default function SearchInput({
  value,
  onChange,
  placeholder = 'Search…',
  className,
  onSubmit,
}: SearchInputProps) {
  return (
    <form
      className={cn('relative w-full', className)}
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit?.()
      }}
    >
      <Search
        size={iconSize.sm}
        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
      />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          'h-11 w-full rounded-xl border border-border bg-surface pl-10 pr-10 text-body text-primary',
          'placeholder:text-gray-400 transition-all duration-normal',
          'focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary',
          'hover:border-border-strong',
        )}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          aria-label="Clear search"
        >
          <X size={iconSize.sm} />
        </button>
      )}
    </form>
  )
}
