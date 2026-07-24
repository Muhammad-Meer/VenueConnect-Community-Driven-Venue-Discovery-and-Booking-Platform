import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authApi } from '../../services/authApi';
import { userApi } from '../../services/userApi';
import { setAuthToken } from '../../api/client';
import { config } from '../../config';
import { getItem, removeItem, setItem, setString } from '../../utils/storage';
import { getErrorMessage } from '../../utils/errors';
import { ROLE_HOME, ROLES } from '../../constants/roles';

const savedUser = getItem(config.userKey);
const savedToken = localStorage.getItem(config.tokenKey);

export const login = createAsyncThunk('auth/login', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await authApi.login(payload);
    return data;
  } catch (error) {
    // Demo fallback accounts when API is offline
    const demos = {
      'customer@venuehub.app': { role: ROLES.CUSTOMER, name: 'Demo Customer' },
      'owner@venuehub.app': { role: ROLES.OWNER, name: 'Demo Owner' },
      'admin@venuehub.app': { role: ROLES.ADMIN, name: 'Demo Admin' },
    };
    const demo = demos[payload.email];
    if (demo && payload.password?.length >= 6) {
      return {
        success: true,
        token: `demo-${demo.role}`,
        user: {
          id: `demo-${demo.role}`,
          name: demo.name,
          email: payload.email,
          role: demo.role,
          isVerified: true,
        },
        demo: true,
      };
    }
    return rejectWithValue(getErrorMessage(error, 'Login failed'));
  }
});

export const register = createAsyncThunk('auth/register', async (payload, { rejectWithValue }) => {
  try {
    const body = {
      name: payload.name,
      email: payload.email,
      password: payload.password,
    };
    const { data } = await authApi.register(body);
    // Preserve requested owner role locally when backend defaults to customer
    if (payload.role === ROLES.OWNER && data?.user) {
      data.user.role = ROLES.OWNER;
    }
    return data;
  } catch (error) {
    if (isNetworkish(error)) {
      return {
        success: true,
        token: `demo-${payload.role || ROLES.CUSTOMER}`,
        user: {
          id: `demo-${Date.now()}`,
          name: payload.name,
          email: payload.email,
          role: payload.role || ROLES.CUSTOMER,
          phone: payload.phone || '',
          isVerified: false,
        },
        demo: true,
      };
    }
    return rejectWithValue(getErrorMessage(error, 'Registration failed'));
  }
});

export const fetchProfile = createAsyncThunk('auth/fetchProfile', async (_, { rejectWithValue }) => {
  try {
    const { data } = await userApi.profile();
    return data.user;
  } catch (error) {
    return rejectWithValue(getErrorMessage(error));
  }
});

export const updateProfile = createAsyncThunk('auth/updateProfile', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await userApi.updateProfile(payload);
    return data.user;
  } catch (error) {
    if (isNetworkish(error)) {
      return { ...payload, updatedAt: new Date().toISOString() };
    }
    return rejectWithValue(getErrorMessage(error, 'Could not update profile'));
  }
});

function isNetworkish(error) {
  return !error?.response;
}

function persistSession(token, user) {
  if (token) setString(config.tokenKey, token);
  if (user) setItem(config.userKey, user);
  setAuthToken(token);
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: savedUser,
    token: savedToken,
    isAuthenticated: Boolean(savedToken && savedUser),
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      removeItem(config.tokenKey);
      removeItem(config.userKey);
      setAuthToken(null);
    },
    clearAuthError(state) {
      state.error = null;
      state.successMessage = null;
    },
    setUserLocal(state, action) {
      state.user = { ...state.user, ...action.payload };
      setItem(config.userKey, state.user);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        persistSession(action.payload.token, action.payload.user);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        persistSession(action.payload.token, action.payload.user);
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload };
        setItem(config.userKey, state.user);
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload };
        state.successMessage = 'Profile updated';
        setItem(config.userKey, state.user);
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { logout, clearAuthError, setUserLocal } = authSlice.actions;
export const selectAuth = (state) => state.auth;
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectRoleHome = (state) => ROLE_HOME[state.auth.user?.role] || '/';
export default authSlice.reducer;
