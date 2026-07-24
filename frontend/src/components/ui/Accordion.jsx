import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/cn';

export default function Accordion({ items = [], allowMultiple = false, className }) {
  const [open, setOpen] = useState([]);

  const toggle = (id) => {
    setOpen((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      return allowMultiple ? [...prev, id] : [id];
    });
  };

  return (
    <div className={cn('divide-y divide-border rounded-xl border border-border bg-surface', className)}>
      {items.map((item) => {
        const isOpen = open.includes(item.id);
        return (
          <div key={item.id}>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left"
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
            >
              <span className="text-sm font-medium text-content">{item.title}</span>
              <ChevronDown className={cn('h-4 w-4 text-content-muted transition', isOpen && 'rotate-180')} />
            </button>
            {isOpen && <div className="px-4 pb-4 text-sm text-content-secondary">{item.content}</div>}
          </div>
        );
      })}
    </div>
  );
}
