import { cn } from '../../lib/cn';

export default function Tabs({ tabs = [], value, onChange, className }) {
  return (
    <div className={cn('w-full', className)}>
      <div className="flex gap-1 overflow-x-auto rounded-xl bg-surface-muted p-1" role="tablist">
        {tabs.map((tab) => {
          const active = value === tab.value;
          return (
            <button
              key={tab.value}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onChange?.(tab.value)}
              className={cn(
                'inline-flex min-w-max items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition',
                active
                  ? 'bg-surface text-content shadow-sm'
                  : 'text-content-muted hover:text-content'
              )}
            >
              {tab.icon}
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
