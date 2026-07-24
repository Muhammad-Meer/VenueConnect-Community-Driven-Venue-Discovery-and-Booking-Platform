import { useMemo, useState } from 'react';
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isBefore,
  isSameDay,
  isSameMonth,
  startOfDay,
  startOfMonth,
  startOfWeek,
  subMonths,
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/cn';
import Button from './Button';

export default function Calendar({
  value,
  onChange,
  unavailable = [],
  className,
  minDate = startOfDay(new Date()),
}) {
  const selected = value ? new Date(value) : null;
  const [month, setMonth] = useState(selected || new Date());

  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(month));
    const end = endOfWeek(endOfMonth(month));
    return eachDayOfInterval({ start, end });
  }, [month]);

  const unavailableSet = useMemo(
    () => new Set(unavailable.map((d) => format(new Date(d), 'yyyy-MM-dd'))),
    [unavailable]
  );

  return (
    <div className={cn('rounded-xl border border-border bg-surface p-4', className)}>
      <div className="mb-3 flex items-center justify-between">
        <Button variant="ghost" size="icon" onClick={() => setMonth((m) => subMonths(m, 1))}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <p className="text-sm font-semibold">{format(month, 'MMMM yyyy')}</p>
        <Button variant="ghost" size="icon" onClick={() => setMonth((m) => addMonths(m, 1))}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="mb-1 grid grid-cols-7 gap-1 text-center text-2xs font-medium uppercase tracking-wide text-content-muted">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
          <div key={d} className="py-1">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => {
          const key = format(day, 'yyyy-MM-dd');
          const disabled =
            isBefore(day, minDate) || unavailableSet.has(key) || !isSameMonth(day, month);
          const active = selected && isSameDay(day, selected);
          return (
            <button
              key={key}
              type="button"
              disabled={disabled}
              onClick={() => onChange?.(key)}
              className={cn(
                'h-9 rounded-lg text-sm transition',
                !isSameMonth(day, month) && 'text-content-muted/40',
                disabled && 'cursor-not-allowed opacity-40',
                active && 'bg-brand-600 text-white shadow-sm',
                !active && !disabled && 'hover:bg-brand-50 dark:hover:bg-brand-950'
              )}
            >
              {format(day, 'd')}
            </button>
          );
        })}
      </div>
    </div>
  );
}
