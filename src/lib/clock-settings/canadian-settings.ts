import { CANADIAN, type Canadian } from '$lib/clock-settings/clock-type';
import * as db from '$lib/util/localstorage';
import type { RawValues } from '$lib/util/raw-values';
import { clockSettingsKey } from '$lib/clock-settings/storage-key';
import { stringifyDuration, type Duration, parseDuration } from './duration';

export type CanadianClockSettings = {
  type: Canadian;
  mainTime: Duration;
  timePerPeriod: Duration;
  stonesPerPeriod: number;
};

export const DEFAULT_MAIN_TIME_DURATION: Duration = {
  hours: 0,
  minutes: 10,
  seconds: 0
};

export const DEFAULT_MAIN_TIME = stringifyDuration(DEFAULT_MAIN_TIME_DURATION);

export const DEFAULT_TIME_PER_PERIOD_DURATION: Duration = {
  hours: 0,
  minutes: 0,
  seconds: 30
};
export const DEFAULT_TIME_PER_PERIOD = stringifyDuration(DEFAULT_TIME_PER_PERIOD_DURATION);

export const DEFAULT_STONES_PER_PERIOD = 10;
const MIN_STONES_PER_PERIOD = 1;

export function parseMainTime(rawValue: string): Duration {
  return parseDuration(rawValue, DEFAULT_MAIN_TIME_DURATION);
}

export function parseTimePerPeriod(rawValue: string): Duration {
  return parseDuration(rawValue, DEFAULT_TIME_PER_PERIOD_DURATION);
}

export function parseStonesPerPeriod(rawValue: string): number {
  const isNumeric = rawValue.trim() !== '' && !isNaN(Number(rawValue));
  return isNumeric ? Math.max(MIN_STONES_PER_PERIOD, Number(rawValue)) : DEFAULT_STONES_PER_PERIOD;
}

export function saveSettings(settings: CanadianClockSettings) {
  db.set(clockSettingsKey(['canadian', 'mainTime']), stringifyDuration(settings.mainTime));
  db.set(
    clockSettingsKey(['canadian', 'timePerPeriod']),
    stringifyDuration(settings.timePerPeriod)
  );
  db.set(clockSettingsKey(['canadian', 'stonesPerPeriod']), settings.stonesPerPeriod);
}

// prettier-ignore
export function loadSettings(): RawValues<CanadianClockSettings> {
  return {
    type: CANADIAN,
    mainTime:        db.get(clockSettingsKey(['canadian', 'mainTime']), ''),
    timePerPeriod:   db.get(clockSettingsKey(['canadian', 'timePerPeriod']), ''),
    stonesPerPeriod: db.get(clockSettingsKey(['canadian', 'stonesPerPeriod']), '')
  };
}
