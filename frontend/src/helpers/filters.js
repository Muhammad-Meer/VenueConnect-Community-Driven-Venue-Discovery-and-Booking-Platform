import { BUDGET_RANGES, TEAM_SIZES } from '../constants/venues';

export function applyVenueFilters(venues = [], filters = {}) {
  return venues.filter((venue) => {
    if (filters.city && !venue.city?.toLowerCase().includes(filters.city.toLowerCase())) {
      return false;
    }

    if (
      filters.neighborhood &&
      !(
        venue.neighborhood?.toLowerCase().includes(filters.neighborhood.toLowerCase()) ||
        venue.address?.toLowerCase().includes(filters.neighborhood.toLowerCase())
      )
    ) {
      return false;
    }

    if (filters.workspaceType && venue.workspaceType && venue.workspaceType !== filters.workspaceType) {
      return false;
    }

    if (filters.query) {
      const q = filters.query.toLowerCase();
      const haystack = `${venue.name} ${venue.city} ${venue.address} ${venue.description}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }

    if (filters.budget) {
      const range = BUDGET_RANGES.find((b) => b.value === filters.budget);
      if (range) {
        const price = Number(venue.pricePerHour) || 0;
        if (price < range.min || price > range.max) return false;
      }
    }

    if (filters.minPrice != null && Number(venue.pricePerHour) < Number(filters.minPrice)) {
      return false;
    }

    if (filters.maxPrice != null && Number(venue.pricePerHour) > Number(filters.maxPrice)) {
      return false;
    }

    if (filters.teamSize) {
      const size = TEAM_SIZES.find((t) => t.value === filters.teamSize);
      if (size) {
        const capacity = Number(venue.capacity) || 0;
        if (capacity < size.min) return false;
      }
    }

    if (filters.amenities?.length) {
      const list = (venue.amenities || []).map((a) => a.toLowerCase());
      const needed = filters.amenities.map((a) => a.toLowerCase());
      if (!needed.every((a) => list.some((x) => x.includes(a) || a.includes(x)))) {
        return false;
      }
    }

    if (filters.verifiedOnly && !venue.isVerified && !venue.isApproved) {
      return false;
    }

    if (filters.minRating && Number(venue.averageRating || 0) < Number(filters.minRating)) {
      return false;
    }

    return true;
  });
}

export function sortVenues(venues = [], sortBy = 'featured') {
  const list = [...venues];
  switch (sortBy) {
    case 'price_asc':
      return list.sort((a, b) => (a.pricePerHour || 0) - (b.pricePerHour || 0));
    case 'price_desc':
      return list.sort((a, b) => (b.pricePerHour || 0) - (a.pricePerHour || 0));
    case 'rating':
      return list.sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0));
    case 'capacity':
      return list.sort((a, b) => (b.capacity || 0) - (a.capacity || 0));
    case 'newest':
      return list.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    default:
      return list;
  }
}
