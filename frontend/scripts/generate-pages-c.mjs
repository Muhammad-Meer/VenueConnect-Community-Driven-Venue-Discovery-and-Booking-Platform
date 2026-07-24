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
  'pages/owner/Dashboard.jsx',
  `
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Building2, CalendarDays, DollarSign, Percent } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import StatsCard from '../../components/cards/StatsCard';
import ChartCard from '../../components/ui/ChartCard';
import BookingCard from '../../components/cards/BookingCard';
import Button from '../../components/ui/Button';
import { fetchOwnerAnalytics, selectOwnerAnalytics } from '../../store/slices/ownerSlice';
import { fetchOwnerBookings, selectOwnerBookings } from '../../store/slices/bookingSlice';
import { formatCurrency, formatNumber } from '../../lib/format';

export default function OwnerDashboard() {
  const dispatch = useDispatch();
  const analytics = useSelector(selectOwnerAnalytics);
  const bookings = useSelector(selectOwnerBookings);

  useEffect(() => {
    dispatch(fetchOwnerAnalytics());
    dispatch(fetchOwnerBookings());
  }, [dispatch]);

  const pending = bookings.filter((b) => b.status === 'pending');

  return (
    <div>
      <PageHeader
        title="Owner dashboard"
        description="Track revenue, occupancy, and booking requests."
        actions={
          <Button>
            <Link to="/owner/venues/new">Add venue</Link>
          </Button>
        }
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard label="Revenue" value={formatCurrency(analytics.totalRevenue)} icon={<DollarSign className="h-5 w-5" />} />
        <StatsCard label="Bookings" value={formatNumber(analytics.totalBookings)} icon={<CalendarDays className="h-5 w-5" />} />
        <StatsCard label="Occupancy" value={\`\${analytics.occupancyRate}%\`} icon={<Percent className="h-5 w-5" />} />
        <StatsCard label="Pending requests" value={pending.length} icon={<Building2 className="h-5 w-5" />} />
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <ChartCard title="Revenue trend" description="Monthly performance" data={analytics.monthlyTrend} currency />
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Latest requests</h2>
            <Link to="/owner/requests" className="text-sm text-brand-600 hover:underline">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {pending.slice(0, 4).map((b) => (
              <BookingCard key={b._id} booking={b} showActions={false} />
            ))}
            {pending.length === 0 && <p className="text-sm text-content-muted">No pending requests.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
`
);

write(
  'pages/owner/Venues.jsx',
  `
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/ui/Button';
import Table from '../../components/ui/Table';
import Badge from '../../components/ui/Badge';
import { fetchVenues } from '../../store/slices/venueSlice';
import { formatCurrency } from '../../lib/format';

export default function OwnerVenues() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const venues = useSelector((s) => s.venue.ownerVenues);

  useEffect(() => {
    dispatch(fetchVenues());
  }, [dispatch]);

  return (
    <div>
      <PageHeader
        title="My venues"
        description="Create, edit, and manage multi-space listings."
        actions={
          <Button>
            <Link to="/owner/venues/new">Add venue</Link>
          </Button>
        }
      />
      <Table
        columns={[
          { key: 'name', header: 'Venue' },
          { key: 'city', header: 'City' },
          {
            key: 'pricePerHour',
            header: 'Price',
            render: (v) => formatCurrency(v),
          },
          { key: 'capacity', header: 'Capacity' },
          {
            key: 'isApproved',
            header: 'Status',
            render: (v, row) => (
              <Badge tone={v || row.isVerified ? 'success' : 'warning'}>
                {v || row.isVerified ? 'Live' : 'Pending'}
              </Badge>
            ),
          },
          {
            key: '_id',
            header: '',
            render: (id) => (
              <Button size="sm" variant="outline" onClick={() => navigate(\`/owner/venues/\${id}/edit\`)}>
                Edit
              </Button>
            ),
          },
        ]}
        data={venues}
        empty="No venues yet"
      />
    </div>
  );
}
`
);

