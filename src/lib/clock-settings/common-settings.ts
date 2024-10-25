import { BYOYOMI, CANADIAN, FISCHER, type ClockType } from '$lib/clock-settings/clock-type';
import * as db from '$lib/util/localstorage';
import type { RawValues } from '$lib/util/raw-values';
import { clockSettingsKey } from '$lib/clock-settings/storage-key';

export type CommonSettings = {
  type: ClockType;
};

export const DEFAULT_TYPE: ClockType = BYOYOMI;

export function parseType(raw: string): ClockType {
  if (raw === BYOYOMI || raw === CANADIAN || raw === FISCHER) {
    return raw;
  } else {
    return DEFAULT_TYPE;
  }
}

export function saveSettings(settings: CommonSettings) {
  db.set(clockSettingsKey(['common', 'type']), settings.type);
}

export function loadSettings(): RawValues<CommonSettings> {
  return {
    type: db.get(clockSettingsKey(['common', 'type']), '')
  };
}
