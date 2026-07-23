import { cn } from '../../lib/cn'
import Input from '../ui/Input'
import Select from '../ui/Select'
import Button from '../ui/Button'
import SearchInput from '../ui/SearchInput'

const categories = [
  { value: '', label: 'All categories' },
  { value: 'wedding', label: 'Wedding' },
  { value: 'conference', label: 'Conference' },
  { value: 'party', label: 'Party & Events' },
  { value: 'outdoor', label: 'Outdoor' },
  { value: 'meeting', label: 'Meeting Room' },
]

const sortOptions = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top rated' },
  { value: 'capacity', label: 'Capacity' },
]

function VenueFilters({
  filters = {},
  onChange,
  onReset,
  className,
  layout = 'horizontal',
}) {
  const update = (key, value) => {
    onChange?.({ ...filters, [key]: value })
  }

  const isVertical = layout === 'vertical'

  return (
    <div
      className={cn(
        'rounded-2xl border border-neutral-200 bg-white shadow-card',
        isVertical ? 'p-5 space-y-4' : 'p-4 sm:p-5',
        className,
      )}
    >
      {!isVertical && (
        <div className="mb-4">
          <SearchInput
            value={filters.q || ''}
            onChange={(e) => update('q', e.target.value)}
            onClear={() => update('q', '')}
            placeholder="Search by venue name or city…"
          />
        </div>
      )}

      <div
        className={cn(
          isVertical
            ? 'space-y-4'
            : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3',
        )}
      >
        {isVertical && (
          <SearchInput
            value={filters.q || ''}
            onChange={(e) => update('q', e.target.value)}
            onClear={() => update('q', '')}
          />
        )}

        <Select
          label={isVertical ? 'Category' : undefined}
          options={categories}
          value={filters.category || ''}
          onChange={(e) => update('category', e.target.value)}
          placeholder="Category"
        />

        <Input
          label={isVertical ? 'City' : undefined}
          placeholder="City"
          value={filters.city || ''}
          onChange={(e) => update('city', e.target.value)}
        />

        <Input
          label={isVertical ? 'Min capacity' : undefined}
          type="number"
          min={0}
          placeholder="Min guests"
          value={filters.minCapacity || ''}
          onChange={(e) => update('minCapacity', e.target.value)}
        />

        <Select
          label={isVertical ? 'Sort by' : undefined}
          options={sortOptions}
          value={filters.sort || 'relevance'}
          onChange={(e) => update('sort', e.target.value)}
          placeholder={undefined}
        />
      </div>

      {onReset && (
        <div className={cn(isVertical ? 'pt-2' : 'mt-4 flex justify-end')}>
          <Button variant="ghost" size="sm" onClick={onReset}>
            Reset filters
          </Button>
        </div>
      )}
    </div>
  )
}

export default VenueFilters
