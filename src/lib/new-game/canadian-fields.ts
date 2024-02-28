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
import { first } from '$lib/util/first';
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
  const loaded = loadSettings();

  return {
    type: CANADIAN,
    mainTimeSeconds: parseMainTimeSeconds(
      first(loaded.mainTimeSeconds, String(DEFAULT_MAIN_TIME_SECONDS))
    ),
    timePerPeriodSeconds: parseTimePerPeriodSeconds(
      first(loaded.timePerPeriodSeconds, String(DEFAULT_TIME_PER_PERIOD_SECONDS))
    ),
    stonesPerPeriod: parseStonesPerPeriod(
      first(loaded.stonesPerPeriod, String(DEFAULT_STONES_PER_PERIOD))
    )
  };
}
