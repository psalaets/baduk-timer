import * as db from '$lib/util/localstorage';

// Don't need translation lookups here because every language name should be in its own language
export const supportedLanguages = [
  {
    name: 'English',
    id: 'en'
  } as const,
  {
    name: 'Español',
    id: 'es'
  } as const
] as const;

export type Language = (typeof supportedLanguages)[number]['id'];

export type AppSettings = {
  sound: boolean;
  language: string;
};

export function isSupportedLanguage(id: unknown): id is Language {
  return supportedLanguages.some((lang) => lang.id === id);
}

export function isLanguageSet() {
  const language = db.get(['app-settings', 'language'], '');
  return isSupportedLanguage(language);
}

export function toLanguage(val: unknown): Language {}

export const defaultSettings = {
  sound: true,
  language: 'en' as Language
} satisfies AppSettings;

export function save(settings: AppSettings) {
  db.set(['app-settings', 'sound'], String(settings.sound));
  db.set(['app-settings', 'language'], settings.language);
}

export function load(): AppSettings {
  const language = db.get(['app-settings', 'language'], '');

  return {
    sound: db.get(['app-settings', 'sound'], String(defaultSettings.sound)) === 'true',
    language: isSupportedLanguage(language) ? language : ''
  };
}
