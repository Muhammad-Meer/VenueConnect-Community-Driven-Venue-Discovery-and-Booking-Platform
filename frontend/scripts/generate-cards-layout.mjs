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
  'components/cards/VenueCard.jsx',
  `
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
        <Link to={\`/venues/\${venue._id}\`}>
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
            <Link to={\`/venues/\${venue._id}\`} className="text-base font-semibold text-content hover:text-brand-600">
              {venue.name}
            </Link>
            <p className="mt-1 flex items-center gap-1 text-sm text-content-muted">
              <MapPin className="h-3.5 w-3.5" />
              {venue.neighborhood ? \`\${venue.neighborhood}, \` : ''}
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
          <Link to={\`/venues/\${venue._id}\`} className="contents">
            View details
          </Link>
        </Button>
      </div>
    </article>
  );
}
`
);

write(
  'components/cards/BookingCard.jsx',
  `
import { CalendarDays, Clock, MapPin } from 'lucide-react';
import { formatCurrency, formatDate } from '../../lib/format';
import { BOOKING_STATUS, PAYMENT_STATUS } from '../../constants/venues';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { Card } from '../ui/Card';

export default function BookingCard({
  booking,
  onCancel,
  onReschedule,
  onPay,
  onAccept,
  onReject,
  showActions = true,
}) {
  if (!booking) return null;
  const venueName = booking.venue?.name || 'Venue';
  const status = BOOKING_STATUS[booking.status] || BOOKING_STATUS.pending;
  const payment = PAYMENT_STATUS[booking.paymentStatus] || PAYMENT_STATUS.pending;

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-semibold text-content">{venueName}</h3>
            <Badge tone={status.tone}>{status.label}</Badge>
            <Badge tone={payment.tone}>{payment.label}</Badge>
          </div>
          <p className="flex items-center gap-1.5 text-sm text-content-muted">
            <MapPin className="h-4 w-4" />
            {booking.venue?.address || booking.venue?.city || '—'}
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-content-secondary">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4" />
              {formatDate(booking.date)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {booking.startTime} – {booking.endTime}
            </span>
            <span className="font-semibold text-content">{formatCurrency(booking.totalAmount)}</span>
          </div>
        </div>

        {showActions && (
          <div className="flex flex-wrap gap-2">
            {onPay && booking.paymentStatus !== 'paid' && booking.status !== 'cancelled' && (
              <Button size="sm" onClick={() => onPay(booking)}>
                Pay now
              </Button>
            )}
            {onReschedule && (
              <Button size="sm" variant="outline" onClick={() => onReschedule(booking)}>
                Reschedule
              </Button>
            )}
            {onCancel && (
              <Button size="sm" variant="danger" onClick={() => onCancel(booking)}>
                Cancel
              </Button>
            )}
            {onAccept && booking.status === 'pending' && (
              <Button size="sm" variant="success" onClick={() => onAccept(booking)}>
                Accept
              </Button>
            )}
            {onReject && booking.status === 'pending' && (
              <Button size="sm" variant="danger" onClick={() => onReject(booking)}>
                Reject
              </Button>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
`
);

write(
  'components/cards/ReviewCard.jsx',
  `
import { Star } from 'lucide-react';
import Avatar from '../ui/Avatar';
import { formatRelative } from '../../lib/format';
import { Card } from '../ui/Card';

export default function ReviewCard({ review }) {
  if (!review) return null;
  return (
    <Card className="p-4">
      <div className="flex items-start gap-3">
        <Avatar name={review.customer?.name || 'User'} src={review.customer?.avatar} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-medium text-content">{review.customer?.name || 'Guest'}</p>
            <p className="text-xs text-content-muted">{formatRelative(review.createdAt)}</p>
          </div>
          <div className="mt-1 flex items-center gap-0.5 text-warning">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={\`h-3.5 w-3.5 \${i < review.rating ? 'fill-current' : 'text-border'}\`}
              />
            ))}
          </div>
          <p className="mt-2 text-sm text-content-secondary">{review.comment}</p>
        </div>
      </div>
    </Card>
  );
}
`
);

