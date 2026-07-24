import { useDispatch, useSelector } from 'react-redux';
import {
  clearAuthError,
  login,
  logout,
  register,
  selectAuth,
  selectIsAuthenticated,
  selectUser,
  updateProfile,
} from '../store/slices/authSlice';
import { ROLE_HOME, ROLES } from '../constants/roles';

export function useAuth() {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return {
    ...auth,
    user,
    isAuthenticated,
    isOwner: user?.role === ROLES.OWNER,
    isAdmin: user?.role === ROLES.ADMIN,
    isCustomer: user?.role === ROLES.CUSTOMER || (!user?.role && isAuthenticated),
    homePath: ROLE_HOME[user?.role] || '/app',
    login: (payload) => dispatch(login(payload)),
    register: (payload) => dispatch(register(payload)),
    logout: () => dispatch(logout()),
    updateProfile: (payload) => dispatch(updateProfile(payload)),
    clearError: () => dispatch(clearAuthError()),
  };
}

export default useAuth;
