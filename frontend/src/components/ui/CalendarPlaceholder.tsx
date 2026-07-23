import { cn } from '@/lib/cn'

export type CalendarPlaceholderProps = {
  bookedDates?: string[]
  selected?: string
  onSelect?: (date: string) => void
  className?: string
  monthLabel?: string
}

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

export default function CalendarPlaceholder({
  bookedDates = [],
  selected,
  onSelect,
  className,
  monthLabel = 'July 2026',
}: CalendarPlaceholderProps) {
  // Static calendar grid for July 2026 (Wed start = day 1)
  const startOffset = 3
  const daysInMonth = 31
  const cells: (number | null)[] = [
    ...Array(startOffset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]

  const toIso = (day: number) =>
    `2026-07-${String(day).padStart(2, '0')}`

  return (
    <div className={cn('rounded-xl border border-border bg-surface p-4', className)}>
      <div className="flex items-center justify-between mb-4">
        <p className="text-small font-semibold text-primary">{monthLabel}</p>
        <div className="flex gap-3 text-caption text-muted">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-primary" /> Available
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-gray-300" /> Booked
          </span>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAYS.map((d) => (
          <div key={d} className="text-center text-caption font-medium text-muted py-1">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (!day) return <div key={`e-${i}`} />
          const iso = toIso(day)
          const isBooked = bookedDates.includes(iso)
          const isSelected = selected === iso
          return (
            <button
              key={iso}
              type="button"
              disabled={isBooked}
              onClick={() => onSelect?.(iso)}
              className={cn(
                'h-9 rounded-lg text-caption font-medium transition-colors',
                isBooked && 'bg-gray-100 text-gray-400 cursor-not-allowed line-through',
                isSelected && 'bg-primary text-white shadow-sm',
                !isBooked && !isSelected && 'hover:bg-primary-50 text-gray-700',
              )}
            >
              {day}
            </button>
          )
        })}
      </div>
    </div>
  )
}
