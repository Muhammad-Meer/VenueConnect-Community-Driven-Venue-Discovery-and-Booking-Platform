import { format, formatDistanceToNow, isValid, parseISO } from 'date-fns';

export function formatCurrency(amount, currency = 'USD', locale = 'en-US') {
  const value = Number(amount) || 0;
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value);
}

export function formatNumber(value, locale = 'en-US') {
  return new Intl.NumberFormat(locale).format(Number(value) || 0);
}

export function toDate(value) {
  if (!value) return null;
  if (value instanceof Date) return isValid(value) ? value : null;
  const parsed = typeof value === 'string' ? parseISO(value) : new Date(value);
  return isValid(parsed) ? parsed : null;
}

export function formatDate(value, pattern = 'MMM d, yyyy') {
  const date = toDate(value);
  if (!date) return '—';
  return format(date, pattern);
}

export function formatDateTime(value) {
  return formatDate(value, 'MMM d, yyyy · h:mm a');
}

export function formatRelative(value) {
  const date = toDate(value);
  if (!date) return '—';
  return formatDistanceToNow(date, { addSuffix: true });
}

export function formatPercent(value, digits = 0) {
  return `${Number(value || 0).toFixed(digits)}%`;
}

export function formatCapacity(n) {
  if (!n) return 'Flexible';
  return `${formatNumber(n)} seats`;
}

export function formatRating(rating) {
  return Number(rating || 0).toFixed(1);
}

export function truncate(text, max = 100) {
  if (!text) return '';
  if (text.length <= max) return text;
  return `${text.slice(0, max).trim()}…`;
}

export function initials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || '')
    .join('');
}
