import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/ui/Button';
import Table from '../../components/ui/Table';
import Badge from '../../components/ui/Badge';
import { fetchVenues } from '../../store/slices/venueSlice';
import { formatCurrency } from '../../lib/format';

export default function OwnerVenues() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const venues = useSelector((s) => s.venue.ownerVenues);

  useEffect(() => {
    dispatch(fetchVenues());
  }, [dispatch]);

  return (
    <div>
      <PageHeader
        title="My venues"
        description="Create, edit, and manage multi-space listings."
        actions={
          <Button>
            <Link to="/owner/venues/new">Add venue</Link>
          </Button>
        }
      />
      <Table
        columns={[
          { key: 'name', header: 'Venue' },
          { key: 'city', header: 'City' },
          {
            key: 'pricePerHour',
            header: 'Price',
            render: (v) => formatCurrency(v),
          },
          { key: 'capacity', header: 'Capacity' },
          {
            key: 'isApproved',
            header: 'Status',
            render: (v, row) => (
              <Badge tone={v || row.isVerified ? 'success' : 'warning'}>
                {v || row.isVerified ? 'Live' : 'Pending'}
              </Badge>
            ),
          },
          {
            key: '_id',
            header: '',
            render: (id) => (
              <Button size="sm" variant="outline" onClick={() => navigate(`/owner/venues/${id}/edit`)}>
                Edit
              </Button>
            ),
          },
        ]}
        data={venues}
        empty="No venues yet"
      />
    </div>
  );
}
