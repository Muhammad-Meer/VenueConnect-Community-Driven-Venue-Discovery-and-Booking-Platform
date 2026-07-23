import { Link } from 'react-router-dom'
import { MainLayout, Container } from '../../components/layout'
import { Button, Badge, Card, SearchInput } from '../../components/ui'
import { VenueCard } from '../../components/venue'

const featuredVenues = [
  {
    id: '1',
    name: 'Grand Horizon Ballroom',
    location: 'DHA Phase 6',
    city: 'Karachi',
    price: 85000,
    capacity: 400,
    rating: 4.8,
    reviewCount: 126,
    category: 'Wedding',
    featured: true,
    image:
      'https://images.unsplash.com/photo-1519167758481-83f29da8c2b0?w=800&q=80',
  },
  {
    id: '2',
    name: 'Skyline Conference Hub',
    location: 'Blue Area',
    city: 'Islamabad',
    price: 45000,
    capacity: 120,
    rating: 4.3,
    reviewCount: 54,
    category: 'Conference',
    image:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
  },
  {
    id: '3',
    name: 'Garden Pavilion',
    location: 'Gulberg',
    city: 'Lahore',
    price: 62000,
    capacity: 250,
    rating: 4.9,
    reviewCount: 89,
    category: 'Outdoor',
    image:
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80',
  },
]

const features = [
  {
    title: 'Smart discovery',
    description: 'Filter by city, capacity, category, and budget in seconds.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z" />
      </svg>
    ),
  },
  {
    title: 'Transparent pricing',
    description: 'Clear day rates and packages with no hidden surprises.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Secure booking',
    description: 'Confirm availability, pay safely, and manage reservations online.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
]

function Home() {
  return (
    <MainLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-mesh border-b border-neutral-200">
        <Container className="py-16 md:py-24">
          <div className="max-w-3xl">
            <Badge variant="accent" className="mb-5">
              Modern venue booking
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-neutral-900">
              Find and book{' '}
              <span className="text-gradient-primary">exceptional venues</span>{' '}
              for every occasion
            </h1>
            <p className="mt-5 text-lg text-neutral-600 max-w-2xl leading-relaxed">
              From intimate meetings to grand celebrations — discover spaces,
              compare options, and book with confidence on VenueBook.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-xl">
              <SearchInput className="flex-1" placeholder="Search city or venue…" />
              <Link to="/venues">
                <Button size="lg" className="w-full sm:w-auto h-11">
                  Search venues
                </Button>
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link to="/design-system">
                <Button variant="outline" size="sm">
                  View design system
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="ghost" size="sm">
                  List your venue →
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Features */}
      <section className="page-section">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="section-title">Built for hosts & guests</h2>
            <p className="section-subtitle mx-auto">
              A clean SaaS experience with thoughtful UX at every step of the booking journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} className="text-center sm:text-left">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-neutral-900">{feature.title}</h3>
                <p className="mt-2 text-sm text-neutral-500 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured venues */}
      <section className="page-section bg-neutral-50 border-y border-neutral-100">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <h2 className="section-title">Featured venues</h2>
              <p className="section-subtitle">Hand-picked spaces loved by recent guests.</p>
            </div>
            <Link to="/venues">
              <Button variant="secondary" size="sm">
                View all
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredVenues.map((venue) => (
              <VenueCard key={venue.id} venue={venue} />
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="page-section">
        <Container>
          <div className="rounded-3xl bg-primary px-8 py-12 md:px-12 md:py-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_#3B82F6,_transparent_50%)]" />
            <div className="relative">
              <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
                Own a venue? Grow with VenueBook
              </h2>
              <p className="mt-3 text-primary-100 max-w-xl mx-auto text-sm md:text-base">
                List your space, manage availability, and receive bookings with a professional dashboard.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link to="/register">
                  <Button variant="accent" size="lg">
                    Become a host
                  </Button>
                </Link>
                <Link to="/design-system">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white/30 text-white hover:bg-white/10 hover:border-white/50"
                  >
                    Design system
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </MainLayout>
  )
}

export default Home
