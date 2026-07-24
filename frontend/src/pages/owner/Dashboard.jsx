import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Building2, CalendarDays, DollarSign, Percent } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import StatsCard from '../../components/cards/StatsCard';
import ChartCard from '../../components/ui/ChartCard';
import BookingCard from '../../components/cards/BookingCard';
import Button from '../../components/ui/Button';
import { fetchOwnerAnalytics, selectOwnerAnalytics } from '../../store/slices/ownerSlice';
import { fetchOwnerBookings, selectOwnerBookings } from '../../store/slices/bookingSlice';
import { formatCurrency, formatNumber } from '../../lib/format';

export default function OwnerDashboard() {
  const dispatch = useDispatch();
  const analytics = useSelector(selectOwnerAnalytics);
  const bookings = useSelector(selectOwnerBookings);

  useEffect(() => {
    dispatch(fetchOwnerAnalytics());
    dispatch(fetchOwnerBookings());
  }, [dispatch]);

  const pending = bookings.filter((b) => b.status === 'pending');

  return (
    <div>
      <PageHeader
        title="Owner dashboard"
        description="Track revenue, occupancy, and booking requests."
        actions={
          <Button>
            <Link to="/owner/venues/new">Add venue</Link>
          </Button>
        }
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard label="Revenue" value={formatCurrency(analytics.totalRevenue)} icon={<DollarSign className="h-5 w-5" />} />
        <StatsCard label="Bookings" value={formatNumber(analytics.totalBookings)} icon={<CalendarDays className="h-5 w-5" />} />
        <StatsCard label="Occupancy" value={`${analytics.occupancyRate}%`} icon={<Percent className="h-5 w-5" />} />
        <StatsCard label="Pending requests" value={pending.length} icon={<Building2 className="h-5 w-5" />} />
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <ChartCard title="Revenue trend" description="Monthly performance" data={analytics.monthlyTrend} currency />
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Latest requests</h2>
            <Link to="/owner/requests" className="text-sm text-brand-600 hover:underline">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {pending.slice(0, 4).map((b) => (
              <BookingCard key={b._id} booking={b} showActions={false} />
            ))}
            {pending.length === 0 && <p className="text-sm text-content-muted">No pending requests.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
