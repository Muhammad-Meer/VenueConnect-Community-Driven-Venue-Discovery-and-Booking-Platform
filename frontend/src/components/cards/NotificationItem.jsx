import { Bell, CalendarDays, MessageSquare, Star } from 'lucide-react';
import { cn } from '../../lib/cn';
import { formatRelative } from '../../lib/format';

const icons = {
  booking: CalendarDays,
  message: MessageSquare,
  review: Star,
  default: Bell,
};

export default function NotificationItem({ notification, onClick }) {
  const Icon = icons[notification.type] || icons.default;
  return (
    <button
      type="button"
      onClick={() => onClick?.(notification)}
      className={cn(
        'flex w-full items-start gap-3 rounded-xl border border-border px-4 py-3 text-left transition hover:bg-surface-muted',
        !notification.isRead && 'bg-brand-50/50 dark:bg-brand-950/30'
      )}
    >
      <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full bg-surface-muted text-brand-600">
        <Icon className="h-4 w-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center justify-between gap-2">
          <span className="text-sm font-semibold text-content">{notification.title}</span>
          <span className="text-2xs text-content-muted">{formatRelative(notification.createdAt)}</span>
        </span>
        <span className="mt-0.5 block text-sm text-content-secondary">{notification.message}</span>
      </span>
      {!notification.isRead && <span className="mt-2 h-2 w-2 rounded-full bg-brand-600" />}
    </button>
  );
}
