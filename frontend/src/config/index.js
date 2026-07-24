export const config = {
  appName: import.meta.env.VITE_APP_NAME || 'VenueHub',
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  mapsEnabled: import.meta.env.VITE_GOOGLE_MAPS_EMBED !== 'false',
  tokenKey: 'venuehub_token',
  userKey: 'venuehub_user',
  themeKey: 'venuehub_theme',
  favoritesKey: 'venuehub_favorites',
  teamKey: 'venuehub_team',
  defaultPageSize: 12,
  supportEmail: 'support@venuehub.app',
  currency: 'USD',
};

export default config;
