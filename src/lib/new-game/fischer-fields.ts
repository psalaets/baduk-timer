import { FISCHER } from '$lib/clock-settings/clock-type';
import {
  type FischerClockSettings,
  DEFAULT_INCREMENT,
  DEFAULT_INCREMENT_DURATION,
  DEFAULT_INITIAL_TIME,
  DEFAULT_INITIAL_TIME_DURATION,
  DEFAULT_MAX_TIME,
  DEFAULT_MAX_TIME_DURATION,
  parseIncrement,
  parseMaxTime,
  parseInitialTime,
  loadSettings
} from '$lib/clock-settings/fischer-settings';
import { firstFullyPopulated } from '$lib/util/first';
import { getter } from './get-form-value';
import { fischerFromQueryParams } from '$lib/menu/share';
import { currentUrl } from '$lib/util/url';
import { compare as compareDurations, parseDurationPart } from '$lib/clock-settings/duration';

export function parse(formData: FormData): FischerClockSettings {
  const get = getter(formData);

  const result: FischerClockSettings = {
    type: FISCHER,
    initialTime: {
      hours: parseDurationPart(get('initialTimeHours'), DEFAULT_INITIAL_TIME_DURATION.hours),
      minutes: parseDurationPart(get('initialTimeMinutes'), DEFAULT_INITIAL_TIME_DURATION.minutes),
      seconds: parseDurationPart(get('initialTimeSeconds'), DEFAULT_INITIAL_TIME_DURATION.seconds)
    },
    increment: {
      hours: parseDurationPart(get('incrementHours'), DEFAULT_INCREMENT_DURATION.hours),
      minutes: parseDurationPart(get('incrementMinutes'), DEFAULT_INCREMENT_DURATION.minutes),
      seconds: parseDurationPart(get('incrementSeconds'), DEFAULT_INCREMENT_DURATION.seconds)
    },
    maxTime: {
      hours: parseDurationPart(get('maxTimeHours'), DEFAULT_MAX_TIME_DURATION.hours),
      minutes: parseDurationPart(get('maxTimeMinutes'), DEFAULT_MAX_TIME_DURATION.minutes),
      seconds: parseDurationPart(get('maxTimeSeconds'), DEFAULT_MAX_TIME_DURATION.seconds)
    }
  };

  // Prevent max < initial
  if (compareDurations(result.maxTime, result.initialTime) < 0) {
    result.maxTime = result.initialTime;
  }

  return result;
}

export function getInitialValues(): FischerClockSettings {
  const raw = firstFullyPopulated([
    fischerFromQueryParams(currentUrl().searchParams),
    loadSettings(),
    {
      type: FISCHER,
      initialTime: String(DEFAULT_INITIAL_TIME),
      increment: String(DEFAULT_INCREMENT),
      maxTime: String(DEFAULT_MAX_TIME)
    }
  ]);

  return {
    type: FISCHER,
    initialTime: parseInitialTime(raw.initialTime),
    increment: parseIncrement(raw.increment),
    maxTime: parseMaxTime(raw.maxTime)
  };
}
