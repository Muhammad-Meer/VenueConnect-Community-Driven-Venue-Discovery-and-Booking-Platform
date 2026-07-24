import { Star } from 'lucide-react';
import Avatar from '../ui/Avatar';
import { formatRelative } from '../../lib/format';
import { Card } from '../ui/Card';

export default function ReviewCard({ review }) {
  if (!review) return null;
  return (
    <Card className="p-4">
      <div className="flex items-start gap-3">
        <Avatar name={review.customer?.name || 'User'} src={review.customer?.avatar} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-medium text-content">{review.customer?.name || 'Guest'}</p>
            <p className="text-xs text-content-muted">{formatRelative(review.createdAt)}</p>
          </div>
          <div className="mt-1 flex items-center gap-0.5 text-warning">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${i < review.rating ? 'fill-current' : 'text-border'}`}
              />
            ))}
          </div>
          <p className="mt-2 text-sm text-content-secondary">{review.comment}</p>
        </div>
      </div>
    </Card>
  );
}
