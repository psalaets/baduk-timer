import { writable } from 'svelte/store';
import { load, save } from './app-settings';

export const appSettingsStore = writable(load(), (set) => {
  set(load());
});

// sync settings to localstorage
appSettingsStore.subscribe((settings) => {
  save(settings);
});
