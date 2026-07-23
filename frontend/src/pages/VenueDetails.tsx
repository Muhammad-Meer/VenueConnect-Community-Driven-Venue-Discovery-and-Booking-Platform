import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  MapPin,
  Star,
  Users,
  Trees,
  Check,
  Share2,
  Heart,
  CalendarDays,
} from 'lucide-react'
import { MainLayout, Container } from '@/components/layout'
import {
  Button,
  Badge,
  Breadcrumb,
  Card,
  Tabs,
  CalendarPlaceholder,
  Accordion,
  Input,
  EmptyState,
} from '@/components/ui'
import { VenueCard } from '@/components/cards'
import { mockVenues } from '@/data/mockData'
import { formatCurrency } from '@/lib/format'
import { iconSize } from '@/theme'
import { useToast } from '@/components/ui'

export default function VenueDetails() {
  const { id } = useParams()
  const toast = useToast()
  const venue = mockVenues.find((v) => v.id === id) || mockVenues[0]
  const [tab, setTab] = useState('overview')
  const [selectedDate, setSelectedDate] = useState('')
  const [guests, setGuests] = useState('20')
  const [liked, setLiked] = useState(false)
  const related = mockVenues.filter((v) => v.id !== venue.id).slice(0, 3)

  if (!venue) {
    return (
      <MainLayout>
        <Container className="py-20">
          <EmptyState
            title="Venue not found"
            description="This venue may have been removed or is unavailable."
            actionLabel="Browse venues"
            onAction={() => { window.location.href = '/search' }}
          />
        </Container>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <Container className="py-8 md:py-10">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Search', href: '/search' },
            { label: venue.name },
          ]}
          className="mb-6"
        />

        {/* Gallery */}
        <div className="grid md:grid-cols-4 gap-3 rounded-2xl overflow-hidden mb-8">
          <div className="md:col-span-2 md:row-span-2 aspect-[4/3] md:aspect-auto md:min-h-[360px]">
            <img
              src={venue.images[0] || venue.image}
              alt={venue.name}
              className="h-full w-full object-cover"
            />
          </div>
          {venue.images.slice(1, 5).map((img, i) => (
            <div key={i} className="hidden md:block aspect-[4/3]">
              <img src={img} alt="" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1fr_360px] gap-8">
          <div>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="primary">{venue.category}</Badge>
                  {venue.featured && <Badge variant="success">Featured</Badge>}
                </div>
                <h1 className="text-h1 font-semibold tracking-tight text-primary">
                  {venue.name}
                </h1>
                <p className="mt-2 flex items-center gap-1.5 text-small text-muted">
                  <MapPin size={iconSize.sm} />
                  {venue.address}, {venue.city}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-4 text-small text-secondary">
                  <span className="inline-flex items-center gap-1 font-semibold text-primary">
                    <Star size={iconSize.sm} className="fill-warning text-warning" />
                    {venue.rating}
                    <span className="font-normal text-muted">
                      ({venue.reviewCount} reviews)
                    </span>
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Users size={iconSize.sm} /> Up to {venue.capacity}
                  </span>
                  {venue.acres != null && (
                    <span className="inline-flex items-center gap-1">
                      <Trees size={iconSize.sm} /> {venue.acres} acres
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setLiked(!liked)
                    toast.success(liked ? 'Removed from saved' : 'Saved to favorites')
                  }}
                >
                  <Heart
                    size={iconSize.sm}
                    className={liked ? 'fill-danger text-danger' : ''}
                  />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toast.info('Share link copied')}
                >
                  <Share2 size={iconSize.sm} />
                </Button>
              </div>
            </div>

            <Tabs
              className="mt-8"
              tabs={[
                { id: 'overview', label: 'Overview' },
                { id: 'amenities', label: 'Amenities' },
                { id: 'faq', label: 'FAQ' },
              ]}
              active={tab}
              onChange={setTab}
            />

            <div className="mt-6">
              {tab === 'overview' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <p className="text-body text-secondary leading-relaxed">
                    {venue.description}
                  </p>
                  <div className="mt-6 grid sm:grid-cols-3 gap-4">
                    {[
                      { label: 'Capacity', value: `${venue.capacity} guests` },
                      { label: 'Day rate', value: formatCurrency(venue.price) },
                      { label: 'Hourly', value: formatCurrency(venue.pricePerHour) },
                    ].map((s) => (
                      <Card key={s.label} padding="sm" className="bg-secondary border-0">
                        <p className="text-caption text-muted">{s.label}</p>
                        <p className="mt-1 text-body font-semibold text-primary">{s.value}</p>
                      </Card>
                    ))}
                  </div>
                </motion.div>
              )}
              {tab === 'amenities' && (
                <div className="grid sm:grid-cols-2 gap-3">
                  {venue.amenities.map((a) => (
                    <div
                      key={a}
                      className="flex items-center gap-2.5 rounded-xl border border-border bg-surface px-4 py-3"
                    >
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-50 text-primary">
                        <Check size={iconSize.sm} />
                      </span>
                      <span className="text-small font-medium text-gray-700">{a}</span>
                    </div>
                  ))}
                </div>
              )}
              {tab === 'faq' && (
                <Accordion
                  items={[
                    {
                      id: '1',
                      title: 'What is included in the day rate?',
                      content:
                        'Venue access for the booked hours, parking, restrooms, and basic setup. Catering and special equipment may be extra.',
                    },
                    {
                      id: '2',
                      title: 'Can we bring our own food?',
                      content:
                        'Yes on most estates. Some venues offer exclusive catering — check amenities or contact the owner.',
                    },
                    {
                      id: '3',
                      title: 'What is the cancellation policy?',
                      content:
                        'Free cancellation up to 7 days before the event. Later cancellations may incur a partial fee.',
                    },
                  ]}
                />
              )}
            </div>
          </div>

          {/* Booking card */}
          <aside className="lg:sticky lg:top-24 h-fit">
            <Card className="shadow-lg">
              <div className="flex items-baseline justify-between gap-2">
                <p className="text-h3 font-bold text-primary">
                  {formatCurrency(venue.price)}
                  <span className="text-small font-normal text-muted"> / day</span>
                </p>
                <span className="inline-flex items-center gap-1 text-small text-secondary">
                  <Star size={iconSize.xs} className="fill-warning text-warning" />
                  {venue.rating}
                </span>
              </div>

              <div className="mt-5 space-y-4">
                <CalendarPlaceholder
                  bookedDates={venue.bookedDates}
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                />
                <Input
                  label="Number of guests"
                  type="number"
                  min={1}
                  max={venue.capacity}
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  leftIcon={<Users size={iconSize.sm} />}
                />
                <Button
                  fullWidth
                  size="lg"
                  leftIcon={<CalendarDays size={iconSize.sm} />}
                  onClick={() => {
                    if (!selectedDate) {
                      toast.warning('Please select a date')
                      return
                    }
                    toast.success('Booking request prepared', 'Continue to confirmation UI')
                  }}
                >
                  Request to book
                </Button>
                <p className="text-center text-caption text-muted">
                  You won’t be charged yet — this is a UI demo.
                </p>
              </div>
            </Card>
          </aside>
        </div>

        {/* Related */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-h3 font-semibold text-primary">Similar venues</h2>
            <Link to="/search">
              <Button variant="ghost" size="sm">
                See more
              </Button>
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((v) => (
              <VenueCard key={v.id} venue={v} />
            ))}
          </div>
        </div>
      </Container>
    </MainLayout>
  )
}
