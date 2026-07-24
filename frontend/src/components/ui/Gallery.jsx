import { useState } from 'react';
import { ChevronLeft, ChevronRight, Expand } from 'lucide-react';
import { cn } from '../../lib/cn';
import Modal from './Modal';
import Button from './Button';

export default function Gallery({ images = [], alt = 'Venue', className }) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  if (!images.length) {
    return (
      <div className={cn('flex h-72 items-center justify-center rounded-2xl bg-surface-muted text-content-muted', className)}>
        No images
      </div>
    );
  }

  const current = images[index] || images[0];
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  return (
    <div className={cn('space-y-3', className)}>
      <div className="relative overflow-hidden rounded-2xl bg-surface-muted">
        <img src={current} alt={alt} className="h-72 w-full object-cover md:h-96" />
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-3">
          <div className="flex gap-2">
            <Button size="icon" variant="secondary" onClick={prev}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="secondary" onClick={next}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <Button size="sm" variant="secondary" leftIcon={<Expand className="h-4 w-4" />} onClick={() => setOpen(true)}>
            View
          </Button>
        </div>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {images.map((src, i) => (
          <button
            key={src + i}
            type="button"
            onClick={() => setIndex(i)}
            className={cn(
              'h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2',
              i === index ? 'border-brand-600' : 'border-transparent'
            )}
          >
            <img src={src} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={alt} size="xl">
        <img src={current} alt={alt} className="max-h-[70vh] w-full rounded-xl object-contain" />
      </Modal>
    </div>
  );
}
