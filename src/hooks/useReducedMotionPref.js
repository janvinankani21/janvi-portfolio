import { useMediaQuery } from './useMediaQuery';

export function useReducedMotionPref() {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}
