import { Link, useNavigate } from 'react-router-dom'
import { MainLayout, Container } from '../components/layout'
import { Button, EmptyState } from '../components/ui'

function NotFound() {
  const navigate = useNavigate()

  return (
    <MainLayout>
      <Container className="py-20">
        <EmptyState
          title="Page not found"
          description="The page you’re looking for doesn’t exist or has been moved."
          className="max-w-lg mx-auto border-0 bg-transparent"
          actionLabel="Back to home"
          onAction={() => navigate('/')}
        >
          <div className="mt-2 flex gap-2 justify-center">
            <Link to="/venues">
              <Button variant="outline" size="sm">
                Browse venues
              </Button>
            </Link>
            <Link to="/design-system">
              <Button variant="ghost" size="sm">
                Design system
              </Button>
            </Link>
          </div>
        </EmptyState>
      </Container>
    </MainLayout>
  )
}

export default NotFound
