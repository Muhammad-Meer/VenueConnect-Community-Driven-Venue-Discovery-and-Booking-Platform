import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { notificationApi } from '../../services/notificationApi';
import { getErrorMessage } from '../../utils/errors';
import { mockNotifications } from '../../data/mockData';

export const fetchNotifications = createAsyncThunk(
  'notification/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await notificationApi.list();
      return data.notifications?.length ? data.notifications : mockNotifications;
    } catch (error) {
      if (!error?.response) return mockNotifications;
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const markNotificationRead = createAsyncThunk(
  'notification/read',
  async (id, { rejectWithValue }) => {
    try {
      await notificationApi.markRead(id);
      return id;
    } catch (error) {
      if (!error?.response) return id;
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    list: mockNotifications,
    loading: false,
    error: null,
  },
  reducers: {
    addNotification(state, action) {
      state.list.unshift({
        _id: `n-${Date.now()}`,
        isRead: false,
        createdAt: new Date().toISOString(),
        ...action.payload,
      });
    },
    markAllRead(state) {
      state.list = state.list.map((n) => ({ ...n, isRead: true }));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(markNotificationRead.fulfilled, (state, action) => {
        state.list = state.list.map((n) =>
          n._id === action.payload ? { ...n, isRead: true } : n
        );
      });
  },
});

export const { addNotification, markAllRead } = notificationSlice.actions;
export const selectNotifications = (state) => state.notification.list;
export const selectUnreadCount = (state) =>
  state.notification.list.filter((n) => !n.isRead).length;
export default notificationSlice.reducer;
