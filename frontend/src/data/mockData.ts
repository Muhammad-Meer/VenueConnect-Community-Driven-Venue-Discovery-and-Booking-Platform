import { images, venueImage } from '@/constants/images'

export type UserRole = 'customer' | 'owner' | 'admin'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  phone: string
  avatar: string | null
  city: string
  joinedAt: string
}

export interface Venue {
  id: string
  name: string
  description: string
  location: string
  address: string
  city: string
  price: number
  pricePerHour: number
  capacity: number
  rating: number
  reviewCount: number
  category: string
  featured: boolean
  isApproved: boolean
  ownerId: string
  amenities: string[]
  images: string[]
  image: string
  bookedDates: string[]
  status: 'active' | 'draft' | 'pending' | 'inactive'
  acres?: number
}

export interface Booking {
  id: string
  venueId: string
  venueName: string
  venueImage: string
  userId: string
  userName: string
  date: string
  endDate?: string
  guests: number
  total: number
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed'
  createdAt: string
}

export interface ReportRow {
  id: string
  title: string
  type: string
  period: string
  value: number
  change: number
  status: 'positive' | 'neutral' | 'negative'
}

export const mockUsers: User[] = [
  {
    id: 'u1',
    name: 'Ayesha Khan',
    email: 'ayesha@example.com',
    role: 'customer',
    phone: '+92 300 1234567',
    avatar: null,
    city: 'Karachi',
    joinedAt: '2025-11-12',
  },
  {
    id: 'u2',
    name: 'Hassan Ali',
    email: 'hassan@pasture.com',
    role: 'owner',
    phone: '+92 321 7654321',
    avatar: null,
    city: 'Lahore',
    joinedAt: '2025-08-03',
  },
  {
    id: 'u3',
    name: 'Sara Ahmed',
    email: 'sara@pasture.com',
    role: 'admin',
    phone: '+92 333 1112233',
    avatar: null,
    city: 'Islamabad',
    joinedAt: '2025-06-20',
  },
  {
    id: 'u4',
    name: 'Bilal Raza',
    email: 'bilal@example.com',
    role: 'customer',
    phone: '+92 345 9988776',
    avatar: null,
    city: 'Faisalabad',
    joinedAt: '2026-01-15',
  },
  {
    id: 'u5',
    name: 'Fatima Noor',
    email: 'fatima@example.com',
    role: 'owner',
    phone: '+92 312 5544332',
    avatar: null,
    city: 'Multan',
    joinedAt: '2025-09-28',
  },
]

