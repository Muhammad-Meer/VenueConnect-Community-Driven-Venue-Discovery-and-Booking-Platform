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
      serializableCheck: false,
    }),
  devTools: import.meta.env.DEV,
});

export default store;
