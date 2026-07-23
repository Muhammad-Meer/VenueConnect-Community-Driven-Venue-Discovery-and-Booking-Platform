import { Link } from 'react-router-dom'
import { CalendarDays, Users } from 'lucide-react'
import type { Booking } from '@/data/mockData'
import { formatCurrency, formatDate } from '@/lib/format'
import { iconSize } from '@/theme'
import { Badge, Button, Card } from '@/components/ui'

const statusVariant = {
  confirmed: 'success',
  pending: 'warning',
  cancelled: 'danger',
  completed: 'muted',
} as const

export default function BookingCard({ booking }: { booking: Booking }) {
  return (
    <Card padding="none" className="overflow-hidden" hover>
      <div className="flex flex-col sm:flex-row">
        <div className="sm:w-44 h-36 sm:h-auto shrink-0">
          <img
            src={booking.venueImage}
            alt={booking.venueName}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex-1 p-5 flex flex-col">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-body font-semibold text-primary">{booking.venueName}</h3>
              <p className="mt-1 text-caption text-muted">Booking #{booking.id}</p>
            </div>
            <Badge variant={statusVariant[booking.status]} dot>
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </Badge>
          </div>

          <div className="mt-4 flex flex-wrap gap-4 text-small text-secondary">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays size={iconSize.sm} className="text-primary" />
              {formatDate(booking.date)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Users size={iconSize.sm} className="text-primary" />
              {booking.guests} guests
            </span>
          </div>

          <div className="mt-auto pt-4 flex items-center justify-between gap-3">
            <p className="text-body font-bold text-primary">{formatCurrency(booking.total)}</p>
            <Link to={`/venues/${booking.venueId}`}>
              <Button variant="outline" size="sm">
                View venue
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  )
}
