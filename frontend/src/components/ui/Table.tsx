import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type Column<T> = {
  key: string
  header: string
  render: (row: T) => ReactNode
  className?: string
}

export type TableProps<T> = {
  columns: Column<T>[]
  data: T[]
  keyExtractor: (row: T) => string
  className?: string
  emptyMessage?: string
}

export default function Table<T>({
  columns,
  data,
  keyExtractor,
  className,
  emptyMessage = 'No data found',
}: TableProps<T>) {
  return (
    <div className={cn('overflow-x-auto rounded-xl border border-border bg-surface', className)}>
      <table className="w-full min-w-[640px] text-left">
        <thead>
          <tr className="border-b border-border bg-gray-50/80">
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn(
                  'px-4 py-3 text-caption font-semibold uppercase tracking-wide text-muted',
                  col.className,
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-12 text-center text-small text-muted"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr
                key={keyExtractor(row)}
                className="border-b border-divider last:border-0 hover:bg-gray-50/60 transition-colors"
              >
                {columns.map((col) => (
                  <td key={col.key} className={cn('px-4 py-3.5 text-small text-gray-700', col.className)}>
                    {col.render(row)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
