import { readable } from 'svelte/store';

/**
 * Store that watches document visibility.
 */
export const visibility = readable(true, (set) => {
  const onChange = () => {
    set(document.visibilityState === 'visible');
  };

  document.addEventListener('visibilitychange', onChange);
  return () => document.removeEventListener('visibilitychange', onChange);
});