write(
  'components/cards/StatsCard.jsx',
  `
import { cn } from '../../lib/cn';
import { Card } from '../ui/Card';

export default function StatsCard({ label, value, hint, icon, trend, className }) {
  return (
    <Card className={cn('p-5', className)}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-content-muted">{label}</p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-content">{value}</p>
          {hint && <p className="mt-1 text-xs text-content-muted">{hint}</p>}
          {trend && (
            <p className={cn('mt-2 text-xs font-medium', trend.up ? 'text-success' : 'text-danger')}>
              {trend.label}
            </p>
          )}
        </div>
        {icon && (
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-300">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}
`
);

write(
  'components/cards/ProfileCard.jsx',
  `
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';
import { Card } from '../ui/Card';
import { ROLE_LABELS } from '../../constants/roles';

export default function ProfileCard({ user, actions }) {
  if (!user) return null;
  return (
    <Card className="p-6">
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Avatar name={user.name} src={user.avatar} size="xl" />
          <div>
            <h2 className="text-xl font-semibold text-content">{user.name}</h2>
            <p className="text-sm text-content-muted">{user.email}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <Badge tone="brand">{ROLE_LABELS[user.role] || user.role}</Badge>
              {user.isVerified && <Badge tone="success">Verified</Badge>}
            </div>
          </div>
        </div>
        {actions}
      </div>
    </Card>
  );
}
`
);

write(
  'components/cards/OwnerCard.jsx',
  `
import { Mail, Phone } from 'lucide-react';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import { Card } from '../ui/Card';

export default function OwnerCard({ owner, onMessage }) {
  if (!owner) return null;
  return (
    <Card className="p-5">
      <div className="flex items-center gap-3">
        <Avatar name={owner.name} src={owner.avatar} size="lg" />
        <div>
          <p className="font-semibold text-content">{owner.name}</p>
          <p className="text-sm text-content-muted">Venue owner</p>
        </div>
      </div>
      <div className="mt-4 space-y-2 text-sm text-content-secondary">
        {owner.email && (
          <p className="flex items-center gap-2">
            <Mail className="h-4 w-4" /> {owner.email}
          </p>
        )}
        {owner.phone && (
          <p className="flex items-center gap-2">
            <Phone className="h-4 w-4" /> {owner.phone}
          </p>
        )}
      </div>
      {onMessage && (
        <Button className="mt-4 w-full" variant="outline" onClick={onMessage}>
          Message owner
        </Button>
      )}
    </Card>
  );
}
`
);

write(
  'components/cards/NotificationItem.jsx',
  `
import { Bell, CalendarDays, MessageSquare, Star } from 'lucide-react';
import { cn } from '../../lib/cn';
import { formatRelative } from '../../lib/format';

const icons = {
  booking: CalendarDays,
  message: MessageSquare,
  review: Star,
  default: Bell,
};

export default function NotificationItem({ notification, onClick }) {
  const Icon = icons[notification.type] || icons.default;
  return (
    <button
      type="button"
      onClick={() => onClick?.(notification)}
      className={cn(
        'flex w-full items-start gap-3 rounded-xl border border-border px-4 py-3 text-left transition hover:bg-surface-muted',
        !notification.isRead && 'bg-brand-50/50 dark:bg-brand-950/30'
      )}
    >
      <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-surface-muted text-brand-600">
        <Icon className="h-4 w-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center justify-between gap-2">
          <span className="text-sm font-semibold text-content">{notification.title}</span>
          <span className="text-2xs text-content-muted">{formatRelative(notification.createdAt)}</span>
        </span>
        <span className="mt-0.5 block text-sm text-content-secondary">{notification.message}</span>
      </span>
      {!notification.isRead && <span className="mt-2 h-2 w-2 rounded-full bg-brand-600" />}
    </button>
  );
}
`
);

write(
  'components/common/Logo.jsx',
  `
import { Link } from 'react-router-dom';
import { Building2 } from 'lucide-react';
import { cn } from '../../lib/cn';
import { config } from '../../config';

export default function Logo({ className, to = '/', compact = false }) {
  return (
    <Link to={to} className={cn('inline-flex items-center gap-2 font-display font-bold text-content', className)}>
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white shadow-sm">
        <Building2 className="h-5 w-5" />
      </span>
      {!compact && <span className="text-lg tracking-tight">{config.appName}</span>}
    </Link>
  );
}
`
);

