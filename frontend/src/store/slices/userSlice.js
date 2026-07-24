import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userApi } from '../../services/userApi';
import { getErrorMessage } from '../../utils/errors';
import { mockTeam, mockUsers } from '../../data/mockData';
import { config } from '../../config';
import { getItem, setItem } from '../../utils/storage';

export const fetchAllUsers = createAsyncThunk('user/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const { data } = await userApi.allUsers();
    return data.users || [];
  } catch (error) {
    if (!error?.response) return mockUsers;
    return rejectWithValue(getErrorMessage(error));
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    list: [],
    team: getItem(config.teamKey, mockTeam),
    favorites: getItem(config.favoritesKey, ['v1', 'v4']),
    loading: false,
    error: null,
  },
  reducers: {
    toggleFavorite(state, action) {
      const id = action.payload;
      if (state.favorites.includes(id)) {
        state.favorites = state.favorites.filter((f) => f !== id);
      } else {
        state.favorites.push(id);
      }
      setItem(config.favoritesKey, state.favorites);
    },
    addTeamMember(state, action) {
      state.team.push({ id: `t${Date.now()}`, seat: '', ...action.payload });
      setItem(config.teamKey, state.team);
    },
    updateTeamMember(state, action) {
      const { id, ...rest } = action.payload;
      state.team = state.team.map((m) => (m.id === id ? { ...m, ...rest } : m));
      setItem(config.teamKey, state.team);
    },
    removeTeamMember(state, action) {
      state.team = state.team.filter((m) => m.id !== action.payload);
      setItem(config.teamKey, state.team);
    },
    assignSeat(state, action) {
      const { memberId, seat } = action.payload;
      state.team = state.team.map((m) => {
        if (m.id === memberId) return { ...m, seat };
        if (seat && m.seat === seat) return { ...m, seat: '' };
        return m;
      });
      setItem(config.teamKey, state.team);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.list = mockUsers;
      });
  },
});

export const { toggleFavorite, addTeamMember, updateTeamMember, removeTeamMember, assignSeat } =
  userSlice.actions;
export const selectFavorites = (state) => state.user.favorites;
export const selectTeam = (state) => state.user.team;
export const selectUsers = (state) => state.user.list;
export default userSlice.reducer;
