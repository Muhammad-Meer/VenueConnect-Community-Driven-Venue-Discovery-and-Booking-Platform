import { useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  Menu,
  X,
  LogOut,
  Home,
  ChevronRight,
} from 'lucide-react'
import { cn } from '../../lib/cn'
import { useAuth } from '../../context/AuthContext'
import { ROLE_LABELS } from '../../constants/roles'
import Button from '../ui/Button'
import Avatar from '../ui/Avatar'
import Container from './Container'

/**
 * App shell for authenticated role dashboards.
 * Expects `navItems`: [{ label, href, icon, end?, badge? }]
 */
function DashboardLayout({
  title = 'Dashboard',
  navItems = [],
  children,
}) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const NavItems = ({ onNavigate }) => (
    <nav className="flex-1 space-y-0.5 p-3 overflow-y-auto scrollbar-thin">
      {navItems.map((item) => (
        <NavLink
          key={item.href}
          to={item.href}
          end={item.end}
          onClick={onNavigate}
          className={({ isActive }) =>
            cn(
              'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
              isActive
                ? 'bg-primary-50 text-primary'
                : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900',
            )
          }
        >
          {item.icon && (
            <span className="shrink-0 [&>svg]:h-5 [&>svg]:w-5">{item.icon}</span>
          )}
          <span className="truncate flex-1">{item.label}</span>
          {item.badge != null && (
            <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary-100 px-1.5 text-2xs font-semibold text-primary">
              {item.badge}
            </span>
          )}
        </NavLink>
      ))}
    </nav>
  )

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      {/* Top bar */}
      <header className="sticky top-0 z-sticky border-b border-neutral-200 bg-white/95 backdrop-blur-md">
        <Container className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg text-neutral-600 hover:bg-neutral-100"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>

            <Link to="/" className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
                <Home className="h-4 w-4" />
              </span>
              <span className="text-base font-semibold text-neutral-900 hidden sm:inline">
                Venue<span className="text-primary">Book</span>
              </span>
            </Link>

            <span className="hidden sm:inline-flex items-center gap-1 text-sm text-neutral-400">
              <ChevronRight className="h-4 w-4" />
              <span className="font-medium text-neutral-600">{title}</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            {user && (
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-sm font-medium text-neutral-900">{user.name}</span>
                <span className="text-2xs text-neutral-400">
                  {ROLE_LABELS[user.role] || user.role}
                </span>
              </div>
            )}
            <Avatar name={user?.name} src={user?.avatar} size="sm" />
            <Button variant="outline" size="sm" onClick={handleLogout} leftIcon={<LogOut className="h-4 w-4" />}>
              <span className="hidden sm:inline">Log out</span>
            </Button>
          </div>
        </Container>
      </header>

      <div className="flex flex-1 min-h-0">
        {/* Desktop sidebar */}
        <aside className="hidden lg:flex w-[260px] shrink-0 flex-col border-r border-neutral-200 bg-white">
          <div className="px-5 py-4 border-b border-neutral-100">
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              {title}
            </p>
          </div>
          <NavItems />
          <div className="p-3 border-t border-neutral-100">
            <Link
              to="/"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-600 hover:bg-neutral-50"
            >
              <Home className="h-5 w-5" />
              Back to site
            </Link>
          </div>
        </aside>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="fixed inset-0 z-overlay lg:hidden">
            <div
              className="absolute inset-0 bg-neutral-900/40"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />
            <aside className="absolute inset-y-0 left-0 w-[280px] bg-white shadow-xl flex flex-col animate-slide-down">
              <div className="flex items-center justify-between px-4 h-16 border-b border-neutral-100">
                <span className="font-semibold text-neutral-900">{title}</span>
                <button
                  type="button"
                  className="h-9 w-9 inline-flex items-center justify-center rounded-lg hover:bg-neutral-100"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <NavItems onNavigate={() => setMobileOpen(false)} />
            </aside>
          </div>
        )}

        {/* Main content */}
        <main className="flex-1 min-w-0 overflow-y-auto">
          <div className="container-app py-6 md:py-8">
            {children || <Outlet />}
          </div>
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
