import { useState } from 'react'
import { MainLayout, Container, PageHeader } from '../../components/layout'
import {
  Button,
  Input,
  Textarea,
  Select,
  Checkbox,
  Toggle,
  Badge,
  Avatar,
  Card,
  Modal,
  Alert,
  Spinner,
  Skeleton,
  Tabs,
  Pagination,
  EmptyState,
  Rating,
  Divider,
  SearchInput,
  Breadcrumb,
} from '../../components/ui'
import { StatusBadge, Logo } from '../../components/common'
import { VenueCard, VenueFilters } from '../../components/venue'
import { colors } from '../../lib/designTokens'

function Section({ id, title, description, children }) {
  return (
    <section id={id} className="scroll-mt-28">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-neutral-900 tracking-tight">{title}</h2>
        {description && (
          <p className="mt-1 text-sm text-neutral-500 max-w-2xl">{description}</p>
        )}
      </div>
      {children}
    </section>
  )
}

function ColorSwatch({ name, hex }) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className="h-16 rounded-xl border border-neutral-200 shadow-xs"
        style={{ backgroundColor: hex }}
      />
      <div>
        <p className="text-xs font-semibold text-neutral-800">{name}</p>
        <p className="text-2xs text-neutral-400 font-mono">{hex}</p>
      </div>
    </div>
  )
}

const sampleVenue = {
  id: 'demo-1',
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
}

