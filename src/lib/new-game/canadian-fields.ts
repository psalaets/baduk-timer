import {
  type CanadianClockSettings,
  parseMainTimeSeconds,
  parseStonesPerPeriod,
  parseTimePerPeriodSeconds,
  DEFAULT_MAIN_TIME_SECONDS,
  DEFAULT_STONES_PER_PERIOD,
  DEFAULT_TIME_PER_PERIOD_SECONDS,
  loadSettings
} from '$lib/clock-settings/canadian-settings';
import { CANADIAN } from '$lib/clock-settings/clock-type';
import { canadianFromQueryParams } from '$lib/menu/share';
import { firstFullyPopulated } from '$lib/util/first';
import { currentUrl } from '$lib/util/url';
import { mainTimeOptions as byoyomiMainTimeOptions } from './byoyomi-fields';
import { getter } from './get-form-value';

export { mainTimeOptions, timePerPeriodOptions } from '$lib/clock-settings/canadian-settings';

export function parse(formData: FormData): CanadianClockSettings {
  const get = getter(formData);

  return {
    type: CANADIAN,
    mainTimeSeconds: parseMainTimeSeconds(get('mainTimeSeconds')),
    timePerPeriodSeconds: parseTimePerPeriodSeconds(get('timePerPeriodSeconds')),
    stonesPerPeriod: parseStonesPerPeriod(get('stonesPerPeriod'))
  };
}

export function getInitialValues(): CanadianClockSettings {
  const raw = firstFullyPopulated([
    loadSettings(),
    canadianFromQueryParams(currentUrl().searchParams),
    {
      type: CANADIAN,
      mainTimeSeconds: String(DEFAULT_MAIN_TIME_SECONDS),
      timePerPeriodSeconds: String(DEFAULT_TIME_PER_PERIOD_SECONDS),
      stonesPerPeriod: String(DEFAULT_STONES_PER_PERIOD)
    }
  ]);

  return {
    type: CANADIAN,
    mainTimeSeconds: parseMainTimeSeconds(raw.mainTimeSeconds),
    timePerPeriodSeconds: parseTimePerPeriodSeconds(raw.timePerPeriodSeconds),
    stonesPerPeriod: parseStonesPerPeriod(raw.timePerPeriodSeconds)
  };
}
