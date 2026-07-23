import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Pencil, Eye, MoreHorizontal, Building2 } from 'lucide-react'
import { DashboardLayout } from '@/components/layout'
import {
  Button,
  Badge,
  EmptyState,
  Dropdown,
  Skeleton,
  SearchInput,
} from '@/components/ui'
import { ownerNav } from '@/constants/navigation'
import { mockVenues } from '@/data/mockData'
import { formatCurrency } from '@/lib/format'
import { iconSize } from '@/theme'

export default function MyVenues() {
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const venues = mockVenues.filter(
    (v) =>
      (v.ownerId === 'u2' || v.ownerId === 'u5') &&
      (!query || v.name.toLowerCase().includes(query.toLowerCase())),
  )

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 450)
    return () => clearTimeout(t)
  }, [])

  return (
    <DashboardLayout
      items={ownerNav}
      title="Owner"
      pageTitle="My venues"
      pageSubtitle="Manage listings, availability, and status."
      actions={
        <Link to="/owner/venues/new">
          <Button leftIcon={<Plus size={iconSize.sm} />}>Add venue</Button>
        </Link>
      }
    >
      <div className="mb-6 max-w-sm">
        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder="Search your venues…"
        />
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="card-surface overflow-hidden">
              <Skeleton className="h-40 w-full rounded-none" />
              <div className="p-5 space-y-3">
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : venues.length === 0 ? (
        <div className="card-surface">
          <EmptyState
            icon={<Building2 size={iconSize.lg} />}
            title="No venues yet"
            description="List your first dairy farm venue to start receiving bookings."
            actionLabel="Add venue"
            onAction={() => {
              window.location.href = '/owner/venues/new'
            }}
          />
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {venues.map((venue) => (
            <article key={venue.id} className="card-surface overflow-hidden group">
              <div className="relative aspect-[16/10]">
                <img
                  src={venue.image}
                  alt={venue.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <Badge
                    variant={
                      venue.status === 'active'
                        ? 'success'
                        : venue.status === 'pending'
                          ? 'warning'
                          : venue.status === 'draft'
                            ? 'muted'
                            : 'outline'
                    }
                    className="bg-white/95"
                  >
                    {venue.status}
                  </Badge>
                </div>
                <div className="absolute top-3 right-3">
                  <Dropdown
                    trigger={
                      <button
                        type="button"
                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/95 shadow-sm text-gray-600 hover:text-primary"
                      >
                        <MoreHorizontal size={iconSize.sm} />
                      </button>
                    }
                    items={[
                      {
                        label: 'Edit',
                        icon: <Pencil size={iconSize.sm} />,
                        onClick: () => {
                          window.location.href = `/owner/venues/${venue.id}/edit`
                        },
                      },
                      {
                        label: 'View public page',
                        icon: <Eye size={iconSize.sm} />,
                        onClick: () => {
                          window.location.href = `/venues/${venue.id}`
                        },
                      },
                    ]}
                  />
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-body font-semibold text-primary truncate">
                  {venue.name}
                </h3>
                <p className="mt-1 text-small text-muted">
                  {venue.city} · {venue.category}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-small font-bold text-primary">
                    {formatCurrency(venue.price)}
                    <span className="font-normal text-muted"> / day</span>
                  </p>
                  <div className="flex gap-2">
                    <Link to={`/venues/${venue.id}`}>
                      <Button variant="ghost" size="sm">
                        <Eye size={iconSize.sm} />
                      </Button>
                    </Link>
                    <Link to={`/owner/venues/${venue.id}/edit`}>
                      <Button variant="outline" size="sm">
                        <Pencil size={iconSize.sm} />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </DashboardLayout>
  )
}
