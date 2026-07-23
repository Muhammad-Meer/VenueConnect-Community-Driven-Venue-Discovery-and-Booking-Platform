import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import * as authApi from '../services/authApi'
import {
  getToken,
  getStoredUser,
  setToken,
  setStoredUser,
  clearAuthStorage,
} from '../utils/storage'
import { getRoleHome, normalizeRole } from '../constants/roles'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getStoredUser())
  const [token, setTokenState] = useState(() => getToken())
  const [loading, setLoading] = useState(true)

  // Hydrate session on mount
  useEffect(() => {
    const storedUser = getStoredUser()
    const storedToken = getToken()
    if (storedUser && storedToken) {
      setUser({ ...storedUser, role: normalizeRole(storedUser.role) })
      setTokenState(storedToken)
    }
    setLoading(false)
  }, [])

  const persistSession = useCallback((nextUser, nextToken) => {
    const normalized = nextUser
      ? { ...nextUser, role: normalizeRole(nextUser.role) }
      : null
    setUser(normalized)
    setTokenState(nextToken || null)
    setStoredUser(normalized)
    setToken(nextToken || null)
  }, [])

  const login = useCallback(
    async (credentials) => {
      const result = await authApi.login(credentials)
      persistSession(result.user, result.token)
      return result
    },
    [persistSession],
  )

  const register = useCallback(
    async (userData) => {
      const result = await authApi.register(userData)
      persistSession(result.user, result.token)
      return result
    },
    [persistSession],
  )

  const logout = useCallback(() => {
    clearAuthStorage()
    setUser(null)
    setTokenState(null)
  }, [])

  const updateUser = useCallback((partial) => {
    setUser((prev) => {
      if (!prev) return prev
      const next = { ...prev, ...partial, role: normalizeRole(partial.role || prev.role) }
      setStoredUser(next)
      return next
    })
  }, [])

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      isAuthenticated: Boolean(user && token),
      role: user?.role || null,
      dashboardPath: user ? getRoleHome(user.role) : '/',
      login,
      register,
      logout,
      updateUser,
    }),
    [user, token, loading, login, register, logout, updateUser],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return ctx
}

export default AuthContext
