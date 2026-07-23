import { X } from 'lucide-react'
import { cn } from '@/lib/cn'
import { iconSize } from '@/theme'

export type TagProps = {
  children: React.ReactNode
  onRemove?: () => void
  variant?: 'default' | 'primary' | 'outline'
  className?: string
}

const variants = {
  default: 'bg-gray-100 text-gray-700',
  primary: 'bg-primary-50 text-primary-700',
  outline: 'bg-surface border border-border text-gray-600',
}

export default function Tag({
  children,
  onRemove,
  variant = 'default',
  className,
}: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-caption font-medium',
        variants[variant],
        className,
      )}
    >
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="hover:opacity-70 transition-opacity"
          aria-label="Remove"
        >
          <X size={iconSize.xs} />
        </button>
      )}
    </span>
  )
}
