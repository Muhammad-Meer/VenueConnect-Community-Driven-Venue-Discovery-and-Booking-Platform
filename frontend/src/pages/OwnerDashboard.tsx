import { Link } from 'react-router-dom'
import {
  Wallet,
  CalendarDays,
  Building2,
  Star,
  Plus,
  ArrowUpRight,
} from 'lucide-react'
import { DashboardLayout } from '@/components/layout'
import {
  Button,
  Card,
  CardHeader,
  ChartPlaceholder,
  Badge,
  Table,
  Timeline,
} from '@/components/ui'
import { StatsCard } from '@/components/cards'
import { ownerNav } from '@/constants/navigation'
import {
  ownerStats,
  chartPlaceholder,
  mockBookings,
  mockVenues,
} from '@/data/mockData'
import { formatCurrency, formatDate } from '@/lib/format'
import { iconSize } from '@/theme'

export default function OwnerDashboard() {
  const ownerVenues = mockVenues.filter((v) => v.ownerId === 'u2')
  const recentBookings = mockBookings.slice(0, 4)

  return (
    <DashboardLayout
      items={ownerNav}
      title="Owner"
      pageTitle="Owner dashboard"
      pageSubtitle="Overview of your farm venues and bookings."
      actions={
        <Link to="/owner/venues/new">
          <Button leftIcon={<Plus size={iconSize.sm} />}>Add venue</Button>
        </Link>
      }
    >
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        <StatsCard
          label="Revenue"
          value={formatCurrency(ownerStats.revenue)}
          change={ownerStats.revenueChange}
          icon={<Wallet size={iconSize.md} />}
        />
        <StatsCard
          label="Bookings"
          value={ownerStats.bookings}
          change={ownerStats.bookingsChange}
          icon={<CalendarDays size={iconSize.md} />}
        />
        <StatsCard
          label="Active venues"
          value={ownerStats.venues}
          icon={<Building2 size={iconSize.md} />}
          hint="Currently listed"
        />
        <StatsCard
          label="Avg. rating"
          value={ownerStats.rating}
          change={ownerStats.occupancyChange}
          icon={<Star size={iconSize.md} />}
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader
            title="Booking trends"
            subtitle="Last 7 months"
            action={
              <Badge variant="primary">Live demo data</Badge>
            }
          />
          <ChartPlaceholder data={chartPlaceholder} height={220} />
        </Card>

        <Card>
          <CardHeader title="Recent activity" />
          <Timeline
            items={[
              {
                id: '1',
                title: 'New booking request',
                description: 'Sunrise Meadow Farm',
                time: '2h ago',
                status: 'current',
              },
              {
                id: '2',
                title: 'Payment received',
                description: formatCurrency(45000),
                time: 'Yesterday',
                status: 'done',
              },
              {
                id: '3',
                title: 'Venue approved',
                description: 'Golden Field Dairy',
                time: '3d ago',
                status: 'done',
              },
              {
                id: '4',
                title: 'Review posted',
                description: '5★ from Ayesha K.',
                time: '5d ago',
                status: 'done',
              },
            ]}
          />
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card padding="none">
          <div className="p-6 pb-0">
            <CardHeader
              title="Your venues"
              action={
                <Link to="/owner/venues">
                  <Button variant="ghost" size="sm" rightIcon={<ArrowUpRight size={iconSize.sm} />}>
                    Manage
                  </Button>
                </Link>
              }
            />
          </div>
          <div className="divide-y divide-divider">
            {ownerVenues.slice(0, 4).map((v) => (
              <Link
                key={v.id}
                to={`/owner/venues/${v.id}/edit`}
                className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors"
              >
                <img
                  src={v.image}
                  alt=""
                  className="h-12 w-16 rounded-lg object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-small font-semibold text-primary truncate">{v.name}</p>
                  <p className="text-caption text-muted">{v.city}</p>
                </div>
                <Badge
                  variant={
                    v.status === 'active'
                      ? 'success'
                      : v.status === 'pending'
                        ? 'warning'
                        : 'muted'
                  }
                >
                  {v.status}
                </Badge>
              </Link>
            ))}
          </div>
        </Card>

        <Card padding="none">
          <div className="p-6 pb-0">
            <CardHeader title="Latest bookings" />
          </div>
          <Table
            className="border-0 rounded-none"
            columns={[
              {
                key: 'venue',
                header: 'Venue',
                render: (b) => (
                  <span className="font-medium text-primary">{b.venueName}</span>
                ),
              },
              {
                key: 'date',
                header: 'Date',
                render: (b) => formatDate(b.date),
              },
              {
                key: 'status',
                header: 'Status',
                render: (b) => (
                  <Badge
                    variant={
                      b.status === 'confirmed'
                        ? 'success'
                        : b.status === 'pending'
                          ? 'warning'
                          : b.status === 'cancelled'
                            ? 'danger'
                            : 'muted'
                    }
                  >
                    {b.status}
                  </Badge>
                ),
              },
              {
                key: 'total',
                header: 'Total',
                render: (b) => (
                  <span className="font-semibold">{formatCurrency(b.total)}</span>
                ),
              },
            ]}
            data={recentBookings}
            keyExtractor={(b) => b.id}
          />
        </Card>
      </div>
    </DashboardLayout>
  )
}
