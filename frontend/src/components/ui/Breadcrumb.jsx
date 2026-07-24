import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { cn } from '../../lib/cn';

export default function Breadcrumb({ items = [], className }) {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex flex-wrap items-center gap-1 text-sm', className)}>
      {items.map((item, index) => {
        const last = index === items.length - 1;
        return (
          <span key={item.href || item.label} className="inline-flex items-center gap-1">
            {index > 0 && <ChevronRight className="h-3.5 w-3.5 text-content-muted" />}
            {last || !item.href ? (
              <span className="font-medium text-content">{item.label}</span>
            ) : (
              <Link to={item.href} className="text-content-muted hover:text-brand-600">
                {item.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
