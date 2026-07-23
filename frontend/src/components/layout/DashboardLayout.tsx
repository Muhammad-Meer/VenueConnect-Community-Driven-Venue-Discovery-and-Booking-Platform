import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Building2 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { iconSize } from '@/theme'
import { Button, Drawer } from '@/components/ui'
import Sidebar, { type SidebarItem } from './Sidebar'
import Navbar from './Navbar'

export type DashboardLayoutProps = {
  children: ReactNode
  items: SidebarItem[]
  title?: string
  pageTitle?: string
  pageSubtitle?: string
  actions?: ReactNode
}

export default function DashboardLayout({
  children,
  items,
  title = 'Dashboard',
  pageTitle,
  pageSubtitle,
  actions,
}: DashboardLayoutProps) {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col bg-page">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar items={items} title={title} />
        <div className="flex-1 min-w-0">
          <div className="lg:hidden flex items-center gap-3 px-4 py-3 border-b border-border bg-surface">
            <Button variant="outline" size="sm" onClick={() => setDrawerOpen(true)}>
              <Menu size={iconSize.md} />
            </Button>
            <span className="text-small font-semibold text-primary">{title}</span>
          </div>

          <div className="p-4 sm:p-6 lg:p-8">
            {(pageTitle || actions) && (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  {pageTitle && (
                    <h1 className="text-h2 font-semibold tracking-tight text-primary">
                      {pageTitle}
                    </h1>
                  )}
                  {pageSubtitle && (
                    <p className="mt-1 text-small text-muted">{pageSubtitle}</p>
                  )}
                </div>
                {actions && <div className="flex items-center gap-2 flex-wrap">{actions}</div>}
              </div>
            )}
            {children}
          </div>
        </div>
      </div>

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title={title} side="left" width="max-w-xs">
        <nav className="space-y-1">
          {items.map((item) => {
            const Icon = item.icon as LucideIcon
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setDrawerOpen(false)}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-small font-medium text-secondary hover:bg-gray-50 hover:text-primary"
              >
                <Icon size={iconSize.md} />
                {item.label}
              </Link>
            )
          })}
        </nav>
        <div className="mt-8 pt-4 border-t border-border">
          <Link
            to="/"
            className="flex items-center gap-2 text-small text-muted hover:text-primary"
            onClick={() => setDrawerOpen(false)}
          >
            <Building2 size={iconSize.sm} />
            Back to home
          </Link>
        </div>
      </Drawer>
    </div>
  )
}
