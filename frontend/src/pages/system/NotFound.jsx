import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';

export default function NotFound() {
  return (
    <div className="container-app flex min-h-[70vh] flex-col items-center justify-center text-center">
      <p className="text-sm font-semibold text-brand-600">404</p>
      <h1 className="mt-2 text-3xl font-bold">Page not found</h1>
      <p className="mt-2 max-w-md text-content-muted">
        The page you are looking for does not exist or has been moved.
      </p>
      <Button className="mt-6">
        <Link to="/">Back home</Link>
      </Button>
    </div>
  );
}
