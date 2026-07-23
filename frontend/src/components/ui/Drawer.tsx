import { useEffect, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '@/lib/cn'
import { iconSize } from '@/theme'
import Button from './Button'

export type DrawerProps = {
  open: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  side?: 'left' | 'right'
  className?: string
  width?: string
}

export default function Drawer({
  open,
  onClose,
  title,
  children,
  side = 'right',
  className,
  width = 'max-w-md',
}: DrawerProps) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-modal">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gray-900/40 backdrop-blur-[2px]"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: side === 'right' ? '100%' : '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: side === 'right' ? '100%' : '-100%' }}
            transition={{ type: 'spring', stiffness: 380, damping: 34 }}
            className={cn(
              'absolute top-0 bottom-0 w-full bg-surface shadow-xl border-border flex flex-col',
              side === 'right' ? 'right-0 border-l' : 'left-0 border-r',
              width,
              className,
            )}
          >
            <div className="flex items-center justify-between gap-3 px-5 h-header border-b border-border shrink-0">
              <h2 className="text-h4 font-semibold text-primary">{title}</h2>
              <Button variant="ghost" size="sm" onClick={onClose} aria-label="Close">
                <X size={iconSize.md} />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto scrollbar-thin p-5">{children}</div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
