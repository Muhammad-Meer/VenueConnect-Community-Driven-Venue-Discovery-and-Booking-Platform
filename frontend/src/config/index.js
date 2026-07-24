/**
 * Application configuration.
 * Values are driven by Vite env variables with safe production defaults.
 */
const env = import.meta.env;

export const config = Object.freeze({
  appName: env.VITE_APP_NAME || 'VenueHub',
  appUrl: env.VITE_APP_URL || (typeof window !== 'undefined' ? window.location.origin : ''),
  apiUrl: env.VITE_API_URL || 'http://localhost:5000/api',
  mapsEnabled: env.VITE_GOOGLE_MAPS_EMBED !== 'false',
  isDev: Boolean(env.DEV),
  isProd: Boolean(env.PROD),

  // Persistence keys
  tokenKey: 'venuehub_token',
  userKey: 'venuehub_user',
  themeKey: 'venuehub_theme',
  favoritesKey: 'venuehub_favorites',
  teamKey: 'venuehub_team',

  // Defaults
  defaultPageSize: 12,
  defaultPage: 1,
  requestTimeoutMs: 20000,
  supportEmail: 'support@venuehub.app',
  currency: 'USD',
  locale: 'en-US',
  dateFormat: 'MMM d, yyyy',
  timeFormat: 'h:mm a',

  // Feature flags
  features: Object.freeze({
    chat: true,
    favorites: true,
    teamSeats: true,
    ownerAnalytics: true,
    adminReports: true,
    darkMode: true,
  }),
});

export default config;
