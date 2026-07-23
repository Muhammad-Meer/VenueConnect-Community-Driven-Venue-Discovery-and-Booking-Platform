import { useMemo, useState } from 'react'
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isBefore,
  isSameDay,
  isSameMonth,
  isToday,
  parseISO,
  startOfDay,
  startOfMonth,
  startOfWeek,
  subMonths,
} from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '../../lib/cn'
import Button from './Button'

/**
 * Booking availability calendar.
 * @param {string[]} bookedDates - ISO date strings (yyyy-MM-dd) that are unavailable
 * @param {Date|string|null} selected - currently selected date
 * @param {function} onSelect - (date: Date) => void
 */
function Calendar({
  bookedDates = [],
  selected = null,
  onSelect,
  className,
  minDate = startOfDay(new Date()),
}) {
  const [month, setMonth] = useState(() =>
    selected
      ? typeof selected === 'string'
        ? parseISO(selected)
        : selected
      : new Date(),
  )

  const bookedSet = useMemo(
    () => new Set(bookedDates.map((d) => (d.includes('T') ? d.slice(0, 10) : d))),
    [bookedDates],
  )

  const selectedDate = useMemo(() => {
    if (!selected) return null
    return typeof selected === 'string' ? parseISO(selected) : selected
  }, [selected])

  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(month), { weekStartsOn: 0 })
    const end = endOfWeek(endOfMonth(month), { weekStartsOn: 0 })
    return eachDayOfInterval({ start, end })
  }, [month])

  const isDisabled = (day) => {
    const key = format(day, 'yyyy-MM-dd')
    if (isBefore(day, minDate) && !isSameDay(day, minDate)) return true
    if (bookedSet.has(key)) return true
    return false
  }

  return (
    <div className={cn('rounded-2xl border border-neutral-200 bg-white p-4 sm:p-5', className)}>
      <div className="mb-4 flex items-center justify-between">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => setMonth((m) => subMonths(m, 1))}
          aria-label="Previous month"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h3 className="text-sm font-semibold text-neutral-900">
          {format(month, 'MMMM yyyy')}
        </h3>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => setMonth((m) => addMonths(m, 1))}
          aria-label="Next month"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
          <div
            key={d}
            className="h-8 flex items-center justify-center text-2xs font-semibold uppercase tracking-wide text-neutral-400"
          >
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => {
          const key = format(day, 'yyyy-MM-dd')
          const outside = !isSameMonth(day, month)
          const booked = bookedSet.has(key)
          const disabled = isDisabled(day)
          const selectedDay = selectedDate && isSameDay(day, selectedDate)
          const today = isToday(day)

          return (
            <button
              key={key}
              type="button"
              disabled={disabled || outside}
              onClick={() => onSelect?.(day)}
              className={cn(
                'relative h-10 rounded-lg text-sm font-medium transition-all duration-150',
                'focus-ring disabled:cursor-not-allowed',
                outside && 'text-neutral-300',
                !outside && !disabled && 'text-neutral-700 hover:bg-primary-50 hover:text-primary',
                booked && !outside && 'bg-danger-light/60 text-danger line-through',
                selectedDay &&
                  !outside &&
                  'bg-primary text-white hover:bg-primary hover:text-white shadow-sm',
                today && !selectedDay && !booked && !outside && 'ring-1 ring-primary-200',
                disabled && !booked && !outside && 'text-neutral-300',
              )}
              title={booked ? 'Unavailable' : format(day, 'PPP')}
            >
              {format(day, 'd')}
            </button>
          )
        })}
      </div>

      <div className="mt-4 flex flex-wrap gap-3 text-xs text-neutral-500">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-primary" /> Selected
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-danger-light border border-red-200" /> Booked
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm ring-1 ring-primary-200" /> Today
        </span>
      </div>
    </div>
  )
}

export default Calendar
