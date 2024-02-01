import { derived, writable, get } from 'svelte/store';
import type { ClockSettings } from './timing/clock-settings';
import { create as createClock } from './timing/dual-clock';
import type { Color } from '$lib/color';

const gameSettings = writable<ClockSettings | null>(null);

export const settings = {
  subscribe: gameSettings.subscribe,
  set(settings: ClockSettings) {
    gameSettings.set(settings);
  },
  clear() {
    gameSettings.set(null);
  }
};

const started = writable(false);

const gameClock = derived([gameSettings], ([settings]) => {
  if (settings) {
    const clock = createClock(settings);
    return clock;
  } else {
    return null;
  }
});

const gameState = derived([gameClock, started], ([clock, started]) => {
  return {
    clock,
    started
  };
});

export const game = {
  subscribe: gameState.subscribe,
  begin: () => started.set(true),
  stonePlayed: (color: Color) => {
    get(gameClock)?.stonePlayed(color);
  }
};
