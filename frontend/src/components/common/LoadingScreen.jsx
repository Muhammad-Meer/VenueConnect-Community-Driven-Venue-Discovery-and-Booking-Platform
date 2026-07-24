import Spinner from '../ui/Spinner';
import Logo from './Logo';

export default function LoadingScreen({ label = 'Loading VenueHub…' }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-surface-muted">
      <Logo />
      <Spinner size="lg" />
      <p className="text-sm text-content-muted">{label}</p>
    </div>
  );
}
