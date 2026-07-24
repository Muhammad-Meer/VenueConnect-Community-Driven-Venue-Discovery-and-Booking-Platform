import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Alert from '../../components/ui/Alert';
import { formatCurrency, formatDate } from '../../lib/format';
import { payBooking } from '../../store/slices/bookingSlice';
import { useToast } from '../../components/ui/Toast';

export default function Checkout() {
  const { state } = useLocation();
  const booking = state?.booking;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const [method, setMethod] = useState('card');
  const [loading, setLoading] = useState(false);

  if (!booking) {
    return (
      <div>
        <Alert tone="warning" title="No booking selected">
          Choose a booking from My Bookings to continue checkout.
        </Alert>
        <Button className="mt-4" onClick={() => navigate('/app/bookings')}>
          Go to bookings
        </Button>
      </div>
    );
  }

  const pay = async () => {
    setLoading(true);
    const result = await dispatch(
      payBooking({
        bookingId: booking._id,
        paymentMethod: method,
        transactionId: `txn_${Date.now()}`,
      })
    );
    setLoading(false);
    if (result.meta.requestStatus === 'fulfilled') {
      toast.success('Payment successful');
      navigate('/app/bookings/success', { state: { booking } });
    } else {
      toast.error('Payment failed', result.payload);
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader title="Checkout" description="Confirm payment for your reservation." />
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Booking summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p className="font-semibold text-content">{booking.venue?.name || 'Venue'}</p>
            <p className="text-content-muted">{formatDate(booking.date)}</p>
            <p className="text-content-muted">
              {booking.startTime} – {booking.endTime}
            </p>
            <p className="text-lg font-bold">{formatCurrency(booking.totalAmount)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Payment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Select
              label="Method"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              options={[
                { value: 'card', label: 'Credit / Debit card' },
                { value: 'paypal', label: 'PayPal' },
                { value: 'bank', label: 'Bank transfer' },
              ]}
              placeholder={null}
            />
            {method === 'card' && (
              <>
                <Input label="Cardholder" placeholder="Name on card" />
                <Input label="Card number" placeholder="4242 4242 4242 4242" />
                <div className="grid grid-cols-2 gap-3">
                  <Input label="Expiry" placeholder="MM/YY" />
                  <Input label="CVC" placeholder="123" />
                </div>
              </>
            )}
            <Button fullWidth loading={loading} onClick={pay}>
              Pay {formatCurrency(booking.totalAmount)}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
