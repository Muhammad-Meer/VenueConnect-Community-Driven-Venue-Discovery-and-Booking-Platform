import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageHeader from '../../components/common/PageHeader';
import Table from '../../components/ui/Table';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import {
  approveVenueLocal,
  fetchVenues,
  rejectVenueLocal,
  selectVenues,
} from '../../store/slices/venueSlice';
import { useToast } from '../../components/ui/Toast';
import { formatCurrency } from '../../lib/format';

export default function AdminVenues() {
  const dispatch = useDispatch();
  const toast = useToast();
  const venues = useSelector(selectVenues);

  useEffect(() => {
    dispatch(fetchVenues());
  }, [dispatch]);

  return (
    <div>
      <PageHeader title="Venue listings" description="Approve listings and monitor catalog quality." />
      <Table
        columns={[
          { key: 'name', header: 'Venue' },
          { key: 'city', header: 'City' },
          { key: 'pricePerHour', header: 'Price', render: (v) => formatCurrency(v) },
          {
            key: 'isApproved',
            header: 'Status',
            render: (v) => <Badge tone={v ? 'success' : 'warning'}>{v ? 'Approved' : 'Pending'}</Badge>,
          },
          {
            key: '_id',
            header: 'Actions',
            render: (id, row) => (
              <div className="flex gap-2">
                {!row.isApproved && (
                  <Button
                    size="sm"
                    onClick={() => {
                      dispatch(approveVenueLocal(id));
                      toast.success('Venue approved');
                    }}
                  >
                    Approve
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    dispatch(rejectVenueLocal(id));
                    toast.warning('Venue marked pending');
                  }}
                >
                  Hold
                </Button>
              </div>
            ),
          },
        ]}
        data={venues}
      />
    </div>
  );
}
