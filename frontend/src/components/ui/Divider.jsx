import { cn } from '../../lib/cn'

function Divider({ label, className, orientation = 'horizontal' }) {
  if (orientation === 'vertical') {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={cn('w-px self-stretch bg-neutral-200', className)}
      />
    )
  }

  if (label) {
    return (
      <div
        role="separator"
        className={cn('flex items-center gap-3 text-xs text-neutral-400', className)}
      >
        <span className="h-px flex-1 bg-neutral-200" />
        <span className="shrink-0 font-medium uppercase tracking-wider">{label}</span>
        <span className="h-px flex-1 bg-neutral-200" />
      </div>
    )
  }

  return (
    <hr
      role="separator"
      className={cn('border-0 h-px w-full bg-neutral-200', className)}
    />
  )
}

export default Divider
