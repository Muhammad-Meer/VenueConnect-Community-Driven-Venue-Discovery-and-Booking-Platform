export const ROLES = {
  CUSTOMER: 'customer',
  OWNER: 'venue_owner',
  ADMIN: 'admin',
  GUEST: 'guest',
};

export const ROLE_LABELS = {
  [ROLES.CUSTOMER]: 'Customer',
  [ROLES.OWNER]: 'Venue Owner',
  [ROLES.ADMIN]: 'Admin',
  [ROLES.GUEST]: 'Guest',
};

export const ROLE_HOME = {
  [ROLES.CUSTOMER]: '/app',
  [ROLES.OWNER]: '/owner',
  [ROLES.ADMIN]: '/admin',
  [ROLES.GUEST]: '/',
};

export function isOwner(role) {
  return role === ROLES.OWNER;
}

export function isAdmin(role) {
  return role === ROLES.ADMIN;
}

export function isCustomer(role) {
  return role === ROLES.CUSTOMER || !role;
}
