import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../store/slices/authSlice';
import { ROLES } from '../constants/roles';

export default function RoleRoute({ allow = [] }) {
  const user = useSelector(selectUser);
  if (!user) return <Navigate to="/login" replace />;
  if (allow.length && !allow.includes(user.role)) {
    if (user.role === ROLES.ADMIN) return <Navigate to="/admin" replace />;
    if (user.role === ROLES.OWNER) return <Navigate to="/owner" replace />;
    return <Navigate to="/app" replace />;
  }
  return <Outlet />;
}
