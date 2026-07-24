import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageHeader from '../../components/common/PageHeader';
import StatsCard from '../../components/cards/StatsCard';
import ChartCard from '../../components/ui/ChartCard';
import { fetchOwnerAnalytics, selectOwnerAnalytics } from '../../store/slices/ownerSlice';
import { formatCurrency, formatNumber } from '../../lib/format';
import { DollarSign, TrendingUp } from 'lucide-react';

export default function OwnerRevenue() {
  const dispatch = useDispatch();
  const analytics = useSelector(selectOwnerAnalytics);

  useEffect(() => {
    dispatch(fetchOwnerAnalytics());
  }, [dispatch]);

  return (
    <div>
      <PageHeader title="Revenue" description="Understand earnings and top-performing venues." />
      <div className="grid gap-4 sm:grid-cols-2">
        <StatsCard label="Total revenue" value={formatCurrency(analytics.totalRevenue)} icon={<DollarSign className="h-5 w-5" />} />
        <StatsCard label="Total bookings" value={formatNumber(analytics.totalBookings)} icon={<TrendingUp className="h-5 w-5" />} />
      </div>
      <div className="mt-6">
        <ChartCard title="Monthly revenue" data={analytics.monthlyTrend} currency type="bar" />
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {(analytics.topVenues || []).map((v) => (
          <div key={v.name} className="card-surface p-4">
            <p className="font-semibold">{v.name}</p>
            <p className="mt-1 text-sm text-content-muted">
              {formatCurrency(v.totalRevenue)} · {v.totalBookings} bookings
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
