import { Link } from 'react-router-dom';
import { MailCheck } from 'lucide-react';
import Button from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { useAuth } from '../../hooks/useAuth';

export default function EmailConfirmation() {
  const { homePath, user } = useAuth();
  return (
    <div className="container-app flex min-h-[70vh] items-center justify-center py-16">
      <Card className="max-w-lg p-8 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-success-soft text-success">
          <MailCheck className="h-8 w-8" />
        </div>
        <h1 className="mt-5 text-2xl font-bold">Confirm your email</h1>
        <p className="mt-2 text-sm text-content-muted">
          We sent a confirmation link to <strong className="text-content">{user?.email || 'your inbox'}</strong>.
          You can continue exploring while we verify your account.
        </p>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Button asChild>
            <Link to={homePath || '/app'}>Go to dashboard</Link>
          </Button>
          <Button variant="outline">
            <Link to="/search">Browse venues</Link>
          </Button>
        </div>
      </Card>
    </div>
  );
}
