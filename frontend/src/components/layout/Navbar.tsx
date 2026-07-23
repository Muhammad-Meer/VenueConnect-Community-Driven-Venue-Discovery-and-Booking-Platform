import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu,
  X,
  Search,
  LayoutDashboard,
  Building2,
  CalendarDays,
  Shield,
} from 'lucide-react'
import { cn } from '@/lib/cn'
import { iconSize } from '@/theme'
import { Button, Avatar, Dropdown } from '@/components/ui'
import Container from './Container'

const navItems = [
  { label: 'Explore', href: '/search' },
  { label: 'Venues', href: '/search?view=all' },
  { label: 'For Owners', href: '/owner' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-sticky border-b border-border/80 bg-surface/90 backdrop-blur-md">
      <Container>
        <div className="flex h-header items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 group">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white shadow-sm group-hover:bg-primary-hover transition-colors">
                <Building2 size={iconSize.md} />
              </span>
              <span className="text-lg font-bold tracking-tight text-primary">
                Pasture<span className="text-primary-400">Book</span>
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      'px-3 py-2 text-small font-medium rounded-lg transition-colors',
                      isActive
                        ? 'text-primary bg-primary-50'
                        : 'text-secondary hover:text-primary hover:bg-gray-50',
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <Link to="/search">
              <Button variant="ghost" size="sm" leftIcon={<Search size={iconSize.sm} />}>
                Search
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </Link>
            <Link to="/register">
              <Button size="sm">Get started</Button>
            </Link>
            <Dropdown
              trigger={
                <Avatar name="Demo User" size="sm" status="online" className="cursor-pointer" />
              }
              items={[
                {
                  label: 'Profile',
                  icon: <Avatar name="D" size="xs" />,
                  onClick: () => { window.location.href = '/profile' },
                },
                {
                  label: 'My Bookings',
                  icon: <CalendarDays size={iconSize.sm} />,
                  onClick: () => { window.location.href = '/bookings' },
                },
                {
                  label: 'Owner Dashboard',
                  icon: <LayoutDashboard size={iconSize.sm} />,
                  onClick: () => { window.location.href = '/owner' },
                },
                {
                  label: 'Admin',
                  icon: <Shield size={iconSize.sm} />,
                  onClick: () => { window.location.href = '/admin' },
                },
                { label: '', divider: true },
                {
                  label: 'Log out',
                  danger: true,
                  onClick: () => { window.location.href = '/login' },
                },
              ]}
            />
          </div>

          <button
            type="button"
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={iconSize.lg} /> : <Menu size={iconSize.lg} />}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-border bg-surface overflow-hidden"
          >
            <Container className="py-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 rounded-lg text-small font-medium text-gray-700 hover:bg-gray-50"
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-3 flex flex-col gap-2 border-t border-border mt-2">
                <Link to="/login" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" fullWidth>
                    Log in
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setMobileOpen(false)}>
                  <Button fullWidth>Get started</Button>
                </Link>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
