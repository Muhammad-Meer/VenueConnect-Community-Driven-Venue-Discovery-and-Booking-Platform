import { CalendarDays, Clock, MapPin } from 'lucide-react';
import { formatCurrency, formatDate } from '../../lib/format';
import { BOOKING_STATUS, PAYMENT_STATUS } from '../../constants/venues';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { Card } from '../ui/Card';

export default function BookingCard({
  booking,
  onCancel,
  onReschedule,
  onPay,
  onAccept,
  onReject,
  showActions = true,
}) {
  if (!booking) return null;
  const venueName = booking.venue?.name || 'Venue';
  const status = BOOKING_STATUS[booking.status] || BOOKING_STATUS.pending;
  const payment = PAYMENT_STATUS[booking.paymentStatus] || PAYMENT_STATUS.pending;

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-semibold text-content">{venueName}</h3>
            <Badge tone={status.tone}>{status.label}</Badge>
            <Badge tone={payment.tone}>{payment.label}</Badge>
          </div>
          <p className="flex items-center gap-1.5 text-sm text-content-muted">
            <MapPin className="h-4 w-4" />
            {booking.venue?.address || booking.venue?.city || '—'}
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-content-secondary">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4" />
              {formatDate(booking.date)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {booking.startTime} – {booking.endTime}
            </span>
            <span className="font-semibold text-content">{formatCurrency(booking.totalAmount)}</span>
          </div>
        </div>

        {showActions && (
          <div className="flex flex-wrap gap-2">
            {onPay && booking.paymentStatus !== 'paid' && booking.status !== 'cancelled' && (
              <Button size="sm" onClick={() => onPay(booking)}>
                Pay now
              </Button>
            )}
            {onReschedule && (
              <Button size="sm" variant="outline" onClick={() => onReschedule(booking)}>
                Reschedule
              </Button>
            )}
            {onCancel && (
              <Button size="sm" variant="danger" onClick={() => onCancel(booking)}>
                Cancel
              </Button>
            )}
            {onAccept && booking.status === 'pending' && (
              <Button size="sm" variant="success" onClick={() => onAccept(booking)}>
                Accept
              </Button>
            )}
            {onReject && booking.status === 'pending' && (
              <Button size="sm" variant="danger" onClick={() => onReject(booking)}>
                Reject
              </Button>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
