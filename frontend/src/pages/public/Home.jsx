import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CalendarCheck2,
  MapPin,
  Shield,
  Sparkles,
  Users,
} from 'lucide-react';
import Button from '../../components/ui/Button';
import SearchBar from '../../components/ui/SearchBar';
import Select from '../../components/ui/Select';
import VenueCard from '../../components/cards/VenueCard';
import StatsCard from '../../components/cards/StatsCard';
import { fetchVenues, selectVenues } from '../../store/slices/venueSlice';
import { selectFavorites, toggleFavorite } from '../../store/slices/userSlice';
import { BUDGET_RANGES, CITIES, TEAM_SIZES, WORKSPACE_TYPES } from '../../constants/venues';
import Accordion from '../../components/ui/Accordion';

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const venues = useSelector(selectVenues);
  const favorites = useSelector(selectFavorites);
  const [query, setQuery] = useState('');
  const [city, setCity] = useState('');
  const [budget, setBudget] = useState('');
  const [teamSize, setTeamSize] = useState('');
  const [workspaceType, setWorkspaceType] = useState('');

  useEffect(() => {
    dispatch(fetchVenues());
  }, [dispatch]);

  const featured = venues.slice(0, 3);

  const goSearch = () => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (city) params.set('city', city);
    if (budget) params.set('budget', budget);
    if (teamSize) params.set('teamSize', teamSize);
    if (workspaceType) params.set('workspaceType', workspaceType);
    navigate(`/search?${params.toString()}`);
  };

  return (
    <div>
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-brand-50 to-surface-muted dark:from-brand-950/40 dark:to-surface-muted">
        <div className="container-app page-section">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-surface px-3 py-1 text-xs font-medium text-brand-700 dark:border-brand-800 dark:text-brand-200">
                <Sparkles className="h-3.5 w-3.5" />
                Verified venues · Instant booking
              </div>
              <h1 className="mt-5 font-display text-4xl font-extrabold tracking-tight text-content md:text-5xl lg:text-6xl">
                Find the perfect <span className="text-gradient">workspace</span> for every meeting.
              </h1>
              <p className="mt-4 max-w-xl text-base text-content-secondary md:text-lg">
                Search by city, neighborhood, budget, team size, and workspace type. Book meeting rooms,
                private offices, and event spaces with transparent pricing.
              </p>

              <div className="mt-8 rounded-2xl border border-border bg-surface p-4 shadow-lg">
                <SearchBar value={query} onChange={setQuery} onSubmit={goSearch} size="lg" />
                <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  <Select options={CITIES} value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" />
                  <Select options={BUDGET_RANGES} value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="Budget" />
                  <Select options={TEAM_SIZES} value={teamSize} onChange={(e) => setTeamSize(e.target.value)} placeholder="Team size" />
                  <Select options={WORKSPACE_TYPES} value={workspaceType} onChange={(e) => setWorkspaceType(e.target.value)} placeholder="Type" />
                </div>
                <Button className="mt-3 w-full sm:w-auto" onClick={goSearch} rightIcon={<ArrowRight className="h-4 w-4" />}>
                  Explore venues
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
                alt="Modern workspace"
                className="h-[420px] w-full rounded-3xl object-cover shadow-xl"
              />
              <div className="absolute -bottom-4 left-4 right-4 grid grid-cols-3 gap-2 rounded-2xl border border-border bg-surface/95 p-3 shadow-lg backdrop-blur">
                {[
                  { label: 'Venues', value: '320+' },
                  { label: 'Cities', value: '40+' },
                  { label: 'Avg rating', value: '4.8' },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <p className="text-lg font-bold text-content">{s.value}</p>
                    <p className="text-2xs text-content-muted">{s.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="container-app page-section">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard label="Verified listings" value="326" icon={<BadgeCheck className="h-5 w-5" />} />
          <StatsCard label="Teams booked" value="9.1k" icon={<Users className="h-5 w-5" />} />
          <StatsCard label="Cities covered" value="48" icon={<MapPin className="h-5 w-5" />} />
          <StatsCard label="Secure payments" value="100%" icon={<Shield className="h-5 w-5" />} />
        </div>
      </section>

      <section className="container-app pb-16">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Featured venues</h2>
            <p className="mt-1 text-sm text-content-muted">Hand-picked spaces loved by hybrid teams.</p>
          </div>
          <Button variant="outline" onClick={() => navigate('/search')}>
            View all
          </Button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((venue) => (
            <VenueCard
              key={venue._id}
              venue={venue}
              favorite={favorites.includes(venue._id)}
              onToggleFavorite={(id) => dispatch(toggleFavorite(id))}
            />
          ))}
        </div>
      </section>

      <section id="how-it-works" className="border-y border-border bg-surface py-16">
        <div className="container-app">
          <h2 className="text-center text-2xl font-bold md:text-3xl">How VenueHub works</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: MapPin,
                title: 'Search & filter',
                text: 'Filter by city, neighborhood, budget, team size, amenities, and workspace type.',
              },
              {
                icon: CalendarCheck2,
                title: 'Book with clarity',
                text: 'See live availability, seat maps, floor plans, and transparent hourly pricing.',
              },
              {
                icon: Building2,
                title: 'Meet with confidence',
                text: 'Chat with owners, manage team seats, and keep every reservation in one place.',
              },
            ].map((step) => (
              <div key={step.title} className="rounded-2xl border border-border bg-surface-muted p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-600 text-white">
                  <step.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-content-muted">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="container-app page-section">
        <div className="rounded-3xl bg-brand-700 px-6 py-12 text-white md:px-12">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold">List your venue on VenueHub</h2>
              <p className="mt-3 text-brand-100">
                Reach high-intent teams, manage availability, accept booking requests, and track revenue from one dashboard.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Button variant="secondary" className="bg-white text-brand-700 hover:bg-brand-50">
                <Link to="/register?role=owner">Become an owner</Link>
              </Button>
              <Button variant="outline" className="border-white/40 text-white hover:bg-white/10">
                <Link to="/search">Browse as customer</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container-app pb-20">
        <h2 className="mb-6 text-2xl font-bold">FAQ</h2>
        <Accordion
          items={[
            {
              id: '1',
              title: 'Can I cancel or reschedule a booking?',
              content: 'Yes. From My Bookings you can cancel or reschedule upcoming reservations based on venue policy.',
            },
            {
              id: '2',
              title: 'How does venue verification work?',
              content: 'Admins review listings, ownership documents, and quality signals before a venue receives a verified badge.',
            },
            {
              id: '3',
              title: 'Do you support team seat assignment?',
              content: 'Customers can manage team members and assign seats for confirmed bookings from the Team page.',
            },
          ]}
        />
      </section>
    </div>
  );
}
