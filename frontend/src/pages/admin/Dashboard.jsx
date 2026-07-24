import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Building2, CalendarDays, DollarSign, Users } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import StatsCard from '../../components/cards/StatsCard';
import ChartCard from '../../components/ui/ChartCard';
import { fetchAdminAnalytics, selectAdminAnalytics } from '../../store/slices/adminSlice';
import { formatCurrency, formatNumber } from '../../lib/format';

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const analytics = useSelector(selectAdminAnalytics);

  useEffect(() => {
    dispatch(fetchAdminAnalytics());
  }, [dispatch]);

  return (
    <div>
      <PageHeader title="Admin dashboard" description="Platform-wide health, growth, and revenue." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard label="Users" value={formatNumber(analytics.totalUsers)} icon={<Users className="h-5 w-5" />} />
        <StatsCard label="Venues" value={formatNumber(analytics.totalVenues)} icon={<Building2 className="h-5 w-5" />} />
        <StatsCard label="Bookings" value={formatNumber(analytics.totalBookings)} icon={<CalendarDays className="h-5 w-5" />} />
        <StatsCard label="GMV" value={formatCurrency(analytics.totalRevenue)} icon={<DollarSign className="h-5 w-5" />} />
      </div>
      <div className="mt-6">
        <ChartCard
          title="Platform revenue"
          description="Last 6 months"
          data={[...(analytics.revenueByMonth || [])].reverse()}
          currency
        />
      </div>
    </div>
  );
}
