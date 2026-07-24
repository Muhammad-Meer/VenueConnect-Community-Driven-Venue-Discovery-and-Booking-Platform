import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';
import { selectIsAuthenticated, selectRoleHome } from '@/store/slices/authSlice';

/**
 * Restricts auth pages (login/register) to unauthenticated users.
 * Authenticated users are redirected to their role home.
 */
export default function GuestRoute() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const home = useAppSelector(selectRoleHome);

  if (isAuthenticated) {
    return <Navigate to={home} replace />;
  }

  return <Outlet />;
}
