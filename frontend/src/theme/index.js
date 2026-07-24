/**
 * Centralized design tokens for VenueHub.
 *
 * Single source of truth for colors, typography, radius, shadows,
 * spacing, breakpoints, animation, and z-index.
 *
 * Runtime CSS variables live in `styles/variables.css` and must stay
 * aligned with the values defined here. Tailwind maps tokens via
 * `tailwind.config.js` so changing the theme cascade updates the UI.
 */
export const theme = Object.freeze({
  name: 'VenueHub',
  modes: Object.freeze(['light', 'dark']),
  defaultMode: 'light',

  colors: Object.freeze({
    brand: Object.freeze({
      50: '#eef7ff',
      100: '#d9ecff',
      200: '#bcdcff',
      300: '#8ec6ff',
      400: '#59a5ff',
      500: '#3381ff',
      600: '#1a5ff5',
      700: '#144ae1',
      800: '#173cb6',
      900: '#19368f',
      950: '#142257',
    }),
    light: Object.freeze({
      surface: '#ffffff',
      surfaceElevated: '#ffffff',
      surfaceMuted: '#f4f6f9',
      surfaceInverse: '#0f172a',
      content: '#0f172a',
      contentSecondary: '#334155',
      contentMuted: '#64748b',
      contentInverse: '#f8fafc',
      border: '#e2e8f0',
      borderStrong: '#cbd5e1',
      success: '#16a34a',
      successSoft: '#dcfce7',
      warning: '#d97706',
      warningSoft: '#fef3c7',
      danger: '#dc2626',
      dangerSoft: '#fee2e2',
      info: '#0284c7',
      infoSoft: '#e0f2fe',
    }),
    dark: Object.freeze({
      surface: '#0b1220',
      surfaceElevated: '#111827',
      surfaceMuted: '#0f172a',
      surfaceInverse: '#f8fafc',
      content: '#f1f5f9',
      contentSecondary: '#cbd5e1',
      contentMuted: '#94a3b8',
      contentInverse: '#0f172a',
      border: '#1e293b',
      borderStrong: '#334155',
      success: '#22c55e',
      successSoft: '#14532d',
      warning: '#f59e0b',
      warningSoft: '#78350f',
      danger: '#ef4444',
      dangerSoft: '#7f1d1d',
      info: '#38bdf8',
      infoSoft: '#0c4a6e',
    }),
  }),

  typography: Object.freeze({
    fontSans: "'Inter', system-ui, sans-serif",
    fontDisplay: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
    fontMono: "ui-monospace, 'SF Mono', Menlo, monospace",
    weights: Object.freeze({
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    }),
    sizes: Object.freeze({
      '2xs': '0.625rem',
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
    }),
  }),

  radius: Object.freeze({
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.25rem',
    full: '9999px',
  }),

  shadow: Object.freeze({
    xs: '0 1px 2px 0 rgb(15 23 42 / 0.04)',
    sm: '0 1px 3px 0 rgb(15 23 42 / 0.08), 0 1px 2px -1px rgb(15 23 42 / 0.06)',
    md: '0 4px 12px -2px rgb(15 23 42 / 0.08), 0 2px 6px -2px rgb(15 23 42 / 0.05)',
    lg: '0 12px 28px -6px rgb(15 23 42 / 0.12), 0 4px 10px -4px rgb(15 23 42 / 0.06)',
    xl: '0 24px 48px -12px rgb(15 23 42 / 0.18)',
    glow: '0 0 0 4px rgb(51 129 255 / 0.18)',
  }),

  spacing: Object.freeze({
    containerMax: '1280px',
    headerHeight: '4rem',
    sidebarWidth: '16rem',
    sidebarCollapsed: '4.5rem',
    sectionY: '4rem',
    pageX: '1.5rem',
  }),

  breakpoints: Object.freeze({
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  }),

  animation: Object.freeze({
    fast: '150ms',
    base: '200ms',
    slow: '300ms',
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  }),

  zIndex: Object.freeze({
    dropdown: 100,
    sticky: 200,
    overlay: 300,
    modal: 400,
    toast: 500,
    tooltip: 600,
  }),
});

/**
 * Apply a color mode class on the document root.
 * @param {'light' | 'dark'} mode
 */
export function applyThemeMode(mode) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  if (mode === 'dark') {
    root.classList.add('dark');
    root.style.colorScheme = 'dark';
  } else {
    root.classList.remove('dark');
    root.style.colorScheme = 'light';
  }
}

export default theme;
