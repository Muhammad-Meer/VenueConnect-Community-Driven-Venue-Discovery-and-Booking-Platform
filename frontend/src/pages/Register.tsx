import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Building2, Mail, Lock, User, Phone } from 'lucide-react'
import { Button, Input, Select, Checkbox, Card, Radio } from '@/components/ui'
import { images } from '@/constants/images'
import { iconSize } from '@/theme'

export default function Register() {
  const [role, setRole] = useState('customer')
  const [agree, setAgree] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      window.location.href = role === 'owner' ? '/owner' : '/profile'
    }, 1000)
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex items-center justify-center p-6 sm:p-10 bg-page order-2 lg:order-1">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden mb-8">
            <Link to="/" className="inline-flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white">
                <Building2 size={iconSize.md} />
              </span>
              <span className="text-lg font-bold text-primary">PastureBook</span>
            </Link>
          </div>

          <Card className="shadow-lg">
            <h1 className="text-h2 font-semibold text-primary tracking-tight">
              Create account
            </h1>
            <p className="mt-1.5 text-small text-muted">
              Join PastureBook to book or list dairy farm venues.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <Input
                label="Full name"
                placeholder="Ayesha Khan"
                leftIcon={<User size={iconSize.sm} />}
                required
              />
              <Input
                label="Email"
                type="email"
                placeholder="you@example.com"
                leftIcon={<Mail size={iconSize.sm} />}
                required
              />
              <Input
                label="Phone"
                type="tel"
                placeholder="+92 300 0000000"
                leftIcon={<Phone size={iconSize.sm} />}
              />
              <Input
                label="Password"
                type="password"
                placeholder="Min. 8 characters"
                leftIcon={<Lock size={iconSize.sm} />}
                required
              />
              <Select
                label="City"
                options={[
                  { value: 'Lahore', label: 'Lahore' },
                  { value: 'Karachi', label: 'Karachi' },
                  { value: 'Islamabad', label: 'Islamabad' },
                  { value: 'Other', label: 'Other' },
                ]}
                defaultValue=""
              />

              <div>
                <p className="text-small font-medium text-gray-700 mb-2">I am a…</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Radio
                    name="role"
                    value="customer"
                    label="Guest"
                    description="Book venues"
                    checked={role === 'customer'}
                    onChange={() => setRole('customer')}
                    className="flex-1 rounded-xl border border-border p-3"
                  />
                  <Radio
                    name="role"
                    value="owner"
                    label="Venue owner"
                    description="List farms"
                    checked={role === 'owner'}
                    onChange={() => setRole('owner')}
                    className="flex-1 rounded-xl border border-border p-3"
                  />
                </div>
              </div>

              <Checkbox
                label="I agree to the Terms of Service and Privacy Policy"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                required
              />

              <Button type="submit" fullWidth size="lg" loading={loading} disabled={!agree}>
                Create account
              </Button>
            </form>

            <p className="mt-6 text-center text-small text-muted">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </Card>
        </motion.div>
      </div>

      <div className="hidden lg:block relative order-1 lg:order-2">
        <img
          src={images.milk[0]}
          alt="Fresh dairy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-bl from-primary/90 via-primary/70 to-primary-900/80" />
        <div className="relative z-10 flex h-full flex-col justify-between p-12 text-white">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
              <Building2 size={iconSize.md} />
            </span>
            <span className="text-xl font-bold">PastureBook</span>
          </Link>
          <div>
            <h2 className="text-display-lg font-bold leading-tight">
              Start your countryside journey.
            </h2>
            <p className="mt-4 text-body text-white/80 max-w-md">
              Whether you&apos;re hosting or exploring — PastureBook makes dairy farm experiences effortless.
            </p>
          </div>
          <p className="text-caption text-white/60">Trusted by farm owners nationwide</p>
        </div>
      </div>
    </div>
  )
}
