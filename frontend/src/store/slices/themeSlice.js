import { createSlice } from '@reduxjs/toolkit';
import { config } from '@/config';
import { theme as designTheme, applyThemeMode } from '@/theme';
import { getString, setString } from '@/utils/storage';

function getInitialMode() {
  const saved = getString(config.themeKey);
  if (saved === 'light' || saved === 'dark') return saved;

  if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }

  return designTheme.defaultMode;
}

const initialMode = getInitialMode();
applyThemeMode(initialMode);

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    mode: initialMode,
  },
  reducers: {
    setTheme(state, action) {
      const next = action.payload === 'dark' ? 'dark' : 'light';
      state.mode = next;
      setString(config.themeKey, next);
      applyThemeMode(next);
    },
    toggleTheme(state) {
      const next = state.mode === 'dark' ? 'light' : 'dark';
      state.mode = next;
      setString(config.themeKey, next);
      applyThemeMode(next);
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;
export const selectThemeMode = (state) => state.theme.mode;
export const selectIsDarkMode = (state) => state.theme.mode === 'dark';
export default themeSlice.reducer;
