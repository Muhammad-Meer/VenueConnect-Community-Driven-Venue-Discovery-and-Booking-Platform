import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type TimelineItem = {
  id: string
  title: string
  description?: string
  time?: string
  icon?: ReactNode
  status?: 'done' | 'current' | 'upcoming'
}

export type TimelineProps = {
  items: TimelineItem[]
  className?: string
}

export default function Timeline({ items, className }: TimelineProps) {
  return (
    <ol className={cn('relative space-y-0', className)}>
      {items.map((item, i) => {
        const isLast = i === items.length - 1
        return (
          <li key={item.id} className="relative flex gap-4 pb-8 last:pb-0">
            {!isLast && (
              <span className="absolute left-[15px] top-8 bottom-0 w-px bg-border" />
            )}
            <span
              className={cn(
                'relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 bg-surface',
                item.status === 'done' && 'border-primary bg-primary text-white',
                item.status === 'current' && 'border-primary text-primary',
                (!item.status || item.status === 'upcoming') && 'border-gray-200 text-gray-400',
              )}
            >
              {item.icon || (
                <span className="h-2 w-2 rounded-full bg-current" />
              )}
            </span>
            <div className="pt-0.5 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-small font-semibold text-primary">{item.title}</p>
                {item.time && (
                  <span className="text-caption text-muted">{item.time}</span>
                )}
              </div>
              {item.description && (
                <p className="mt-1 text-small text-muted">{item.description}</p>
              )}
            </div>
          </li>
        )
      })}
    </ol>
  )
}
