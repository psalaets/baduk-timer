import { derived, writable } from 'svelte/store';
import { createDefaultTicker } from './ticker';
import { createCountdown } from './countdown';

export type FischerClockSettings = {
  type: 'fischer';
  initialSeconds: number;
  incrementSeconds: number;
  maxSeconds: number;
};

export const createFischer = (
  settings: FischerClockSettings,
  createTicker = createDefaultTicker
) => {
  const { initialSeconds, incrementSeconds, maxSeconds } = settings;

  const countdown = createCountdown(initialSeconds, createTicker);
  const timeout = writable(false);

  const data = derived([countdown, timeout], ([c, t]) => {
    return {
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
    subscribe: data.subscribe,
    play: countdown.play,
    pause: countdown.pause,
    playedStone() {
      countdown.pause();
      countdown.add(incrementSeconds, maxSeconds);
    },
    opponentPlayedStone() {
      countdown.play();
    }
  };
};
