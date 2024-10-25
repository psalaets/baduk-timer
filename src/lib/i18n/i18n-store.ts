import { derived } from 'svelte/store';
import { appSettingsStore } from '$lib/app-settings-store';
import { english } from './en';
import { spanish } from './es';
import { defaultSettings, isSupportedLanguage, type Language } from '../app-settings';
import type { TranslationSet } from './translation-set';

const translations: Record<Language, TranslationSet> = {
  en: english,
  es: spanish
};

export const i18nStore = derived(appSettingsStore, ($appSettings) => {
  const language = isSupportedLanguage($appSettings.language)
    ? $appSettings.language
    : defaultSettings.language;
  return translations[language];
});