write(
  'pages/owner/VenueForm.jsx',
  `
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import PageHeader from '../../components/common/PageHeader';
import Input from '../../components/ui/Input';
import Textarea from '../../components/ui/Textarea';
import Select from '../../components/ui/Select';
import Checkbox from '../../components/ui/Checkbox';
import Button from '../../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { venueSchema } from '../../schemas/venue';
import { AMENITIES, CITIES, WORKSPACE_TYPES } from '../../constants/venues';
import { createVenue, fetchVenueById, updateVenue } from '../../store/slices/venueSlice';
import { useToast } from '../../components/ui/Toast';

export default function VenueForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const current = useSelector((s) => s.venue.current);
  const [amenities, setAmenities] = useState([]);
  const [images, setImages] = useState(['']);

  const form = useForm({
    resolver: zodResolver(venueSchema),
    defaultValues: {
      name: '',
      description: '',
      address: '',
      city: '',
      neighborhood: '',
      capacity: 10,
      pricePerHour: 50,
      workspaceType: 'meeting_room',
      amenities: [],
      images: [],
      floorPlan: '',
    },
  });

  useEffect(() => {
    if (isEdit) dispatch(fetchVenueById(id));
  }, [dispatch, id, isEdit]);

  useEffect(() => {
    if (isEdit && current?._id === id) {
      form.reset({
        name: current.name || '',
        description: current.description || '',
        address: current.address || '',
        city: current.city || '',
        neighborhood: current.neighborhood || '',
        capacity: current.capacity || 10,
        pricePerHour: current.pricePerHour || 50,
        workspaceType: current.workspaceType || 'meeting_room',
        amenities: current.amenities || [],
        images: current.images || [],
        floorPlan: current.floorPlan || '',
      });
      setAmenities(current.amenities || []);
      setImages(current.images?.length ? current.images : ['']);
    }
  }, [current, form, id, isEdit]);

  const toggleAmenity = (value) => {
    setAmenities((prev) => (prev.includes(value) ? prev.filter((a) => a !== value) : [...prev, value]));
  };

  const onSubmit = async (values) => {
    const payload = {
      ...values,
      amenities,
      images: images.filter(Boolean),
      location: values.lat && values.lng ? { type: 'Point', coordinates: [Number(values.lng), Number(values.lat)] } : undefined,
    };
    const result = isEdit
      ? await dispatch(updateVenue({ id, payload }))
      : await dispatch(createVenue(payload));
    if (result.meta.requestStatus === 'fulfilled') {
      toast.success(isEdit ? 'Venue updated' : 'Venue created');
      navigate('/owner/venues');
    } else {
      toast.error('Save failed', result.payload);
    }
  };

  return (
    <div>
      <PageHeader
        title={isEdit ? 'Edit venue' : 'Add venue'}
        description="Configure spaces, gallery, amenities, pricing, and location."
      />
      <form className="grid gap-6 xl:grid-cols-2" onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Basics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input label="Name" error={form.formState.errors.name?.message} {...form.register('name')} />
            <Textarea label="Description" error={form.formState.errors.description?.message} {...form.register('description')} />
            <Input label="Address" error={form.formState.errors.address?.message} {...form.register('address')} />
            <div className="grid grid-cols-2 gap-3">
              <Select label="City" options={CITIES} error={form.formState.errors.city?.message} {...form.register('city')} />
              <Input label="Neighborhood" {...form.register('neighborhood')} />
            </div>
            <Select label="Workspace type" options={WORKSPACE_TYPES} placeholder={null} {...form.register('workspaceType')} />
            <div className="grid grid-cols-2 gap-3">
              <Input label="Capacity" type="number" error={form.formState.errors.capacity?.message} {...form.register('capacity')} />
              <Input label="Price / hour" type="number" error={form.formState.errors.pricePerHour?.message} {...form.register('pricePerHour')} />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Gallery upload</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {images.map((img, idx) => (
                <Input
                  key={idx}
                  label={\`Image URL \${idx + 1}\`}
                  value={img}
                  onChange={(e) => {
                    const next = [...images];
                    next[idx] = e.target.value;
                    setImages(next);
                  }}
                  placeholder="https://…"
                />
              ))}
              <Button type="button" variant="outline" onClick={() => setImages((p) => [...p, ''])}>
                Add image field
              </Button>
              <Input label="Floor plan URL" {...form.register('floorPlan')} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Amenities</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2 sm:grid-cols-2">
              {AMENITIES.map((a) => (
                <Checkbox
                  key={a.value}
                  label={a.label}
                  checked={amenities.includes(a.value)}
                  onChange={() => toggleAmenity(a.value)}
                />
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="xl:col-span-2">
          <Button type="submit">{isEdit ? 'Save changes' : 'Create venue'}</Button>
        </div>
      </form>
    </div>
  );
}
`
);

