import { differenceInHours, parse, isAfter, isBefore, startOfDay } from 'date-fns';

export function calcHours(startTime, endTime) {
  if (!startTime || !endTime) return 1;
  try {
    const base = new Date();
    const start = parse(startTime, 'HH:mm', base);
    const end = parse(endTime, 'HH:mm', base);
    const hours = differenceInHours(end, start);
    return hours > 0 ? hours : 1;
  } catch {
    return 1;
  }
}

export function calcTotal(pricePerHour, startTime, endTime) {
  return (Number(pricePerHour) || 0) * calcHours(startTime, endTime);
}

export function isUpcoming(dateValue) {
  const date = new Date(dateValue);
  return isAfter(date, startOfDay(new Date())) || date.toDateString() === new Date().toDateString();
}

export function isPast(dateValue) {
  const date = new Date(dateValue);
  return isBefore(date, startOfDay(new Date()));
}

export function canCancel(booking) {
  if (!booking) return false;
  if (['cancelled', 'completed', 'rejected'].includes(booking.status)) return false;
  return isUpcoming(booking.date);
}

export function canReschedule(booking) {
  return canCancel(booking) && booking.status !== 'pending';
}

export function generateTimeSlots(start = 8, end = 20, step = 1) {
  const slots = [];
  for (let h = start; h <= end; h += step) {
    slots.push(`${String(h).padStart(2, '0')}:00`);
  }
  return slots;
}
