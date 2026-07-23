import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Upload } from 'lucide-react'
import { DashboardLayout } from '@/components/layout'
import {
  Button,
  Input,
  Textarea,
  Select,
  Checkbox,
  Card,
  CardHeader,
  Badge,
  Alert,
  EmptyState,
  useToast,
} from '@/components/ui'
import { ownerNav } from '@/constants/navigation'
import { mockVenues, categories, cities, amenitiesList } from '@/data/mockData'
import { iconSize } from '@/theme'

export default function EditVenue() {
  const { id } = useParams()
  const venue = mockVenues.find((v) => v.id === id)
  const toast = useToast()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [amenities, setAmenities] = useState(venue?.amenities || [])

  if (!venue) {
    return (
      <DashboardLayout items={ownerNav} title="Owner" pageTitle="Edit venue">
        <EmptyState
          title="Venue not found"
          description="This listing does not exist."
          actionLabel="Back to venues"
          onAction={() => navigate('/owner/venues')}
        />
      </DashboardLayout>
    )
  }

  const toggleAmenity = (a: string) => {
    setAmenities((prev) =>
      prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a],
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast.success('Venue updated')
      navigate('/owner/venues')
    }, 800)
  }

  return (
    <DashboardLayout
      items={ownerNav}
      title="Owner"
      pageTitle="Edit venue"
      pageSubtitle={venue.name}
      actions={
        <Badge
          variant={
            venue.status === 'active'
              ? 'success'
              : venue.status === 'pending'
                ? 'warning'
                : 'muted'
          }
        >
          {venue.status}
        </Badge>
      }
    >
      <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
        <Alert variant="warning" title="Editing demo data">
          Changes are not persisted. This page mirrors a production edit flow.
        </Alert>

        <Card>
          <CardHeader title="Basic details" />
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2">
              <Input label="Venue name" defaultValue={venue.name} required />
            </div>
            <Select
              label="City"
              defaultValue={venue.city}
              options={cities.map((c) => ({ value: c, label: c }))}
            />
            <Select
              label="Category"
              defaultValue={venue.category}
              options={categories.map((c) => ({ value: c, label: c }))}
            />
            <div className="sm:col-span-2">
              <Input label="Address" defaultValue={venue.address} />
            </div>
            <div className="sm:col-span-2">
              <Textarea label="Description" defaultValue={venue.description} rows={5} />
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader title="Pricing & capacity" />
          <div className="grid sm:grid-cols-3 gap-5">
            <Input label="Day rate (PKR)" type="number" defaultValue={venue.price} />
            <Input label="Hourly rate (PKR)" type="number" defaultValue={venue.pricePerHour} />
            <Input label="Max capacity" type="number" defaultValue={venue.capacity} />
            <Input label="Acres" type="number" defaultValue={venue.acres} />
          </div>
        </Card>

        <Card>
          <CardHeader title="Amenities" />
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {amenitiesList.map((a) => (
              <Checkbox
                key={a}
                label={a}
                checked={amenities.includes(a)}
                onChange={() => toggleAmenity(a)}
              />
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader title="Photos" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            {venue.images.map((img, i) => (
              <div key={i} className="aspect-[4/3] rounded-xl overflow-hidden border border-border">
                <img src={img} alt="" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
          <div className="border-2 border-dashed border-border rounded-xl p-6 text-center text-small text-muted">
            <Upload size={iconSize.md} className="mx-auto mb-2 text-primary" />
            Upload additional photos (UI only)
          </div>
        </Card>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <Button
            type="button"
            variant="danger"
            onClick={() => toast.warning('Delete is UI-only in this demo')}
          >
            Delete venue
          </Button>
          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={() => navigate('/owner/venues')}>
              Cancel
            </Button>
            <Button type="submit" loading={loading}>
              Save changes
            </Button>
          </div>
        </div>
      </form>
    </DashboardLayout>
  )
}