write(
  'pages/owner/Bookings.jsx',
  `
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageHeader from '../../components/common/PageHeader';
import BookingCard from '../../components/cards/BookingCard';
import EmptyState from '../../components/ui/EmptyState';
import { fetchOwnerBookings, selectOwnerBookings } from '../../store/slices/bookingSlice';

export default function OwnerBookings() {
  const dispatch = useDispatch();
  const bookings = useSelector(selectOwnerBookings);

  useEffect(() => {
    dispatch(fetchOwnerBookings());
  }, [dispatch]);

  return (
    <div>
      <PageHeader title="Bookings" description="All reservations across your venues." />
      <div className="space-y-3">
        {bookings.length === 0 ? (
          <EmptyState title="No bookings yet" />
        ) : (
          bookings.map((b) => <BookingCard key={b._id} booking={b} showActions={false} />)
        )}
      </div>
    </div>
  );
}
`
);

write(
  'pages/owner/Requests.jsx',
  `
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageHeader from '../../components/common/PageHeader';
import BookingCard from '../../components/cards/BookingCard';
import EmptyState from '../../components/ui/EmptyState';
import {
  acceptBookingLocal,
  fetchOwnerBookings,
  rejectBookingLocal,
  selectOwnerBookings,
} from '../../store/slices/bookingSlice';
import { useToast } from '../../components/ui/Toast';

export default function OwnerRequests() {
  const dispatch = useDispatch();
  const toast = useToast();
  const bookings = useSelector(selectOwnerBookings).filter((b) => b.status === 'pending');

  useEffect(() => {
    dispatch(fetchOwnerBookings());
  }, [dispatch]);

  return (
    <div>
      <PageHeader title="Booking requests" description="Accept or reject incoming reservation requests." />
      <div className="space-y-3">
        {bookings.length === 0 ? (
          <EmptyState title="No pending requests" />
        ) : (
          bookings.map((b) => (
            <BookingCard
              key={b._id}
              booking={b}
              onAccept={(booking) => {
                dispatch(acceptBookingLocal(booking._id));
                toast.success('Booking accepted');
              }}
              onReject={(booking) => {
                dispatch(rejectBookingLocal(booking._id));
                toast.success('Booking rejected');
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}
`
);

