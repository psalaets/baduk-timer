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
import { firstFullyPopulated } from '$lib/util/first';
import { getter } from './get-form-value';
import { byoyomiFromQueryParams } from '$lib/menu/share';
import { currentUrl } from '$lib/util/url';

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
  const raw = firstFullyPopulated([
    byoyomiFromQueryParams(currentUrl().searchParams),
    loadSettings(),
    {
      type: BYOYOMI,
      mainTimeSeconds: String(DEFAULT_MAIN_TIME_SECONDS),
      timePerPeriodSeconds: String(DEFAULT_TIME_PER_PERIOD_SECONDS),
      periods: String(DEFAULT_PERIODS)
    }
  ]);

  console.log('raw', raw);

  return {
    type: BYOYOMI,
    mainTimeSeconds: parseMainTimeSeconds(raw.mainTimeSeconds),
    timePerPeriodSeconds: parseTimePerPeriodSeconds(raw.timePerPeriodSeconds),
    periods: parsePeriods(raw.periods)
  };
}