write(
  'components/common/ThemeToggle.jsx',
  `
import { Moon, Sun } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { selectThemeMode, toggleTheme } from '../../store/slices/themeSlice';
import Button from '../ui/Button';

export default function ThemeToggle({ className }) {
  const mode = useSelector(selectThemeMode);
  const dispatch = useDispatch();
  return (
    <Button
      variant="ghost"
      size="icon"
      className={className}
      onClick={() => dispatch(toggleTheme())}
      aria-label="Toggle theme"
    >
      {mode === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  );
}
`
);

write(
  'components/common/LoadingScreen.jsx',
  `
import Spinner from '../ui/Spinner';
import Logo from './Logo';

export default function LoadingScreen({ label = 'Loading VenueHub…' }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-surface-muted">
      <Logo />
      <Spinner size="lg" />
      <p className="text-sm text-content-muted">{label}</p>
    </div>
  );
}
`
);

write(
  'components/common/PageHeader.jsx',
  `
import Breadcrumb from '../ui/Breadcrumb';
import { cn } from '../../lib/cn';

export default function PageHeader({ title, description, breadcrumbs, actions, className }) {
  return (
    <div className={cn('mb-6 space-y-3 md:mb-8', className)}>
      {breadcrumbs?.length > 0 && <Breadcrumb items={breadcrumbs} />}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-content md:text-3xl">{title}</h1>
          {description && <p className="mt-1 max-w-2xl text-sm text-content-muted md:text-base">{description}</p>}
        </div>
        {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
      </div>
    </div>
  );
}
`
);

write(
  'components/common/StatusBadge.jsx',
  `
import Badge from '../ui/Badge';
import { BOOKING_STATUS, PAYMENT_STATUS } from '../../constants/venues';

export default function StatusBadge({ status, type = 'booking' }) {
  const map = type === 'payment' ? PAYMENT_STATUS : BOOKING_STATUS;
  const meta = map[status] || { label: status, tone: 'neutral' };
  return <Badge tone={meta.tone}>{meta.label}</Badge>;
}
`
);

write(
  'layouts/MainLayout.jsx',
  `
import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-surface-muted">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
`
);

write(
  'layouts/DashboardLayout.jsx',
  `
import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useSelector } from 'react-redux';
import { selectUser } from '../store/slices/authSlice';
import { getNavForRole } from '../constants/navigation';
import { cn } from '../lib/cn';
import Logo from '../components/common/Logo';
import ThemeToggle from '../components/common/ThemeToggle';
import Avatar from '../components/ui/Avatar';
import Button from '../components/ui/Button';
import Header from '../components/layout/Header';

export default function DashboardLayout({ basePath = '/app' }) {
  const user = useSelector(selectUser);
  const nav = getNavForRole(user?.role);
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface-muted">
      <div className="lg:hidden sticky top-0 z-sticky flex items-center justify-between border-b border-border bg-surface px-4 py-3">
        <Logo to={basePath} />
        <Button variant="ghost" size="icon" onClick={() => setOpen((v) => !v)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      <div className="mx-auto flex max-w-[1600px]">
        <aside
          className={cn(
            'fixed inset-y-0 left-0 z-overlay w-72 border-r border-border bg-surface p-4 transition lg:static lg:translate-x-0 lg:z-0',
            open ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          <div className="mb-6 hidden lg:block">
            <Logo to={basePath} />
          </div>
          <nav className="space-y-1">
            {nav.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.href}
                  to={item.href}
                  end={item.href === basePath}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition',
                      isActive
                        ? 'bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-200'
                        : 'text-content-secondary hover:bg-surface-muted hover:text-content'
                    )
                  }
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  {item.label}
                </NavLink>
              );
            })}
          </nav>
          <div className="mt-8 rounded-2xl border border-border bg-surface-muted p-4">
            <div className="flex items-center gap-3">
              <Avatar name={user?.name} src={user?.avatar} />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{user?.name}</p>
                <p className="truncate text-xs text-content-muted">{user?.email}</p>
              </div>
            </div>
            <div className="mt-3">
              <ThemeToggle />
            </div>
          </div>
        </aside>

        {open && (
          <button
            type="button"
            className="fixed inset-0 z-[250] bg-slate-950/40 lg:hidden"
            onClick={() => setOpen(false)}
            aria-label="Close sidebar"
          />
        )}

        <div className="min-w-0 flex-1">
          <Header />
          <div className="p-4 md:p-6 lg:p-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
`
);

