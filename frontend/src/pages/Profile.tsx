import { useState } from 'react'
import { Camera, Mail, Phone, MapPin, Bell } from 'lucide-react'
import { MainLayout, Container } from '@/components/layout'
import {
  Button,
  Input,
  Textarea,
  Select,
  Avatar,
  Card,
  CardHeader,
  Tabs,
  Toggle,
  Badge,
  Breadcrumb,
  useToast,
} from '@/components/ui'
import { mockUsers } from '@/data/mockData'
import { iconSize } from '@/theme'

export default function Profile() {
  const user = mockUsers[0]
  const toast = useToast()
  const [tab, setTab] = useState('profile')
  const [notifications, setNotifications] = useState(true)
  const [marketing, setMarketing] = useState(false)
  const [loading, setLoading] = useState(false)

  const save = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast.success('Profile updated')
    }, 700)
  }

  return (
    <MainLayout>
      <Container className="py-8 md:py-10 max-w-4xl">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Profile' },
          ]}
          className="mb-6"
        />

        <div className="flex flex-col sm:flex-row sm:items-center gap-5 mb-8">
          <div className="relative">
            <Avatar name={user.name} size="xl" />
            <button
              type="button"
              className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white shadow-md hover:bg-primary-hover transition-colors"
              aria-label="Change photo"
            >
              <Camera size={iconSize.sm} />
            </button>
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-h2 font-semibold text-primary">{user.name}</h1>
              <Badge variant="primary">{user.role}</Badge>
            </div>
            <p className="mt-1 text-small text-muted flex items-center gap-1.5">
              <Mail size={iconSize.xs} /> {user.email}
            </p>
            <p className="mt-0.5 text-small text-muted flex items-center gap-1.5">
              <MapPin size={iconSize.xs} /> {user.city}
            </p>
          </div>
        </div>

        <Tabs
          tabs={[
            { id: 'profile', label: 'Profile' },
            { id: 'security', label: 'Security' },
            { id: 'preferences', label: 'Preferences' },
          ]}
          active={tab}
          onChange={setTab}
        />

        <div className="mt-6">
          {tab === 'profile' && (
            <Card>
              <CardHeader title="Personal information" subtitle="Update your public profile details." />
              <div className="grid sm:grid-cols-2 gap-5">
                <Input label="Full name" defaultValue={user.name} />
                <Input label="Email" type="email" defaultValue={user.email} leftIcon={<Mail size={iconSize.sm} />} />
                <Input label="Phone" defaultValue={user.phone} leftIcon={<Phone size={iconSize.sm} />} />
                <Select
                  label="City"
                  defaultValue={user.city}
                  options={[
                    { value: 'Karachi', label: 'Karachi' },
                    { value: 'Lahore', label: 'Lahore' },
                    { value: 'Islamabad', label: 'Islamabad' },
                  ]}
                />
                <div className="sm:col-span-2">
                  <Textarea
                    label="Bio"
                    placeholder="Tell hosts a little about yourself…"
                    defaultValue="Food lover and weekend explorer of countryside farms."
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <Button loading={loading} onClick={save}>
                  Save changes
                </Button>
              </div>
            </Card>
          )}

          {tab === 'security' && (
            <Card>
              <CardHeader title="Security" subtitle="Manage your password." />
              <div className="space-y-5 max-w-md">
                <Input label="Current password" type="password" />
                <Input label="New password" type="password" />
                <Input label="Confirm new password" type="password" />
                <Button onClick={() => toast.success('Password updated')}>
                  Update password
                </Button>
              </div>
            </Card>
          )}

          {tab === 'preferences' && (
            <Card>
              <CardHeader title="Preferences" subtitle="Control notifications and emails." />
              <div className="space-y-6">
                <Toggle
                  id="notif"
                  checked={notifications}
                  onChange={setNotifications}
                  label="Booking notifications"
                  description="Get alerts when booking status changes."
                />
                <Toggle
                  id="marketing"
                  checked={marketing}
                  onChange={setMarketing}
                  label="Marketing emails"
                  description="Occasional product updates and farm highlights."
                />
                <div className="flex items-center gap-3 rounded-xl bg-secondary p-4">
                  <Bell size={iconSize.md} className="text-primary" />
                  <p className="text-small text-secondary">
                    Preferences are UI-only in this demo and are not persisted.
                  </p>
                </div>
              </div>
            </Card>
          )}
        </div>
      </Container>
    </MainLayout>
  )
}
