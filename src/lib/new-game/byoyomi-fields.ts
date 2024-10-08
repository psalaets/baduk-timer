import {
  type ByoyomiClockSettings,
  parsePeriods,
  DEFAULT_MAIN_TIME,
  DEFAULT_MAIN_TIME_DURATION,
  DEFAULT_TIME_PER_PERIOD,
  DEFAULT_TIME_PER_PERIOD_DURATION,
  DEFAULT_PERIODS,
  loadSettings,
  parseMainTime,
  parseTimePerPeriod
} from '$lib/clock-settings/byoyomi-settings';
import { BYOYOMI } from '$lib/clock-settings/clock-type';
import { firstFullyPopulated } from '$lib/util/first';
import { getter } from './get-form-value';
import { byoyomiFromQueryParams } from '$lib/menu/share';
import { currentUrl } from '$lib/util/url';

export function parse(formData: FormData): ByoyomiClockSettings {
  const get = getter(formData);

  return {
    type: BYOYOMI,
    periods: parsePeriods(get('periods')),
    mainTime: {
      hours: Number(get('mainTimeHours')) ?? DEFAULT_MAIN_TIME_DURATION.hours,
      minutes: Number(get('mainTimeMinutes')) ?? DEFAULT_MAIN_TIME_DURATION.minutes,
      seconds: Number(get('mainTimeSeconds')) ?? DEFAULT_MAIN_TIME_DURATION.seconds
    },
    timePerPeriod: {
      hours: Number(get('timePerPeriodHours')) ?? DEFAULT_TIME_PER_PERIOD_DURATION.hours,
      minutes: Number(get('timePerPeriodMinutes')) ?? DEFAULT_TIME_PER_PERIOD_DURATION.minutes,
      seconds: Number(get('timePerPeriodSeconds')) ?? DEFAULT_TIME_PER_PERIOD_DURATION.seconds
    }
  };
}

export function getInitialValues(): ByoyomiClockSettings {
  const raw = firstFullyPopulated([
    byoyomiFromQueryParams(currentUrl().searchParams),
    loadSettings(),
    {
      type: BYOYOMI,
      mainTime: DEFAULT_MAIN_TIME,
      timePerPeriod: DEFAULT_TIME_PER_PERIOD,
      periods: String(DEFAULT_PERIODS)
    }
  ]);

  return {
    type: BYOYOMI,
    mainTime: parseMainTime(raw.mainTime),
    timePerPeriod: parseTimePerPeriod(raw.timePerPeriod),
    periods: parsePeriods(raw.periods)
  };
}
