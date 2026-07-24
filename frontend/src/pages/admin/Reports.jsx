import { useDispatch, useSelector } from 'react-redux';
import PageHeader from '../../components/common/PageHeader';
import Table from '../../components/ui/Table';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { resolveReport, selectReports } from '../../store/slices/adminSlice';
import { formatDate } from '../../lib/format';
import { useToast } from '../../components/ui/Toast';

export default function AdminReports() {
  const reports = useSelector(selectReports);
  const dispatch = useDispatch();
  const toast = useToast();

  return (
    <div>
      <PageHeader title="Reports" description="Trust & safety queue from users." />
      <Table
        columns={[
          { key: 'type', header: 'Type' },
          { key: 'subject', header: 'Subject' },
          { key: 'target', header: 'Target' },
          {
            key: 'status',
            header: 'Status',
            render: (s) => <Badge tone={s === 'open' ? 'warning' : 'success'}>{s}</Badge>,
          },
          { key: 'createdAt', header: 'Opened', render: (v) => formatDate(v) },
          {
            key: 'id',
            header: '',
            render: (id, row) =>
              row.status === 'open' ? (
                <Button
                  size="sm"
                  onClick={() => {
                    dispatch(resolveReport(id));
                    toast.success('Report resolved');
                  }}
                >
                  Resolve
                </Button>
              ) : (
                '—'
              ),
          },
        ]}
        data={reports}
      />
    </div>
  );
}
