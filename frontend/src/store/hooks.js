import { useDispatch, useSelector } from 'react-redux';

/**
 * Typed-style Redux hooks for the VenueHub store.
 * Prefer these over raw useDispatch / useSelector for consistency.
 */
export const useAppDispatch = () => useDispatch();

/**
 * @template T
 * @param {(state: import('./index').RootState) => T} selector
 * @param {(left: T, right: T) => boolean} [equalityFn]
 * @returns {T}
 */
export function useAppSelector(selector, equalityFn) {
  return useSelector(selector, equalityFn);
}

export default useAppSelector;
