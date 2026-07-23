import { NavLink } from 'react-router-dom'
import { cn } from '../../lib/cn'

function Sidebar({ items = [], title, className, collapsed = false }) {
  return (
    <aside
      className={cn(
        'flex flex-col border-r border-neutral-200 bg-white',
        collapsed ? 'w-[72px]' : 'w-[260px]',
        'transition-[width] duration-250 ease-smooth',
        className,
      )}
    >
      {title && !collapsed && (
        <div className="px-5 py-4 border-b border-neutral-100">
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
            {title}
          </p>
        </div>
      )}

      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto scrollbar-thin">
        {items.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            end={item.end}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                collapsed && 'justify-center px-2',
                isActive
                  ? 'bg-primary-50 text-primary'
                  : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900',
              )
            }
            title={collapsed ? item.label : undefined}
          >
            {item.icon && (
              <span className="shrink-0 [&>svg]:h-5 [&>svg]:w-5">{item.icon}</span>
            )}
            {!collapsed && <span className="truncate">{item.label}</span>}
            {!collapsed && item.badge != null && (
              <span className="ml-auto inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary-100 px-1.5 text-2xs font-semibold text-primary">
                {item.badge}
              </span>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
