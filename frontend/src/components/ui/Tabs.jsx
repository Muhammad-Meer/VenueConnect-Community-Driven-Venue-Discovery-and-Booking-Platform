import { createContext, useContext, useState } from 'react'
import { cn } from '../../lib/cn'

const TabsContext = createContext(null)

function Tabs({ defaultValue, value, onChange, children, className }) {
  const [internal, setInternal] = useState(defaultValue)
  const active = value ?? internal

  const setActive = (next) => {
    if (value === undefined) setInternal(next)
    onChange?.(next)
  }

  return (
    <TabsContext.Provider value={{ active, setActive }}>
      <div className={cn('w-full', className)}>{children}</div>
    </TabsContext.Provider>
  )
}

function TabsList({ children, className }) {
  return (
    <div
      role="tablist"
      className={cn(
        'inline-flex items-center gap-1 p-1 rounded-xl bg-neutral-100 border border-neutral-200/80',
        className,
      )}
    >
      {children}
    </div>
  )
}

function TabsTrigger({ value, children, className, disabled }) {
  const { active, setActive } = useContext(TabsContext)
  const isActive = active === value

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      disabled={disabled}
      onClick={() => setActive(value)}
      className={cn(
        'px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-200',
        'focus-ring disabled:opacity-50 disabled:cursor-not-allowed',
        isActive
          ? 'bg-white text-primary shadow-sm'
          : 'text-neutral-600 hover:text-neutral-900 hover:bg-white/60',
        className,
      )}
    >
      {children}
    </button>
  )
}

function TabsContent({ value, children, className }) {
  const { active } = useContext(TabsContext)
  if (active !== value) return null

  return (
    <div role="tabpanel" className={cn('mt-4 animate-fade-in', className)}>
      {children}
    </div>
  )
}

Tabs.List = TabsList
Tabs.Trigger = TabsTrigger
Tabs.Content = TabsContent

export default Tabs
export { TabsList, TabsTrigger, TabsContent }
