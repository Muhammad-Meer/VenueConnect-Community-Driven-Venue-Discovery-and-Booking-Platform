import { cn } from '../../lib/cn';

export default function Tooltip({ content, children, side = 'top', className }) {
  const pos = {
    top: 'bottom-full left-1/2 mb-2 -translate-x-1/2',
    bottom: 'top-full left-1/2 mt-2 -translate-x-1/2',
    left: 'right-full top-1/2 mr-2 -translate-y-1/2',
    right: 'left-full top-1/2 ml-2 -translate-y-1/2',
  };

  return (
    <span className={cn('group relative inline-flex', className)}>
      {children}
      <span
        role="tooltip"
        className={cn(
          'pointer-events-none absolute z-tooltip whitespace-nowrap rounded-md bg-surface-inverse px-2 py-1 text-xs text-content-inverse opacity-0 shadow transition group-hover:opacity-100',
          pos[side]
        )}
      >
        {content}
      </span>
    </span>
  );
}
