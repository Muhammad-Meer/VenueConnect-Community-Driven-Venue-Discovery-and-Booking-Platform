import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..', 'src');
const write = (rel, content) => {
  const p = path.join(root, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content.trimStart());
  console.log('wrote', rel);
};

write(
  'pages/public/VenueDetails.jsx',
  `
import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BadgeCheck, Heart, Star, Users, Wifi } from 'lucide-react';
import {
  clearCurrentVenue,
  fetchVenueById,
  selectCurrentVenue,
} from '../../store/slices/venueSlice';
import { selectFavorites, toggleFavorite } from '../../store/slices/userSlice';
import { selectReviewsByVenue, createReview } from '../../store/slices/reviewSlice';
import { createBooking } from '../../store/slices/bookingSlice';
import { bookingSchema, reviewSchema } from '../../schemas/booking';
import { AMENITIES } from '../../constants/venues';
import { formatCurrency, formatRating } from '../../lib/format';
import { generateTimeSlots, calcTotal } from '../../helpers/booking';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../components/ui/Toast';
import PageHeader from '../../components/common/PageHeader';
import Gallery from '../../components/ui/Gallery';
import MapEmbed from '../../components/ui/MapEmbed';
import Calendar from '../../components/ui/Calendar';
import Tabs from '../../components/ui/Tabs';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import Textarea from '../../components/ui/Textarea';
import Input from '../../components/ui/Input';
import Loader from '../../components/ui/Loader';
import ErrorState from '../../components/ui/ErrorState';
import ReviewCard from '../../components/cards/ReviewCard';
import OwnerCard from '../../components/cards/OwnerCard';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';

export default function VenueDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const { isAuthenticated } = useAuth();
  const venue = useSelector(selectCurrentVenue);
  const loading = useSelector((s) => s.venue.detailLoading);
  const favorites = useSelector(selectFavorites);
  const reviews = useSelector(selectReviewsByVenue(id));
  const [tab, setTab] = useState('overview');
  const slots = useMemo(() => generateTimeSlots(8, 20), []);

  const bookingForm = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      venue: id,
      date: '',
      startTime: '10:00',
      endTime: '12:00',
      teamSize: 4,
      notes: '',
      seats: [],
    },
  });

  const reviewForm = useForm({
    resolver: zodResolver(reviewSchema),
    defaultValues: { venue: id, rating: 5, comment: '' },
  });

  useEffect(() => {
    dispatch(fetchVenueById(id));
    return () => dispatch(clearCurrentVenue());
  }, [dispatch, id]);

  useEffect(() => {
    bookingForm.setValue('venue', id);
    reviewForm.setValue('venue', id);
  }, [id, bookingForm, reviewForm]);

  if (loading && !venue) return <Loader fullPage label="Loading venue…" />;
  if (!venue) return <ErrorState title="Venue not found" onRetry={() => dispatch(fetchVenueById(id))} />;

  const watch = bookingForm.watch();
  const estimate = calcTotal(venue.pricePerHour, watch.startTime, watch.endTime);
  const amenityMeta = (venue.amenities || []).map((a) => AMENITIES.find((x) => x.value === a || x.label === a) || { label: a });

  const submitBooking = async (values) => {
    if (!isAuthenticated) {
      toast.warning('Sign in required', 'Please sign in to book this venue.');
      navigate('/login', { state: { from: \`/venues/\${id}\` } });
      return;
    }
    const result = await dispatch(
      createBooking({
        ...values,
        pricePerHour: venue.pricePerHour,
        venueDetails: venue,
      })
    );
    if (result.meta.requestStatus === 'fulfilled') {
      toast.success('Booking created', 'Continue to checkout to confirm payment.');
      navigate('/app/bookings/checkout', { state: { booking: result.payload } });
    } else {
      toast.error('Booking failed', result.payload || 'Try again');
    }
  };

  const submitReview = async (values) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    const result = await dispatch(createReview(values));
    if (result.meta.requestStatus === 'fulfilled') {
      toast.success('Review submitted');
      reviewForm.reset({ venue: id, rating: 5, comment: '' });
    }
  };

  return (
    <div className="container-app page-section">
      <PageHeader
        title={venue.name}
        description={\`\${venue.neighborhood ? venue.neighborhood + ', ' : ''}\${venue.city}\`}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Search', href: '/search' },
          { label: venue.name },
        ]}
        actions={
          <Button
            variant="outline"
            leftIcon={<Heart className={\`h-4 w-4 \${favorites.includes(venue._id) ? 'fill-current text-danger' : ''}\`} />}
            onClick={() => dispatch(toggleFavorite(venue._id))}
          >
            {favorites.includes(venue._id) ? 'Saved' : 'Save'}
          </Button>
        }
      />

      <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="space-y-6">
          <Gallery images={venue.images} alt={venue.name} />

          <div className="flex flex-wrap items-center gap-2">
            {(venue.isVerified || venue.isApproved) && (
              <Badge tone="success" leftIcon={<BadgeCheck className="h-3.5 w-3.5" />}>
                Verified venue
              </Badge>
            )}
            <Badge tone="brand">{venue.workspaceType?.replaceAll('_', ' ')}</Badge>
            <Badge tone="warning" leftIcon={<Star className="h-3.5 w-3.5 fill-current" />}>
              {formatRating(venue.averageRating)} ({venue.totalReviews || reviews.length} reviews)
            </Badge>
            <Badge tone="neutral" leftIcon={<Users className="h-3.5 w-3.5" />}>
              {venue.capacity} seats
            </Badge>
          </div>

          <Tabs
            value={tab}
            onChange={setTab}
            tabs={[
              { value: 'overview', label: 'Overview' },
              { value: 'amenities', label: 'Amenities' },
              { value: 'floorplan', label: 'Floor plan' },
              { value: 'reviews', label: 'Reviews' },
              { value: 'location', label: 'Location' },
            ]}
          />

          {tab === 'overview' && (
            <Card>
              <CardContent className="space-y-4">
                <p>{venue.description}</p>
                {venue.spaces?.length > 0 && (
                  <div>
                    <h3 className="mb-2 font-semibold">Spaces</h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {venue.spaces.map((space) => (
                        <div key={space.name} className="rounded-xl border border-border p-3">
                          <p className="font-medium">{space.name}</p>
                          <p className="text-sm text-content-muted">
                            {space.capacity} seats · {formatCurrency(space.pricePerHour)}/hr
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {tab === 'amenities' && (
            <Card>
              <CardContent className="grid gap-3 sm:grid-cols-2">
                {amenityMeta.map((a) => (
                  <div key={a.label} className="flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-sm">
                    <Wifi className="h-4 w-4 text-brand-600" />
                    {a.label}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {tab === 'floorplan' && (
            <Card>
              <CardContent>
                {venue.floorPlan ? (
                  <img src={venue.floorPlan} alt="Floor plan" className="w-full rounded-xl object-cover" />
                ) : (
                  <p className="text-content-muted">Floor plan not available.</p>
                )}
              </CardContent>
            </Card>
          )}

          {tab === 'reviews' && (
            <div className="space-y-4">
              {reviews.map((review) => (
                <ReviewCard key={review._id} review={review} />
              ))}
              <Card>
                <CardHeader>
                  <CardTitle>Leave a review</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-3" onSubmit={reviewForm.handleSubmit(submitReview)}>
                    <Select
                      label="Rating"
                      options={[5, 4, 3, 2, 1].map((n) => ({ value: String(n), label: \`\${n} stars\` }))}
                      placeholder={null}
                      {...reviewForm.register('rating')}
                    />
                    <Textarea label="Comment" error={reviewForm.formState.errors.comment?.message} {...reviewForm.register('comment')} />
                    <Button type="submit">Submit review</Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          )}

          {tab === 'location' && (
            <MapEmbed
              address={venue.address}
              city={venue.city}
              lat={venue.location?.coordinates?.[1]}
              lng={venue.location?.coordinates?.[0]}
              height="h-80"
            />
          )}
        </div>

        <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <Card>
            <CardHeader>
              <CardTitle>
                {formatCurrency(venue.pricePerHour)}
                <span className="text-sm font-normal text-content-muted"> / hour</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-3" onSubmit={bookingForm.handleSubmit(submitBooking)}>
                <div>
                  <p className="mb-2 text-sm font-medium">Availability</p>
                  <Calendar
                    value={watch.date}
                    onChange={(d) => bookingForm.setValue('date', d, { shouldValidate: true })}
                  />
                  {bookingForm.formState.errors.date && (
                    <p className="mt-1 text-xs text-danger">{bookingForm.formState.errors.date.message}</p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Select label="Start" options={slots.map((s) => ({ value: s, label: s }))} placeholder={null} {...bookingForm.register('startTime')} />
                  <Select label="End" options={slots.map((s) => ({ value: s, label: s }))} placeholder={null} {...bookingForm.register('endTime')} />
                </div>
                <Input label="Team size" type="number" min={1} {...bookingForm.register('teamSize')} />
                <Textarea label="Notes" rows={3} {...bookingForm.register('notes')} />
                <div className="rounded-xl bg-surface-muted px-3 py-2 text-sm">
                  Estimated total: <strong>{formatCurrency(estimate)}</strong>
                </div>
                <Button type="submit" fullWidth>
                  Request booking
                </Button>
              </form>
            </CardContent>
          </Card>

          <OwnerCard
            owner={venue.owner}
            onMessage={() => {
              if (!isAuthenticated) navigate('/login');
              else navigate('/app/messages', { state: { venueId: venue._id, venueName: venue.name } });
            }}
          />
        </div>
      </div>
    </div>
  );
}
`
);

