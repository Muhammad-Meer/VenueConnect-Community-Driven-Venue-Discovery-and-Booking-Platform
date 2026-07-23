import Spinner from '../ui/Spinner'
import { cn } from '../../lib/cn'

function LoadingScreen({ message = 'Loading…', className, fullScreen = true }) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-3 text-neutral-500',
        fullScreen ? 'min-h-[50vh]' : 'py-16',
        className,
      )}
    >
      <Spinner size="lg" className="text-primary" />
      <p className="text-sm font-medium">{message}</p>
    </div>
  )
}

export default LoadingScreen
