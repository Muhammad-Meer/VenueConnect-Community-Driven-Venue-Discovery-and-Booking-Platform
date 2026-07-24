import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageHeader from '../../components/common/PageHeader';
import ChartCard from '../../components/ui/ChartCard';
import StatsCard from '../../components/cards/StatsCard';
import { fetchAdminAnalytics, selectAdminAnalytics } from '../../store/slices/adminSlice';
import { formatCurrency, formatNumber } from '../../lib/format';

export default function AdminAnalytics() {
  const dispatch = useDispatch();
  const analytics = useSelector(selectAdminAnalytics);

  useEffect(() => {
    dispatch(fetchAdminAnalytics());
  }, [dispatch]);

  return (
    <div>
      <PageHeader title="Analytics" description="Deep dive into platform performance." />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatsCard label="Users" value={formatNumber(analytics.totalUsers)} />
        <StatsCard label="Bookings" value={formatNumber(analytics.totalBookings)} />
        <StatsCard label="Revenue" value={formatCurrency(analytics.totalRevenue)} />
      </div>
      <ChartCard
        title="Revenue by month"
        data={[...(analytics.revenueByMonth || [])].reverse()}
        currency
        type="bar"
      />
    </div>
  );
}
