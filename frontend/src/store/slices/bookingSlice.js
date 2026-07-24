import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { bookingApi } from '../../services/bookingApi';
import { paymentApi } from '../../services/paymentApi';
import { getErrorMessage } from '../../utils/errors';
import { mockBookings } from '../../data/mockData';
import { calcHours, calcTotal } from '../../helpers/booking';

export const fetchMyBookings = createAsyncThunk('booking/my', async (_, { rejectWithValue }) => {
  try {
    const { data } = await bookingApi.myBookings();
    const bookings = data.bookings || [];
    return bookings.length ? bookings : mockBookings;
  } catch (error) {
    if (!error?.response) return mockBookings;
    return rejectWithValue(getErrorMessage(error));
  }
});

export const fetchOwnerBookings = createAsyncThunk('booking/owner', async (_, { rejectWithValue }) => {
  try {
    const { data } = await bookingApi.ownerBookings();
    return data.bookings || mockBookings;
  } catch (error) {
    if (!error?.response) return mockBookings;
    return rejectWithValue(getErrorMessage(error));
  }
});

export const createBooking = createAsyncThunk('booking/create', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await bookingApi.create(payload);
    return data.booking;
  } catch (error) {
    if (!error?.response) {
      const hours = calcHours(payload.startTime, payload.endTime);
      return {
        _id: `local-b-${Date.now()}`,
        ...payload,
        totalHours: hours,
        totalAmount: calcTotal(payload.pricePerHour || 100, payload.startTime, payload.endTime),
        status: 'pending',
        paymentStatus: 'pending',
        createdAt: new Date().toISOString(),
        venue: payload.venueDetails || { name: 'Venue', address: '' },
      };
    }
    return rejectWithValue(getErrorMessage(error, 'Booking failed'));
  }
});

export const payBooking = createAsyncThunk('booking/pay', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await paymentApi.create(payload);
    return { bookingId: payload.bookingId, payment: data.payment };
  } catch (error) {
    if (!error?.response) {
      return { bookingId: payload.bookingId, payment: { status: 'success' } };
    }
    return rejectWithValue(getErrorMessage(error, 'Payment failed'));
  }
});

const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    myBookings: mockBookings,
    ownerBookings: mockBookings,
    current: null,
    loading: false,
    error: null,
    lastCreated: null,
  },
  reducers: {
    setCurrentBooking(state, action) {
      state.current = action.payload;
    },
    cancelBookingLocal(state, action) {
      const id = action.payload;
      state.myBookings = state.myBookings.map((b) =>
        b._id === id ? { ...b, status: 'cancelled' } : b
      );
      state.ownerBookings = state.ownerBookings.map((b) =>
        b._id === id ? { ...b, status: 'cancelled' } : b
      );
    },
    rescheduleBookingLocal(state, action) {
      const { id, date, startTime, endTime } = action.payload;
      const patch = (b) =>
        b._id === id
          ? {
              ...b,
              date,
              startTime,
              endTime,
              totalHours: calcHours(startTime, endTime),
              status: b.status === 'pending' ? 'pending' : 'confirmed',
            }
          : b;
      state.myBookings = state.myBookings.map(patch);
      state.ownerBookings = state.ownerBookings.map(patch);
    },
    acceptBookingLocal(state, action) {
      state.ownerBookings = state.ownerBookings.map((b) =>
        b._id === action.payload ? { ...b, status: 'confirmed' } : b
      );
    },
    rejectBookingLocal(state, action) {
      state.ownerBookings = state.ownerBookings.map((b) =>
        b._id === action.payload ? { ...b, status: 'rejected' } : b
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyBookings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.myBookings = action.payload;
      })
      .addCase(fetchMyBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchOwnerBookings.fulfilled, (state, action) => {
        state.ownerBookings = action.payload;
      })
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.lastCreated = action.payload;
        state.myBookings = [action.payload, ...state.myBookings];
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(payBooking.fulfilled, (state, action) => {
        const id = action.payload.bookingId;
        state.myBookings = state.myBookings.map((b) =>
          b._id === id ? { ...b, paymentStatus: 'paid', status: 'confirmed' } : b
        );
        if (state.lastCreated?._id === id) {
          state.lastCreated = { ...state.lastCreated, paymentStatus: 'paid', status: 'confirmed' };
        }
      });
  },
});

export const {
  setCurrentBooking,
  cancelBookingLocal,
  rescheduleBookingLocal,
  acceptBookingLocal,
  rejectBookingLocal,
} = bookingSlice.actions;
export const selectMyBookings = (state) => state.booking.myBookings;
export const selectOwnerBookings = (state) => state.booking.ownerBookings;
export const selectLastBooking = (state) => state.booking.lastCreated;
export default bookingSlice.reducer;
