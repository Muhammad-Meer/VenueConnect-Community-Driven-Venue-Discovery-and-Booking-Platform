import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { analyticsApi } from '../../services/analyticsApi';
import { getErrorMessage } from '../../utils/errors';
import { mockAnalytics, mockMessages } from '../../data/mockData';

export const fetchOwnerAnalytics = createAsyncThunk(
  'owner/analytics',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await analyticsApi.owner(params);
      return data.data || mockAnalytics.owner;
    } catch (error) {
      if (!error?.response) return mockAnalytics.owner;
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

const ownerSlice = createSlice({
  name: 'owner',
  initialState: {
    analytics: mockAnalytics.owner,
    messages: mockMessages,
    settings: {
      autoAccept: false,
      notifyEmail: true,
      notifySms: false,
      currency: 'USD',
      timezone: 'America/New_York',
    },
    seats: Array.from({ length: 24 }, (_, i) => ({
      id: `${String.fromCharCode(65 + Math.floor(i / 6))}${(i % 6) + 1}`,
      status: i % 5 === 0 ? 'occupied' : i % 7 === 0 ? 'reserved' : 'available',
    })),
    loading: false,
    error: null,
  },
  reducers: {
    updateOwnerSettings(state, action) {
      state.settings = { ...state.settings, ...action.payload };
    },
    sendOwnerMessage(state, action) {
      const { threadId, text } = action.payload;
      const thread = state.messages.find((m) => m.id === threadId);
      if (thread) {
        thread.messages.push({
          id: `msg-${Date.now()}`,
          from: 'owner',
          text,
          at: new Date().toISOString(),
        });
      }
    },
    setSeatStatus(state, action) {
      const { id, status } = action.payload;
      state.seats = state.seats.map((s) => (s.id === id ? { ...s, status } : s));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOwnerAnalytics.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOwnerAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.analytics = action.payload;
      })
      .addCase(fetchOwnerAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { updateOwnerSettings, sendOwnerMessage, setSeatStatus } = ownerSlice.actions;
export const selectOwnerAnalytics = (state) => state.owner.analytics;
export const selectOwnerMessages = (state) => state.owner.messages;
export const selectOwnerSettings = (state) => state.owner.settings;
export const selectSeats = (state) => state.owner.seats;
export default ownerSlice.reducer;
