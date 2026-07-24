import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';
import { selectIsAuthenticated, selectUser } from '@/store/slices/authSlice';
import { ROLE_HOME, ROLES } from '@/constants/roles';
import { ROUTES } from '@/constants/routes';

/**
 * Role-based outlet guard. Redirects users without required roles
 * to their own dashboard home.
 * @param {{ allow?: string[] }} props
 */
export default function RoleRoute({ allow = [] }) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectUser);

  if (!isAuthenticated || !user) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (allow.length && !allow.includes(user.role)) {
    return <Navigate to={ROLE_HOME[user.role] || ROUTES.HOME} replace />;
  }

  return <Outlet />;
}

export { ROLES };
