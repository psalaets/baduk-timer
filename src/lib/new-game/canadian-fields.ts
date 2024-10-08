import {
  type CanadianClockSettings,
  parseStonesPerPeriod,
  DEFAULT_MAIN_TIME,
  DEFAULT_MAIN_TIME_DURATION,
  DEFAULT_STONES_PER_PERIOD,
  DEFAULT_TIME_PER_PERIOD_DURATION,
  DEFAULT_TIME_PER_PERIOD,
  loadSettings,
  parseMainTime,
  parseTimePerPeriod
} from '$lib/clock-settings/canadian-settings';
import { CANADIAN } from '$lib/clock-settings/clock-type';
import { canadianFromQueryParams } from '$lib/menu/share';
import { firstFullyPopulated } from '$lib/util/first';
import { currentUrl } from '$lib/util/url';
import { getter } from './get-form-value';

export function parse(formData: FormData): CanadianClockSettings {
  const get = getter(formData);

  return {
    type: CANADIAN,
    mainTime: {
      hours: Number(get('mainTimeHours')) ?? DEFAULT_MAIN_TIME_DURATION.hours,
      minutes: Number(get('mainTimeMinutes')) ?? DEFAULT_MAIN_TIME_DURATION.minutes,
      seconds: Number(get('mainTimeSeconds')) ?? DEFAULT_MAIN_TIME_DURATION.seconds
    },
    timePerPeriod: {
      hours: Number(get('timePerPeriodHours')) ?? DEFAULT_TIME_PER_PERIOD_DURATION.hours,
      minutes: Number(get('timePerPeriodMinutes')) ?? DEFAULT_TIME_PER_PERIOD_DURATION.minutes,
      seconds: Number(get('timePerPeriodSeconds')) ?? DEFAULT_TIME_PER_PERIOD_DURATION.seconds
    },
    stonesPerPeriod: parseStonesPerPeriod(get('stonesPerPeriod'))
  };
}

export function getInitialValues(): CanadianClockSettings {
  const raw = firstFullyPopulated([
    canadianFromQueryParams(currentUrl().searchParams),
    loadSettings(),
    {
      type: CANADIAN,
      mainTime: DEFAULT_MAIN_TIME,
      timePerPeriod: DEFAULT_TIME_PER_PERIOD,
      stonesPerPeriod: String(DEFAULT_STONES_PER_PERIOD)
    }
  ]);

  return {
    type: CANADIAN,
    mainTime: parseMainTime(raw.mainTime),
    timePerPeriod: parseTimePerPeriod(raw.timePerPeriod),
    stonesPerPeriod: parseStonesPerPeriod(raw.stonesPerPeriod)
  };
}