write(
  'layouts/AuthLayout.jsx',
  `
import { Outlet, Link } from 'react-router-dom';
import Logo from '../components/common/Logo';

export default function AuthLayout() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-brand-700 lg:flex lg:flex-col lg:justify-between p-10 text-white">
        <Logo className="text-white [&_span:last-child]:text-white" to="/" />
        <div>
          <h1 className="max-w-md font-display text-4xl font-bold leading-tight">
            Book premium workspaces with confidence.
          </h1>
          <p className="mt-4 max-w-md text-brand-100">
            VenueHub connects teams with verified venues, transparent pricing, and seamless booking.
          </p>
        </div>
        <p className="text-sm text-brand-100">Trusted by hybrid teams worldwide.</p>
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brand-500/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-10 h-80 w-80 rounded-full bg-brand-400/20 blur-3xl" />
      </div>
      <div className="flex flex-col justify-center px-6 py-10 sm:px-10">
        <div className="mb-8 lg:hidden">
          <Logo to="/" />
        </div>
        <div className="mx-auto w-full max-w-md">
          <Outlet />
          <p className="mt-8 text-center text-sm text-content-muted">
            <Link to="/" className="text-brand-600 hover:underline">
              Back to home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
`
);

write(
  'components/layout/Navbar.jsx',
  `
import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, Bell } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import Logo from '../common/Logo';
import ThemeToggle from '../common/ThemeToggle';
import Button from '../ui/Button';
import Avatar from '../ui/Avatar';
import Dropdown from '../ui/Dropdown';
import { publicNav } from '../../constants/navigation';
import { logout, selectIsAuthenticated, selectUser } from '../../store/slices/authSlice';
import { selectUnreadCount } from '../../store/slices/notificationSlice';
import { ROLE_HOME } from '../../constants/roles';
import { cn } from '../../lib/cn';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const user = useSelector(selectUser);
  const isAuth = useSelector(selectIsAuthenticated);
  const unread = useSelector(selectUnreadCount);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const home = ROLE_HOME[user?.role] || '/app';

  return (
    <header className="sticky top-0 z-sticky border-b border-border/80 bg-surface/85 backdrop-blur-xl">
      <div className="container-app flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="hidden items-center gap-1 md:flex">
            {publicNav.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    'rounded-lg px-3 py-2 text-sm font-medium transition',
                    isActive ? 'bg-surface-muted text-content' : 'text-content-secondary hover:text-content'
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          {isAuth ? (
            <>
              <Button variant="ghost" size="icon" onClick={() => navigate(\`\${home}/notifications\`)} className="relative">
                <Bell className="h-5 w-5" />
                {unread > 0 && (
                  <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-danger px-1 text-[10px] text-white">
                    {unread}
                  </span>
                )}
              </Button>
              <Dropdown
                align="right"
                trigger={
                  <button type="button" className="rounded-full focus-ring">
                    <Avatar name={user?.name} src={user?.avatar} />
                  </button>
                }
                items={[
                  { label: 'Dashboard', onClick: () => navigate(home) },
                  { label: 'Profile', onClick: () => navigate(\`\${home.includes('owner') || home.includes('admin') ? home : '/app'}/profile\`.replace('//', '/')) },
                  { divider: true },
                  {
                    label: 'Sign out',
                    danger: true,
                    onClick: () => {
                      dispatch(logout());
                      navigate('/');
                    },
                  },
                ]}
              />
            </>
          ) : (
            <>
              <Button variant="ghost" onClick={() => navigate('/login')}>
                Sign in
              </Button>
              <Button onClick={() => navigate('/register')}>Get started</Button>
            </>
          )}
        </div>

        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen((v) => !v)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {open && (
        <div className="border-t border-border bg-surface px-4 py-4 md:hidden">
          <div className="space-y-1">
            {publicNav.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm font-medium text-content hover:bg-surface-muted"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            <ThemeToggle />
            {isAuth ? (
              <Button className="flex-1" onClick={() => { setOpen(false); navigate(home); }}>
                Dashboard
              </Button>
            ) : (
              <>
                <Button variant="outline" className="flex-1" onClick={() => { setOpen(false); navigate('/login'); }}>
                  Sign in
                </Button>
                <Button className="flex-1" onClick={() => { setOpen(false); navigate('/register'); }}>
                  Join
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
`
);

