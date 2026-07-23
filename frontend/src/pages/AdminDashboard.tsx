import { Link } from 'react-router-dom'
import {
  Users,
  Building2,
  CalendarDays,
  Wallet,
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
import { adminNav } from '@/constants/navigation'
import {
  adminStats,
  chartPlaceholder,
  mockUsers,
  mockVenues,
  mockBookings,
} from '@/data/mockData'
import { formatCurrency, formatDate } from '@/lib/format'
import { iconSize } from '@/theme'

export default function AdminDashboard() {
  const pendingVenues = mockVenues.filter((v) => v.status === 'pending' || !v.isApproved)

  return (
    <DashboardLayout
      items={adminNav}
      title="Admin"
      pageTitle="Admin dashboard"
      pageSubtitle="Platform-wide metrics and moderation."
      actions={
        <Link to="/admin/reports">
          <Button variant="outline" rightIcon={<ArrowUpRight size={iconSize.sm} />}>
            View reports
          </Button>
        </Link>
      }
    >
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        <StatsCard
          label="Total users"
          value={adminStats.users.toLocaleString()}
          change={adminStats.usersChange}
          icon={<Users size={iconSize.md} />}
        />
        <StatsCard
          label="Venues"
          value={adminStats.venues}
          change={adminStats.venuesChange}
          icon={<Building2 size={iconSize.md} />}
        />
        <StatsCard
          label="Bookings"
          value={adminStats.bookings.toLocaleString()}
          change={adminStats.bookingsChange}
          icon={<CalendarDays size={iconSize.md} />}
        />
        <StatsCard
          label="Revenue"
          value={formatCurrency(adminStats.revenue)}
          change={adminStats.revenueChange}
          icon={<Wallet size={iconSize.md} />}
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader title="Platform growth" subtitle="Monthly bookings volume" />
          <ChartPlaceholder data={chartPlaceholder} height={220} />
        </Card>
        <Card>
          <CardHeader title="Moderation queue" />
          <Timeline
            items={[
              {
                id: '1',
                title: 'Venue pending approval',
                description: pendingVenues[0]?.name || 'Olive Grove Dairy',
                time: '1h ago',
                status: 'current',
              },
              {
                id: '2',
                title: 'New owner registered',
                description: 'Fatima Noor',
                time: '4h ago',
                status: 'done',
              },
              {
                id: '3',
                title: 'Report generated',
                description: 'Monthly revenue export',
                time: 'Yesterday',
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
              title="Recent users"
              action={
                <Link to="/admin/users">
                  <Button variant="ghost" size="sm">
                    View all
                  </Button>
                </Link>
              }
            />
          </div>
          <Table
            className="border-0 rounded-none"
            columns={[
              {
                key: 'name',
                header: 'Name',
                render: (u) => <span className="font-medium text-primary">{u.name}</span>,
              },
              {
                key: 'role',
                header: 'Role',
                render: (u) => (
                  <Badge variant={u.role === 'admin' ? 'warning' : u.role === 'owner' ? 'primary' : 'default'}>
                    {u.role}
                  </Badge>
                ),
              },
              {
                key: 'city',
                header: 'City',
                render: (u) => u.city,
              },
              {
                key: 'joined',
                header: 'Joined',
                render: (u) => formatDate(u.joinedAt),
              },
            ]}
            data={mockUsers}
            keyExtractor={(u) => u.id}
          />
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
                  <span className="font-medium text-primary line-clamp-1">{b.venueName}</span>
                ),
              },
              {
                key: 'user',
                header: 'Guest',
                render: (b) => b.userName,
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
                render: (b) => formatCurrency(b.total),
              },
            ]}
            data={mockBookings}
            keyExtractor={(b) => b.id}
          />
        </Card>
      </div>
    </DashboardLayout>
  )
}
