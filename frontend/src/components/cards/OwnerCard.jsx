import { Mail, Phone } from 'lucide-react';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import { Card } from '../ui/Card';

export default function OwnerCard({ owner, onMessage }) {
  if (!owner) return null;
  return (
    <Card className="p-5">
      <div className="flex items-center gap-3">
        <Avatar name={owner.name} src={owner.avatar} size="lg" />
        <div>
          <p className="font-semibold text-content">{owner.name}</p>
          <p className="text-sm text-content-muted">Venue owner</p>
        </div>
      </div>
      <div className="mt-4 space-y-2 text-sm text-content-secondary">
        {owner.email && (
          <p className="flex items-center gap-2">
            <Mail className="h-4 w-4" /> {owner.email}
          </p>
        )}
        {owner.phone && (
          <p className="flex items-center gap-2">
            <Phone className="h-4 w-4" /> {owner.phone}
          </p>
        )}
      </div>
      {onMessage && (
        <Button className="mt-4 w-full" variant="outline" onClick={onMessage}>
          Message owner
        </Button>
      )}
    </Card>
  );
}
