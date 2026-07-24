import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SlidersHorizontal } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import SearchBar from '../../components/ui/SearchBar';
import FilterPanel from '../../components/ui/FilterPanel';
import Drawer from '../../components/ui/Drawer';
import Button from '../../components/ui/Button';
import Pagination from '../../components/ui/Pagination';
import EmptyState from '../../components/ui/EmptyState';
import { SkeletonCard } from '../../components/ui/Skeleton';
import VenueCard from '../../components/cards/VenueCard';
import MapEmbed from '../../components/ui/MapEmbed';
import {
  fetchVenues,
  resetFilters,
  selectFilteredVenues,
  selectVenueFilters,
  selectVenues,
  setFilters,
} from '../../store/slices/venueSlice';
import { selectFavorites, toggleFavorite } from '../../store/slices/userSlice';
import { usePagination } from '../../hooks/usePagination';

export default function Search() {
  const dispatch = useDispatch();
  const [params, setParams] = useSearchParams();
  const venues = useSelector(selectFilteredVenues);
  const all = useSelector(selectVenues);
  const filters = useSelector(selectVenueFilters);
  const favorites = useSelector(selectFavorites);
  const loading = useSelector((s) => s.venue.loading);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [query, setQuery] = useState(params.get('q') || '');
  const { page, setPage, totalPages, pageItems } = usePagination(venues, 9);

  useEffect(() => {
    dispatch(fetchVenues());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      setFilters({
        query: params.get('q') || '',
        city: params.get('city') || '',
        budget: params.get('budget') || '',
        teamSize: params.get('teamSize') || '',
        workspaceType: params.get('workspaceType') || '',
        neighborhood: params.get('neighborhood') || '',
      })
    );
    setQuery(params.get('q') || '');
  }, [params, dispatch]);

  const applyFilters = (next) => {
    dispatch(setFilters(next));
    const sp = new URLSearchParams();
    Object.entries(next).forEach(([k, v]) => {
      if (v && !Array.isArray(v)) sp.set(k === 'query' ? 'q' : k, v);
    });
    setParams(sp);
    setPage(1);
  };

  const first = pageItems[0];

  return (
    <div className="container-app page-section">
      <PageHeader
        title="Explore venues"
        description={`${venues.length} spaces match your filters`}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Search' },
        ]}
      />

      <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center">
        <SearchBar
          className="flex-1"
          value={query}
          onChange={setQuery}
          onSubmit={(v) => applyFilters({ ...filters, query: v })}
        />
        <Button variant="outline" className="lg:hidden" leftIcon={<SlidersHorizontal className="h-4 w-4" />} onClick={() => setDrawerOpen(true)}>
          Filters
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="hidden lg:block">
          <div className="card-surface sticky top-24 p-4">
            <FilterPanel
              filters={filters}
              onChange={applyFilters}
              onReset={() => {
                dispatch(resetFilters());
                setParams({});
                setQuery('');
              }}
            />
          </div>
        </aside>

        <div className="space-y-6">
          {first && (
            <MapEmbed
              address={first.address}
              city={first.city}
              lat={first.location?.coordinates?.[1]}
              lng={first.location?.coordinates?.[0]}
              height="h-56"
            />
          )}

          {loading && all.length === 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : pageItems.length === 0 ? (
            <EmptyState
              title="No venues found"
              description="Try adjusting city, budget, or workspace type."
              actionLabel="Reset filters"
              onAction={() => {
                dispatch(resetFilters());
                setParams({});
              }}
            />
          ) : (
            <>
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {pageItems.map((venue) => (
                  <VenueCard
                    key={venue._id}
                    venue={venue}
                    favorite={favorites.includes(venue._id)}
                    onToggleFavorite={(id) => dispatch(toggleFavorite(id))}
                  />
                ))}
              </div>
              <Pagination page={page} totalPages={totalPages} onChange={setPage} />
            </>
          )}
        </div>
      </div>

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="Filters">
        <FilterPanel
          filters={filters}
          onChange={(next) => {
            applyFilters(next);
          }}
          onReset={() => {
            dispatch(resetFilters());
            setParams({});
          }}
        />
      </Drawer>
    </div>
  );
}
