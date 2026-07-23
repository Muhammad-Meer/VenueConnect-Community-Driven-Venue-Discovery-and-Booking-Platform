/**
 * Theme tokens — TypeScript mirror of CSS variables.
 * Prefer CSS vars in styles; use these for JS/animation values.
 */

export const colors = {
  primary: 'var(--color-primary)',
  primaryHover: 'var(--color-primary-hover)',
  primaryLight: 'var(--color-primary-light)',
  secondary: 'var(--color-secondary)',
  accent: 'var(--color-accent)',
  background: 'var(--color-background)',
  surface: 'var(--color-surface)',
  card: 'var(--color-card)',
  border: 'var(--color-border)',
  textPrimary: 'var(--color-text-primary)',
  textSecondary: 'var(--color-text-secondary)',
  textMuted: 'var(--color-text-muted)',
  success: 'var(--color-success)',
  warning: 'var(--color-warning)',
  danger: 'var(--color-danger)',
  gray: {
    50: 'var(--color-gray-50)',
    100: 'var(--color-gray-100)',
    200: 'var(--color-gray-200)',
    300: 'var(--color-gray-300)',
    400: 'var(--color-gray-400)',
    500: 'var(--color-gray-500)',
    600: 'var(--color-gray-600)',
    700: 'var(--color-gray-700)',
    800: 'var(--color-gray-800)',
    900: 'var(--color-gray-900)',
  },
} as const

export const spacing = {
  1: 'var(--space-1)',
  2: 'var(--space-2)',
  3: 'var(--space-3)',
  4: 'var(--space-4)',
  5: 'var(--space-5)',
  6: 'var(--space-6)',
  8: 'var(--space-8)',
  10: 'var(--space-10)',
  12: 'var(--space-12)',
  16: 'var(--space-16)',
  20: 'var(--space-20)',
  24: 'var(--space-24)',
} as const

export const radius = {
  sm: 'var(--radius-sm)',
  md: 'var(--radius-md)',
  lg: 'var(--radius-lg)',
  xl: 'var(--radius-xl)',
  '2xl': 'var(--radius-2xl)',
  '3xl': 'var(--radius-3xl)',
  full: 'var(--radius-full)',
} as const

export const shadows = {
  sm: 'var(--shadow-sm)',
  md: 'var(--shadow-md)',
  lg: 'var(--shadow-lg)',
  xl: 'var(--shadow-xl)',
  card: 'var(--shadow-card)',
  cardHover: 'var(--shadow-card-hover)',
  focus: 'var(--shadow-focus)',
  dropdown: 'var(--shadow-dropdown)',
} as const

export const iconSize = {
  xs: 14,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
} as const

export const motion = {
  duration: {
    fast: 0.15,
    normal: 0.25,
    slow: 0.35,
    page: 0.4,
  },
  ease: [0.4, 0, 0.2, 1] as const,
  spring: { type: 'spring' as const, stiffness: 380, damping: 28 },
}

export const layout = {
  headerHeight: 'var(--header-height)',
  sidebarWidth: 'var(--sidebar-width)',
  containerMax: 'var(--container-max)',
} as const

export const theme = {
  colors,
  spacing,
  radius,
  shadows,
  iconSize,
  motion,
  layout,
} as const

export default theme
