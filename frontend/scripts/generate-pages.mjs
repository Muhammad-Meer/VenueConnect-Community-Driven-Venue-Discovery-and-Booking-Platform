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

// ========== AUTH ==========
write(
  'pages/auth/Login.jsx',
  `
import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../../schemas/auth';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../components/ui/Toast';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Alert from '../../components/ui/Alert';
import { Mail, Lock } from 'lucide-react';

export default function Login() {
  const { login, loading, error, isAuthenticated, homePath, clearError } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: 'customer@venuehub.app', password: 'demo1234' },
  });

  useEffect(() => {
    if (isAuthenticated) navigate(from || homePath, { replace: true });
  }, [isAuthenticated, homePath, navigate, from]);

  useEffect(() => () => clearError(), [clearError]);

  const onSubmit = async (values) => {
    const result = await login(values);
    if (login.fulfilled.match(result) || result?.meta?.requestStatus === 'fulfilled') {
      toast.success('Welcome back', 'You are signed in.');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-content">Sign in</h1>
      <p className="mt-1 text-sm text-content-muted">Access your VenueHub workspace.</p>

      <div className="mt-4 rounded-xl border border-border bg-surface-muted p-3 text-xs text-content-secondary">
        <p className="font-semibold text-content">Demo accounts</p>
        <p>customer@venuehub.app · owner@venuehub.app · admin@venuehub.app</p>
        <p>Password: any 6+ characters</p>
      </div>

      {error && (
        <Alert tone="danger" className="mt-4" title="Sign in failed">
          {error}
        </Alert>
      )}

      <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Email"
          type="email"
          leftIcon={<Mail className="h-4 w-4" />}
          error={errors.email?.message}
          {...register('email')}
        />
        <Input
          label="Password"
          type="password"
          leftIcon={<Lock className="h-4 w-4" />}
          error={errors.password?.message}
          {...register('password')}
        />
        <div className="flex items-center justify-between text-sm">
          <Link to="/forgot-password" className="text-brand-600 hover:underline">
            Forgot password?
          </Link>
        </div>
        <Button type="submit" fullWidth loading={loading}>
          Sign in
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-content-muted">
        New here?{' '}
        <Link to="/register" className="font-medium text-brand-600 hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}
`
);

write(
  'pages/auth/Register.jsx',
  `
import { useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '../../schemas/auth';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../components/ui/Toast';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Checkbox from '../../components/ui/Checkbox';
import Button from '../../components/ui/Button';
import Alert from '../../components/ui/Alert';

export default function Register() {
  const [params] = useSearchParams();
  const defaultRole = params.get('role') === 'owner' ? 'venue_owner' : 'customer';
  const { register: registerUser, loading, error, isAuthenticated, homePath, clearError } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: defaultRole,
      phone: '',
      acceptTerms: false,
    },
  });

  useEffect(() => {
    if (isAuthenticated) navigate(homePath, { replace: true });
  }, [isAuthenticated, homePath, navigate]);

  useEffect(() => () => clearError(), [clearError]);

  const onSubmit = async (values) => {
    const result = await registerUser(values);
    if (result?.meta?.requestStatus === 'fulfilled') {
      toast.success('Account created', 'Welcome to VenueHub.');
      navigate('/email-confirmation');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-content">Create your account</h1>
      <p className="mt-1 text-sm text-content-muted">Start booking or listing venues in minutes.</p>

      {error && (
        <Alert tone="danger" className="mt-4" title="Registration failed">
          {error}
        </Alert>
      )}

      <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Input label="Full name" error={errors.name?.message} {...register('name')} />
        <Input label="Email" type="email" error={errors.email?.message} {...register('email')} />
        <Input label="Phone" error={errors.phone?.message} {...register('phone')} />
        <Select
          label="I am a"
          options={[
            { value: 'customer', label: 'Customer / Team' },
            { value: 'venue_owner', label: 'Venue Owner' },
          ]}
          placeholder={null}
          error={errors.role?.message}
          {...register('role')}
        />
        <Input label="Password" type="password" error={errors.password?.message} {...register('password')} />
        <Input
          label="Confirm password"
          type="password"
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />
        <Checkbox
          label="I agree to the Terms and Privacy Policy"
          error={errors.acceptTerms?.message}
          {...register('acceptTerms')}
        />
        <Button type="submit" fullWidth loading={loading}>
          Create account
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-content-muted">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-brand-600 hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
`
);

write(
  'pages/auth/ForgotPassword.jsx',
  `
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema } from '../../schemas/auth';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Alert from '../../components/ui/Alert';

export default function ForgotPassword() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(forgotPasswordSchema) });

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 600));
    setSent(true);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Reset password</h1>
      <p className="mt-1 text-sm text-content-muted">
        Enter your email and we will send reset instructions.
      </p>
      {sent ? (
        <Alert tone="success" className="mt-6" title="Check your inbox">
          If an account exists for that email, a reset link is on the way.
        </Alert>
      ) : (
        <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Input label="Email" type="email" error={errors.email?.message} {...register('email')} />
          <Button type="submit" fullWidth loading={isSubmitting}>
            Send reset link
          </Button>
        </form>
      )}
      <p className="mt-6 text-center text-sm">
        <Link to="/login" className="text-brand-600 hover:underline">
          Back to sign in
        </Link>
      </p>
    </div>
  );
}
`
);

write(
  'pages/auth/EmailConfirmation.jsx',
  `
import { Link } from 'react-router-dom';
import { MailCheck } from 'lucide-react';
import Button from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { useAuth } from '../../hooks/useAuth';

export default function EmailConfirmation() {
  const { homePath, user } = useAuth();
  return (
    <div className="container-app flex min-h-[70vh] items-center justify-center py-16">
      <Card className="max-w-lg p-8 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-success-soft text-success">
          <MailCheck className="h-8 w-8" />
        </div>
        <h1 className="mt-5 text-2xl font-bold">Confirm your email</h1>
        <p className="mt-2 text-sm text-content-muted">
          We sent a confirmation link to <strong className="text-content">{user?.email || 'your inbox'}</strong>.
          You can continue exploring while we verify your account.
        </p>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Button asChild>
            <Link to={homePath || '/app'}>Go to dashboard</Link>
          </Button>
          <Button variant="outline">
            <Link to="/search">Browse venues</Link>
          </Button>
        </div>
      </Card>
    </div>
  );
}
`
);

// ========== PUBLIC ==========
write(
  'pages/public/Home.jsx',
  `
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
    navigate(\`/search?\${params.toString()}\`);
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
`
);

write(
  'pages/public/Search.jsx',
  `
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
        description={\`\${venues.length} spaces match your filters\`}
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
`
);

console.log('pages batch 1 done');
