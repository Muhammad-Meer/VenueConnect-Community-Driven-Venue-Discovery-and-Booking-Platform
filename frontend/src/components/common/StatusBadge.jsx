import Badge from '../ui/Badge';
import { BOOKING_STATUS, PAYMENT_STATUS } from '../../constants/venues';

export default function StatusBadge({ status, type = 'booking' }) {
  const map = type === 'payment' ? PAYMENT_STATUS : BOOKING_STATUS;
  const meta = map[status] || { label: status, tone: 'neutral' };
  return <Badge tone={meta.tone}>{meta.label}</Badge>;
}