export const mockVenues: Venue[] = [
  {
    id: '1',
    name: 'Green Valley Dairy Estate',
    description:
      'A premium countryside dairy farm with rolling pastures, guided tours, fresh milk tastings, and private event lawns. Ideal for family gatherings, educational visits, and weekend retreats.',
    location: 'Near Motorway M2',
    address: '12 Pasture Road, Green Valley',
    city: 'Lahore',
    price: 45000,
    pricePerHour: 6000,
    capacity: 200,
    rating: 4.9,
    reviewCount: 142,
    category: 'Estate',
    featured: true,
    isApproved: true,
    ownerId: 'u2',
    amenities: ['Parking', 'Guided Tour', 'Milk Tasting', 'Picnic Area', 'Restrooms', 'Kids Zone', 'WiFi'],
    images: [venueImage(0), venueImage(1), venueImage(2), images.cows],
    image: venueImage(0),
    bookedDates: ['2026-07-25', '2026-07-28', '2026-08-02'],
    status: 'active',
    acres: 48,
  },
  {
    id: '2',
    name: 'Sunrise Meadow Farm',
    description:
      'Sunrise views over lush meadows, open-air barns, and artisan cheese workshops. Perfect for photography sessions and intimate outdoor celebrations.',
    location: 'Canal Road',
    address: '88 Meadow Lane',
    city: 'Islamabad',
    price: 32000,
    pricePerHour: 4500,
    capacity: 120,
    rating: 4.7,
    reviewCount: 89,
    category: 'Meadow',
    featured: true,
    isApproved: true,
    ownerId: 'u2',
    amenities: ['Parking', 'Workshop', 'Cafe', 'Photo Spots', 'Restrooms'],
    images: [venueImage(3), venueImage(4), images.milk[0]],
    image: venueImage(3),
    bookedDates: ['2026-07-22', '2026-08-05'],
    status: 'active',
    acres: 22,
  },
  {
    id: '3',
    name: 'Heritage Milk Barn',
    description:
      'Restored heritage barn with modern amenities, tasting rooms, and a boutique farm shop stocked with organic dairy products.',
    location: 'Old City Outskirts',
    address: '5 Heritage Path',
    city: 'Karachi',
    price: 28000,
    pricePerHour: 4000,
    capacity: 80,
    rating: 4.5,
    reviewCount: 64,
    category: 'Barn',
    featured: true,
    isApproved: true,
    ownerId: 'u5',
    amenities: ['AC', 'Tasting Room', 'Farm Shop', 'Parking', 'Sound System'],
    images: [images.barn, venueImage(5), images.milk[1]],
    image: images.barn,
    bookedDates: ['2026-07-26', '2026-08-01'],
    status: 'active',
    acres: 12,
  },
  {
    id: '4',
    name: 'Pasture Peak Retreat',
    description:
      'Elevated hillside farm with panoramic views, glamping pods, and private dairy breakfast experiences for weekend guests.',
    location: 'Hillside Estate',
    address: '21 Peak View Drive',
    city: 'Murree',
    price: 65000,
    pricePerHour: 9000,
    capacity: 60,
    rating: 4.8,
    reviewCount: 51,
    category: 'Retreat',
    featured: false,
    isApproved: true,
    ownerId: 'u5',
    amenities: ['Glamping', 'Breakfast', 'Hiking Trails', 'Parking', 'Fireplace'],
    images: [images.nature[0], venueImage(6), images.pasture],
    image: images.nature[0],
    bookedDates: ['2026-07-24', '2026-08-08'],
    status: 'active',
    acres: 35,
  },
  {
    id: '5',
    name: 'Golden Field Dairy',
    description:
      'Sprawling golden fields, modern milking parlour tours, and large event grounds for festivals and corporate offsites.',
    location: 'Ring Road',
    address: '100 Golden Field Ave',
    city: 'Faisalabad',
    price: 52000,
    pricePerHour: 7500,
    capacity: 350,
    rating: 4.6,
    reviewCount: 110,
    category: 'Festival',
    featured: true,
    isApproved: true,
    ownerId: 'u2',
    amenities: ['Stage', 'Parking', 'Catering Area', 'Power Supply', 'Restrooms', 'Security'],
    images: [venueImage(7), images.fields[1], images.farms[2]],
    image: venueImage(7),
    bookedDates: ['2026-07-30', '2026-08-12'],
    status: 'active',
    acres: 60,
  },
  {
    id: '6',
    name: 'Clover Creek Farmstay',
    description:
      'Family-friendly farmstay with animal petting zones, creek-side picnics, and fresh dairy breakfast baskets.',
    location: 'Creek Side',
    address: '9 Clover Way',
    city: 'Multan',
    price: 18000,
    pricePerHour: 2500,
    capacity: 40,
    rating: 4.4,
    reviewCount: 37,
    category: 'Farmstay',
    featured: false,
    isApproved: true,
    ownerId: 'u5',
    amenities: ['Petting Zoo', 'Picnic', 'Parking', 'Breakfast Basket'],
    images: [images.cows, venueImage(2), images.milk[2]],
    image: images.cows,
    bookedDates: [],
    status: 'active',
    acres: 8,
  },
  {
    id: '7',
    name: 'Olive Grove Dairy',
    description:
      'Boutique olive grove and dairy hybrid venue with private tasting dinners and seasonal harvest events.',
    location: 'Orchard Belt',
    address: '44 Olive Grove',
    city: 'Quetta',
    price: 38000,
    pricePerHour: 5200,
    capacity: 90,
    rating: 4.7,
    reviewCount: 28,
    category: 'Boutique',
    featured: false,
    isApproved: false,
    ownerId: 'u2',
    amenities: ['Private Dining', 'Tasting', 'Parking', 'Garden'],
    images: [images.nature[1], venueImage(1)],
    image: images.nature[1],
    bookedDates: [],
    status: 'pending',
    acres: 15,
  },
  {
    id: '8',
    name: 'Riverbend Organic Farm',
    description:
      'Certified organic dairy farm along a quiet riverbend — ideal for wellness retreats and nature workshops.',
    location: 'River Road',
    address: '3 Riverbend Lane',
    city: 'Peshawar',
    price: 24000,
    pricePerHour: 3200,
    capacity: 70,
    rating: 4.3,
    reviewCount: 19,
    category: 'Organic',
    featured: false,
    isApproved: true,
    ownerId: 'u5',
    amenities: ['Organic Tour', 'Yoga Lawn', 'Parking', 'Restrooms'],
    images: [images.nature[2], venueImage(4)],
    image: images.nature[2],
    bookedDates: ['2026-08-03'],
    status: 'draft',
    acres: 18,
  },
]

