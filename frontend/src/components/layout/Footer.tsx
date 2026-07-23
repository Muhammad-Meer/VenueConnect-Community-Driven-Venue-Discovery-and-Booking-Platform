import { Link } from 'react-router-dom'
import { Building2, Mail, MapPin, Phone } from 'lucide-react'
import { iconSize } from '@/theme'
import Container from './Container'

const links = {
  Product: [
    { label: 'Explore venues', href: '/search' },
    { label: 'For owners', href: '/owner' },
    { label: 'Pricing', href: '/#' },
  ],
  Company: [
    { label: 'About', href: '/#' },
    { label: 'Contact', href: '/#' },
    { label: 'Careers', href: '/#' },
  ],
  Account: [
    { label: 'Log in', href: '/login' },
    { label: 'Register', href: '/register' },
    { label: 'My bookings', href: '/bookings' },
  ],
}

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface mt-auto">
      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white">
                <Building2 size={iconSize.md} />
              </span>
              <span className="text-lg font-bold text-primary">
                Pasture<span className="text-primary-400">Book</span>
              </span>
            </Link>
            <p className="mt-4 text-small text-muted max-w-xs leading-relaxed">
              Discover and book premium dairy farm venues for tours, events, and countryside retreats.
            </p>
            <div className="mt-5 space-y-2 text-small text-secondary">
              <p className="flex items-center gap-2">
                <MapPin size={iconSize.sm} className="text-primary" /> Pakistan
              </p>
              <p className="flex items-center gap-2">
                <Mail size={iconSize.sm} className="text-primary" /> hello@pasturebook.com
              </p>
              <p className="flex items-center gap-2">
                <Phone size={iconSize.sm} className="text-primary" /> +92 300 0000000
              </p>
            </div>
          </div>

          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <p className="text-small font-semibold text-primary mb-3">{title}</p>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.href}
                      className="text-small text-muted hover:text-primary transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-caption text-muted">
            © {new Date().getFullYear()} PastureBook. All rights reserved.
          </p>
          <div className="flex gap-4 text-caption text-muted">
            <span className="hover:text-primary cursor-pointer">Privacy</span>
            <span className="hover:text-primary cursor-pointer">Terms</span>
            <span className="hover:text-primary cursor-pointer">Cookies</span>
          </div>
        </div>
      </Container>
    </footer>
  )
}
