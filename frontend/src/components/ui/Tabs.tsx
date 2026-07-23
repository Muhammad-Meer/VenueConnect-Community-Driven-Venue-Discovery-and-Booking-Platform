import { cn } from '@/lib/cn'

export type TabItem = {
  id: string
  label: string
  count?: number
}

export type TabsProps = {
  tabs: TabItem[]
  active: string
  onChange: (id: string) => void
  className?: string
}

export default function Tabs({ tabs, active, onChange, className }: TabsProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-1 border-b border-border overflow-x-auto scrollbar-thin',
        className,
      )}
      role="tablist"
    >
      {tabs.map((tab) => {
        const isActive = tab.id === active
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={cn(
              'relative px-4 py-3 text-small font-medium whitespace-nowrap transition-colors',
              isActive ? 'text-primary' : 'text-muted hover:text-gray-800',
            )}
          >
            <span className="inline-flex items-center gap-2">
              {tab.label}
              {typeof tab.count === 'number' && (
                <span
                  className={cn(
                    'rounded-full px-1.5 py-0.5 text-caption',
                    isActive ? 'bg-primary-50 text-primary' : 'bg-gray-100 text-muted',
                  )}
                >
                  {tab.count}
                </span>
              )}
            </span>
            {isActive && (
              <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-primary" />
            )}
          </button>
        )
      })}
    </div>
  )
}
