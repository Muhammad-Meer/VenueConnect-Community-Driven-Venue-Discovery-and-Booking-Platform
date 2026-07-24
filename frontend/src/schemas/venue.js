import { z } from 'zod';

export const venueSchema = z.object({
  name: z.string().min(3, 'Venue name is required'),
  description: z.string().min(20, 'Add a richer description (20+ chars)'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  neighborhood: z.string().optional(),
  capacity: z.coerce.number().min(1, 'Capacity must be at least 1'),
  pricePerHour: z.coerce.number().min(1, 'Price is required'),
  workspaceType: z.string().min(1, 'Select a workspace type'),
  amenities: z.array(z.string()).default([]),
  images: z.array(z.string()).default([]),
  lat: z.coerce.number().optional(),
  lng: z.coerce.number().optional(),
  floorPlan: z.string().optional(),
  spaces: z
    .array(
      z.object({
        name: z.string(),
        capacity: z.coerce.number().optional(),
        pricePerHour: z.coerce.number().optional(),
      })
    )
    .optional(),
});

export const venueFilterSchema = z.object({
  query: z.string().optional(),
  city: z.string().optional(),
  neighborhood: z.string().optional(),
  budget: z.string().optional(),
  teamSize: z.string().optional(),
  workspaceType: z.string().optional(),
  amenities: z.array(z.string()).optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  minRating: z.coerce.number().optional(),
  verifiedOnly: z.boolean().optional(),
  sortBy: z.string().optional(),
});
