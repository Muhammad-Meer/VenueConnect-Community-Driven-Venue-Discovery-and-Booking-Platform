import { Link, useLocation } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { formatCurrency, formatDate } from '../../lib/format';

export default function BookingSuccess() {
  const booking = useLocation().state?.booking;
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg items-center">
      <Card className="w-full p-8 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success-soft text-success">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h1 className="mt-4 text-2xl font-bold">Booking confirmed</h1>
        <p className="mt-2 text-sm text-content-muted">
          {booking
            ? `${booking.venue?.name || 'Your venue'} on ${formatDate(booking.date)} · ${formatCurrency(booking.totalAmount)}`
            : 'Your reservation is confirmed. A receipt was sent to your email.'}
        </p>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Button>
            <Link to="/app/bookings">View bookings</Link>
          </Button>
          <Button variant="outline">
            <Link to="/search">Book another</Link>
          </Button>
        </div>
      </Card>
    </div>
  );
}
