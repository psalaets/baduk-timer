import * as db from '$lib/util/localstorage';
import { FISCHER, type Fischer } from '$lib/clock-settings/clock-type';
import type { RawValues } from '$lib/util/raw-values';
import { clockSettingsKey } from '$lib/clock-settings/storage-key';
import { stringifyDuration, type Duration, parseDuration } from './duration';

export type FischerClockSettings = {
  type: Fischer;
  initialTime: Duration;
  increment: Duration;
  maxTime: Duration;
};

export const DEFAULT_INITIAL_TIME_DURATION: Duration = {
  hours: 0,
  minutes: 2,
  seconds: 0
};
export const DEFAULT_INITIAL_TIME = stringifyDuration(DEFAULT_INITIAL_TIME_DURATION);

export const DEFAULT_INCREMENT_DURATION: Duration = {
  hours: 0,
  minutes: 0,
  seconds: 30
};
export const DEFAULT_INCREMENT = stringifyDuration(DEFAULT_INCREMENT_DURATION);

export const DEFAULT_MAX_TIME_DURATION: Duration = {
  hours: 0,
  minutes: 5,
  seconds: 0
};
export const DEFAULT_MAX_TIME = stringifyDuration(DEFAULT_MAX_TIME_DURATION);

export function parseInitialTime(rawValue: string): Duration {
  return parseDuration(rawValue, DEFAULT_INITIAL_TIME_DURATION);
}

export function parseIncrement(rawValue: string): Duration {
  return parseDuration(rawValue, DEFAULT_INCREMENT_DURATION);
}

export function parseMaxTime(rawValue: string): Duration {
  return parseDuration(rawValue, DEFAULT_MAX_TIME_DURATION);
}

export function saveSettings(settings: FischerClockSettings) {
  db.set(clockSettingsKey(['fischer', 'initialTime']), stringifyDuration(settings.initialTime));
  db.set(clockSettingsKey(['fischer', 'increment']), stringifyDuration(settings.increment));
  db.set(clockSettingsKey(['fischer', 'maxTime']), stringifyDuration(settings.maxTime));
}

// prettier-ignore
export function loadSettings(): RawValues<FischerClockSettings> {
  return {
    type: FISCHER,
    initialTime: db.get(clockSettingsKey(['fischer', 'initialTime']), ''),
    increment:   db.get(clockSettingsKey(['fischer', 'increment']), ''),
    maxTime:     db.get(clockSettingsKey(['fischer', 'maxTime']), '')
  };
}
