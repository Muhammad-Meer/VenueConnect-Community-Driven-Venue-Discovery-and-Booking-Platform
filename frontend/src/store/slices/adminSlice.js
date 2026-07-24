import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { analyticsApi } from '../../services/analyticsApi';
import { getErrorMessage } from '../../utils/errors';
import { mockAnalytics } from '../../data/mockData';

export const fetchAdminAnalytics = createAsyncThunk(
  'admin/analytics',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await analyticsApi.admin();
      return data.data || mockAnalytics.admin;
    } catch (error) {
      if (!error?.response) return mockAnalytics.admin;
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    analytics: mockAnalytics.admin,
    settings: {
      platformName: 'VenueHub',
      commissionRate: 12,
      requireVenueApproval: true,
      requireOwnerVerification: true,
      maintenanceMode: false,
      supportEmail: 'support@venuehub.app',
    },
    reports: [
      {
        id: 'rep1',
        type: 'venue',
        subject: 'Misleading photos',
        target: 'Riverfront Offices',
        status: 'open',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
      },
      {
        id: 'rep2',
        type: 'review',
        subject: 'Spam review',
        target: 'Review #r2',
        status: 'resolved',
        createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
      },
    ],
    loading: false,
    error: null,
  },
  reducers: {
    updateAdminSettings(state, action) {
      state.settings = { ...state.settings, ...action.payload };
    },
    resolveReport(state, action) {
      state.reports = state.reports.map((r) =>
        r.id === action.payload ? { ...r, status: 'resolved' } : r
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminAnalytics.fulfilled, (state, action) => {
        state.analytics = action.payload;
      })
      .addCase(fetchAdminAnalytics.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { updateAdminSettings, resolveReport } = adminSlice.actions;
export const selectAdminAnalytics = (state) => state.admin.analytics;
export const selectAdminSettings = (state) => state.admin.settings;
export const selectReports = (state) => state.admin.reports;
export default adminSlice.reducer;
