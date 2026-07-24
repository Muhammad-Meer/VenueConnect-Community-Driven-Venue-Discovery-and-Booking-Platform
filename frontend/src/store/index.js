import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import venueReducer from './slices/venueSlice';
import bookingReducer from './slices/bookingSlice';
import reviewReducer from './slices/reviewSlice';
import notificationReducer from './slices/notificationSlice';
import ownerReducer from './slices/ownerSlice';
import adminReducer from './slices/adminSlice';
import themeReducer from './slices/themeSlice';
import { config } from '@/config';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    venue: venueReducer,
    booking: bookingReducer,
    review: reviewReducer,
    notification: notificationReducer,
    owner: ownerReducer,
    admin: adminReducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // localStorage side-effects in reducers are intentional for session/theme
        ignoredActions: [
          'auth/login/fulfilled',
          'auth/register/fulfilled',
          'theme/setTheme',
          'theme/toggleTheme',
        ],
      },
    }),
  devTools: config.isDev,
});

/**
 * @typedef {ReturnType<typeof store.getState>} RootState
 * @typedef {typeof store.dispatch} AppDispatch
 */

export default store;