export const mockBookings: Booking[] = [
  {
    id: 'b1',
    venueId: '1',
    venueName: 'Green Valley Dairy Estate',
    venueImage: venueImage(0),
    userId: 'u1',
    userName: 'Ayesha Khan',
    date: '2026-08-15',
    guests: 80,
    total: 45000,
    status: 'confirmed',
    createdAt: '2026-07-10',
  },
  {
    id: 'b2',
    venueId: '2',
    venueName: 'Sunrise Meadow Farm',
    venueImage: venueImage(3),
    userId: 'u1',
    userName: 'Ayesha Khan',
    date: '2026-07-28',
    guests: 40,
    total: 32000,
    status: 'pending',
    createdAt: '2026-07-18',
  },
  {
    id: 'b3',
    venueId: '3',
    venueName: 'Heritage Milk Barn',
    venueImage: images.barn,
    userId: 'u4',
    userName: 'Bilal Raza',
    date: '2026-06-12',
    guests: 50,
    total: 28000,
    status: 'completed',
    createdAt: '2026-05-20',
  },
  {
    id: 'b4',
    venueId: '5',
    venueName: 'Golden Field Dairy',
    venueImage: venueImage(7),
    userId: 'u1',
    userName: 'Ayesha Khan',
    date: '2026-09-02',
    guests: 200,
    total: 52000,
    status: 'confirmed',
    createdAt: '2026-07-19',
  },
  {
    id: 'b5',
    venueId: '4',
    venueName: 'Pasture Peak Retreat',
    venueImage: images.nature[0],
    userId: 'u4',
    userName: 'Bilal Raza',
    date: '2026-07-20',
    guests: 20,
    total: 65000,
    status: 'cancelled',
    createdAt: '2026-07-01',
  },
]

export const mockReports: ReportRow[] = [
  { id: 'r1', title: 'Total Bookings', type: 'Bookings', period: 'This month', value: 248, change: 12.4, status: 'positive' },
  { id: 'r2', title: 'Gross Revenue', type: 'Revenue', period: 'This month', value: 4850000, change: 8.1, status: 'positive' },
  { id: 'r3', title: 'Active Venues', type: 'Venues', period: 'Current', value: 86, change: 3.2, status: 'positive' },
  { id: 'r4', title: 'Cancellation Rate', type: 'Quality', period: 'This month', value: 4.2, change: -1.1, status: 'positive' },
  { id: 'r5', title: 'New Users', type: 'Users', period: 'This month', value: 312, change: 18.6, status: 'positive' },
  { id: 'r6', title: 'Avg. Rating', type: 'Quality', period: 'Trailing 30d', value: 4.7, change: 0.1, status: 'neutral' },
]

export const cities = ['Lahore', 'Islamabad', 'Karachi', 'Faisalabad', 'Multan', 'Murree', 'Quetta', 'Peshawar']
export const categories = ['Estate', 'Meadow', 'Barn', 'Retreat', 'Festival', 'Farmstay', 'Boutique', 'Organic']
export const amenitiesList = [
  'Parking',
  'Guided Tour',
  'Milk Tasting',
  'Picnic Area',
  'Restrooms',
  'Kids Zone',
  'WiFi',
  'Workshop',
  'Cafe',
  'AC',
  'Stage',
  'Security',
  'Glamping',
  'Organic Tour',
]

export const ownerStats = {
  revenue: 1284000,
  revenueChange: 14.2,
  bookings: 48,
  bookingsChange: 9.5,
  venues: 4,
  occupancy: 72,
  occupancyChange: 4.1,
  rating: 4.8,
}

export const adminStats = {
  users: 1842,
  usersChange: 11.3,
  venues: 86,
  venuesChange: 5.4,
  bookings: 1240,
  bookingsChange: 16.8,
  revenue: 18450000,
  revenueChange: 12.1,
}

export const chartPlaceholder = [
  { label: 'Jan', value: 42 },
  { label: 'Feb', value: 58 },
  { label: 'Mar', value: 51 },
  { label: 'Apr', value: 73 },
  { label: 'May', value: 68 },
  { label: 'Jun', value: 91 },
  { label: 'Jul', value: 84 },
]
