import { format, parseISO, isValid } from 'date-fns'

export function formatCurrency(amount, currency = 'PKR') {
  if (amount == null || Number.isNaN(Number(amount))) return '—'
  return `${currency} ${Number(amount).toLocaleString('en-PK')}`
}

export function formatDate(date, pattern = 'MMM d, yyyy') {
  if (!date) return '—'
  const value = typeof date === 'string' ? parseISO(date) : date
  if (!isValid(value)) return '—'
  return format(value, pattern)
}

export function formatDateTime(date) {
  return formatDate(date, 'MMM d, yyyy · h:mm a')
}

export function capitalize(str = '') {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
