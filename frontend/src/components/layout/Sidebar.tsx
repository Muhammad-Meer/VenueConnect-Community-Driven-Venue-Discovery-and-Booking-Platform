import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/cn'
import { iconSize } from '@/theme'

export type SidebarItem = {
  label: string
  href: string
  icon: LucideIcon
  badge?: string | number
}

export type SidebarProps = {
  items: SidebarItem[]
  title?: string
  collapsed?: boolean
  className?: string
}

export default function Sidebar({
  items,
  title,
  collapsed = false,
  className,
}: SidebarProps) {
  return (
    <aside
      className={cn(
        'hidden lg:flex flex-col shrink-0 border-r border-border bg-surface h-[calc(100vh-var(--header-height))] sticky top-header overflow-y-auto scrollbar-thin',
        collapsed ? 'w-20' : 'w-sidebar',
        className,
      )}
    >
      {title && !collapsed && (
        <div className="px-5 py-5 border-b border-border">
          <p className="text-caption font-semibold uppercase tracking-wider text-muted">
            {title}
          </p>
        </div>
      )}
      <nav className="flex-1 p-3 space-y-0.5">
        {items.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.href.split('/').length <= 2}
              className={({ isActive }) =>
                cn(
                  'group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-small font-medium transition-all duration-normal',
                  isActive
                    ? 'bg-primary-50 text-primary'
                    : 'text-secondary hover:bg-gray-50 hover:text-primary',
                  collapsed && 'justify-center px-2',
                )
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span
                      layoutId="sidebar-active"
                      className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full bg-primary"
                    />
                  )}
                  <Icon size={iconSize.md} className="shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="flex-1 truncate">{item.label}</span>
                      {item.badge != null && (
                        <span className="rounded-full bg-primary/10 text-primary px-2 py-0.5 text-caption font-semibold">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </>
              )}
            </NavLink>
          )
        })}
      </nav>
    </aside>
  )
}
