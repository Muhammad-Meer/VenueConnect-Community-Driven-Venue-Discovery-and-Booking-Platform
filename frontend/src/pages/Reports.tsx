import { useState } from 'react'
import { Download, FileBarChart } from 'lucide-react'
import { DashboardLayout } from '@/components/layout'
import {
  Button,
  Card,
  CardHeader,
  ChartPlaceholder,
  Badge,
  Table,
  Select,
} from '@/components/ui'
import { StatsCard } from '@/components/cards'
import { adminNav } from '@/constants/navigation'
import { mockReports, chartPlaceholder, adminStats } from '@/data/mockData'
import { formatCurrency, formatNumber } from '@/lib/format'
import { iconSize } from '@/theme'
import { useToast } from '@/components/ui'

export default function Reports() {
  const toast = useToast()
  const [period, setPeriod] = useState('month')

  return (
    <DashboardLayout
      items={adminNav}
      title="Admin"
      pageTitle="Reports"
      pageSubtitle="Analytics snapshots and exportable summaries."
      actions={
        <Button
          variant="outline"
          leftIcon={<Download size={iconSize.sm} />}
          onClick={() => toast.success('Export started', 'CSV download is UI-only.')}
        >
          Export
        </Button>
      }
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 text-small text-muted">
          <FileBarChart size={iconSize.sm} className="text-primary" />
          Demo analytics · not connected to live data
        </div>
        <Select
          className="sm:w-48"
          fullWidth={false}
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          options={[
            { value: 'week', label: 'This week' },
            { value: 'month', label: 'This month' },
            { value: 'quarter', label: 'This quarter' },
            { value: 'year', label: 'This year' },
          ]}
          placeholder="Period"
        />
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        <StatsCard
          label="Gross revenue"
          value={formatCurrency(adminStats.revenue)}
          change={adminStats.revenueChange}
        />
        <StatsCard
          label="Bookings"
          value={formatNumber(adminStats.bookings)}
          change={adminStats.bookingsChange}
        />
        <StatsCard
          label="Active users"
          value={formatNumber(adminStats.users)}
          change={adminStats.usersChange}
        />
        <StatsCard
          label="Active venues"
          value={adminStats.venues}
          change={adminStats.venuesChange}
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader
            title="Revenue trend"
            subtitle={`Period: ${period}`}
            action={<Badge variant="primary">Placeholder chart</Badge>}
          />
          <ChartPlaceholder data={chartPlaceholder} height={240} />
        </Card>
        <Card>
          <CardHeader title="Report health" />
          <div className="space-y-4">
            {mockReports.slice(0, 4).map((r) => (
              <div
                key={r.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-border px-4 py-3"
              >
                <div>
                  <p className="text-small font-semibold text-primary">{r.title}</p>
                  <p className="text-caption text-muted">{r.period}</p>
                </div>
                <Badge variant={r.status === 'positive' ? 'success' : 'muted'}>
                  {r.change > 0 ? '+' : ''}
                  {r.change}%
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card padding="none">
        <div className="p-6 pb-0">
          <CardHeader title="Detailed metrics" subtitle="Key KPIs for the selected period" />
        </div>
        <Table
          className="border-0 rounded-none"
          columns={[
            {
              key: 'title',
              header: 'Metric',
              render: (r) => <span className="font-semibold text-primary">{r.title}</span>,
            },
            { key: 'type', header: 'Type', render: (r) => r.type },
            { key: 'period', header: 'Period', render: (r) => r.period },
            {
              key: 'value',
              header: 'Value',
              render: (r) =>
                r.type === 'Revenue'
                  ? formatCurrency(r.value)
                  : r.type === 'Quality' && r.title.includes('Rate')
                    ? `${r.value}%`
                    : r.title.includes('Rating')
                      ? r.value.toFixed(1)
                      : formatNumber(r.value),
            },
            {
              key: 'change',
              header: 'Change',
              render: (r) => (
                <Badge variant={r.change >= 0 ? 'success' : 'danger'}>
                  {r.change > 0 ? '+' : ''}
                  {r.change}%
                </Badge>
              ),
            },
          ]}
          data={mockReports}
          keyExtractor={(r) => r.id}
        />
      </Card>
    </DashboardLayout>
  )
}
