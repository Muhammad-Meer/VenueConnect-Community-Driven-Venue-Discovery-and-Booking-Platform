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
      navigate('/login', { state: { from: `/venues/${id}` } });
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
        description={`${venue.neighborhood ? venue.neighborhood + ', ' : ''}${venue.city}`}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Search', href: '/search' },
          { label: venue.name },
        ]}
        actions={
          <Button
            variant="outline"
            leftIcon={<Heart className={`h-4 w-4 ${favorites.includes(venue._id) ? 'fill-current text-danger' : ''}`} />}
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
                      options={[5, 4, 3, 2, 1].map((n) => ({ value: String(n), label: `${n} stars` }))}
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