function DesignSystem() {
  const [modalOpen, setModalOpen] = useState(false)
  const [toggleOn, setToggleOn] = useState(true)
  const [page, setPage] = useState(2)
  const [tab, setTab] = useState('buttons')
  const [filters, setFilters] = useState({ sort: 'relevance' })
  const [search, setSearch] = useState('')
  const [rating, setRating] = useState(4)

  const nav = [
    { id: 'colors', label: 'Colors' },
    { id: 'typography', label: 'Typography' },
    { id: 'buttons', label: 'Buttons' },
    { id: 'forms', label: 'Forms' },
    { id: 'feedback', label: 'Feedback' },
    { id: 'data', label: 'Data display' },
    { id: 'venue', label: 'Venue' },
    { id: 'layout', label: 'Layout' },
  ]

  return (
    <MainLayout>
      <div className="bg-mesh border-b border-neutral-200">
        <Container className="py-12 md:py-16">
          <PageHeader
            title="Design System"
            description="Venue Booking Platform UI kit — tokens, components, and patterns for a modern SaaS experience."
            breadcrumbs={[
              { label: 'Home', href: '/' },
              { label: 'Design System' },
            ]}
            actions={
              <Badge variant="primary" size="lg">
                v1.0
              </Badge>
            }
          />

          <div className="flex flex-wrap gap-2">
            {nav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="px-3 py-1.5 text-sm font-medium rounded-full bg-white border border-neutral-200 text-neutral-600 hover:border-primary-200 hover:text-primary transition-colors shadow-xs"
              >
                {item.label}
              </a>
            ))}
          </div>
        </Container>
      </div>

      <Container className="py-12 space-y-16">
        {/* Colors */}
        <Section
          id="colors"
          title="Color palette"
          description="Primary deep blue for brand actions, accent green for success and availability, neutrals for structure."
        >
          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-semibold text-neutral-700 mb-3">Primary</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
                <ColorSwatch name="Primary" hex={colors.primary.DEFAULT} />
                <ColorSwatch name="Primary Light" hex={colors.primary.light} />
                <ColorSwatch name="Primary 50" hex={colors.primary[50]} />
                <ColorSwatch name="Primary 100" hex={colors.primary[100]} />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-neutral-700 mb-3">Accent</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
                <ColorSwatch name="Accent" hex={colors.accent.DEFAULT} />
                <ColorSwatch name="Accent Light" hex={colors.accent.light} />
                <ColorSwatch name="Accent 50" hex={colors.accent[50]} />
                <ColorSwatch name="Accent 100" hex={colors.accent[100]} />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-neutral-700 mb-3">Neutrals</h3>
              <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-3">
                {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((step) => (
                  <ColorSwatch
                    key={step}
                    name={`${step}`}
                    hex={colors.neutral[step]}
                  />
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-neutral-700 mb-3">Semantic</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <ColorSwatch name="Success" hex={colors.semantic.success} />
                <ColorSwatch name="Warning" hex={colors.semantic.warning} />
                <ColorSwatch name="Danger" hex={colors.semantic.danger} />
                <ColorSwatch name="Info" hex={colors.semantic.info} />
              </div>
            </div>
          </div>
        </Section>

        <Divider />

        {/* Typography */}
        <Section
          id="typography"
          title="Typography"
          description="Inter for UI clarity. Tight tracking on headings, relaxed body copy."
        >
          <Card className="space-y-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-neutral-400 mb-2">Display</p>
              <h1 className="!text-5xl">Book the perfect venue</h1>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-neutral-400 mb-2">Heading 2</p>
              <h2>Discover spaces that fit your event</h2>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-neutral-400 mb-2">Heading 3</p>
              <h3>Transparent pricing & instant booking</h3>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-neutral-400 mb-2">Body</p>
              <p className="max-w-2xl">
                VenueBook helps hosts and guests connect through a clean, trustworthy booking experience —
                from discovery and availability checks to secure checkout.
              </p>
            </div>
            <div className="flex flex-wrap gap-6 text-sm">
              <span className="font-normal text-neutral-700">Regular 400</span>
              <span className="font-medium text-neutral-700">Medium 500</span>
              <span className="font-semibold text-neutral-700">Semibold 600</span>
              <span className="font-bold text-neutral-700">Bold 700</span>
            </div>
          </Card>
        </Section>

        <Divider />

        {/* Buttons */}
        <Section id="buttons" title="Buttons" description="Variants and sizes for primary CTAs, secondary actions, and destructive flows.">
          <Card className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="accent">Accent</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="danger-outline">Danger outline</Button>
              <Button variant="link">Link button</Button>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button size="xs">Extra small</Button>
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
              <Button size="xl">Extra large</Button>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button loading>Loading</Button>
              <Button disabled>Disabled</Button>
              <Button
                leftIcon={
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                }
              >
                With icon
              </Button>
              <Button fullWidth className="max-w-xs">
                Full width
              </Button>
            </div>
          </Card>
        </Section>

        <Divider />

        {/* Forms */}
        <Section id="forms" title="Form controls" description="Accessible inputs with labels, helpers, and error states.">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="space-y-4">
              <Input label="Email" type="email" placeholder="you@example.com" required helperText="We'll never share your email." />
              <Input label="Password" type="password" placeholder="••••••••" error="Password must be at least 8 characters." />
              <SearchInput value={search} onChange={(e) => setSearch(e.target.value)} onClear={() => setSearch('')} />
              <Select
                label="Event type"
                options={[
                  { value: 'wedding', label: 'Wedding' },
                  { value: 'conference', label: 'Conference' },
                  { value: 'party', label: 'Party' },
                ]}
                defaultValue=""
              />
              <Textarea label="Special requests" placeholder="Catering, seating, AV needs…" helperText="Optional" />
            </Card>

            <Card className="space-y-5">
              <Checkbox label="Send me booking reminders" description="Email notifications before your event date." defaultChecked />
              <Checkbox label="I agree to the terms" required />
              <Toggle
                label="Instant booking"
                description="Allow guests to book without host approval."
                checked={toggleOn}
                onChange={(e) => setToggleOn(e.target.checked)}
              />
              <Toggle label="Weekend surcharge" description="Apply higher rates on Sat–Sun." />
              <Divider label="or continue with" />
              <Button variant="outline" fullWidth>
                Continue with Google
              </Button>
            </Card>
          </div>
        </Section>

        <Divider />

        {/* Feedback */}
        <Section id="feedback" title="Feedback & overlays" description="Alerts, modals, loaders, and empty states.">
          <div className="space-y-4">
            <Alert variant="info" title="Tip">
              Use accent green for available slots and primary blue for booking CTAs.
            </Alert>
            <Alert variant="success" title="Booking confirmed">
              Your reservation at Grand Horizon is confirmed for 12 Aug.
            </Alert>
            <Alert variant="warning" title="Payment pending">
              Complete payment within 24 hours to keep your hold.
            </Alert>
            <Alert variant="danger" title="Booking failed" onClose={() => {}}>
              The selected date is no longer available.
            </Alert>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-3">
              <Spinner size="sm" className="text-primary" />
              <Spinner size="md" className="text-primary" />
              <Spinner size="lg" className="text-primary" />
            </div>
            <Button onClick={() => setModalOpen(true)}>Open modal</Button>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <EmptyState
              title="No venues found"
              description="Try adjusting filters or search a different city."
              actionLabel="Clear filters"
              onAction={() => setFilters({ sort: 'relevance' })}
            />
            <Skeleton.Card />
          </div>
        </Section>

        <Divider />

        {/* Data display */}
        <Section id="data" title="Data display" description="Badges, avatars, ratings, tabs, cards, and pagination.">
          <div className="space-y-6">
            <Card>
              <Card.Header>
                <Card.Title>Badges & status</Card.Title>
                <Card.Description>Semantic chips for booking lifecycle and filters.</Card.Description>
              </Card.Header>
              <div className="flex flex-wrap gap-2">
                <Badge variant="primary">Primary</Badge>
                <Badge variant="accent">Accent</Badge>
                <Badge variant="success" dot>Available</Badge>
                <Badge variant="warning" dot>Pending</Badge>
                <Badge variant="danger" dot>Cancelled</Badge>
                <Badge variant="info">Info</Badge>
                <Badge variant="neutral">Neutral</Badge>
                <Badge variant="outline">Outline</Badge>
                <StatusBadge status="confirmed" />
                <StatusBadge status="pending" />
                <StatusBadge status="cancelled" />
                <StatusBadge status="completed" />
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <Card.Title>Avatars</Card.Title>
                <div className="mt-4 flex items-center gap-3">
                  <Avatar name="Ayesha Khan" size="xs" />
                  <Avatar name="Bilal Ahmed" size="sm" status="online" />
                  <Avatar name="Sara Malik" size="md" status="busy" />
                  <Avatar name="Omar Raza" size="lg" status="away" />
                  <Avatar name="Venue Host" size="xl" />
                </div>
              </Card>

              <Card>
                <Card.Title>Ratings</Card.Title>
                <div className="mt-4 space-y-3">
                  <Rating value={4.5} showValue reviewCount={128} />
                  <Rating value={rating} interactive onChange={setRating} size="lg" />
                  <p className="text-xs text-neutral-400">Interactive rating: {rating} stars</p>
                </div>
              </Card>
            </div>

            <Card>
              <Tabs value={tab} onChange={setTab}>
                <Tabs.List>
                  <Tabs.Trigger value="buttons">Overview</Tabs.Trigger>
                  <Tabs.Trigger value="pricing">Pricing</Tabs.Trigger>
                  <Tabs.Trigger value="reviews">Reviews</Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="buttons">
                  <p className="text-sm text-neutral-600">
                    Tabs keep dense venue details organized without overwhelming the page.
                  </p>
                </Tabs.Content>
                <Tabs.Content value="pricing">
                  <p className="text-sm text-neutral-600">
                    Day rates, packages, and add-ons can live in separate panels.
                  </p>
                </Tabs.Content>
                <Tabs.Content value="reviews">
                  <p className="text-sm text-neutral-600">
                    Guest reviews with ratings build trust before checkout.
                  </p>
                </Tabs.Content>
              </Tabs>
            </Card>

            <Pagination page={page} totalPages={8} onChange={setPage} />
          </div>
        </Section>

        <Divider />

        {/* Venue */}
        <Section id="venue" title="Venue components" description="Product-specific patterns for discovery and booking.">
          <div className="space-y-6">
            <VenueFilters
              filters={filters}
              onChange={setFilters}
              onReset={() => setFilters({ sort: 'relevance' })}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <VenueCard venue={sampleVenue} />
              <VenueCard
                venue={{
                  ...sampleVenue,
                  id: 'demo-2',
                  name: 'Skyline Conference Hub',
                  category: 'Conference',
                  featured: false,
                  price: 45000,
                  capacity: 120,
                  rating: 4.3,
                  reviewCount: 54,
                  image:
                    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
                }}
              />
              <VenueCard
                venue={{
                  ...sampleVenue,
                  id: 'demo-3',
                  name: 'Garden Pavilion',
                  category: 'Outdoor',
                  featured: false,
                  price: 62000,
                  capacity: 250,
                  rating: 4.9,
                  reviewCount: 89,
                  image:
                    'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80',
                }}
              />
            </div>
          </div>
        </Section>

        <Divider />

        {/* Layout */}
        <Section id="layout" title="Layout primitives" description="Logo, breadcrumbs, and page structure helpers.">
          <Card className="space-y-6">
            <div className="flex flex-wrap items-center gap-8">
              <Logo size="sm" />
              <Logo size="md" />
              <Logo size="lg" />
            </div>

            <Breadcrumb
              items={[
                { label: 'Home', href: '/' },
                { label: 'Venues', href: '/venues' },
                { label: 'Karachi' },
              ]}
            />

            <div className="rounded-xl border border-dashed border-neutral-200 bg-neutral-50 p-6">
              <PageHeader
                title="Your bookings"
                description="Manage upcoming events and past reservations."
                actions={
                  <>
                    <Button variant="outline" size="sm">
                      Export
                    </Button>
                    <Button size="sm">New booking</Button>
                  </>
                }
              />
              <p className="text-sm text-neutral-500 -mt-4">
                PageHeader standardizes titles, descriptions, breadcrumbs, and action slots.
              </p>
            </div>
          </Card>
        </Section>

        <div className="rounded-2xl bg-primary text-white p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="text-2xl font-semibold text-white tracking-tight">Ready to build screens?</h2>
            <p className="mt-2 text-primary-100 text-sm max-w-lg">
              Import components from <code className="text-accent-light">components/ui</code>,{' '}
              <code className="text-accent-light">layout</code>, and{' '}
              <code className="text-accent-light">venue</code> — tokens stay consistent via Tailwind.
            </p>
          </div>
          <Button variant="accent" size="lg">
            Explore venues
          </Button>
        </div>
      </Container>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Confirm booking"
        description="Review details before you proceed to payment."
        footer={
          <>
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setModalOpen(false)}>Continue to checkout</Button>
          </>
        }
      >
        <div className="space-y-3 text-sm text-neutral-600">
          <p>
            <span className="font-medium text-neutral-900">Venue:</span> Grand Horizon Ballroom
          </p>
          <p>
            <span className="font-medium text-neutral-900">Date:</span> 12 August 2026
          </p>
          <p>
            <span className="font-medium text-neutral-900">Guests:</span> 250
          </p>
          <Alert variant="info" title="Free cancellation">
            Cancel up to 48 hours before the event for a full refund.
          </Alert>
        </div>
      </Modal>
    </MainLayout>
  )
}

export default DesignSystem
