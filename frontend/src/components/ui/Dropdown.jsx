import { useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/cn';

export default function Dropdown({ trigger, items = [], align = 'right', className }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  return (
    <div className={cn('relative inline-block', className)} ref={ref}>
      <div onClick={() => setOpen((v) => !v)}>{trigger}</div>
      {open && (
        <div
          className={cn(
            'absolute z-dropdown mt-2 min-w-[12rem] overflow-hidden rounded-xl border border-border bg-surface py-1 shadow-lg animate-scale-in',
            align === 'right' ? 'right-0' : 'left-0'
          )}
        >
          {items.map((item) =>
            item.divider ? (
              <div key={item.id || item.label} className="my-1 border-t border-border" />
            ) : (
              <button
                key={item.id || item.label}
                type="button"
                disabled={item.disabled}
                className={cn(
                  'flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-content hover:bg-surface-muted disabled:opacity-50',
                  item.danger && 'text-danger'
                )}
                onClick={() => {
                  item.onClick?.();
                  setOpen(false);
                }}
              >
                {item.icon}
                {item.label}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}
