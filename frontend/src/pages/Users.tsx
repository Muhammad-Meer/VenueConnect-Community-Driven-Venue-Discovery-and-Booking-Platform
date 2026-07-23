import { useEffect, useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { DashboardLayout } from '@/components/layout'
import {
  Badge,
  Table,
  SearchInput,
  Select,
  Pagination,
  EmptyState,
  Skeleton,
  Avatar,
} from '@/components/ui'
import { adminNav } from '@/constants/navigation'
import { mockUsers, type User } from '@/data/mockData'
import { formatDate } from '@/lib/format'

const PAGE_SIZE = 5

export default function Users() {
  const [query, setQuery] = useState('')
  const [role, setRole] = useState('')
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 400)
    return () => clearTimeout(t)
  }, [])

  const filtered = useMemo(() => {
    return mockUsers.filter((u) => {
      if (role && u.role !== role) return false
      if (query) {
        const q = query.toLowerCase()
        if (
          !u.name.toLowerCase().includes(q) &&
          !u.email.toLowerCase().includes(q) &&
          !u.city.toLowerCase().includes(q)
        )
          return false
      }
      return true
    })
  }, [query, role])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <DashboardLayout
      items={adminNav}
      title="Admin"
      pageTitle="Users"
      pageSubtitle="Browse and filter platform accounts."
    >
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <SearchInput
          value={query}
          onChange={(v) => {
            setQuery(v)
            setPage(1)
          }}
          placeholder="Search name, email, city…"
          className="sm:max-w-sm"
        />
        <Select
          className="sm:w-48"
          fullWidth={false}
          value={role}
          onChange={(e) => {
            setRole(e.target.value)
            setPage(1)
          }}
          options={[
            { value: 'customer', label: 'Customer' },
            { value: 'owner', label: 'Owner' },
            { value: 'admin', label: 'Admin' },
          ]}
          placeholder="All roles"
        />
      </div>

      {loading ? (
        <div className="card-surface p-6 space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex gap-4 items-center">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-3 w-1/4" />
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="card-surface">
          <EmptyState
            icon={<Search size={24} />}
            title="No users found"
            description="Try a different search or role filter."
            actionLabel="Clear filters"
            onAction={() => {
              setQuery('')
              setRole('')
            }}
          />
        </div>
      ) : (
        <>
          <Table<User>
            columns={[
              {
                key: 'user',
                header: 'User',
                render: (u) => (
                  <div className="flex items-center gap-3">
                    <Avatar name={u.name} src={u.avatar} size="sm" />
                    <div>
                      <p className="font-semibold text-primary">{u.name}</p>
                      <p className="text-caption text-muted">{u.email}</p>
                    </div>
                  </div>
                ),
              },
              {
                key: 'role',
                header: 'Role',
                render: (u) => (
                  <Badge
                    variant={
                      u.role === 'admin'
                        ? 'warning'
                        : u.role === 'owner'
                          ? 'primary'
                          : 'default'
                    }
                  >
                    {u.role}
                  </Badge>
                ),
              },
              { key: 'city', header: 'City', render: (u) => u.city },
              { key: 'phone', header: 'Phone', render: (u) => u.phone },
              {
                key: 'joined',
                header: 'Joined',
                render: (u) => formatDate(u.joinedAt),
              },
            ]}
            data={pageItems}
            keyExtractor={(u) => u.id}
          />
          <Pagination
            page={page}
            totalPages={totalPages}
            onChange={setPage}
            className="mt-6"
          />
        </>
      )}
    </DashboardLayout>
  )
}
