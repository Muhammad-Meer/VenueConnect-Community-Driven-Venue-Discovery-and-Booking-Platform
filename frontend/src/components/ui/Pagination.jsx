import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/cn';
import Button from './Button';

export default function Pagination({ page = 1, totalPages = 1, onChange, className }) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).slice(
    Math.max(0, page - 3),
    Math.min(totalPages, page + 2)
  );

  return (
    <div className={cn('flex items-center justify-center gap-1', className)}>
      <Button variant="outline" size="icon" disabled={page <= 1} onClick={() => onChange?.(page - 1)}>
        <ChevronLeft className="h-4 w-4" />
      </Button>
      {pages.map((p) => (
        <Button
          key={p}
          size="icon"
          variant={p === page ? 'primary' : 'ghost'}
          onClick={() => onChange?.(p)}
        >
          {p}
        </Button>
      ))}
      <Button
        variant="outline"
        size="icon"
        disabled={page >= totalPages}
        onClick={() => onChange?.(page + 1)}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
