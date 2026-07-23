/** User roles used across auth, routing, and navigation */

export const ROLES = {
  CUSTOMER: 'customer',
  OWNER: 'venue_owner',
  ADMIN: 'admin',
}

export const ROLE_LABELS = {
  [ROLES.CUSTOMER]: 'Customer',
  [ROLES.OWNER]: 'Venue Owner',
  [ROLES.ADMIN]: 'Admin',
}

/** Dashboard home path for each role */
export const ROLE_HOME = {
  [ROLES.CUSTOMER]: '/customer/dashboard',
  [ROLES.OWNER]: '/owner/dashboard',
  [ROLES.ADMIN]: '/admin/dashboard',
}

export function getRoleHome(role) {
  return ROLE_HOME[role] || '/'
}

export function isOwner(role) {
  return role === ROLES.OWNER || role === 'owner'
}

export function normalizeRole(role) {
  if (role === 'owner') return ROLES.OWNER
  return role
}
