import { useDispatch, useSelector } from 'react-redux';
import PageHeader from '../../components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { selectSeats, setSeatStatus } from '../../store/slices/ownerSlice';
import { cn } from '../../lib/cn';

export default function OwnerSeats() {
  const seats = useSelector(selectSeats);
  const dispatch = useDispatch();

  const cycle = (seat) => {
    const order = ['available', 'reserved', 'occupied'];
    const next = order[(order.indexOf(seat.status) + 1) % order.length];
    dispatch(setSeatStatus({ id: seat.id, status: next }));
  };

  return (
    <div>
      <PageHeader title="Seat inventory" description="Manage seat availability across your spaces." />
      <Card>
        <CardHeader>
          <CardTitle>Interactive seat map</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-wrap gap-2 text-xs">
            <span className="rounded-full bg-success-soft px-2 py-1 text-success">Available</span>
            <span className="rounded-full bg-warning-soft px-2 py-1 text-warning">Reserved</span>
            <span className="rounded-full bg-danger-soft px-2 py-1 text-danger">Occupied</span>
          </div>
          <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 md:grid-cols-8">
            {seats.map((seat) => (
              <button
                key={seat.id}
                type="button"
                onClick={() => cycle(seat)}
                className={cn(
                  'rounded-xl border px-2 py-4 text-sm font-semibold transition hover:scale-[1.02]',
                  seat.status === 'available' && 'border-success/30 bg-success-soft text-success',
                  seat.status === 'reserved' && 'border-warning/30 bg-warning-soft text-warning',
                  seat.status === 'occupied' && 'border-danger/30 bg-danger-soft text-danger'
                )}
              >
                {seat.id}
              </button>
            ))}
          </div>
          <p className="mt-4 text-sm text-content-muted">Click a seat to cycle its status.</p>
        </CardContent>
      </Card>
    </div>
  );
}