write(
  'pages/customer/Dashboard.jsx',
  `
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CalendarDays, Heart, MapPin, MessageSquare } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import StatsCard from '../../components/cards/StatsCard';
import BookingCard from '../../components/cards/BookingCard';
import VenueCard from '../../components/cards/VenueCard';
import Button from '../../components/ui/Button';
import { fetchMyBookings, selectMyBookings } from '../../store/slices/bookingSlice';
import { fetchVenues, selectVenues } from '../../store/slices/venueSlice';
import { selectFavorites } from '../../store/slices/userSlice';
import { selectNotifications } from '../../store/slices/notificationSlice';
import { isUpcoming } from '../../helpers/booking';
import { useAuth } from '../../hooks/useAuth';

export default function CustomerDashboard() {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const bookings = useSelector(selectMyBookings);
  const venues = useSelector(selectVenues);
  const favorites = useSelector(selectFavorites);
  const notifications = useSelector(selectNotifications);

  useEffect(() => {
    dispatch(fetchMyBookings());
    dispatch(fetchVenues());
  }, [dispatch]);

  const upcoming = bookings.filter((b) => isUpcoming(b.date) && b.status !== 'cancelled');
  const favVenues = venues.filter((v) => favorites.includes(v._id)).slice(0, 3);

  return (
    <div>
      <PageHeader
        title={\`Welcome back, \${user?.name?.split(' ')[0] || 'there'}\`}
        description="Manage bookings, team seats, favorites, and messages."
        actions={
          <Button>
            <Link to="/search">Find a venue</Link>
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard label="Upcoming" value={upcoming.length} icon={<CalendarDays className="h-5 w-5" />} />
        <StatsCard label="Favorites" value={favorites.length} icon={<Heart className="h-5 w-5" />} />
        <StatsCard label="Notifications" value={notifications.filter((n) => !n.isRead).length} icon={<MessageSquare className="h-5 w-5" />} />
        <StatsCard label="Cities explored" value={new Set(bookings.map((b) => b.venue?.city).filter(Boolean)).size || 1} icon={<MapPin className="h-5 w-5" />} />
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Upcoming reservations</h2>
            <Link to="/app/bookings" className="text-sm text-brand-600 hover:underline">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {upcoming.slice(0, 3).map((b) => (
              <BookingCard key={b._id} booking={b} showActions={false} />
            ))}
            {upcoming.length === 0 && <p className="text-sm text-content-muted">No upcoming bookings yet.</p>}
          </div>
        </div>
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Favorite venues</h2>
            <Link to="/app/favorites" className="text-sm text-brand-600 hover:underline">
              Manage
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
            {favVenues.map((v) => (
              <VenueCard key={v._id} venue={v} favorite />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
`
);