write(
  'pages/owner/Seats.jsx',
  `
import { useDispatch, useSelector } from 'react-redux';
import PageHeader from '../../components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { selectSeats, setSeatStatus } from '../../store/slices/ownerSlice';
import { cn } from '../../lib/cn';

export default function OwnerSeats() {
  const seats = useSelector(selectSeats);
  const dispatch = useDispatch();

  const cycle = (seat) => {
    const order = ['available', 'reserved', 'occupied'];
    const next = order[(order.indexOf(seat.status) + 1) % order.length];
    dispatch(setSeatStatus({ id: seat.id, status: next }));
  };

  return (
    <div>
      <PageHeader title="Seat inventory" description="Manage seat availability across your spaces." />
      <Card>
        <CardHeader>
          <CardTitle>Interactive seat map</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-wrap gap-2 text-xs">
            <span className="rounded-full bg-success-soft px-2 py-1 text-success">Available</span>
            <span className="rounded-full bg-warning-soft px-2 py-1 text-warning">Reserved</span>
            <span className="rounded-full bg-danger-soft px-2 py-1 text-danger">Occupied</span>
          </div>
          <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 md:grid-cols-8">
            {seats.map((seat) => (
              <button
                key={seat.id}
                type="button"
                onClick={() => cycle(seat)}
                className={cn(
                  'rounded-xl border px-2 py-4 text-sm font-semibold transition hover:scale-[1.02]',
                  seat.status === 'available' && 'border-success/30 bg-success-soft text-success',
                  seat.status === 'reserved' && 'border-warning/30 bg-warning-soft text-warning',
                  seat.status === 'occupied' && 'border-danger/30 bg-danger-soft text-danger'
                )}
              >
                {seat.id}
              </button>
            ))}
          </div>
          <p className="mt-4 text-sm text-content-muted">Click a seat to cycle its status.</p>
        </CardContent>
      </Card>
    </div>
  );
}
`
);

write(
  'pages/owner/Revenue.jsx',
  `
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageHeader from '../../components/common/PageHeader';
import StatsCard from '../../components/cards/StatsCard';
import ChartCard from '../../components/ui/ChartCard';
import { fetchOwnerAnalytics, selectOwnerAnalytics } from '../../store/slices/ownerSlice';
import { formatCurrency, formatNumber } from '../../lib/format';
import { DollarSign, TrendingUp } from 'lucide-react';

export default function OwnerRevenue() {
  const dispatch = useDispatch();
  const analytics = useSelector(selectOwnerAnalytics);

  useEffect(() => {
    dispatch(fetchOwnerAnalytics());
  }, [dispatch]);

  return (
    <div>
      <PageHeader title="Revenue" description="Understand earnings and top-performing venues." />
      <div className="grid gap-4 sm:grid-cols-2">
        <StatsCard label="Total revenue" value={formatCurrency(analytics.totalRevenue)} icon={<DollarSign className="h-5 w-5" />} />
        <StatsCard label="Total bookings" value={formatNumber(analytics.totalBookings)} icon={<TrendingUp className="h-5 w-5" />} />
      </div>
      <div className="mt-6">
        <ChartCard title="Monthly revenue" data={analytics.monthlyTrend} currency type="bar" />
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {(analytics.topVenues || []).map((v) => (
          <div key={v.name} className="card-surface p-4">
            <p className="font-semibold">{v.name}</p>
            <p className="mt-1 text-sm text-content-muted">
              {formatCurrency(v.totalRevenue)} · {v.totalBookings} bookings
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
`
);

write(
  'pages/owner/Customers.jsx',
  `
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageHeader from '../../components/common/PageHeader';
import Table from '../../components/ui/Table';
import { fetchOwnerBookings, selectOwnerBookings } from '../../store/slices/bookingSlice';
import { formatCurrency } from '../../lib/format';

export default function OwnerCustomers() {
  const dispatch = useDispatch();
  const bookings = useSelector(selectOwnerBookings);

  useEffect(() => {
    dispatch(fetchOwnerBookings());
  }, [dispatch]);

  const customers = useMemo(() => {
    const map = new Map();
    bookings.forEach((b) => {
      const key = b.customer?._id || b.customer?.email || b.customer?.name || 'unknown';
      const prev = map.get(key) || {
        id: key,
        name: b.customer?.name || 'Customer',
        email: b.customer?.email || '—',
        bookings: 0,
        spend: 0,
      };
      prev.bookings += 1;
      prev.spend += Number(b.totalAmount) || 0;
      map.set(key, prev);
    });
    return Array.from(map.values());
  }, [bookings]);

  return (
    <div>
      <PageHeader title="Customers" description="People who booked your venues." />
      <Table
        columns={[
          { key: 'name', header: 'Name' },
          { key: 'email', header: 'Email' },
          { key: 'bookings', header: 'Bookings' },
          { key: 'spend', header: 'Spend', render: (v) => formatCurrency(v) },
        ]}
        data={customers}
      />
    </div>
  );
}
`
);

