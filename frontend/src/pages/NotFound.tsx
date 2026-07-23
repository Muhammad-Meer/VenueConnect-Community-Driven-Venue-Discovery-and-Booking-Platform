import { Link } from 'react-router-dom'
import { Home, Search } from 'lucide-react'
import { MainLayout, Container } from '@/components/layout'
import { Button } from '@/components/ui'
import { iconSize } from '@/theme'

export default function NotFound() {
  return (
    <MainLayout>
      <Container className="py-24 text-center">
        <p className="text-display-xl font-extrabold text-primary-100">404</p>
        <h1 className="mt-2 text-h1 font-semibold text-primary">Page not found</h1>
        <p className="mt-3 text-body text-muted max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link to="/">
            <Button leftIcon={<Home size={iconSize.sm} />}>Go home</Button>
          </Link>
          <Link to="/search">
            <Button variant="outline" leftIcon={<Search size={iconSize.sm} />}>
              Explore venues
            </Button>
          </Link>
        </div>
      </Container>
    </MainLayout>
  )
}
