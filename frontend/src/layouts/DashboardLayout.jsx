import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useSelector } from 'react-redux';
import { selectUser } from '../store/slices/authSlice';
import { getNavForRole } from '../constants/navigation';
import { cn } from '../lib/cn';
import Logo from '../components/common/Logo';
import ThemeToggle from '../components/common/ThemeToggle';
import Avatar from '../components/ui/Avatar';
import Button from '../components/ui/Button';
import Header from '../components/layout/Header';

export default function DashboardLayout({ basePath = '/app' }) {
  const user = useSelector(selectUser);
  const nav = getNavForRole(user?.role);
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface-muted">
      <div className="lg:hidden sticky top-0 z-sticky flex items-center justify-between border-b border-border bg-surface px-4 py-3">
        <Logo to={basePath} />
        <Button variant="ghost" size="icon" onClick={() => setOpen((v) => !v)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      <div className="mx-auto flex max-w-[1600px]">
        <aside
          className={cn(
            'fixed inset-y-0 left-0 z-overlay w-72 border-r border-border bg-surface p-4 transition lg:static lg:translate-x-0 lg:z-0',
            open ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          <div className="mb-6 hidden lg:block">
            <Logo to={basePath} />
          </div>
          <nav className="space-y-1">
            {nav.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.href}
                  to={item.href}
                  end={item.href === basePath}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition',
                      isActive
                        ? 'bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-200'
                        : 'text-content-secondary hover:bg-surface-muted hover:text-content'
                    )
                  }
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  {item.label}
                </NavLink>
              );
            })}
          </nav>
          <div className="mt-8 rounded-2xl border border-border bg-surface-muted p-4">
            <div className="flex items-center gap-3">
              <Avatar name={user?.name} src={user?.avatar} />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{user?.name}</p>
                <p className="truncate text-xs text-content-muted">{user?.email}</p>
              </div>
            </div>
            <div className="mt-3">
              <ThemeToggle />
            </div>
          </div>
        </aside>

        {open && (
          <button
            type="button"
            className="fixed inset-0 z-[250] bg-slate-950/40 lg:hidden"
            onClick={() => setOpen(false)}
            aria-label="Close sidebar"
          />
        )}

        <div className="min-w-0 flex-1">
          <Header />
          <div className="p-4 md:p-6 lg:p-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
