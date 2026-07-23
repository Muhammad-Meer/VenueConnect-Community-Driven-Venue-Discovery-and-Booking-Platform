import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Upload, Plus } from 'lucide-react'
import { DashboardLayout } from '@/components/layout'
import {
  Button,
  Input,
  Textarea,
  Select,
  Checkbox,
  Card,
  CardHeader,
  Tag,
  Alert,
  useToast,
} from '@/components/ui'
import { ownerNav } from '@/constants/navigation'
import { categories, cities, amenitiesList } from '@/data/mockData'
import { iconSize } from '@/theme'

export default function AddVenue() {
  const toast = useToast()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [amenities, setAmenities] = useState<string[]>(['Parking'])
  const [tags, setTags] = useState(['Family friendly'])

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
      toast.success('Venue created', 'Your listing is ready for review.')
      navigate('/owner/venues')
    }, 900)
  }

  return (
    <DashboardLayout
      items={ownerNav}
      title="Owner"
      pageTitle="Add venue"
      pageSubtitle="Create a new dairy farm listing."
    >
      <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
        <Alert variant="info" title="Frontend-only form">
          This form demonstrates the full UI. Submissions are not saved to a backend.
        </Alert>

        <Card>
          <CardHeader title="Basic details" subtitle="Name, location, and description." />
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2">
              <Input label="Venue name" placeholder="Green Valley Dairy Estate" required />
            </div>
            <Select
              label="City"
              options={cities.map((c) => ({ value: c, label: c }))}
              required
            />
            <Select
              label="Category"
              options={categories.map((c) => ({ value: c, label: c }))}
              required
            />
            <div className="sm:col-span-2">
              <Input label="Address" placeholder="Street, area, landmarks" required />
            </div>
            <div className="sm:col-span-2">
              <Textarea
                label="Description"
                placeholder="Describe the experience, pastures, and what guests can expect…"
                rows={5}
                required
              />
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader title="Pricing & capacity" />
          <div className="grid sm:grid-cols-3 gap-5">
            <Input label="Day rate (PKR)" type="number" placeholder="45000" required />
            <Input label="Hourly rate (PKR)" type="number" placeholder="6000" />
            <Input label="Max capacity" type="number" placeholder="200" required />
            <Input label="Acres" type="number" placeholder="48" />
          </div>
        </Card>

        <Card>
          <CardHeader title="Amenities" subtitle="Select everything included with the booking." />
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
          <CardHeader title="Photos" subtitle="Add beautiful dairy farm imagery." />
          <div className="border-2 border-dashed border-border rounded-xl p-10 text-center hover:border-primary-300 hover:bg-primary-50/30 transition-colors cursor-pointer">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary mb-3">
              <Upload size={iconSize.lg} />
            </div>
            <p className="text-small font-semibold text-primary">Click to upload images</p>
            <p className="mt-1 text-caption text-muted">PNG, JPG up to 5MB · UI placeholder</p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((t) => (
              <Tag
                key={t}
                variant="primary"
                onRemove={() => setTags((prev) => prev.filter((x) => x !== t))}
              >
                {t}
              </Tag>
            ))}
            <button
              type="button"
              onClick={() => setTags((prev) => [...prev, `Tag ${prev.length + 1}`])}
              className="inline-flex items-center gap-1 text-caption font-medium text-primary hover:underline"
            >
              <Plus size={iconSize.xs} /> Add tag
            </button>
          </div>
        </Card>

        <div className="flex flex-wrap items-center justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => navigate('/owner/venues')}>
            Cancel
          </Button>
          <Button type="button" variant="secondary" onClick={() => toast.info('Draft saved')}>
            Save draft
          </Button>
          <Button type="submit" loading={loading}>
            Publish venue
          </Button>
        </div>
      </form>
    </DashboardLayout>
  )
}