write(
  'pages/customer/Bookings.jsx',
  `
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
`
);

write(
  'pages/customer/Checkout.jsx',
  `
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Alert from '../../components/ui/Alert';
import { formatCurrency, formatDate } from '../../lib/format';
import { payBooking } from '../../store/slices/bookingSlice';
import { useToast } from '../../components/ui/Toast';

export default function Checkout() {
  const { state } = useLocation();
  const booking = state?.booking;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const [method, setMethod] = useState('card');
  const [loading, setLoading] = useState(false);

  if (!booking) {
    return (
      <div>
        <Alert tone="warning" title="No booking selected">
          Choose a booking from My Bookings to continue checkout.
        </Alert>
        <Button className="mt-4" onClick={() => navigate('/app/bookings')}>
          Go to bookings
        </Button>
      </div>
    );
  }

  const pay = async () => {
    setLoading(true);
    const result = await dispatch(
      payBooking({
        bookingId: booking._id,
        paymentMethod: method,
        transactionId: \`txn_\${Date.now()}\`,
      })
    );
    setLoading(false);
    if (result.meta.requestStatus === 'fulfilled') {
      toast.success('Payment successful');
      navigate('/app/bookings/success', { state: { booking } });
    } else {
      toast.error('Payment failed', result.payload);
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader title="Checkout" description="Confirm payment for your reservation." />
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Booking summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p className="font-semibold text-content">{booking.venue?.name || 'Venue'}</p>
            <p className="text-content-muted">{formatDate(booking.date)}</p>
            <p className="text-content-muted">
              {booking.startTime} – {booking.endTime}
            </p>
            <p className="text-lg font-bold">{formatCurrency(booking.totalAmount)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Payment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Select
              label="Method"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              options={[
                { value: 'card', label: 'Credit / Debit card' },
                { value: 'paypal', label: 'PayPal' },
                { value: 'bank', label: 'Bank transfer' },
              ]}
              placeholder={null}
            />
            {method === 'card' && (
              <>
                <Input label="Cardholder" placeholder="Name on card" />
                <Input label="Card number" placeholder="4242 4242 4242 4242" />
                <div className="grid grid-cols-2 gap-3">
                  <Input label="Expiry" placeholder="MM/YY" />
                  <Input label="CVC" placeholder="123" />
                </div>
              </>
            )}
            <Button fullWidth loading={loading} onClick={pay}>
              Pay {formatCurrency(booking.totalAmount)}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
`
);

