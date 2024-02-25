import { derived, writable, get } from 'svelte/store';
import { type ClockSettings, settingsEqual } from './timing/clock-settings';
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

let previousSettings: ClockSettings | null = null;
const gameClock = derived<typeof gameSettings, GameClock | null>(
  gameSettings,
  (settings, set) => {
    if (settings) {
      /**
       * Only update if new value is not deep equal to previous value.
       *
       * This callback can fire when a component mounts that subscribes to game
       * clock store, which in turn subscribes to settings store, and svelte
       * stores fire one time when subscribed to.
       *
       * Without this deep equals check, the extra settings callback firing
       * causes an existing game clock to get overwritten with a new game clock.
       *
       * Clicking cancel button from new game form is an example of this.
       */
      if (previousSettings == null || !settingsEqual(settings, previousSettings)) {
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
