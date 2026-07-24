import { cn } from '../../lib/cn';

export default function Skeleton({ className, ...props }) {
  return <div className={cn('skeleton-shimmer rounded-md', className)} {...props} />;
}

export function SkeletonCard() {
  return (
    <div className="card-surface overflow-hidden">
      <Skeleton className="h-44 w-full rounded-none" />
      <div className="space-y-3 p-4">
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/3" />
      </div>
    </div>
  );
}