write(
  'pages/customer/BookingSuccess.jsx',
  `
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
            ? \`\${booking.venue?.name || 'Your venue'} on \${formatDate(booking.date)} · \${formatCurrency(booking.totalAmount)}\`
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
`
);

write(
  'pages/customer/Favorites.jsx',
  `
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageHeader from '../../components/common/PageHeader';
import VenueCard from '../../components/cards/VenueCard';
import EmptyState from '../../components/ui/EmptyState';
import { fetchVenues, selectVenues } from '../../store/slices/venueSlice';
import { selectFavorites, toggleFavorite } from '../../store/slices/userSlice';
import { useNavigate } from 'react-router-dom';

export default function Favorites() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const venues = useSelector(selectVenues);
  const favorites = useSelector(selectFavorites);

  useEffect(() => {
    dispatch(fetchVenues());
  }, [dispatch]);

  const list = venues.filter((v) => favorites.includes(v._id));

  return (
    <div>
      <PageHeader title="Favorite venues" description="Spaces you saved for later." />
      {list.length === 0 ? (
        <EmptyState
          title="No favorites yet"
          description="Tap the heart on any venue to save it here."
          actionLabel="Explore venues"
          onAction={() => navigate('/search')}
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {list.map((venue) => (
            <VenueCard
              key={venue._id}
              venue={venue}
              favorite
              onToggleFavorite={(id) => dispatch(toggleFavorite(id))}
            />
          ))}
        </div>
      )}
    </div>
  );
}
`
);

