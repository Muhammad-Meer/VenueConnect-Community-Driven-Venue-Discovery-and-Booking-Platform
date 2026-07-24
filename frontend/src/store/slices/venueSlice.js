import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { venueApi } from '../../services/venueApi';
import { getErrorMessage } from '../../utils/errors';
import { mockVenues } from '../../data/mockData';
import { applyVenueFilters, sortVenues } from '../../helpers/filters';

export const fetchVenues = createAsyncThunk('venue/fetchAll', async (params = {}, { rejectWithValue }) => {
  try {
    const { data } = await venueApi.list(params);
    const venues = data.venues || [];
    if (!venues.length) return mockVenues;
    return venues;
  } catch (error) {
    if (!error?.response) return mockVenues;
    return rejectWithValue(getErrorMessage(error));
  }
});

export const fetchVenueById = createAsyncThunk('venue/fetchById', async (id, { rejectWithValue }) => {
  try {
    const { data } = await venueApi.getById(id);
    return data.venue;
  } catch (error) {
    const fallback = mockVenues.find((v) => v._id === id);
    if (fallback) return fallback;
    return rejectWithValue(getErrorMessage(error, 'Venue not found'));
  }
});

export const createVenue = createAsyncThunk('venue/create', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await venueApi.create(payload);
    return data.venue;
  } catch (error) {
    if (!error?.response) {
      return {
        _id: `local-${Date.now()}`,
        ...payload,
        isApproved: false,
        isVerified: false,
        averageRating: 0,
        totalReviews: 0,
        createdAt: new Date().toISOString(),
      };
    }
    return rejectWithValue(getErrorMessage(error, 'Could not create venue'));
  }
});

export const updateVenue = createAsyncThunk('venue/update', async ({ id, payload }, { rejectWithValue }) => {
  try {
    const { data } = await venueApi.update(id, payload);
    return data.venue;
  } catch (error) {
    if (!error?.response) {
      return { _id: id, ...payload };
    }
    return rejectWithValue(getErrorMessage(error, 'Could not update venue'));
  }
});

const venueSlice = createSlice({
  name: 'venue',
  initialState: {
    list: mockVenues,
    filtered: mockVenues,
    current: null,
    filters: {
      query: '',
      city: '',
      neighborhood: '',
      budget: '',
      teamSize: '',
      workspaceType: '',
      amenities: [],
      sortBy: 'featured',
      verifiedOnly: false,
      minRating: 0,
    },
    loading: false,
    detailLoading: false,
    error: null,
    ownerVenues: mockVenues.slice(0, 3),
  },
  reducers: {
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
      state.filtered = sortVenues(applyVenueFilters(state.list, state.filters), state.filters.sortBy);
    },
    resetFilters(state) {
      state.filters = {
        query: '',
        city: '',
        neighborhood: '',
        budget: '',
        teamSize: '',
        workspaceType: '',
        amenities: [],
        sortBy: 'featured',
        verifiedOnly: false,
        minRating: 0,
      };
      state.filtered = state.list;
    },
    clearCurrentVenue(state) {
      state.current = null;
    },
    approveVenueLocal(state, action) {
      const id = action.payload;
      state.list = state.list.map((v) =>
        v._id === id ? { ...v, isApproved: true, isVerified: true } : v
      );
      state.filtered = sortVenues(applyVenueFilters(state.list, state.filters), state.filters.sortBy);
    },
    rejectVenueLocal(state, action) {
      const id = action.payload;
      state.list = state.list.map((v) => (v._id === id ? { ...v, isApproved: false } : v));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVenues.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVenues.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
        state.filtered = sortVenues(applyVenueFilters(action.payload, state.filters), state.filters.sortBy);
      })
      .addCase(fetchVenues.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.list = mockVenues;
        state.filtered = mockVenues;
      })
      .addCase(fetchVenueById.pending, (state) => {
        state.detailLoading = true;
        state.error = null;
      })
      .addCase(fetchVenueById.fulfilled, (state, action) => {
        state.detailLoading = false;
        state.current = action.payload;
      })
      .addCase(fetchVenueById.rejected, (state, action) => {
        state.detailLoading = false;
        state.error = action.payload;
      })
      .addCase(createVenue.fulfilled, (state, action) => {
        state.list = [action.payload, ...state.list];
        state.ownerVenues = [action.payload, ...state.ownerVenues];
        state.filtered = sortVenues(applyVenueFilters(state.list, state.filters), state.filters.sortBy);
      })
      .addCase(updateVenue.fulfilled, (state, action) => {
        state.list = state.list.map((v) => (v._id === action.payload._id ? { ...v, ...action.payload } : v));
        state.ownerVenues = state.ownerVenues.map((v) =>
          v._id === action.payload._id ? { ...v, ...action.payload } : v
        );
        if (state.current?._id === action.payload._id) {
          state.current = { ...state.current, ...action.payload };
        }
      });
  },
});

export const { setFilters, resetFilters, clearCurrentVenue, approveVenueLocal, rejectVenueLocal } =
  venueSlice.actions;
export const selectVenues = (state) => state.venue.list;
export const selectFilteredVenues = (state) => state.venue.filtered;
export const selectVenueFilters = (state) => state.venue.filters;
export const selectCurrentVenue = (state) => state.venue.current;
export default venueSlice.reducer;
