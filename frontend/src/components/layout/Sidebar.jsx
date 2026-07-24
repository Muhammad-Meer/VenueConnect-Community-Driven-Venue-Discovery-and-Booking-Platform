import { NavLink } from 'react-router-dom';
import { cn } from '../../lib/cn';

export default function Sidebar({ items = [], basePath }) {
  return (
    <aside className="w-64 shrink-0 border-r border-border bg-surface p-4">
      <nav className="space-y-1">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.href === basePath}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition',
                  isActive
                    ? 'bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-200'
                    : 'text-content-secondary hover:bg-surface-muted'
                )
              }
            >
              {Icon && <Icon className="h-4 w-4" />}
              {item.label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