write(
  'pages/customer/Team.jsx',
  `
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import PageHeader from '../../components/common/PageHeader';
import Table from '../../components/ui/Table';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { teamMemberSchema } from '../../schemas/booking';
import {
  addTeamMember,
  assignSeat,
  removeTeamMember,
  selectTeam,
} from '../../store/slices/userSlice';
import { selectSeats } from '../../store/slices/ownerSlice';
import { useToast } from '../../components/ui/Toast';
import { cn } from '../../lib/cn';

export default function Team() {
  const dispatch = useDispatch();
  const toast = useToast();
  const team = useSelector(selectTeam);
  const seats = useSelector(selectSeats);
  const [open, setOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(teamMemberSchema),
    defaultValues: { name: '', email: '', role: 'Member' },
  });

  return (
    <div>
      <PageHeader
        title="Team members"
        description="Invite teammates and assign seats for your next booking."
        actions={
          <Button onClick={() => setOpen(true)}>Add member</Button>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Table
          columns={[
            { key: 'name', header: 'Name' },
            { key: 'email', header: 'Email' },
            { key: 'role', header: 'Role' },
            {
              key: 'seat',
              header: 'Seat',
              render: (seat, row) => (
                <Select
                  value={seat || ''}
                  onChange={(e) => {
                    dispatch(assignSeat({ memberId: row.id, seat: e.target.value }));
                    toast.success('Seat updated');
                  }}
                  options={seats.map((s) => ({ value: s.id, label: s.id }))}
                  placeholder="Unassigned"
                  className="min-w-[120px]"
                />
              ),
            },
            {
              key: 'id',
              header: '',
              render: (id) => (
                <Button size="sm" variant="ghost" onClick={() => dispatch(removeTeamMember(id))}>
                  Remove
                </Button>
              ),
            },
          ]}
          data={team}
          empty="No team members yet"
        />

        <Card>
          <CardHeader>
            <CardTitle>Seat map</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-6 gap-2">
              {seats.map((seat) => {
                const assigned = team.find((m) => m.seat === seat.id);
                return (
                  <div
                    key={seat.id}
                    className={cn(
                      'rounded-lg border px-2 py-3 text-center text-xs font-medium',
                      assigned
                        ? 'border-brand-300 bg-brand-50 text-brand-700 dark:bg-brand-950'
                        : seat.status === 'occupied'
                          ? 'border-danger/30 bg-danger-soft text-danger'
                          : 'border-border bg-surface-muted text-content-muted'
                    )}
                    title={assigned?.name || seat.status}
                  >
                    {seat.id}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Add team member"
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={form.handleSubmit((values) => {
                dispatch(addTeamMember(values));
                toast.success('Member added');
                form.reset();
                setOpen(false);
              })}
            >
              Add
            </Button>
          </div>
        }
      >
        <div className="space-y-3">
          <Input label="Name" error={form.formState.errors.name?.message} {...form.register('name')} />
          <Input label="Email" error={form.formState.errors.email?.message} {...form.register('email')} />
          <Input label="Role" error={form.formState.errors.role?.message} {...form.register('role')} />
        </div>
      </Modal>
    </div>
  );
}
`
);

write(
  'pages/customer/Messages.jsx',
  `
import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PageHeader from '../../components/common/PageHeader';
import { Card } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Textarea from '../../components/ui/Textarea';
import EmptyState from '../../components/ui/EmptyState';
import { selectOwnerMessages, sendOwnerMessage } from '../../store/slices/ownerSlice';
import { formatRelative } from '../../lib/format';
import { cn } from '../../lib/cn';

export default function Messages() {
  const threads = useSelector(selectOwnerMessages);
  const location = useLocation();
  const dispatch = useDispatch();
  const initialId =
    threads.find((t) => t.venueId === location.state?.venueId)?.id || threads[0]?.id || null;
  const [activeId, setActiveId] = useState(initialId);
  const [text, setText] = useState('');

  const active = useMemo(() => threads.find((t) => t.id === activeId), [threads, activeId]);

  const send = () => {
    if (!text.trim() || !active) return;
    // Reuse owner message store with customer role from customer side
    const thread = threads.find((t) => t.id === active.id);
    if (thread) {
      thread.messages.push({
        id: \`msg-\${Date.now()}\`,
        from: 'customer',
        text: text.trim(),
        at: new Date().toISOString(),
      });
    }
    // Force redux update via owner action for demo parity
    dispatch(sendOwnerMessage({ threadId: active.id, text: text.trim() }));
    setText('');
  };

  if (!threads.length) {
    return <EmptyState title="No conversations" description="Message a venue owner from a venue page." />;
  }

  return (
    <div>
      <PageHeader title="Messages" description="Chat with venue owners about availability and logistics." />
      <Card className="grid min-h-[520px] overflow-hidden md:grid-cols-[260px_1fr]">
        <div className="border-b border-border md:border-b-0 md:border-r">
          {threads.map((thread) => (
            <button
              key={thread.id}
              type="button"
              onClick={() => setActiveId(thread.id)}
              className={cn(
                'block w-full border-b border-border px-4 py-3 text-left hover:bg-surface-muted',
                activeId === thread.id && 'bg-brand-50 dark:bg-brand-950/40'
              )}
            >
              <p className="text-sm font-semibold">{thread.venueName}</p>
              <p className="text-xs text-content-muted">{thread.with}</p>
            </button>
          ))}
        </div>
        <div className="flex flex-col">
          <div className="border-b border-border px-4 py-3">
            <p className="font-semibold">{active?.venueName}</p>
            <p className="text-xs text-content-muted">with {active?.with}</p>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {active?.messages.map((msg) => (
              <div
                key={msg.id}
                className={cn('flex', msg.from === 'customer' ? 'justify-end' : 'justify-start')}
              >
                <div
                  className={cn(
                    'max-w-[80%] rounded-2xl px-3 py-2 text-sm',
                    msg.from === 'customer'
                      ? 'bg-brand-600 text-white'
                      : 'bg-surface-muted text-content'
                  )}
                >
                  <p>{msg.text}</p>
                  <p className={cn('mt-1 text-2xs', msg.from === 'customer' ? 'text-brand-100' : 'text-content-muted')}>
                    {formatRelative(msg.at)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2 border-t border-border p-4">
            <Textarea
              rows={2}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write a message…"
              className="min-h-0"
            />
            <Button onClick={send}>Send</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
`
);

