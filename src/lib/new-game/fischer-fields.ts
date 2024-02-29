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
import { firstFullyPopulated } from '$lib/util/first';
import { getter } from './get-form-value';
import { fischerFromQueryParams } from '$lib/menu/share';
import { currentUrl } from '$lib/util/url';

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
  const query = fischerFromQueryParams(currentUrl().searchParams);

  const raw = firstFullyPopulated([
    loadSettings(),
    fischerFromQueryParams(currentUrl().searchParams),
    {
      type: FISCHER,
      initialSeconds: String(DEFAULT_INITIAL_TIME_SECONDS),
      incrementSeconds: String(DEFAULT_INCREMENT_SECONDS),
      maxSeconds: String(DEFAULT_MAX_TIME_SECONDS)
    }
  ]);

  return {
    type: FISCHER,
    initialSeconds: parseInitialTimeSeconds(raw.initialSeconds),
    incrementSeconds: parseIncrementSeconds(raw.incrementSeconds),
    maxSeconds: parseMaxSeconds(raw.maxSeconds)
  };
}
