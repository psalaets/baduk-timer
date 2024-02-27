import { writable, derived } from 'svelte/store';
import type { Readable } from 'svelte/store';
import type { CreateTicker } from './ticker';

export type Countdown = Readable<number> & {
  /**
   * @param seconds Reset countdown to this many seconds
   */
  set: (seconds: number) => void;
  /**
   * Add time.
   */
  add: (additionalSeconds: number, maxSeconds?: number) => void;
  /** Stop the countdown */
  pause: () => void;
  /** Start the countdown */
  play: () => void;
};

/**
 * Creates readable store for a quantity of time that ticks down to zero.
 *
 * @param initialSeconds How many seconds to count down from
 * @param createTicker
 */
export const createCountdown = (initialSeconds: number, createTicker: CreateTicker): Countdown => {
  const ticker = createTicker(100, onTick);

  const remainingMs = writable(initialSeconds * 1000, () => {
    return () => ticker.stop();
  });

  const remainingSeconds = derived(remainingMs, (ms) => Math.trunc(ms / 1000));

  function onTick(elapsedMs: number) {
    remainingMs.update((ms) => {
      // Prevent negative time values
      return Math.max(0, ms - elapsedMs);
    });
  }

  const toMillis = (seconds: number) => seconds * 1000;

  return {
    subscribe: remainingSeconds.subscribe,
    set(seconds) {
      remainingMs.set(toMillis(seconds));
    },
    add(additionalSeconds, maxSeconds) {
      remainingMs.update((ms) => {
        const maxMs = maxSeconds != null ? toMillis(maxSeconds) : Number.POSITIVE_INFINITY;
        const newMs = ms + toMillis(additionalSeconds);

        return Math.min(newMs, maxMs);
      });
    },
    pause: () => ticker.stop(),
    play: () => ticker.start()
  };
};
