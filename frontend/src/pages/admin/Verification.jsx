import { useDispatch, useSelector } from 'react-redux';
import PageHeader from '../../components/common/PageHeader';
import { Card, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { approveVenueLocal, selectVenues } from '../../store/slices/venueSlice';
import { useToast } from '../../components/ui/Toast';

export default function AdminVerification() {
  const venues = useSelector(selectVenues).filter((v) => !v.isVerified);
  const dispatch = useDispatch();
  const toast = useToast();

  return (
    <div>
      <PageHeader title="Venue verification" description="Review ownership and quality signals before granting verified badges." />
      <div className="grid gap-4 md:grid-cols-2">
        {venues.map((venue) => (
          <Card key={venue._id}>
            <CardContent className="flex items-start justify-between gap-4 p-5">
              <div>
                <p className="font-semibold">{venue.name}</p>
                <p className="text-sm text-content-muted">
                  {venue.city} · Hosted by {venue.owner?.name || 'Owner'}
                </p>
                <div className="mt-2">
                  <Badge tone="warning">Needs verification</Badge>
                </div>
              </div>
              <Button
                size="sm"
                onClick={() => {
                  dispatch(approveVenueLocal(venue._id));
                  toast.success('Venue verified');
                }}
              >
                Verify
              </Button>
            </CardContent>
          </Card>
        ))}
        {venues.length === 0 && <p className="text-content-muted">All venues are verified.</p>}
      </div>
    </div>
  );
}
