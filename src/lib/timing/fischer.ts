import { derived, writable } from 'svelte/store';
import { createDefaultTicker } from './ticker';
import { createCountdown } from './countdown';
import type { Clock } from './clock';
import { FISCHER, type Fischer } from '$lib/clock-settings/clock-type';
import { type FischerClockSettings } from '$lib/clock-settings/fischer-settings';
import { toSeconds } from '$lib/clock-settings/duration';

export type FischerClock = Clock<FischerState>;

export type FischerState = {
  type: Fischer;
  countdown: number;
  timeout: boolean;
};

export const createFischer = (
  settings: FischerClockSettings,
  createTicker = createDefaultTicker
): Clock<FischerState> => {
  const { initialTime, increment, maxTime } = settings;

  const countdown = createCountdown(toSeconds(initialTime), createTicker);
  const timeout = writable(false);

  const state = derived([countdown, timeout], ([c, t]) => {
    return {
      type: FISCHER,
      countdown: c,
      timeout: t
    };
  });

  countdown.subscribe((seconds) => {
    if (seconds === 0) {
      timeout.set(true);
    }
  });

  return {
    subscribe: state.subscribe,
    play: countdown.play,
    pause: countdown.pause,
    playedStone() {
      countdown.pause();
      countdown.add(toSeconds(increment), toSeconds(maxTime));
    },
    opponentPlayedStone() {
      countdown.play();
    }
  };
};
