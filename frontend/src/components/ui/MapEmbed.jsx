import { cn } from '../../lib/cn';

export default function MapEmbed({
  lat,
  lng,
  address,
  city,
  className,
  zoom = 14,
  height = 'h-64',
}) {
  const query = lat && lng ? `${lat},${lng}` : encodeURIComponent(`${address || ''} ${city || ''}`);
  const src = `https://maps.google.com/maps?q=${query}&z=${zoom}&output=embed`;

  return (
    <div className={cn('overflow-hidden rounded-2xl border border-border bg-surface-muted', height, className)}>
      <iframe title="Venue map" src={src} className="h-full w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
    </div>
  );
}
