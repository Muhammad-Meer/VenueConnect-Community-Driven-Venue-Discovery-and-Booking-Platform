import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react'
import { cn } from '@/lib/cn'
import { iconSize } from '@/theme'

type ToastType = 'success' | 'error' | 'warning' | 'info'

type ToastItem = {
  id: string
  type: ToastType
  title: string
  description?: string
}

type ToastContextValue = {
  toast: (input: Omit<ToastItem, 'id'>) => void
  success: (title: string, description?: string) => void
  error: (title: string, description?: string) => void
  warning: (title: string, description?: string) => void
  info: (title: string, description?: string) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

const icons = {
  success: CheckCircle2,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
}

const styles = {
  success: 'border-success/30 bg-surface',
  error: 'border-danger/30 bg-surface',
  warning: 'border-warning/30 bg-surface',
  info: 'border-info/30 bg-surface',
}

const iconStyles = {
  success: 'text-success',
  error: 'text-danger',
  warning: 'text-warning',
  info: 'text-info',
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([])

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const toast = useCallback(
    (input: Omit<ToastItem, 'id'>) => {
      const id = Math.random().toString(36).slice(2)
      setItems((prev) => [...prev, { ...input, id }])
      window.setTimeout(() => remove(id), 4000)
    },
    [remove],
  )

  const value = useMemo<ToastContextValue>(
    () => ({
      toast,
      success: (title, description) => toast({ type: 'success', title, description }),
      error: (title, description) => toast({ type: 'error', title, description }),
      warning: (title, description) => toast({ type: 'warning', title, description }),
      info: (title, description) => toast({ type: 'info', title, description }),
    }),
    [toast],
  )

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed bottom-6 right-6 z-toast flex flex-col gap-3 w-full max-w-sm pointer-events-none">
        <AnimatePresence>
          {items.map((item) => {
            const Icon = icons[item.type]
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                className={cn(
                  'pointer-events-auto flex gap-3 rounded-xl border p-4 shadow-lg',
                  styles[item.type],
                )}
              >
                <Icon size={iconSize.md} className={cn('shrink-0 mt-0.5', iconStyles[item.type])} />
                <div className="flex-1 min-w-0">
                  <p className="text-small font-semibold text-primary">{item.title}</p>
                  {item.description && (
                    <p className="mt-0.5 text-caption text-muted">{item.description}</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => remove(item.id)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={iconSize.sm} />
                </button>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
