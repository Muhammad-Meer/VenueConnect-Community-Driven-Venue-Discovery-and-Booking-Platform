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
