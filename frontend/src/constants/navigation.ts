import {
  LayoutDashboard,
  Building2,
  PlusCircle,
  CalendarDays,
  Users,
  BarChart3,
  Settings,
  Home,
  Search,
  User,
  FileText,
} from 'lucide-react'
import type { SidebarItem } from '@/components/layout'

export const ownerNav: SidebarItem[] = [
  { label: 'Dashboard', href: '/owner', icon: LayoutDashboard },
  { label: 'My Venues', href: '/owner/venues', icon: Building2 },
  { label: 'Add Venue', href: '/owner/venues/new', icon: PlusCircle },
  { label: 'Bookings', href: '/bookings', icon: CalendarDays },
  { label: 'Profile', href: '/profile', icon: User },
]

export const adminNav: SidebarItem[] = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Users', href: '/admin/users', icon: Users },
  { label: 'Reports', href: '/admin/reports', icon: BarChart3 },
  { label: 'Venues', href: '/search', icon: Building2 },
  { label: 'Settings', href: '/profile', icon: Settings },
]

export const customerNav: SidebarItem[] = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Search', href: '/search', icon: Search },
  { label: 'My Bookings', href: '/bookings', icon: CalendarDays },
  { label: 'Profile', href: '/profile', icon: User },
  { label: 'Reports', href: '/admin/reports', icon: FileText },
]
