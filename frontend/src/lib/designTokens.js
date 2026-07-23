/**
 * Venue Booking Platform — Design Tokens
 * Single source of truth for brand values used outside Tailwind.
 */
export const colors = {
  primary: {
    DEFAULT: '#1E40AF',
    light: '#3B82F6',
    50: '#EFF6FF',
    100: '#DBEAFE',
    500: '#3B82F6',
    700: '#1E40AF',
  },
  accent: {
    DEFAULT: '#10B981',
    light: '#34D399',
    50: '#ECFDF5',
    100: '#D1FAE5',
    500: '#10B981',
  },
  neutral: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
  semantic: {
    success: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444',
    info: '#3B82F6',
  },
}

export const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
  '3xl': '4rem',
}

export const radii = {
  sm: '0.375rem',
  md: '0.5rem',
  lg: '0.75rem',
  xl: '1rem',
  '2xl': '1.25rem',
  full: '9999px',
}

export const shadows = {
  card: '0 1px 3px 0 rgb(0 0 0 / 0.04), 0 1px 2px -1px rgb(0 0 0 / 0.04)',
  cardHover:
    '0 12px 28px -6px rgb(30 64 175 / 0.12), 0 4px 10px -4px rgb(0 0 0 / 0.06)',
  focus: '0 0 0 3px rgb(59 130 246 / 0.35)',
}

export const typography = {
  fontFamily: {
    sans: "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
}

export const layout = {
  containerMax: '1280px',
  headerHeight: '72px',
  sidebarWidth: '260px',
}

export const bookingStatus = {
  pending: { label: 'Pending', color: 'warning' },
  confirmed: { label: 'Confirmed', color: 'success' },
  cancelled: { label: 'Cancelled', color: 'danger' },
  completed: { label: 'Completed', color: 'info' },
  rejected: { label: 'Rejected', color: 'danger' },
}

export default {
  colors,
  spacing,
  radii,
  shadows,
  typography,
  layout,
  bookingStatus,
}
