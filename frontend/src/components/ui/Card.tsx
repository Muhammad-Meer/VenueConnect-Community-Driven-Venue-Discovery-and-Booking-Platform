import type { HTMLAttributes, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  hover?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
  children: ReactNode
}

const paddings = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

export default function Card({
  children,
  className,
  hover = false,
  padding = 'md',
  ...props
}: CardProps) {
  if (hover) {
    return (
      <motion.div
        whileHover={{ y: -3 }}
        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        className={cn(
          'bg-card border border-border rounded-xl shadow-card',
          'hover:shadow-card-hover hover:border-primary-200 transition-shadow duration-normal',
          paddings[padding],
          className,
        )}
        {...(props as object)}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <div
      className={cn(
        'bg-card border border-border rounded-xl shadow-card',
        paddings[padding],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({
  title,
  subtitle,
  action,
  className,
}: {
  title: ReactNode
  subtitle?: ReactNode
  action?: ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex items-start justify-between gap-4 mb-5', className)}>
      <div>
        <h3 className="text-h4 font-semibold text-primary tracking-tight">{title}</h3>
        {subtitle && <p className="mt-1 text-small text-muted">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}
