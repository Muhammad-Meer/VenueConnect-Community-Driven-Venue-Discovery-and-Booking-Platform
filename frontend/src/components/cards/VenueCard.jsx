import { Link } from 'react-router-dom';
import { Heart, MapPin, Star, Users, BadgeCheck } from 'lucide-react';
import { cn } from '../../lib/cn';
import { formatCurrency, formatRating } from '../../lib/format';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

export default function VenueCard({ venue, favorite, onToggleFavorite, className }) {
  if (!venue) return null;
  const image = venue.images?.[0];
  const ownerName = venue.owner?.name;

  return (
    <article
      className={cn(
        'group card-surface overflow-hidden transition hover:-translate-y-0.5 hover:shadow-md',
        className
      )}
    >
      <div className="relative">
        <Link to={`/venues/${venue._id}`}>
          <img
            src={image}
            alt={venue.name}
            className="h-48 w-full object-cover transition duration-500 group-hover:scale-[1.02]"
          />
        </Link>
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          {venue.isVerified || venue.isApproved ? (
            <Badge tone="success" leftIcon={<BadgeCheck className="h-3 w-3" />}>
              Verified
            </Badge>
          ) : null}
          {venue.workspaceType && (
            <Badge tone="brand">{venue.workspaceType.replaceAll('_', ' ')}</Badge>
          )}
        </div>
        {onToggleFavorite && (
          <button
            type="button"
            onClick={() => onToggleFavorite(venue._id)}
            className={cn(
              'absolute right-3 top-3 rounded-full bg-surface/90 p-2 shadow-sm backdrop-blur transition hover:scale-105',
              favorite ? 'text-danger' : 'text-content-muted'
            )}
            aria-label="Toggle favorite"
          >
            <Heart className={cn('h-4 w-4', favorite && 'fill-current')} />
          </button>
        )}
      </div>

      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Link to={`/venues/${venue._id}`} className="text-base font-semibold text-content hover:text-brand-600">
              {venue.name}
            </Link>
            <p className="mt-1 flex items-center gap-1 text-sm text-content-muted">
              <MapPin className="h-3.5 w-3.5" />
              {venue.neighborhood ? `${venue.neighborhood}, ` : ''}
              {venue.city}
            </p>
          </div>
          <div className="inline-flex items-center gap-1 rounded-full bg-warning-soft px-2 py-1 text-xs font-semibold text-warning">
            <Star className="h-3.5 w-3.5 fill-current" />
            {formatRating(venue.averageRating)}
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="inline-flex items-center gap-1 text-content-secondary">
            <Users className="h-4 w-4" />
            {venue.capacity} seats
          </span>
          <span className="font-semibold text-content">
            {formatCurrency(venue.pricePerHour)}
            <span className="font-normal text-content-muted">/hr</span>
          </span>
        </div>

        {ownerName && <p className="text-xs text-content-muted">Hosted by {ownerName}</p>}

        <Button as={Link} className="w-full" onClick={(e) => e.stopPropagation()}>
          <Link to={`/venues/${venue._id}`} className="contents">
            View details
          </Link>
        </Button>
      </div>
    </article>
  );
}
