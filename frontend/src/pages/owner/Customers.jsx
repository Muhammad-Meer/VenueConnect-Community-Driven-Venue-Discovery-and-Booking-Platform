import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageHeader from '../../components/common/PageHeader';
import Table from '../../components/ui/Table';
import { fetchOwnerBookings, selectOwnerBookings } from '../../store/slices/bookingSlice';
import { formatCurrency } from '../../lib/format';

export default function OwnerCustomers() {
  const dispatch = useDispatch();
  const bookings = useSelector(selectOwnerBookings);

  useEffect(() => {
    dispatch(fetchOwnerBookings());
  }, [dispatch]);

  const customers = useMemo(() => {
    const map = new Map();
    bookings.forEach((b) => {
      const key = b.customer?._id || b.customer?.email || b.customer?.name || 'unknown';
      const prev = map.get(key) || {
        id: key,
        name: b.customer?.name || 'Customer',
        email: b.customer?.email || '—',
        bookings: 0,
        spend: 0,
      };
      prev.bookings += 1;
      prev.spend += Number(b.totalAmount) || 0;
      map.set(key, prev);
    });
    return Array.from(map.values());
  }, [bookings]);

  return (
    <div>
      <PageHeader title="Customers" description="People who booked your venues." />
      <Table
        columns={[
          { key: 'name', header: 'Name' },
          { key: 'email', header: 'Email' },
          { key: 'bookings', header: 'Bookings' },
          { key: 'spend', header: 'Spend', render: (v) => formatCurrency(v) },
        ]}
        data={customers}
      />
    </div>
  );
}