write(
  'pages/customer/Notifications.jsx',
  `
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageHeader from '../../components/common/PageHeader';
import NotificationItem from '../../components/cards/NotificationItem';
import Button from '../../components/ui/Button';
import EmptyState from '../../components/ui/EmptyState';
import {
  fetchNotifications,
  markAllRead,
  markNotificationRead,
  selectNotifications,
} from '../../store/slices/notificationSlice';

export default function Notifications() {
  const dispatch = useDispatch();
  const list = useSelector(selectNotifications);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  return (
    <div>
      <PageHeader
        title="Notifications"
        description="Booking updates, messages, and reminders."
        actions={
          <Button variant="outline" onClick={() => dispatch(markAllRead())}>
            Mark all read
          </Button>
        }
      />
      {list.length === 0 ? (
        <EmptyState title="You're all caught up" />
      ) : (
        <div className="mx-auto max-w-2xl space-y-2">
          {list.map((n) => (
            <NotificationItem
              key={n._id}
              notification={n}
              onClick={(item) => dispatch(markNotificationRead(item._id))}
            />
          ))}
        </div>
      )}
    </div>
  );
}
`
);

write(
  'pages/customer/Profile.jsx',
  `
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import PageHeader from '../../components/common/PageHeader';
import ProfileCard from '../../components/cards/ProfileCard';
import Input from '../../components/ui/Input';
import Textarea from '../../components/ui/Textarea';
import Button from '../../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { profileSchema } from '../../schemas/auth';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../components/ui/Toast';

export default function Profile() {
  const { user, updateProfile, loading } = useAuth();
  const toast = useToast();
  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      bio: '',
      avatar: '',
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        company: user.company || '',
        bio: user.bio || '',
        avatar: user.avatar || '',
      });
    }
  }, [user, form]);

  const onSubmit = async (values) => {
    const result = await updateProfile(values);
    if (result.meta.requestStatus === 'fulfilled') toast.success('Profile updated');
    else toast.error('Update failed', result.payload);
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Profile" description="Manage your personal details and preferences." />
      <ProfileCard user={user} />
      <Card>
        <CardHeader>
          <CardTitle>Edit profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4 md:grid-cols-2" onSubmit={form.handleSubmit(onSubmit)}>
            <Input label="Name" error={form.formState.errors.name?.message} {...form.register('name')} />
            <Input label="Email" error={form.formState.errors.email?.message} {...form.register('email')} />
            <Input label="Phone" {...form.register('phone')} />
            <Input label="Company" {...form.register('company')} />
            <div className="md:col-span-2">
              <Textarea label="Bio" rows={4} {...form.register('bio')} />
            </div>
            <div className="md:col-span-2">
              <Button type="submit" loading={loading}>
                Save changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
`
);

console.log('pages batch 2 done');
