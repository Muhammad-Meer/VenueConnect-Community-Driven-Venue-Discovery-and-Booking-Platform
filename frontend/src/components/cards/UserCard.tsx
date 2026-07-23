import type { User } from '@/data/mockData'
import { formatDate } from '@/lib/format'
import { Avatar, Badge, Card } from '@/components/ui'

const roleVariant = {
  customer: 'default',
  owner: 'primary',
  admin: 'warning',
} as const

export default function UserCard({ user }: { user: User }) {
  return (
    <Card hover className="flex items-center gap-4">
      <Avatar name={user.name} src={user.avatar} size="lg" />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="text-body font-semibold text-primary truncate">{user.name}</h3>
          <Badge variant={roleVariant[user.role]}>
            {user.role}
          </Badge>
        </div>
        <p className="mt-0.5 text-small text-muted truncate">{user.email}</p>
        <p className="mt-2 text-caption text-muted">
          {user.city} · Joined {formatDate(user.joinedAt)}
        </p>
      </div>
    </Card>
  )
}
