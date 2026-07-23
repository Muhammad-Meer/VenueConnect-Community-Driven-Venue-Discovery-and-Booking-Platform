import { cn } from '../../lib/cn'

function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn('animate-shimmer rounded-md bg-neutral-100', className)}
      aria-hidden="true"
      {...props}
    />
  )
}

function SkeletonText({ lines = 3, className }) {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          className={cn('h-3', index === lines - 1 ? 'w-2/3' : 'w-full')}
        />
      ))}
    </div>
  )
}

function SkeletonCard({ className }) {
  return (
    <div
      className={cn(
        'rounded-xl border border-neutral-200 bg-white p-4 space-y-4',
        className,
      )}
    >
      <Skeleton className="h-40 w-full rounded-lg" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
      <div className="flex gap-2 pt-1">
        <Skeleton className="h-8 w-20 rounded-lg" />
        <Skeleton className="h-8 w-20 rounded-lg" />
      </div>
    </div>
  )
}

Skeleton.Text = SkeletonText
Skeleton.Card = SkeletonCard

export default Skeleton
export { SkeletonText, SkeletonCard }
