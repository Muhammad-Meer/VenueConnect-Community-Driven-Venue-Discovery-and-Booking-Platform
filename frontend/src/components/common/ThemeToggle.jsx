import { Moon, Sun } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { selectThemeMode, toggleTheme } from '../../store/slices/themeSlice';
import Button from '../ui/Button';

export default function ThemeToggle({ className }) {
  const mode = useSelector(selectThemeMode);
  const dispatch = useDispatch();
  return (
    <Button
      variant="ghost"
      size="icon"
      className={className}
      onClick={() => dispatch(toggleTheme())}
      aria-label="Toggle theme"
    >
      {mode === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  );
}
