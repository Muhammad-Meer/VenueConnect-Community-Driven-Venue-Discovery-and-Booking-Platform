import { cn } from '../../lib/cn'

function Card({ children, className, interactive = false, padding = true, ...props }) {
  return (
    <div
      className={cn(
        'bg-white border border-neutral-200 rounded-xl shadow-card',
        interactive &&
          'transition-all duration-250 ease-smooth hover:shadow-card-hover hover:border-primary-200 hover:-translate-y-0.5 cursor-pointer',
        padding && 'p-5',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function CardHeader({ children, className, action, ...props }) {
  return (
    <div
      className={cn('flex items-start justify-between gap-4 mb-4', className)}
      {...props}
    >
      <div className="min-w-0 flex-1">{children}</div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}

function CardTitle({ children, className, ...props }) {
  return (
    <h3
      className={cn('text-lg font-semibold text-neutral-900 tracking-tight', className)}
      {...props}
    >
      {children}
    </h3>
  )
}

function CardDescription({ children, className, ...props }) {
  return (
    <p className={cn('mt-1 text-sm text-neutral-500', className)} {...props}>
      {children}
    </p>
  )
}

function CardContent({ children, className, ...props }) {
  return (
    <div className={cn('', className)} {...props}>
      {children}
    </div>
  )
}

function CardFooter({ children, className, ...props }) {
  return (
    <div
      className={cn(
        'mt-4 pt-4 border-t border-neutral-100 flex items-center gap-3',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

Card.Header = CardHeader
Card.Title = CardTitle
Card.Description = CardDescription
Card.Content = CardContent
Card.Footer = CardFooter

export default Card
export { CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