write(
  'pages/owner/Messages.jsx',
  `
import Messages from '../customer/Messages';

export default function OwnerMessages() {
  return <Messages />;
}
`
);

write(
  'pages/owner/Settings.jsx',
  `
import { useDispatch, useSelector } from 'react-redux';
import PageHeader from '../../components/common/PageHeader';
import Switch from '../../components/ui/Switch';
import Select from '../../components/ui/Select';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { selectOwnerSettings, updateOwnerSettings } from '../../store/slices/ownerSlice';
import { useToast } from '../../components/ui/Toast';
import { useState } from 'react';

export default function OwnerSettings() {
  const settings = useSelector(selectOwnerSettings);
  const dispatch = useDispatch();
  const toast = useToast();
  const [form, setForm] = useState(settings);

  return (
    <div>
      <PageHeader title="Settings" description="Notifications, booking preferences, and account defaults." />
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Owner preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Switch
            label="Auto-accept bookings"
            description="Skip manual approval for verified customers"
            checked={form.autoAccept}
            onChange={(e) => setForm((f) => ({ ...f, autoAccept: e.target.checked }))}
          />
          <Switch
            label="Email notifications"
            checked={form.notifyEmail}
            onChange={(e) => setForm((f) => ({ ...f, notifyEmail: e.target.checked }))}
          />
          <Switch
            label="SMS notifications"
            checked={form.notifySms}
            onChange={(e) => setForm((f) => ({ ...f, notifySms: e.target.checked }))}
          />
          <Select
            label="Currency"
            value={form.currency}
            onChange={(e) => setForm((f) => ({ ...f, currency: e.target.value }))}
            options={['USD', 'EUR', 'GBP', 'CAD']}
            placeholder={null}
          />
          <Input
            label="Timezone"
            value={form.timezone}
            onChange={(e) => setForm((f) => ({ ...f, timezone: e.target.value }))}
          />
          <Button
            onClick={() => {
              dispatch(updateOwnerSettings(form));
              toast.success('Settings saved');
            }}
          >
            Save settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
`
);

write(
  'pages/admin/Dashboard.jsx',
  `
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Building2, CalendarDays, DollarSign, Users } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import StatsCard from '../../components/cards/StatsCard';
import ChartCard from '../../components/ui/ChartCard';
import { fetchAdminAnalytics, selectAdminAnalytics } from '../../store/slices/adminSlice';
import { formatCurrency, formatNumber } from '../../lib/format';

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const analytics = useSelector(selectAdminAnalytics);

  useEffect(() => {
    dispatch(fetchAdminAnalytics());
  }, [dispatch]);

  return (
    <div>
      <PageHeader title="Admin dashboard" description="Platform-wide health, growth, and revenue." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard label="Users" value={formatNumber(analytics.totalUsers)} icon={<Users className="h-5 w-5" />} />
        <StatsCard label="Venues" value={formatNumber(analytics.totalVenues)} icon={<Building2 className="h-5 w-5" />} />
        <StatsCard label="Bookings" value={formatNumber(analytics.totalBookings)} icon={<CalendarDays className="h-5 w-5" />} />
        <StatsCard label="GMV" value={formatCurrency(analytics.totalRevenue)} icon={<DollarSign className="h-5 w-5" />} />
      </div>
      <div className="mt-6">
        <ChartCard
          title="Platform revenue"
          description="Last 6 months"
          data={[...(analytics.revenueByMonth || [])].reverse()}
          currency
        />
      </div>
    </div>
  );
}
`
);

