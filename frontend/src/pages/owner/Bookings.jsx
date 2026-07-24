import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageHeader from '../../components/common/PageHeader';
import BookingCard from '../../components/cards/BookingCard';
import EmptyState from '../../components/ui/EmptyState';
import { fetchOwnerBookings, selectOwnerBookings } from '../../store/slices/bookingSlice';

export default function OwnerBookings() {
  const dispatch = useDispatch();
  const bookings = useSelector(selectOwnerBookings);

  useEffect(() => {
    dispatch(fetchOwnerBookings());
  }, [dispatch]);

  return (
    <div>
      <PageHeader title="Bookings" description="All reservations across your venues." />
      <div className="space-y-3">
        {bookings.length === 0 ? (
          <EmptyState title="No bookings yet" />
        ) : (
          bookings.map((b) => <BookingCard key={b._id} booking={b} showActions={false} />)
        )}
      </div>
    </div>
  );
}
