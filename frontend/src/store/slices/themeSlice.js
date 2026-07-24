import { createSlice } from '@reduxjs/toolkit';
import { config } from '../../config';
import { getString, setString } from '../../utils/storage';

function getInitialMode() {
  const saved = getString(config.themeKey);
  if (saved === 'light' || saved === 'dark') return saved;
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
}

function applyDomTheme(mode) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  if (mode === 'dark') root.classList.add('dark');
  else root.classList.remove('dark');
}

const initialMode = getInitialMode();
applyDomTheme(initialMode);

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    mode: initialMode,
  },
  reducers: {
    setTheme(state, action) {
      state.mode = action.payload;
      setString(config.themeKey, action.payload);
      applyDomTheme(action.payload);
    },
    toggleTheme(state) {
      state.mode = state.mode === 'dark' ? 'light' : 'dark';
      setString(config.themeKey, state.mode);
      applyDomTheme(state.mode);
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;
export const selectThemeMode = (state) => state.theme.mode;
export default themeSlice.reducer;
