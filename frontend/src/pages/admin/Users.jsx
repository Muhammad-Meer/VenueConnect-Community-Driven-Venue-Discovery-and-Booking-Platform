import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageHeader from '../../components/common/PageHeader';
import Table from '../../components/ui/Table';
import Badge from '../../components/ui/Badge';
import { fetchAllUsers, selectUsers } from '../../store/slices/userSlice';
import { ROLE_LABELS } from '../../constants/roles';
import { formatDate } from '../../lib/format';

export default function AdminUsers() {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return (
    <div>
      <PageHeader title="User management" description="View and monitor platform users." />
      <Table
        columns={[
          { key: 'name', header: 'Name' },
          { key: 'email', header: 'Email' },
          {
            key: 'role',
            header: 'Role',
            render: (role) => <Badge tone="brand">{ROLE_LABELS[role] || role}</Badge>,
          },
          {
            key: 'isVerified',
            header: 'Verified',
            render: (v) => <Badge tone={v ? 'success' : 'warning'}>{v ? 'Yes' : 'No'}</Badge>,
          },
          {
            key: 'createdAt',
            header: 'Joined',
            render: (v) => formatDate(v),
          },
        ]}
        data={users}
      />
    </div>
  );
}
