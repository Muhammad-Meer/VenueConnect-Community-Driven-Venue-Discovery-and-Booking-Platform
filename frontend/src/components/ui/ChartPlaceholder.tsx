import { cn } from '@/lib/cn'

export type ChartBar = { label: string; value: number }

export type ChartPlaceholderProps = {
  data: ChartBar[]
  title?: string
  className?: string
  height?: number
}

export default function ChartPlaceholder({
  data,
  title,
  className,
  height = 200,
}: ChartPlaceholderProps) {
  const max = Math.max(...data.map((d) => d.value), 1)

  return (
    <div className={cn('w-full', className)}>
      {title && (
        <p className="text-small font-medium text-muted mb-4">{title}</p>
      )}
      <div className="flex items-end gap-2 sm:gap-3" style={{ height }}>
        {data.map((bar) => {
          const pct = (bar.value / max) * 100
          return (
            <div key={bar.label} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
              <div
                className="w-full max-w-[48px] rounded-t-lg bg-gradient-to-t from-primary to-primary-300 transition-all duration-slow hover:from-primary-hover hover:to-primary"
                style={{ height: `${pct}%`, minHeight: 8 }}
                title={`${bar.label}: ${bar.value}`}
              />
              <span className="text-caption text-muted">{bar.label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
