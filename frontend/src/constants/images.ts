/** Dairy farm / nature inspired Unsplash placeholders */
export const images = {
  hero: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1600&q=80',
  fields: [
    'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1200&q=80',
    'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&q=80',
    'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1200&q=80',
    'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?w=1200&q=80',
  ],
  farms: [
    'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&q=80',
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80',
    'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=1200&q=80',
    'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200&q=80',
  ],
  milk: [
    'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=1200&q=80',
    'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=1200&q=80',
    'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=1200&q=80',
  ],
  nature: [
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80',
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&q=80',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
  ],
  barn: 'https://images.unsplash.com/photo-1444858291040-58f756a3bdd6?w=1200&q=80',
  cows: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=1200&q=80',
  pasture: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80',
  empty: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80',
} as const

export function venueImage(index: number) {
  const pool = [...images.fields, ...images.farms, ...images.milk]
  return pool[index % pool.length]
}