write(
  'pages/admin/Users.jsx',
  `
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageHeader from '../../components/common/PageHeader';
import Table from '../../components/ui/Table';
import Badge from '../../components/ui/Badge';
import { fetchAllUsers, selectUsers } from '../../store/slices/userSlice';
import { ROLE_LABELS } from '../../constants/roles';
import { formatDate } from '../../lib/format';

export default function AdminUsers() {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return (
    <div>
      <PageHeader title="User management" description="View and monitor platform users." />
      <Table
        columns={[
          { key: 'name', header: 'Name' },
          { key: 'email', header: 'Email' },
          {
            key: 'role',
            header: 'Role',
            render: (role) => <Badge tone="brand">{ROLE_LABELS[role] || role}</Badge>,
          },
          {
            key: 'isVerified',
            header: 'Verified',
            render: (v) => <Badge tone={v ? 'success' : 'warning'}>{v ? 'Yes' : 'No'}</Badge>,
          },
          {
            key: 'createdAt',
            header: 'Joined',
            render: (v) => formatDate(v),
          },
        ]}
        data={users}
      />
    </div>
  );
}
`
);

write(
  'pages/admin/Venues.jsx',
  `
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageHeader from '../../components/common/PageHeader';
import Table from '../../components/ui/Table';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import {
  approveVenueLocal,
  fetchVenues,
  rejectVenueLocal,
  selectVenues,
} from '../../store/slices/venueSlice';
import { useToast } from '../../components/ui/Toast';
import { formatCurrency } from '../../lib/format';

export default function AdminVenues() {
  const dispatch = useDispatch();
  const toast = useToast();
  const venues = useSelector(selectVenues);

  useEffect(() => {
    dispatch(fetchVenues());
  }, [dispatch]);

  return (
    <div>
      <PageHeader title="Venue listings" description="Approve listings and monitor catalog quality." />
      <Table
        columns={[
          { key: 'name', header: 'Venue' },
          { key: 'city', header: 'City' },
          { key: 'pricePerHour', header: 'Price', render: (v) => formatCurrency(v) },
          {
            key: 'isApproved',
            header: 'Status',
            render: (v) => <Badge tone={v ? 'success' : 'warning'}>{v ? 'Approved' : 'Pending'}</Badge>,
          },
          {
            key: '_id',
            header: 'Actions',
            render: (id, row) => (
              <div className="flex gap-2">
                {!row.isApproved && (
                  <Button
                    size="sm"
                    onClick={() => {
                      dispatch(approveVenueLocal(id));
                      toast.success('Venue approved');
                    }}
                  >
                    Approve
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    dispatch(rejectVenueLocal(id));
                    toast.warning('Venue marked pending');
                  }}
                >
                  Hold
                </Button>
              </div>
            ),
          },
        ]}
        data={venues}
      />
    </div>
  );
}
`
);

write(
  'pages/admin/Verification.jsx',
  `
import { useDispatch, useSelector } from 'react-redux';
import PageHeader from '../../components/common/PageHeader';
import { Card, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { approveVenueLocal, selectVenues } from '../../store/slices/venueSlice';
import { useToast } from '../../components/ui/Toast';

export default function AdminVerification() {
  const venues = useSelector(selectVenues).filter((v) => !v.isVerified);
  const dispatch = useDispatch();
  const toast = useToast();

  return (
    <div>
      <PageHeader title="Venue verification" description="Review ownership and quality signals before granting verified badges." />
      <div className="grid gap-4 md:grid-cols-2">
        {venues.map((venue) => (
          <Card key={venue._id}>
            <CardContent className="flex items-start justify-between gap-4 p-5">
              <div>
                <p className="font-semibold">{venue.name}</p>
                <p className="text-sm text-content-muted">
                  {venue.city} · Hosted by {venue.owner?.name || 'Owner'}
                </p>
                <div className="mt-2">
                  <Badge tone="warning">Needs verification</Badge>
                </div>
              </div>
              <Button
                size="sm"
                onClick={() => {
                  dispatch(approveVenueLocal(venue._id));
                  toast.success('Venue verified');
                }}
              >
                Verify
              </Button>
            </CardContent>
          </Card>
        ))}
        {venues.length === 0 && <p className="text-content-muted">All venues are verified.</p>}
      </div>
    </div>
  );
}
`
);

