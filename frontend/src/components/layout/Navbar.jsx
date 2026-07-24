import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, Bell } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import Logo from '../common/Logo';
import ThemeToggle from '../common/ThemeToggle';
import Button from '../ui/Button';
import Avatar from '../ui/Avatar';
import Dropdown from '../ui/Dropdown';
import { publicNav } from '../../constants/navigation';
import { logout, selectIsAuthenticated, selectUser } from '../../store/slices/authSlice';
import { selectUnreadCount } from '../../store/slices/notificationSlice';
import { ROLE_HOME } from '../../constants/roles';
import { cn } from '../../lib/cn';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const user = useSelector(selectUser);
  const isAuth = useSelector(selectIsAuthenticated);
  const unread = useSelector(selectUnreadCount);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const home = ROLE_HOME[user?.role] || '/app';

  return (
    <header className="sticky top-0 z-sticky border-b border-border/80 bg-surface/85 backdrop-blur-xl">
      <div className="container-app flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="hidden items-center gap-1 md:flex">
            {publicNav.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    'rounded-lg px-3 py-2 text-sm font-medium transition',
                    isActive ? 'bg-surface-muted text-content' : 'text-content-secondary hover:text-content'
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          {isAuth ? (
            <>
              <Button variant="ghost" size="icon" onClick={() => navigate(`${home}/notifications`)} className="relative">
                <Bell className="h-5 w-5" />
                {unread > 0 && (
                  <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-danger px-1 text-[10px] text-white">
                    {unread}
                  </span>
                )}
              </Button>
              <Dropdown
                align="right"
                trigger={
                  <button type="button" className="rounded-full focus-ring">
                    <Avatar name={user?.name} src={user?.avatar} />
                  </button>
                }
                items={[
                  { label: 'Dashboard', onClick: () => navigate(home) },
                  { label: 'Profile', onClick: () => navigate(`${home.includes('owner') || home.includes('admin') ? home : '/app'}/profile`.replace('//', '/')) },
                  { divider: true },
                  {
                    label: 'Sign out',
                    danger: true,
                    onClick: () => {
                      dispatch(logout());
                      navigate('/');
                    },
                  },
                ]}
              />
            </>
          ) : (
            <>
              <Button variant="ghost" onClick={() => navigate('/login')}>
                Sign in
              </Button>
              <Button onClick={() => navigate('/register')}>Get started</Button>
            </>
          )}
        </div>

        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen((v) => !v)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {open && (
        <div className="border-t border-border bg-surface px-4 py-4 md:hidden">
          <div className="space-y-1">
            {publicNav.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm font-medium text-content hover:bg-surface-muted"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            <ThemeToggle />
            {isAuth ? (
              <Button className="flex-1" onClick={() => { setOpen(false); navigate(home); }}>
                Dashboard
              </Button>
            ) : (
              <>
                <Button variant="outline" className="flex-1" onClick={() => { setOpen(false); navigate('/login'); }}>
                  Sign in
                </Button>
                <Button className="flex-1" onClick={() => { setOpen(false); navigate('/register'); }}>
                  Join
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
