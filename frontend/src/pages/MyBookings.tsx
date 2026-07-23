import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CalendarDays, Plus } from 'lucide-react'
import { MainLayout, Container } from '@/components/layout'
import {
  Button,
  Tabs,
  EmptyState,
  Skeleton,
  Breadcrumb,
} from '@/components/ui'
import { BookingCard } from '@/components/cards'
import { mockBookings } from '@/data/mockData'
import { iconSize } from '@/theme'

export default function MyBookings() {
  const [tab, setTab] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(t)
  }, [])

  const filtered = mockBookings.filter((b) => {
    if (tab === 'all') return true
    return b.status === tab
  })

  return (
    <MainLayout>
      <Container className="py-8 md:py-10">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'My Bookings' },
          ]}
          className="mb-6"
        />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-h1 font-semibold tracking-tight text-primary">
              My bookings
            </h1>
            <p className="mt-1 text-small text-muted">
              Track upcoming and past farm reservations.
            </p>
          </div>
          <Link to="/search">
            <Button leftIcon={<Plus size={iconSize.sm} />}>Book a venue</Button>
          </Link>
        </div>

        <Tabs
          tabs={[
            { id: 'all', label: 'All', count: mockBookings.length },
            {
              id: 'confirmed',
              label: 'Confirmed',
              count: mockBookings.filter((b) => b.status === 'confirmed').length,
            },
            {
              id: 'pending',
              label: 'Pending',
              count: mockBookings.filter((b) => b.status === 'pending').length,
            },
            {
              id: 'completed',
              label: 'Completed',
              count: mockBookings.filter((b) => b.status === 'completed').length,
            },
            {
              id: 'cancelled',
              label: 'Cancelled',
              count: mockBookings.filter((b) => b.status === 'cancelled').length,
            },
          ]}
          active={tab}
          onChange={setTab}
        />

        <div className="mt-6 space-y-4">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="card-surface p-5 flex gap-4">
                <Skeleton className="h-28 w-40 rounded-xl shrink-0" />
                <div className="flex-1 space-y-3">
                  <Skeleton className="h-5 w-1/2" />
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
              </div>
            ))
          ) : filtered.length === 0 ? (
            <div className="card-surface">
              <EmptyState
                icon={<CalendarDays size={iconSize.lg} />}
                title="No bookings here"
                description="When you reserve a dairy farm venue, it will show up in this list."
                actionLabel="Explore venues"
                onAction={() => {
                  window.location.href = '/search'
                }}
              />
            </div>
          ) : (
            filtered.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))
          )}
        </div>
      </Container>
    </MainLayout>
  )
}
