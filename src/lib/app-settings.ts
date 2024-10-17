import * as db from '$lib/util/localstorage';

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

type Language = (typeof supportedLanguages)[number]['id'];

export function toLanguage(id: unknown): Language {
  return isSupportedLanguage(id) ? id : defaultSettings.language;
}

function isSupportedLanguage(id: unknown): id is Language {
  return supportedLanguages.some((lang) => lang.id === id);
}

export type AppSettings = {
  sound: boolean;
  language: Language;
};

export const defaultSettings = {
  sound: true,
  language: 'en' as const
} satisfies AppSettings;

export function save(settings: AppSettings) {
  db.set(['app-settings', 'sound'], String(settings.sound));
  db.set(['app-settings', 'language'], settings.language);
}

export function load(): AppSettings {
  const rawLang = db.get(['app-settings', 'language'], defaultSettings.language);
  const language = isSupportedLanguage(rawLang) ? rawLang : defaultSettings.language;

  return {
    sound: db.get(['app-settings', 'sound'], String(defaultSettings.sound)) === 'true',
    language
  };
}
