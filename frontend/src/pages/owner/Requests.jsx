import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageHeader from '../../components/common/PageHeader';
import BookingCard from '../../components/cards/BookingCard';
import EmptyState from '../../components/ui/EmptyState';
import {
  acceptBookingLocal,
  fetchOwnerBookings,
  rejectBookingLocal,
  selectOwnerBookings,
} from '../../store/slices/bookingSlice';
import { useToast } from '../../components/ui/Toast';

export default function OwnerRequests() {
  const dispatch = useDispatch();
  const toast = useToast();
  const bookings = useSelector(selectOwnerBookings).filter((b) => b.status === 'pending');

  useEffect(() => {
    dispatch(fetchOwnerBookings());
  }, [dispatch]);

  return (
    <div>
      <PageHeader title="Booking requests" description="Accept or reject incoming reservation requests." />
      <div className="space-y-3">
        {bookings.length === 0 ? (
          <EmptyState title="No pending requests" />
        ) : (
          bookings.map((b) => (
            <BookingCard
              key={b._id}
              booking={b}
              onAccept={(booking) => {
                dispatch(acceptBookingLocal(booking._id));
                toast.success('Booking accepted');
              }}
              onReject={(booking) => {
                dispatch(rejectBookingLocal(booking._id));
                toast.success('Booking rejected');
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}
