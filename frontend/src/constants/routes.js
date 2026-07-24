/**
 * Centralized application route paths.
 * Use these constants everywhere instead of hard-coded strings.
 */
export const ROUTES = {
  // Public
  HOME: '/',
  SEARCH: '/search',
  VENUE_DETAILS: '/venues/:id',
  UNAUTHORIZED: '/unauthorized',
  NOT_FOUND: '*',

  // Auth
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  EMAIL_CONFIRMATION: '/email-confirmation',

  // Customer
  CUSTOMER: {
    ROOT: '/app',
    DASHBOARD: '/app',
    BOOKINGS: '/app/bookings',
    CHECKOUT: '/app/bookings/checkout',
    BOOKING_SUCCESS: '/app/bookings/success',
    FAVORITES: '/app/favorites',
    TEAM: '/app/team',
    MESSAGES: '/app/messages',
    NOTIFICATIONS: '/app/notifications',
    PROFILE: '/app/profile',
  },

  // Owner
  OWNER: {
    ROOT: '/owner',
    DASHBOARD: '/owner',
    VENUES: '/owner/venues',
    VENUE_NEW: '/owner/venues/new',
    VENUE_EDIT: '/owner/venues/:id/edit',
    BOOKINGS: '/owner/bookings',
    REQUESTS: '/owner/requests',
    SEATS: '/owner/seats',
    REVENUE: '/owner/revenue',
    CUSTOMERS: '/owner/customers',
    MESSAGES: '/owner/messages',
    SETTINGS: '/owner/settings',
    NOTIFICATIONS: '/owner/notifications',
    PROFILE: '/owner/profile',
  },

  // Admin
  ADMIN: {
    ROOT: '/admin',
    DASHBOARD: '/admin',
    USERS: '/admin/users',
    VENUES: '/admin/venues',
    VERIFICATION: '/admin/verification',
    REVIEWS: '/admin/reviews',
    REPORTS: '/admin/reports',
    ANALYTICS: '/admin/analytics',
    SETTINGS: '/admin/settings',
    NOTIFICATIONS: '/admin/notifications',
    PROFILE: '/admin/profile',
  },
};

/**
 * Build a dynamic path by replacing :param segments.
 * @param {string} path
 * @param {Record<string, string | number>} params
 * @returns {string}
 */
export function buildPath(path, params = {}) {
  return Object.entries(params).reduce(
    (acc, [key, value]) => acc.replace(`:${key}`, String(value)),
    path
  );
}

export default ROUTES;
