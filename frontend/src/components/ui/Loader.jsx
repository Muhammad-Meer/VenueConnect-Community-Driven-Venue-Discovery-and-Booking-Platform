import Spinner from './Spinner';
import { cn } from '../../lib/cn';

export default function Loader({ label = 'Loading…', className, fullPage = false }) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-3 text-content-muted',
        fullPage ? 'min-h-[50vh]' : 'py-12',
        className
      )}
    >
      <Spinner size="lg" />
      <p className="text-sm">{label}</p>
    </div>
  );
}
