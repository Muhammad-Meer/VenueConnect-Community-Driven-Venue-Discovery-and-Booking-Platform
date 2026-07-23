import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Search,
  Leaf,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  MapPin,
  Star,
} from 'lucide-react'
import { MainLayout, Container } from '@/components/layout'
import { Button, Badge, SearchInput, Card } from '@/components/ui'
import { VenueCard } from '@/components/cards'
import { mockVenues } from '@/data/mockData'
import { images } from '@/constants/images'
import { iconSize } from '@/theme'

const features = [
  {
    title: 'Curated farm venues',
    description: 'Hand-picked dairy estates, barns, and meadows for tours and events.',
    icon: Leaf,
  },
  {
    title: 'Transparent pricing',
    description: 'Clear day rates with no hidden fees — know the cost before you book.',
    icon: Sparkles,
  },
  {
    title: 'Secure booking',
    description: 'Instant availability checks and confirmed reservations you can trust.',
    icon: ShieldCheck,
  },
]

const steps = [
  { step: '01', title: 'Discover', text: 'Browse premium dairy farms by city, capacity, and amenities.' },
  { step: '02', title: 'Compare', text: 'Review photos, ratings, and packages side by side.' },
  { step: '03', title: 'Book', text: 'Pick a date, confirm guests, and receive instant confirmation.' },
]

export default function Home() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const featured = mockVenues.filter((v) => v.featured).slice(0, 4)

  return (
    <MainLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-mesh border-b border-border">
        <Container className="py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Badge variant="primary" className="mb-5">
                Premium dairy farm venues
              </Badge>
              <h1 className="text-display-lg text-primary">
                Book beautiful{' '}
                <span className="text-gradient">pasture venues</span> for every occasion
              </h1>
              <p className="mt-5 text-body-lg text-secondary max-w-xl leading-relaxed">
                From intimate milk-tasting tours to countryside celebrations — discover
                exceptional dairy farms and reserve with confidence.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-xl">
                <SearchInput
                  value={query}
                  onChange={setQuery}
                  placeholder="Search city or farm…"
                  className="flex-1"
                  onSubmit={() => navigate(`/search?q=${encodeURIComponent(query)}`)}
                />
                <Button
                  size="lg"
                  leftIcon={<Search size={iconSize.sm} />}
                  onClick={() => navigate(`/search?q=${encodeURIComponent(query)}`)}
                >
                  Search
                </Button>
              </div>

              <div className="mt-8 flex flex-wrap gap-6 text-small text-muted">
                <span className="inline-flex items-center gap-1.5">
                  <Star size={iconSize.sm} className="text-warning fill-warning" /> 4.8 avg rating
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={iconSize.sm} className="text-primary" /> 8+ cities
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Leaf size={iconSize.sm} className="text-primary" /> 80+ venues
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative"
            >
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-border">
                <img
                  src={images.hero}
                  alt="Green dairy pasture at sunrise"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <Card padding="sm" className="bg-white/95 backdrop-blur-sm border-0 shadow-lg">
                    <div className="flex items-center gap-3">
                      <img
                        src={images.cows}
                        alt=""
                        className="h-12 w-12 rounded-xl object-cover"
                      />
                      <div>
                        <p className="text-small font-semibold text-primary">Green Valley Estate</p>
                        <p className="text-caption text-muted">Lahore · 48 acres · From PKR 45,000</p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
              <div className="absolute -z-10 -top-6 -right-6 h-40 w-40 rounded-full bg-primary-100 blur-3xl opacity-70" />
              <div className="absolute -z-10 -bottom-8 -left-8 h-48 w-48 rounded-full bg-primary-50 blur-3xl opacity-80" />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Features */}
      <section className="page-section">
        <Container>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Card hover className="h-full">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary mb-4">
                    <f.icon size={iconSize.md} />
                  </div>
                  <h3 className="text-h4 font-semibold text-primary">{f.title}</h3>
                  <p className="mt-2 text-small text-muted leading-relaxed">{f.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured venues */}
      <section className="page-section pt-0">
        <Container>
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="section-title">Featured venues</h2>
              <p className="section-subtitle">
                Premium dairy farms loved by families and event planners.
              </p>
            </div>
            <Link to="/search" className="hidden sm:block">
              <Button variant="outline" rightIcon={<ArrowRight size={iconSize.sm} />}>
                View all
              </Button>
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((venue) => (
              <VenueCard key={venue.id} venue={venue} />
            ))}
          </div>
          <div className="mt-8 sm:hidden">
            <Link to="/search">
              <Button variant="outline" fullWidth rightIcon={<ArrowRight size={iconSize.sm} />}>
                View all venues
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section className="page-section bg-surface border-y border-border">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="section-title">How it works</h2>
            <p className="section-subtitle mx-auto">
              Three simple steps from discovery to confirmed booking.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <div key={s.step} className="relative text-center md:text-left">
                <span className="text-display-lg font-extrabold text-primary-100">{s.step}</span>
                <h3 className="mt-2 text-h4 font-semibold text-primary">{s.title}</h3>
                <p className="mt-2 text-small text-muted leading-relaxed">{s.text}</p>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 right-0 w-1/3 h-px bg-border" />
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="page-section">
        <Container>
          <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-12 md:px-14 md:py-16 text-white">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_80%_20%,white,transparent_50%)]" />
            <div className="relative max-w-xl">
              <h2 className="text-h2 font-bold tracking-tight text-white">
                Own a dairy farm? List it on PastureBook.
              </h2>
              <p className="mt-3 text-body text-white/85 leading-relaxed">
                Reach thousands of guests looking for authentic countryside experiences.
                Manage venues, bookings, and revenue in one place.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/register">
                  <Button
                    size="lg"
                    className="bg-white text-primary hover:bg-primary-50 border-0"
                  >
                    Start listing
                  </Button>
                </Link>
                <Link to="/owner">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/40 text-white hover:bg-white/10"
                  >
                    Owner dashboard
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
