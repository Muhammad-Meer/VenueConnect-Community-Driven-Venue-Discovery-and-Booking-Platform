import { Link } from 'react-router-dom'
import Container from './Container'

const footerLinks = {
  Product: [
    { label: 'Browse venues', href: '/venues' },
    { label: 'Search', href: '/search' },
    { label: 'Pricing', href: '/about' },
  ],
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Design system', href: '/design-system' },
  ],
  Account: [
    { label: 'Log in', href: '/login' },
    { label: 'Sign up', href: '/register' },
    { label: 'Dashboard', href: '/dashboard' },
  ],
}

function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50">
      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </span>
              <span className="text-lg font-semibold text-neutral-900">
                Venue<span className="text-primary">Book</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-neutral-500 max-w-xs leading-relaxed">
              Discover and book exceptional venues for events, meetings, and celebrations — all in one modern platform.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-neutral-900">{title}</h4>
              <ul className="mt-3 space-y-2">
                {links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-neutral-500 hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-neutral-400">
            © {new Date().getFullYear()} VenueBook. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-neutral-400">
            <span>Privacy</span>
            <span>Terms</span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Built for great events
            </span>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
