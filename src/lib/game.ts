import { derived, writable, get } from 'svelte/store';
import type { ClockSettings } from './timing/clock-settings';
import { create as createClock } from './timing/dual-clock';
import type { Color } from '$lib/color';

const gameSettings = writable<ClockSettings | null>(null);

const started = writable(false);

export const settings = {
  subscribe: gameSettings.subscribe,
  set(settings: ClockSettings) {
    gameSettings.set(settings);
  },
  clear() {
    gameSettings.set(null);
  }
};

const gameClock = derived([gameSettings], ([settings]) => {
  if (settings) {
    const clock = createClock(settings);
    return clock;
  } else {
    return null;
  }
});

const paused = writable(true);
paused.subscribe((isPaused) => {
  if (isPaused) {
    get(gameClock)?.pause();
  } else {
    get(gameClock)?.resume();
    started.set(true);
  }
});

settings.subscribe((s) => {
  started.set(false);
  paused.set(true);
});

const gameState = derived([gameClock, started, paused], ([clock, started, paused]) => {
  return {
    clock,
    started,
    paused
  };
});

export const game = {
  subscribe: gameState.subscribe,
  begin: () => paused.set(false),
  pause: () => paused.set(true),
  resume: () => paused.set(false),
  stonePlayed: (color: Color) => {
    if (!get(paused)) {
      get(gameClock)?.stonePlayed(color);
    }
  }
};
