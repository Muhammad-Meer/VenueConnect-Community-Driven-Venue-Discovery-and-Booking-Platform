import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { reviewApi } from '../../services/reviewApi';
import { getErrorMessage } from '../../utils/errors';
import { mockReviews } from '../../data/mockData';

export const createReview = createAsyncThunk('review/create', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await reviewApi.create(payload);
    return data.review;
  } catch (error) {
    if (!error?.response) {
      return {
        _id: `r-${Date.now()}`,
        ...payload,
        customer: { name: 'You' },
        createdAt: new Date().toISOString(),
        status: 'approved',
      };
    }
    return rejectWithValue(getErrorMessage(error, 'Could not submit review'));
  }
});

const reviewSlice = createSlice({
  name: 'review',
  initialState: {
    list: mockReviews,
    loading: false,
    error: null,
  },
  reducers: {
    moderateReview(state, action) {
      const { id, status } = action.payload;
      state.list = state.list.map((r) => (r._id === id ? { ...r, status } : r));
    },
    removeReview(state, action) {
      state.list = state.list.filter((r) => r._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.loading = false;
        state.list = [action.payload, ...state.list];
      })
      .addCase(createReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { moderateReview, removeReview } = reviewSlice.actions;
export const selectReviews = (state) => state.review.list;
export const selectReviewsByVenue = (venueId) => (state) =>
  state.review.list.filter((r) => r.venue === venueId && r.status !== 'removed');
export default reviewSlice.reducer;
