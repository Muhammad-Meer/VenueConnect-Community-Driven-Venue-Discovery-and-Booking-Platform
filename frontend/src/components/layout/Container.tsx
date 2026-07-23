import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  narrow?: boolean
}

export default function Container({
  children,
  className,
  narrow,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        'w-full mx-auto px-4 sm:px-6 lg:px-8',
        narrow ? 'max-w-narrow' : 'max-w-container',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
