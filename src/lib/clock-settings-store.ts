import { writable, derived } from 'svelte/store';
import { type ClockSettings } from './clock-settings/clock-settings';
import { createGame, type Game } from './game';

export const clockSettingsStore = writable<ClockSettings>();
