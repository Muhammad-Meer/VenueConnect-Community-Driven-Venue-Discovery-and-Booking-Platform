import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getRoleHome, normalizeRole } from '../constants/roles'
import { LoadingScreen } from '../components/common'

/**
 * Restricts access to specific roles.
 * @param {string[]} allowedRoles - e.g. ['customer'], ['venue_owner'], ['admin']
 */
function RoleRoute({ children, allowedRoles = [] }) {
  const { user, loading, isAuthenticated } = useAuth()

  if (loading) {
    return <LoadingScreen message="Checking permissions…" />
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />
  }

  const role = normalizeRole(user.role)
  const allowed = allowedRoles.map(normalizeRole)

  if (allowed.length > 0 && !allowed.includes(role)) {
    return <Navigate to={getRoleHome(role)} replace />
  }

  return children
}

export default RoleRoute
