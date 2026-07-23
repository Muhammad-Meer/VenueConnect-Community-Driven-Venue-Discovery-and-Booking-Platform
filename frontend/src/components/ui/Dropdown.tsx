import { useEffect, useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/cn'

export type DropdownItem = {
  label: string
  onClick?: () => void
  icon?: ReactNode
  danger?: boolean
  disabled?: boolean
  divider?: boolean
}

export type DropdownProps = {
  trigger: ReactNode
  items: DropdownItem[]
  align?: 'left' | 'right'
  className?: string
}

export default function Dropdown({
  trigger,
  items,
  align = 'right',
  className,
}: DropdownProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} className={cn('relative inline-flex', className)}>
      <div onClick={() => setOpen((v) => !v)} className="cursor-pointer">
        {trigger}
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className={cn(
              'absolute top-full mt-2 z-dropdown min-w-[200px] py-1.5',
              'bg-surface border border-border rounded-xl shadow-dropdown',
              align === 'right' ? 'right-0' : 'left-0',
            )}
          >
            {items.map((item, i) =>
              item.divider ? (
                <div key={i} className="my-1.5 h-px bg-divider" />
              ) : (
                <button
                  key={i}
                  type="button"
                  disabled={item.disabled}
                  onClick={() => {
                    item.onClick?.()
                    setOpen(false)
                  }}
                  className={cn(
                    'flex w-full items-center gap-2.5 px-3.5 py-2 text-small text-left transition-colors',
                    item.danger
                      ? 'text-danger hover:bg-danger-light'
                      : 'text-gray-700 hover:bg-gray-50',
                    item.disabled && 'opacity-50 cursor-not-allowed',
                  )}
                >
                  {item.icon}
                  {item.label}
                </button>
              ),
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
