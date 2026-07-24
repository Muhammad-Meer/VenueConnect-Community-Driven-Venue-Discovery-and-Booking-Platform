import { Link } from 'react-router-dom';
import { Building2 } from 'lucide-react';
import { cn } from '../../lib/cn';
import { config } from '../../config';

export default function Logo({ className, to = '/', compact = false }) {
  return (
    <Link to={to} className={cn('inline-flex items-center gap-2 font-display font-bold text-content', className)}>
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white shadow-sm">
        <Building2 className="h-5 w-5" />
      </span>
      {!compact && <span className="text-lg tracking-tight">{config.appName}</span>}
    </Link>
  );
}
