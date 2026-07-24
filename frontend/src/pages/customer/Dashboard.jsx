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
        title={`Welcome back, ${user?.name?.split(' ')[0] || 'there'}`}
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
