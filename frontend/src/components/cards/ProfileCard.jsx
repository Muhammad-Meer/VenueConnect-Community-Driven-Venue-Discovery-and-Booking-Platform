import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';
import { Card } from '../ui/Card';
import { ROLE_LABELS } from '../../constants/roles';

export default function ProfileCard({ user, actions }) {
  if (!user) return null;
  return (
    <Card className="p-6">
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Avatar name={user.name} src={user.avatar} size="xl" />
          <div>
            <h2 className="text-xl font-semibold text-content">{user.name}</h2>
            <p className="text-sm text-content-muted">{user.email}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <Badge tone="brand">{ROLE_LABELS[user.role] || user.role}</Badge>
              {user.isVerified && <Badge tone="success">Verified</Badge>}
            </div>
          </div>
        </div>
        {actions}
      </div>
    </Card>
  );
}
