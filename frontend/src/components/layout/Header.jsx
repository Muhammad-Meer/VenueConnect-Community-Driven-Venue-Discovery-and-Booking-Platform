import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { cn } from '../../lib/cn'
import Button from '../ui/Button'
import Avatar from '../ui/Avatar'
import Container from './Container'

const navItems = [
  { label: 'Explore', href: '/venues' },
  { label: 'How it works', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

function Header({ user = null, onLogout }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-sticky border-b border-neutral-200/80 bg-white/90 backdrop-blur-md">
      <Container>
        <div className="flex h-[72px] items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 group">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white shadow-sm group-hover:bg-primary-light transition-colors">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </span>
              <span className="text-lg font-semibold tracking-tight text-neutral-900">
                Venue<span className="text-primary">Book</span>
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      'px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                      isActive
                        ? 'text-primary bg-primary-50'
                        : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50',
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <>
                <Link to="/dashboard">
                  <Button variant="ghost" size="sm">
                    Dashboard
                  </Button>
                </Link>
                <Link to="/profile" className="ml-1">
                  <Avatar name={user.name} src={user.avatar} size="sm" status="online" />
                </Link>
                {onLogout && (
                  <Button variant="outline" size="sm" onClick={onLogout}>
                    Log out
                  </Button>
                )}
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Log in
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">Get started</Button>
                </Link>
              </>
            )}
          </div>

          <button
            type="button"
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg text-neutral-600 hover:bg-neutral-100"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-neutral-100 py-4 animate-slide-down">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'px-3 py-2.5 text-sm font-medium rounded-lg',
                      isActive
                        ? 'text-primary bg-primary-50'
                        : 'text-neutral-700 hover:bg-neutral-50',
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
            <div className="mt-4 flex flex-col gap-2 px-1">
              {user ? (
                <Link to="/dashboard" onClick={() => setMobileOpen(false)}>
                  <Button fullWidth>Dashboard</Button>
                </Link>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMobileOpen(false)}>
                    <Button variant="outline" fullWidth>
                      Log in
                    </Button>
                  </Link>
                  <Link to="/register" onClick={() => setMobileOpen(false)}>
                    <Button fullWidth>Get started</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </Container>
    </header>
  )
}

export default Header
