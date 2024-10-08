import { BYOYOMI, type Byoyomi } from '$lib/clock-settings/clock-type';
import type { RawValues } from '$lib/util/raw-values';
import * as db from '$lib/util/localstorage';
import { clockSettingsKey } from '$lib/clock-settings/storage-key';
import { type Duration, parseDuration as parseDuration, stringifyDuration } from './duration';

export type ByoyomiClockSettings = {
  type: Byoyomi;
  mainTime: Duration;
  periods: number;
  timePerPeriod: Duration;
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

export const DEFAULT_PERIODS = 5;
const MIN_PERIODS = 0;

export function parsePeriods(rawValue: string): number {
  const isNumeric = rawValue.trim() !== '' && !isNaN(Number(rawValue));
  return isNumeric ? Math.max(MIN_PERIODS, Number(rawValue)) : DEFAULT_PERIODS;
}

export function parseMainTime(rawValue: string): Duration {
  return parseDuration(rawValue, DEFAULT_MAIN_TIME_DURATION);
}

export function parseTimePerPeriod(rawValue: string): Duration {
  return parseDuration(rawValue, DEFAULT_TIME_PER_PERIOD_DURATION);
}

export function saveSettings(settings: ByoyomiClockSettings) {
  db.set(clockSettingsKey(['byoyomi', 'mainTime']), stringifyDuration(settings.mainTime));
  db.set(clockSettingsKey(['byoyomi', 'timePerPeriod']), stringifyDuration(settings.timePerPeriod));
  db.set(clockSettingsKey(['byoyomi', 'periods']), settings.periods);
}

// prettier-ignore
export function loadSettings(): RawValues<ByoyomiClockSettings> {
  return {
    type: BYOYOMI,
    mainTime:      db.get(clockSettingsKey(['byoyomi', 'mainTime']), ''),
    timePerPeriod: db.get(clockSettingsKey(['byoyomi', 'timePerPeriod']), ''),
    periods:       db.get(clockSettingsKey(['byoyomi', 'periods']), '')
  };
}
