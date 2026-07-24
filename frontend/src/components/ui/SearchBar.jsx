import { Search, X } from 'lucide-react';
import { cn } from '../../lib/cn';
import Input from './Input';
import Button from './Button';

export default function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = 'Search venues, cities, neighborhoods…',
  className,
  size = 'md',
}) {
  return (
    <form
      className={cn('flex w-full items-center gap-2', className)}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.(value);
      }}
    >
      <Input
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        leftIcon={<Search className="h-4 w-4" />}
        rightIcon={
          value ? (
            <button type="button" onClick={() => onChange?.('')} className="text-content-muted hover:text-content">
              <X className="h-4 w-4" />
            </button>
          ) : null
        }
        className={size === 'lg' ? 'h-12 text-base' : undefined}
      />
      <Button type="submit" size={size === 'lg' ? 'lg' : 'md'}>
        Search
      </Button>
    </form>
  );
}
