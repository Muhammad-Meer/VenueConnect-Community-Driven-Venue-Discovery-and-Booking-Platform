import { Link } from 'react-router-dom';
import Logo from '../common/Logo';
import { footerLinks } from '../../constants/navigation';
import { config } from '../../config';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="container-app grid gap-10 py-12 md:grid-cols-4">
        <div className="md:col-span-1">
          <Logo />
          <p className="mt-4 text-sm text-content-muted">
            The modern platform for discovering and booking verified workspaces and event venues.
          </p>
        </div>
        {Object.entries(footerLinks).map(([group, links]) => (
          <div key={group}>
            <p className="text-sm font-semibold capitalize text-content">{group}</p>
            <ul className="mt-3 space-y-2">
              {links.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm text-content-muted hover:text-brand-600">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border py-4">
        <div className="container-app flex flex-col items-center justify-between gap-2 text-xs text-content-muted sm:flex-row">
          <p>© {new Date().getFullYear()} {config.appName}. All rights reserved.</p>
          <p>Built for modern hybrid teams.</p>
        </div>
      </div>
    </footer>
  );
}
