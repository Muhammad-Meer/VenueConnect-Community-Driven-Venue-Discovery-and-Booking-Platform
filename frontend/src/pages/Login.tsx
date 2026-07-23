import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Building2, Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { Button, Input, Checkbox, Card } from '@/components/ui'
import { images } from '@/constants/images'
import { iconSize } from '@/theme'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [remember, setRemember] = useState(true)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      window.location.href = '/profile'
    }, 900)
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:block relative">
        <img
          src={images.fields[0]}
          alt="Dairy pasture"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/75 to-primary-800/80" />
        <div className="relative z-10 flex h-full flex-col justify-between p-12 text-white">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
              <Building2 size={iconSize.md} />
            </span>
            <span className="text-xl font-bold">PastureBook</span>
          </Link>
          <div>
            <h2 className="text-display-lg font-bold leading-tight">
              Welcome back to the pasture.
            </h2>
            <p className="mt-4 text-body text-white/80 max-w-md">
              Manage bookings, discover farms, and continue where you left off.
            </p>
          </div>
          <p className="text-caption text-white/60">© {new Date().getFullYear()} PastureBook</p>
        </div>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-10 bg-page">
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
            <h1 className="text-h2 font-semibold text-primary tracking-tight">Sign in</h1>
            <p className="mt-1.5 text-small text-muted">
              Enter your credentials to access your account.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <Input
                label="Email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                leftIcon={<Mail size={iconSize.sm} />}
                required
              />
              <Input
                label="Password"
                type={show ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                leftIcon={<Lock size={iconSize.sm} />}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="text-gray-400 hover:text-gray-600"
                    tabIndex={-1}
                  >
                    {show ? <EyeOff size={iconSize.sm} /> : <Eye size={iconSize.sm} />}
                  </button>
                }
                required
              />

              <div className="flex items-center justify-between">
                <Checkbox
                  label="Remember me"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                <Link to="/login" className="text-small font-medium text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>

              <Button type="submit" fullWidth size="lg" loading={loading}>
                Sign in
              </Button>
            </form>

            <p className="mt-6 text-center text-small text-muted">
              Don&apos;t have an account?{' '}
              <Link to="/register" className="font-semibold text-primary hover:underline">
                Create one
              </Link>
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
