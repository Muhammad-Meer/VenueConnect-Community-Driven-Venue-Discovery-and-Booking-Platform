export const theme = Object.freeze({
  name: 'VenueHub',

  modes: Object.freeze(['light', 'dark']),
  defaultMode: 'light',

  colors: Object.freeze({
    brand: Object.freeze({
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
      950: '#082f49',
    }),

    light: Object.freeze({
      surface: '#ffffff',
      surfaceElevated: '#fafafa',
      surfaceMuted: '#f8fafc',
      surfaceInverse: '#0f172a',

      content: '#0f172a',
      contentSecondary: '#334155',
      contentMuted: '#64748b',
      contentInverse: '#f8fafc',

      border: '#e2e8f0',
      borderStrong: '#cbd5e1',

      success: '#10b981',
      successSoft: '#d1fae5',
      warning: '#f59e0b',
      warningSoft: '#fef3c7',
      danger: '#ef4444',
      dangerSoft: '#fee2e2',
      info: '#0ea5e9',
      infoSoft: '#e0f2fe',
    }),

    dark: Object.freeze({
      // Modern dark palette - deep, rich, and premium
      surface: '#0f172a',          // Slate 900
      surfaceElevated: '#1e2937',  // Slate 800
      surfaceMuted: '#334155',     // Slate 700
      surfaceInverse: '#f1f5f9',

      // Text
      content: '#f8fafc',
      contentSecondary: '#e2e8f0',
      contentMuted: '#94a3b8',
      contentInverse: '#0f172a',

      // Borders
      border: '#334155',
      borderStrong: '#475569',

      // Status colors - vibrant and modern
      success: '#34d399',
      successSoft: '#064e3b',

      warning: '#fbbf24',
      warningSoft: '#78350f',

      danger: '#f87171',
      dangerSoft: '#7f1d1d',

      info: '#22d3ee',
      infoSoft: '#164e63',
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
    xs: '0 1px 2px 0 rgb(15 23 42 / 0.05)',
    sm: '0 1px 3px 0 rgb(15 23 42 / 0.1), 0 1px 2px -1px rgb(15 23 42 / 0.08)',
    md: '0 4px 6px -1px rgb(15 23 42 / 0.1), 0 2px 4px -2px rgb(15 23 42 / 0.1)',
    lg: '0 10px 15px -3px rgb(15 23 42 / 0.1), 0 4px 6px -4px rgb(15 23 42 / 0.1)',
    xl: '0 20px 25px -5px rgb(15 23 42 / 0.1), 0 8px 10px -6px rgb(15 23 42 / 0.1)',
    glow: '0 0 0 4px rgb(14 165 233 / 0.2)',
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