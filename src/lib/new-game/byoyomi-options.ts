import {
  type ByoyomiClockSettings,
  parsePeriods,
  parseMainTimeSeconds,
  parseTimePerPeriodSeconds,
  DEFAULT_MAIN_TIME_SECONDS,
  DEFAULT_TIME_PER_PERIOD_SECONDS,
  DEFAULT_PERIODS,
  loadSettings
} from '$lib/clock-settings/byoyomi-settings';
import { BYOYOMI } from '$lib/clock-settings/clock-type';
import { first } from '$lib/util/first';
import * as db from '$lib/util/localstorage';
import { getter } from './get-form-value';

export { mainTimeOptions, timePerPeriodOptions } from '$lib/clock-settings/byoyomi-settings';

export function parse(formData: FormData): ByoyomiClockSettings {
  const get = getter(formData);

  return {
    type: BYOYOMI,
    periods: parsePeriods(get('periods')),
    mainTimeSeconds: parseMainTimeSeconds(get('mainTimeSeconds')),
    timePerPeriodSeconds: parseTimePerPeriodSeconds(get('timePerPeriodSeconds'))
  };
}

export function getInitialValues(): ByoyomiClockSettings {
  const loaded = loadSettings();

  return {
    type: BYOYOMI,
    mainTimeSeconds: parseMainTimeSeconds(
      first(loaded.mainTimeSeconds, String(DEFAULT_MAIN_TIME_SECONDS))
    ),
    timePerPeriodSeconds: parseTimePerPeriodSeconds(
      first(loaded.timePerPeriodSeconds, String(DEFAULT_TIME_PER_PERIOD_SECONDS))
    ),
    periods: parsePeriods(first(loaded.periods, String(DEFAULT_PERIODS)))
  };
}
