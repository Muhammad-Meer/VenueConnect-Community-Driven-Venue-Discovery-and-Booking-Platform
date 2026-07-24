import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import PageHeader from '../../components/common/PageHeader';
import Tabs from '../../components/ui/Tabs';
import BookingCard from '../../components/cards/BookingCard';
import EmptyState from '../../components/ui/EmptyState';
import Modal from '../../components/ui/Modal';
import Calendar from '../../components/ui/Calendar';
import Select from '../../components/ui/Select';
import Button from '../../components/ui/Button';
import {
  cancelBookingLocal,
  fetchMyBookings,
  payBooking,
  rescheduleBookingLocal,
  selectMyBookings,
} from '../../store/slices/bookingSlice';
import { rescheduleSchema } from '../../schemas/booking';
import { canCancel, canReschedule, generateTimeSlots, isPast, isUpcoming } from '../../helpers/booking';
import { useToast } from '../../components/ui/Toast';
import { useNavigate } from 'react-router-dom';

export default function Bookings() {
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();
  const bookings = useSelector(selectMyBookings);
  const [tab, setTab] = useState('upcoming');
  const [selected, setSelected] = useState(null);
  const slots = generateTimeSlots();

  const form = useForm({
    resolver: zodResolver(rescheduleSchema),
    defaultValues: { date: '', startTime: '10:00', endTime: '12:00' },
  });

  useEffect(() => {
    dispatch(fetchMyBookings());
  }, [dispatch]);

  const filtered = bookings.filter((b) => {
    if (tab === 'upcoming') return isUpcoming(b.date) && b.status !== 'cancelled';
    if (tab === 'past') return isPast(b.date) || b.status === 'completed';
    if (tab === 'cancelled') return b.status === 'cancelled';
    return true;
  });

  return (
    <div>
      <PageHeader title="My bookings" description="Upcoming reservations, history, cancellations, and reschedules." />
      <Tabs
        className="mb-6"
        value={tab}
        onChange={setTab}
        tabs={[
          { value: 'upcoming', label: 'Upcoming' },
          { value: 'past', label: 'History' },
          { value: 'cancelled', label: 'Cancelled' },
          { value: 'all', label: 'All' },
        ]}
      />

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <EmptyState title="No bookings" description="When you reserve a venue, it will show up here." actionLabel="Search venues" onAction={() => navigate('/search')} />
        ) : (
          filtered.map((booking) => (
            <BookingCard
              key={booking._id}
              booking={booking}
              onCancel={
                canCancel(booking)
                  ? (b) => {
                      dispatch(cancelBookingLocal(b._id));
                      toast.success('Booking cancelled');
                    }
                  : undefined
              }
              onReschedule={
                canReschedule(booking)
                  ? (b) => {
                      setSelected(b);
                      form.reset({
                        date: b.date?.slice?.(0, 10) || '',
                        startTime: b.startTime,
                        endTime: b.endTime,
                      });
                    }
                  : undefined
              }
              onPay={
                booking.paymentStatus !== 'paid' && booking.status !== 'cancelled'
                  ? (b) => navigate('/app/bookings/checkout', { state: { booking: b } })
                  : undefined
              }
            />
          ))
        )}
      </div>

      <Modal
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        title="Reschedule booking"
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setSelected(null)}>
              Cancel
            </Button>
            <Button
              onClick={form.handleSubmit((values) => {
                dispatch(rescheduleBookingLocal({ id: selected._id, ...values }));
                toast.success('Booking rescheduled');
                setSelected(null);
              })}
            >
              Save changes
            </Button>
          </div>
        }
      >
        <div className="space-y-3">
          <Calendar value={form.watch('date')} onChange={(d) => form.setValue('date', d, { shouldValidate: true })} />
          <div className="grid grid-cols-2 gap-3">
            <Select label="Start" options={slots.map((s) => ({ value: s, label: s }))} placeholder={null} {...form.register('startTime')} />
            <Select label="End" options={slots.map((s) => ({ value: s, label: s }))} placeholder={null} {...form.register('endTime')} />
          </div>
        </div>
      </Modal>
    </div>
  );
}
