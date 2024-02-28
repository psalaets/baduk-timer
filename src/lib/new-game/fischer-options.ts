import { FISCHER } from '$lib/clock-settings/clock-type';
import {
  type FischerClockSettings,
  DEFAULT_INCREMENT_SECONDS,
  DEFAULT_INITIAL_TIME_SECONDS,
  DEFAULT_MAX_TIME_SECONDS,
  parseIncrementSeconds,
  parseMaxSeconds,
  parseInitialTimeSeconds,
  loadSettings
} from '$lib/clock-settings/fischer-settings';
import { first } from '$lib/util/first';
import { getter } from './get-form-value';

export {
  initialTimeOptions,
  incrementOptions,
  maxTimeOptions
} from '$lib/clock-settings/fischer-settings';

export function parse(formData: FormData): FischerClockSettings {
  const get = getter(formData);

  const result: FischerClockSettings = {
    type: FISCHER,
    initialSeconds: parseInitialTimeSeconds(get('initialTimeSeconds')),
    incrementSeconds: parseIncrementSeconds(get('incrementSeconds')),
    maxSeconds: parseMaxSeconds(get('maxTimeSeconds'))
  };

  // Ensure max >= initial
  result.maxSeconds = Math.max(result.maxSeconds, result.initialSeconds);

  return result;
}

export function getInitialValues(): FischerClockSettings {
  const loaded = loadSettings();

  return {
    type: FISCHER,
    initialSeconds: parseInitialTimeSeconds(
      first(loaded.initialSeconds, String(DEFAULT_INITIAL_TIME_SECONDS))
    ),
    incrementSeconds: parseIncrementSeconds(
      first(loaded.incrementSeconds, String(DEFAULT_INCREMENT_SECONDS))
    ),
    maxSeconds: parseMaxSeconds(first(loaded.maxSeconds, String(DEFAULT_MAX_TIME_SECONDS)))
  };
}
