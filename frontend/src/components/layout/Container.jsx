import { cn } from '../../lib/cn'

function Container({ children, className, as: Component = 'div', narrow = false }) {
  return (
    <Component
      className={cn(
        'w-full mx-auto px-4 sm:px-6 lg:px-8',
        narrow ? 'max-w-narrow' : 'max-w-container',
        className,
      )}
    >
      {children}
    </Component>
  )
}

export default Container
