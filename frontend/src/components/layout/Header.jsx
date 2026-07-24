import { Bell, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../ui/Button';
import { selectUnreadCount } from '../../store/slices/notificationSlice';
import { logout, selectUser } from '../../store/slices/authSlice';
import { ROLE_HOME } from '../../constants/roles';
import ThemeToggle from '../common/ThemeToggle';

export default function Header() {
  const unread = useSelector(selectUnreadCount);
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const home = ROLE_HOME[user?.role] || '/app';

  return (
    <div className="sticky top-0 z-sticky hidden items-center justify-between border-b border-border bg-surface/90 px-6 py-3 backdrop-blur lg:flex">
      <div className="relative w-full max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-content-muted" />
        <input
          className="input-base pl-10"
          placeholder="Quick search…"
          onKeyDown={(e) => {
            if (e.key === 'Enter') navigate(`/search?q=${encodeURIComponent(e.target.value)}`);
          }}
        />
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Button variant="ghost" size="icon" className="relative" onClick={() => navigate(`${home}/notifications`)}>
          <Bell className="h-5 w-5" />
          {unread > 0 && (
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-danger" />
          )}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            dispatch(logout());
            navigate('/');
          }}
        >
          Sign out
        </Button>
      </div>
    </div>
  );
}
