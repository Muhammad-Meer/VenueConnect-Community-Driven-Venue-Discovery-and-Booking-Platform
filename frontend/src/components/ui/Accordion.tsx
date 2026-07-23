import { useState, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/cn'
import { iconSize } from '@/theme'

export type AccordionItem = {
  id: string
  title: string
  content: ReactNode
}

export type AccordionProps = {
  items: AccordionItem[]
  className?: string
  allowMultiple?: boolean
}

export default function Accordion({ items, className, allowMultiple }: AccordionProps) {
  const [open, setOpen] = useState<string[]>([])

  const toggle = (id: string) => {
    setOpen((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id)
      return allowMultiple ? [...prev, id] : [id]
    })
  }

  return (
    <div className={cn('divide-y divide-border rounded-xl border border-border bg-surface overflow-hidden', className)}>
      {items.map((item) => {
        const isOpen = open.includes(item.id)
        return (
          <div key={item.id}>
            <button
              type="button"
              onClick={() => toggle(item.id)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left hover:bg-gray-50 transition-colors"
            >
              <span className="text-small font-semibold text-primary">{item.title}</span>
              <ChevronDown
                size={iconSize.sm}
                className={cn(
                  'text-gray-400 transition-transform duration-normal',
                  isOpen && 'rotate-180',
                )}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-4 text-small text-secondary leading-relaxed">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