write(
  'components/layout/Header.jsx',
  `
import { Bell, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../ui/Button';
import { selectUnreadCount } from '../../store/slices/notificationSlice';
import { logout, selectUser } from '../../store/slices/authSlice';
import { ROLE_HOME } from '../../constants/roles';
import ThemeToggle from '../common/ThemeToggle';

export default function Header() {
  const unread = useSelector(selectUnreadCount);
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const home = ROLE_HOME[user?.role] || '/app';

  return (
    <div className="sticky top-0 z-sticky hidden items-center justify-between border-b border-border bg-surface/90 px-6 py-3 backdrop-blur lg:flex">
      <div className="relative w-full max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-content-muted" />
        <input
          className="input-base pl-10"
          placeholder="Quick search…"
          onKeyDown={(e) => {
            if (e.key === 'Enter') navigate(\`/search?q=\${encodeURIComponent(e.target.value)}\`);
          }}
        />
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Button variant="ghost" size="icon" className="relative" onClick={() => navigate(\`\${home}/notifications\`)}>
          <Bell className="h-5 w-5" />
          {unread > 0 && (
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-danger" />
          )}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            dispatch(logout());
            navigate('/');
          }}
        >
          Sign out
        </Button>
      </div>
    </div>
  );
}
`
);

write(
  'components/layout/Footer.jsx',
  `
import { Link } from 'react-router-dom';
import Logo from '../common/Logo';
import { footerLinks } from '../../constants/navigation';
import { config } from '../../config';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="container-app grid gap-10 py-12 md:grid-cols-4">
        <div className="md:col-span-1">
          <Logo />
          <p className="mt-4 text-sm text-content-muted">
            The modern platform for discovering and booking verified workspaces and event venues.
          </p>
        </div>
        {Object.entries(footerLinks).map(([group, links]) => (
          <div key={group}>
            <p className="text-sm font-semibold capitalize text-content">{group}</p>
            <ul className="mt-3 space-y-2">
              {links.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm text-content-muted hover:text-brand-600">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border py-4">
        <div className="container-app flex flex-col items-center justify-between gap-2 text-xs text-content-muted sm:flex-row">
          <p>© {new Date().getFullYear()} {config.appName}. All rights reserved.</p>
          <p>Built for modern hybrid teams.</p>
        </div>
      </div>
    </footer>
  );
}
`
);

write(
  'components/layout/Sidebar.jsx',
  `
import { NavLink } from 'react-router-dom';
import { cn } from '../../lib/cn';

export default function Sidebar({ items = [], basePath }) {
  return (
    <aside className="w-64 shrink-0 border-r border-border bg-surface p-4">
      <nav className="space-y-1">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.href === basePath}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition',
                  isActive
                    ? 'bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-200'
                    : 'text-content-secondary hover:bg-surface-muted'
                )
              }
            >
              {Icon && <Icon className="h-4 w-4" />}
              {item.label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
`
);

write(
  'components/ui/index.js',
  `
export { default as Button } from './Button';
export { default as Input } from './Input';
export { default as Textarea } from './Textarea';
export { default as Checkbox } from './Checkbox';
export { default as Switch } from './Switch';
export { default as Select } from './Select';
export { default as Modal } from './Modal';
export { default as Drawer } from './Drawer';
export { default as Dropdown } from './Dropdown';
export { default as Popover } from './Popover';
export { default as Tooltip } from './Tooltip';
export { default as ToastProvider, useToast } from './Toast';
export { default as Alert } from './Alert';
export { default as Badge } from './Badge';
export { default as Avatar } from './Avatar';
export { default as Tabs } from './Tabs';
export { default as Accordion } from './Accordion';
export { default as Pagination } from './Pagination';
export { default as Table } from './Table';
export { default as SearchBar } from './SearchBar';
export { default as FilterPanel } from './FilterPanel';
export { default as Spinner } from './Spinner';
export { default as Loader } from './Loader';
export { default as Skeleton, SkeletonCard } from './Skeleton';
export { default as EmptyState } from './EmptyState';
export { default as ErrorState } from './ErrorState';
export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './Card';
export { default as Breadcrumb } from './Breadcrumb';
export { default as Calendar } from './Calendar';
export { default as Gallery } from './Gallery';
export { default as MapEmbed } from './MapEmbed';
export { default as ChartCard } from './ChartCard';
`
);

console.log('cards + layout complete');
