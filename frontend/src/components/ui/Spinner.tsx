import { cn } from '@/lib/cn'
import { Loader2 } from 'lucide-react'
import { iconSize } from '@/theme'

type SpinnerProps = {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeMap = {
  sm: iconSize.sm,
  md: iconSize.md,
  lg: iconSize.lg,
}

export default function Spinner({ size = 'md', className }: SpinnerProps) {
  return (
    <Loader2
      size={sizeMap[size]}
      className={cn('animate-spin text-current', className)}
      aria-hidden
    />
  )
}
