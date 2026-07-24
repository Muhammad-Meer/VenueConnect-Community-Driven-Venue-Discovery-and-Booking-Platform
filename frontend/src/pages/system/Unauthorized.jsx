import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import { useAuth } from '../../hooks/useAuth';

export default function Unauthorized() {
  const { homePath } = useAuth();
  return (
    <div className="container-app flex min-h-[70vh] flex-col items-center justify-center text-center">
      <p className="text-sm font-semibold text-danger">403</p>
      <h1 className="mt-2 text-3xl font-bold">Unauthorized</h1>
      <p className="mt-2 max-w-md text-content-muted">
        You do not have permission to view this area of VenueHub.
      </p>
      <div className="mt-6 flex gap-2">
        <Button>
          <Link to={homePath || '/'}>Go to dashboard</Link>
        </Button>
        <Button variant="outline">
          <Link to="/">Home</Link>
        </Button>
      </div>
    </div>
  );
}
