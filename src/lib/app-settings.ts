import * as db from '$lib/util/localstorage';

export type AppSettings = {
  sound: boolean;
};

export const defaultSettings: AppSettings = {
  sound: true
};

export function save(settings: AppSettings) {
  db.set(['app-settings', 'sound'], String(settings.sound));
}

export function load(): AppSettings {
  return {
    sound: db.get(['app-settings', 'sound'], String(defaultSettings.sound)) === 'true'
  };
}
