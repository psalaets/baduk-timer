import { derived, writable, get } from 'svelte/store';
import type { ClockSettings } from './timing/clock-settings';
import { create as createClock, type GameClock } from './timing/dual-clock';
import type { Color } from '$lib/color';

const gameSettings = writable<ClockSettings | null>(null);

const started = writable(false);

export const settings = {
  subscribe: gameSettings.subscribe,
  newGame(settings: ClockSettings) {
    gameSettings.set(null);
    gameSettings.set(settings);
  },
  clear() {
    gameSettings.set(null);
  }
};

/**
 * Need to cache previous value and only update if new value is not equal
 * to previous value. The equals check should be a function.
 */
const settingsEqual = (current: ClockSettings, prev: ClockSettings | null) => {
  if (prev == null) return false;

  if (current.type !== prev.type) return false;
  if (current.mainTimeSeconds !== prev.mainTimeSeconds) return false;
  if (current.periods !== prev.periods) return false;
  if (current.timePerPeriodSeconds !== prev.timePerPeriodSeconds) return false;

  return true;
};

let previousSettings: ClockSettings | null = null;
const gameClock = derived<typeof gameSettings, GameClock | null>(
  gameSettings,
  (settings, set) => {
    if (settings) {
      if (!settingsEqual(settings, previousSettings)) {
        const clock = createClock(settings);
        set(clock);
      }
    } else {
      set(null);
    }

    previousSettings = settings;
  },
  null
);

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
