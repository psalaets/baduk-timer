import { derived } from 'svelte/store';
import { type ClockSettings } from './clock-settings/clock-settings';
import { clockSettingsStore } from './clock-settings-store';
import { createGame, type Game } from './game';

let lastClockSettings: ClockSettings | null = null;

export const gameStore = derived<typeof clockSettingsStore, Game>(
  clockSettingsStore,
  (clockSettings, set) => {
    if (clockSettings && clockSettings !== lastClockSettings) {
      const game = createGame(clockSettings);
      set(game);

      // Remember new settings for next time
      lastClockSettings = clockSettings;
    }
  }
);
