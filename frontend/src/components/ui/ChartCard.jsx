import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './Card';
import { formatCurrency, formatNumber } from '../../lib/format';

export default function ChartCard({
  title,
  description,
  data = [],
  dataKey = 'revenue',
  xKey = '_id',
  type = 'area',
  currency = false,
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          {type === 'bar' ? (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--color-border))" />
              <XAxis dataKey={xKey} tick={{ fontSize: 12 }} stroke="rgb(var(--color-content-muted))" />
              <YAxis tick={{ fontSize: 12 }} stroke="rgb(var(--color-content-muted))" />
              <Tooltip
                formatter={(v) => (currency ? formatCurrency(v) : formatNumber(v))}
                contentStyle={{
                  borderRadius: 12,
                  border: '1px solid rgb(var(--color-border))',
                  background: 'rgb(var(--color-surface))',
                }}
              />
              <Bar dataKey={dataKey} fill="rgb(var(--color-brand-500))" radius={[8, 8, 0, 0]} />
            </BarChart>
          ) : (
            <AreaChart data={data}>
              <defs>
                <linearGradient id="brandFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgb(var(--color-brand-500))" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="rgb(var(--color-brand-500))" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--color-border))" />
              <XAxis dataKey={xKey} tick={{ fontSize: 12 }} stroke="rgb(var(--color-content-muted))" />
              <YAxis tick={{ fontSize: 12 }} stroke="rgb(var(--color-content-muted))" />
              <Tooltip
                formatter={(v) => (currency ? formatCurrency(v) : formatNumber(v))}
                contentStyle={{
                  borderRadius: 12,
                  border: '1px solid rgb(var(--color-border))',
                  background: 'rgb(var(--color-surface))',
                }}
              />
              <Area
                type="monotone"
                dataKey={dataKey}
                stroke="rgb(var(--color-brand-600))"
                fill="url(#brandFill)"
                strokeWidth={2}
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
