export const WORKSPACE_TYPES = [
  { value: 'meeting_room', label: 'Meeting Room' },
  { value: 'private_office', label: 'Private Office' },
  { value: 'coworking', label: 'Coworking Desk' },
  { value: 'event_space', label: 'Event Space' },
  { value: 'studio', label: 'Studio' },
  { value: 'conference', label: 'Conference Hall' },
];

export const AMENITIES = [
  { value: 'wifi', label: 'High-speed WiFi' },
  { value: 'parking', label: 'Parking' },
  { value: 'projector', label: 'Projector / AV' },
  { value: 'whiteboard', label: 'Whiteboard' },
  { value: 'coffee', label: 'Coffee & Tea' },
  { value: 'catering', label: 'Catering' },
  { value: 'ac', label: 'Air Conditioning' },
  { value: 'accessible', label: 'Wheelchair Accessible' },
  { value: 'kitchen', label: 'Kitchen' },
  { value: 'security', label: '24/7 Security' },
  { value: 'printer', label: 'Printer' },
  { value: 'phone_booth', label: 'Phone Booths' },
];

export const TEAM_SIZES = [
  { value: '1-5', label: '1–5 people', min: 1, max: 5 },
  { value: '6-15', label: '6–15 people', min: 6, max: 15 },
  { value: '16-30', label: '16–30 people', min: 16, max: 30 },
  { value: '31-50', label: '31–50 people', min: 31, max: 50 },
  { value: '50+', label: '50+ people', min: 51, max: 1000 },
];

export const BUDGET_RANGES = [
  { value: '0-50', label: 'Under $50/hr', min: 0, max: 50 },
  { value: '50-100', label: '$50–$100/hr', min: 50, max: 100 },
  { value: '100-200', label: '$100–$200/hr', min: 100, max: 200 },
  { value: '200+', label: '$200+/hr', min: 200, max: 10000 },
];

export const BOOKING_STATUS = {
  pending: { label: 'Pending', tone: 'warning' },
  confirmed: { label: 'Confirmed', tone: 'success' },
  cancelled: { label: 'Cancelled', tone: 'danger' },
  completed: { label: 'Completed', tone: 'info' },
  rejected: { label: 'Rejected', tone: 'danger' },
};

export const PAYMENT_STATUS = {
  pending: { label: 'Pending', tone: 'warning' },
  paid: { label: 'Paid', tone: 'success' },
  refunded: { label: 'Refunded', tone: 'info' },
};

export const CITIES = [
  'New York',
  'San Francisco',
  'Los Angeles',
  'Chicago',
  'Austin',
  'Seattle',
  'Boston',
  'Miami',
  'Denver',
  'London',
];
