/**
 * Merge class names, filtering out falsy values.
 * Lightweight alternative to clsx for Tailwind class composition.
 */
export function cn(...classes) {
  return classes
    .flat(Infinity)
    .filter((value) => typeof value === 'string' && value.length > 0)
    .join(' ')
}
