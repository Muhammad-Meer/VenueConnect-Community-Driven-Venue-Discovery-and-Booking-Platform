import { z } from 'zod';

export const bookingSchema = z
  .object({
    venue: z.string().min(1, 'Venue is required'),
    date: z.string().min(1, 'Select a date'),
    startTime: z.string().min(1, 'Start time is required'),
    endTime: z.string().min(1, 'End time is required'),
    teamSize: z.coerce.number().min(1).optional(),
    notes: z.string().max(500).optional(),
    seats: z.array(z.string()).optional(),
  })
  .refine((data) => data.endTime > data.startTime, {
    message: 'End time must be after start time',
    path: ['endTime'],
  });

export const rescheduleSchema = z
  .object({
    date: z.string().min(1, 'Select a date'),
    startTime: z.string().min(1, 'Start time is required'),
    endTime: z.string().min(1, 'End time is required'),
  })
  .refine((data) => data.endTime > data.startTime, {
    message: 'End time must be after start time',
    path: ['endTime'],
  });

export const reviewSchema = z.object({
  venue: z.string().min(1),
  rating: z.coerce.number().min(1).max(5),
  comment: z.string().min(10, 'Share a bit more detail (10+ chars)'),
});

export const teamMemberSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  role: z.string().min(1, 'Role is required'),
});
