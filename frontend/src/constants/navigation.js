import {
  LayoutDashboard,
  Search,
  CalendarDays,
  Heart,
  User,
  Building2,
  Users,
  MessageSquare,
  Bell,
  Settings,
  BarChart3,
  ShieldCheck,
  FileText,
  MapPin,
  PlusCircle,
  Wallet,
  Star,
  Home,
} from 'lucide-react';
import { ROLES } from './roles';

export const publicNav = [
  { label: 'Home', href: '/' },
  { label: 'Explore', href: '/search' },
  { label: 'How it works', href: '/#how-it-works' },
  { label: 'For Owners', href: '/register?role=owner' },
];

export const customerNav = [
  { label: 'Dashboard', href: '/app', icon: LayoutDashboard },
  { label: 'Search', href: '/search', icon: Search },
  { label: 'My Bookings', href: '/app/bookings', icon: CalendarDays },
  { label: 'Favorites', href: '/app/favorites', icon: Heart },
  { label: 'Team', href: '/app/team', icon: Users },
  { label: 'Messages', href: '/app/messages', icon: MessageSquare },
  { label: 'Notifications', href: '/app/notifications', icon: Bell },
  { label: 'Profile', href: '/app/profile', icon: User },
];

export const ownerNav = [
  { label: 'Dashboard', href: '/owner', icon: LayoutDashboard },
  { label: 'Venues', href: '/owner/venues', icon: Building2 },
  { label: 'Add Venue', href: '/owner/venues/new', icon: PlusCircle },
  { label: 'Bookings', href: '/owner/bookings', icon: CalendarDays },
  { label: 'Requests', href: '/owner/requests', icon: FileText },
  { label: 'Seats', href: '/owner/seats', icon: MapPin },
  { label: 'Revenue', href: '/owner/revenue', icon: Wallet },
  { label: 'Customers', href: '/owner/customers', icon: Users },
  { label: 'Messages', href: '/owner/messages', icon: MessageSquare },
  { label: 'Settings', href: '/owner/settings', icon: Settings },
];

export const adminNav = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Users', href: '/admin/users', icon: Users },
  { label: 'Venues', href: '/admin/venues', icon: Building2 },
  { label: 'Verification', href: '/admin/verification', icon: ShieldCheck },
  { label: 'Reviews', href: '/admin/reviews', icon: Star },
  { label: 'Reports', href: '/admin/reports', icon: FileText },
  { label: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

export const footerLinks = {
  product: [
    { label: 'Explore venues', href: '/search' },
    { label: 'List your space', href: '/register?role=owner' },
    { label: 'Pricing', href: '/#pricing' },
  ],
  company: [
    { label: 'About', href: '/#about' },
    { label: 'Careers', href: '#' },
    { label: 'Contact', href: 'mailto:support@venuehub.app' },
  ],
  legal: [
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' },
    { label: 'Cookies', href: '#' },
  ],
};

export function getNavForRole(role) {
  if (role === ROLES.ADMIN) return adminNav;
  if (role === ROLES.OWNER) return ownerNav;
  return customerNav;
}

export const homeShortcut = { label: 'Home', href: '/', icon: Home };
