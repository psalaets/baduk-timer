import { writable } from 'svelte/store';

export type AppSettings = {
  sound: boolean;
};

const defaultSettings: AppSettings = {
  sound: true
};

export const appSettingsStore = writable(defaultSettings);