write(
  'pages/admin/Reviews.jsx',
  `
import { useDispatch, useSelector } from 'react-redux';
import PageHeader from '../../components/common/PageHeader';
import ReviewCard from '../../components/cards/ReviewCard';
import Button from '../../components/ui/Button';
import { moderateReview, removeReview, selectReviews } from '../../store/slices/reviewSlice';
import { useToast } from '../../components/ui/Toast';

export default function AdminReviews() {
  const reviews = useSelector(selectReviews);
  const dispatch = useDispatch();
  const toast = useToast();

  return (
    <div>
      <PageHeader title="Review moderation" description="Approve, hide, or remove community reviews." />
      <div className="mx-auto max-w-3xl space-y-4">
        {reviews.map((review) => (
          <div key={review._id} className="space-y-2">
            <ReviewCard review={review} />
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  dispatch(moderateReview({ id: review._id, status: 'approved' }));
                  toast.success('Review approved');
                }}
              >
                Approve
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  dispatch(moderateReview({ id: review._id, status: 'hidden' }));
                  toast.warning('Review hidden');
                }}
              >
                Hide
              </Button>
              <Button
                size="sm"
                variant="danger"
                onClick={() => {
                  dispatch(removeReview(review._id));
                  toast.success('Review removed');
                }}
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
`
);

write(
  'pages/admin/Reports.jsx',
  `
import { useDispatch, useSelector } from 'react-redux';
import PageHeader from '../../components/common/PageHeader';
import Table from '../../components/ui/Table';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { resolveReport, selectReports } from '../../store/slices/adminSlice';
import { formatDate } from '../../lib/format';
import { useToast } from '../../components/ui/Toast';

export default function AdminReports() {
  const reports = useSelector(selectReports);
  const dispatch = useDispatch();
  const toast = useToast();

  return (
    <div>
      <PageHeader title="Reports" description="Trust & safety queue from users." />
      <Table
        columns={[
          { key: 'type', header: 'Type' },
          { key: 'subject', header: 'Subject' },
          { key: 'target', header: 'Target' },
          {
            key: 'status',
            header: 'Status',
            render: (s) => <Badge tone={s === 'open' ? 'warning' : 'success'}>{s}</Badge>,
          },
          { key: 'createdAt', header: 'Opened', render: (v) => formatDate(v) },
          {
            key: 'id',
            header: '',
            render: (id, row) =>
              row.status === 'open' ? (
                <Button
                  size="sm"
                  onClick={() => {
                    dispatch(resolveReport(id));
                    toast.success('Report resolved');
                  }}
                >
                  Resolve
                </Button>
              ) : (
                '—'
              ),
          },
        ]}
        data={reports}
      />
    </div>
  );
}
`
);

write(
  'pages/admin/Analytics.jsx',
  `
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageHeader from '../../components/common/PageHeader';
import ChartCard from '../../components/ui/ChartCard';
import StatsCard from '../../components/cards/StatsCard';
import { fetchAdminAnalytics, selectAdminAnalytics } from '../../store/slices/adminSlice';
import { formatCurrency, formatNumber } from '../../lib/format';

export default function AdminAnalytics() {
  const dispatch = useDispatch();
  const analytics = useSelector(selectAdminAnalytics);

  useEffect(() => {
    dispatch(fetchAdminAnalytics());
  }, [dispatch]);

  return (
    <div>
      <PageHeader title="Analytics" description="Deep dive into platform performance." />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatsCard label="Users" value={formatNumber(analytics.totalUsers)} />
        <StatsCard label="Bookings" value={formatNumber(analytics.totalBookings)} />
        <StatsCard label="Revenue" value={formatCurrency(analytics.totalRevenue)} />
      </div>
      <ChartCard
        title="Revenue by month"
        data={[...(analytics.revenueByMonth || [])].reverse()}
        currency
        type="bar"
      />
    </div>
  );
}
`
);

