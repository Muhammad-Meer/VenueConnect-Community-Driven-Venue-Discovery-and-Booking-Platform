import { useMemo, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Filter, SlidersHorizontal } from 'lucide-react'
import { MainLayout, Container } from '@/components/layout'
import {
  Button,
  SearchInput,
  Select,
  Checkbox,
  Pagination,
  EmptyState,
  Drawer,
  Tag,
  VenueCardSkeleton,
  Breadcrumb,
} from '@/components/ui'
import { VenueCard } from '@/components/cards'
import { mockVenues, cities, categories, amenitiesList } from '@/data/mockData'
import { iconSize } from '@/theme'

const PAGE_SIZE = 6

export default function Search() {
  const [params] = useSearchParams()
  const [query, setQuery] = useState(params.get('q') || '')
  const [city, setCity] = useState('')
  const [category, setCategory] = useState('')
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [filtersOpen, setFiltersOpen] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(t)
  }, [])

  const filtered = useMemo(() => {
    return mockVenues.filter((v) => {
      if (query) {
        const q = query.toLowerCase()
        if (
          !v.name.toLowerCase().includes(q) &&
          !v.city.toLowerCase().includes(q) &&
          !v.location.toLowerCase().includes(q)
        )
          return false
      }
      if (city && v.city !== city) return false
      if (category && v.category !== category) return false
      if (
        selectedAmenities.length &&
        !selectedAmenities.every((a) => v.amenities.includes(a))
      )
        return false
      return true
    })
  }, [query, city, category, selectedAmenities])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const toggleAmenity = (a: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a],
    )
    setPage(1)
  }

  const clearFilters = () => {
    setCity('')
    setCategory('')
    setSelectedAmenities([])
    setQuery('')
    setPage(1)
  }

  const FiltersPanel = () => (
    <div className="space-y-6">
      <Select
        label="City"
        value={city}
        onChange={(e) => {
          setCity(e.target.value)
          setPage(1)
        }}
        options={cities.map((c) => ({ value: c, label: c }))}
        placeholder="All cities"
      />
      <Select
        label="Category"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value)
          setPage(1)
        }}
        options={categories.map((c) => ({ value: c, label: c }))}
        placeholder="All categories"
      />
      <div>
        <p className="text-small font-medium text-gray-700 mb-3">Amenities</p>
        <div className="space-y-2.5 max-h-64 overflow-y-auto scrollbar-thin pr-1">
          {amenitiesList.map((a) => (
            <Checkbox
              key={a}
              label={a}
              checked={selectedAmenities.includes(a)}
              onChange={() => toggleAmenity(a)}
            />
          ))}
        </div>
      </div>
      <Button variant="outline" fullWidth onClick={clearFilters}>
        Clear filters
      </Button>
    </div>
  )

  return (
    <MainLayout>
      <Container className="py-8 md:py-10">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Search' },
          ]}
          className="mb-6"
        />

        <div className="flex flex-col lg:flex-row gap-4 lg:items-center justify-between mb-8">
          <div>
            <h1 className="text-h1 font-semibold tracking-tight text-primary">
              Explore venues
            </h1>
            <p className="mt-1 text-small text-muted">
              {loading ? 'Searching…' : `${filtered.length} venues found`}
            </p>
          </div>
          <div className="flex gap-3 w-full lg:w-auto lg:min-w-[380px]">
            <SearchInput
              value={query}
              onChange={(v) => {
                setQuery(v)
                setPage(1)
              }}
              placeholder="Search farms, cities…"
            />
            <Button
              variant="outline"
              className="lg:hidden shrink-0"
              onClick={() => setFiltersOpen(true)}
              leftIcon={<SlidersHorizontal size={iconSize.sm} />}
            >
              Filters
            </Button>
          </div>
        </div>

        {(city || category || selectedAmenities.length > 0) && (
          <div className="flex flex-wrap gap-2 mb-6">
            {city && <Tag variant="primary" onRemove={() => setCity('')}>{city}</Tag>}
            {category && (
              <Tag variant="primary" onRemove={() => setCategory('')}>
                {category}
              </Tag>
            )}
            {selectedAmenities.map((a) => (
              <Tag key={a} onRemove={() => toggleAmenity(a)}>
                {a}
              </Tag>
            ))}
          </div>
        )}

        <div className="grid lg:grid-cols-[260px_1fr] gap-8">
          <aside className="hidden lg:block">
            <div className="card-surface p-5 sticky top-24">
              <div className="flex items-center gap-2 mb-5">
                <Filter size={iconSize.sm} className="text-primary" />
                <h2 className="text-small font-semibold text-primary">Filters</h2>
              </div>
              <FiltersPanel />
            </div>
          </aside>

          <div>
            {loading ? (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <VenueCardSkeleton key={i} />
                ))}
              </div>
            ) : pageItems.length === 0 ? (
              <div className="card-surface">
                <EmptyState
                  title="No venues match your filters"
                  description="Try adjusting your search or clearing filters to see more results."
                  actionLabel="Clear filters"
                  onAction={clearFilters}
                />
              </div>
            ) : (
              <>
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {pageItems.map((venue) => (
                    <VenueCard key={venue.id} venue={venue} />
                  ))}
                </div>
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  onChange={setPage}
                  className="mt-10"
                />
              </>
            )}
          </div>
        </div>
      </Container>

      <Drawer open={filtersOpen} onClose={() => setFiltersOpen(false)} title="Filters">
        <FiltersPanel />
      </Drawer>
    </MainLayout>
  )
}