write(
  'pages/admin/Settings.jsx',
  `
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageHeader from '../../components/common/PageHeader';
import Input from '../../components/ui/Input';
import Switch from '../../components/ui/Switch';
import Button from '../../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { selectAdminSettings, updateAdminSettings } from '../../store/slices/adminSlice';
import { useToast } from '../../components/ui/Toast';

export default function AdminSettings() {
  const settings = useSelector(selectAdminSettings);
  const [form, setForm] = useState(settings);
  const dispatch = useDispatch();
  const toast = useToast();

  return (
    <div>
      <PageHeader title="Platform settings" description="Control commission, approvals, and maintenance mode." />
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            label="Platform name"
            value={form.platformName}
            onChange={(e) => setForm((f) => ({ ...f, platformName: e.target.value }))}
          />
          <Input
            label="Commission rate (%)"
            type="number"
            value={form.commissionRate}
            onChange={(e) => setForm((f) => ({ ...f, commissionRate: Number(e.target.value) }))}
          />
          <Input
            label="Support email"
            value={form.supportEmail}
            onChange={(e) => setForm((f) => ({ ...f, supportEmail: e.target.value }))}
          />
          <Switch
            label="Require venue approval"
            checked={form.requireVenueApproval}
            onChange={(e) => setForm((f) => ({ ...f, requireVenueApproval: e.target.checked }))}
          />
          <Switch
            label="Require owner verification"
            checked={form.requireOwnerVerification}
            onChange={(e) => setForm((f) => ({ ...f, requireOwnerVerification: e.target.checked }))}
          />
          <Switch
            label="Maintenance mode"
            checked={form.maintenanceMode}
            onChange={(e) => setForm((f) => ({ ...f, maintenanceMode: e.target.checked }))}
          />
          <Button
            onClick={() => {
              dispatch(updateAdminSettings(form));
              toast.success('Platform settings saved');
            }}
          >
            Save settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
`
);

write(
  'pages/system/NotFound.jsx',
  `
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';

export default function NotFound() {
  return (
    <div className="container-app flex min-h-[70vh] flex-col items-center justify-center text-center">
      <p className="text-sm font-semibold text-brand-600">404</p>
      <h1 className="mt-2 text-3xl font-bold">Page not found</h1>
      <p className="mt-2 max-w-md text-content-muted">
        The page you are looking for does not exist or has been moved.
      </p>
      <Button className="mt-6">
        <Link to="/">Back home</Link>
      </Button>
    </div>
  );
}
`
);

write(
  'pages/system/Unauthorized.jsx',
  `
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import { useAuth } from '../../hooks/useAuth';

export default function Unauthorized() {
  const { homePath } = useAuth();
  return (
    <div className="container-app flex min-h-[70vh] flex-col items-center justify-center text-center">
      <p className="text-sm font-semibold text-danger">403</p>
      <h1 className="mt-2 text-3xl font-bold">Unauthorized</h1>
      <p className="mt-2 max-w-md text-content-muted">
        You do not have permission to view this area of VenueHub.
      </p>
      <div className="mt-6 flex gap-2">
        <Button>
          <Link to={homePath || '/'}>Go to dashboard</Link>
        </Button>
        <Button variant="outline">
          <Link to="/">Home</Link>
        </Button>
      </div>
    </div>
  );
}
`
);

console.log('pages batch 3 done');
