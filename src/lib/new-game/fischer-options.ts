import { FISCHER } from '$lib/timing/clock-type';
import type { FischerClockSettings } from '$lib/timing/fischer';
import { first } from '$lib/util/first';
import * as db from '$lib/util/localstorage';
import { getter } from './get-form-value';

export const DEFAULT_INITIAL_TIME_SECONDS = 60 * 2;
export const DEFAULT_INCREMENT_SECONDS = 30;
export const DEFAULT_MAX_TIME_SECONDS = 60 * 5;

export const initialTimeOptions = [
  { value: '30', display: '30 seconds' },
  { value: '35', display: '35 seconds' },
  { value: '40', display: '40 seconds' },
  { value: '45', display: '45 seconds' },
  { value: '50', display: '50 seconds' },
  { value: '55', display: '55 seconds' },
  { value: '60', display: '1 minute' },
  { value: '70', display: '1 minute 10 seconds' },
  { value: '80', display: '1 minute 20 seconds' },
  { value: '90', display: '1 minute 30 seconds' },
  { value: '105', display: '1 minute 45 seconds' },
  { value: '120', display: '2 minutes' },
  { value: '150', display: '2 minutes 30 seconds' },
  { value: '180', display: '3 minutes' },
  { value: '210', display: '3 minutes 30 seconds' },
  { value: '240', display: '4 minutes' },
  { value: '270', display: '4 minutes 30 seconds' },
  { value: '300', display: '5 minutes' },
  { value: '360', display: '6 minutes' },
  { value: '420', display: '7 minutes' },
  { value: '480', display: '8 minutes' },
  { value: '540', display: '9 minutes' },
  { value: '600', display: '10 minutes' },
  { value: '720', display: '12 minutes' },
  { value: '900', display: '15 minutes' },
  { value: '1200', display: '20 minutes' },
  { value: '1500', display: '25 minutes' },
  { value: '1800', display: '30 minutes' },
  { value: '2100', display: '35 minutes' },
  { value: '2400', display: '40 minutes' },
  { value: '2700', display: '45 minutes' },
  { value: '3000', display: '50 minutes' },
  { value: '3300', display: '55 minutes' },
  { value: '3600', display: '1 hour' },
  { value: '4200', display: '1 hour 10 minutes' },
  { value: '4800', display: '1 hour 20 minutes' },
  { value: '5400', display: '1 hour 30 minutes' },
  { value: '6000', display: '1 hour 40 minutes' },
  { value: '6600', display: '1 hour 50 minutes' },
  { value: '7200', display: '2 hours' },
  { value: '8100', display: '2 hours 15 minutes' },
  { value: '9000', display: '2 hours 30 minutes' },
  { value: '9900', display: '2 hours 45 minutes' },
  { value: '10800', display: '3 hours' },
  { value: '12600', display: '3 hours 30 minutes' },
  { value: '14400', display: '4 hours' }
] as const;

export const incrementOptions = [
  { value: '10', display: '10 seconds' },
  { value: '12', display: '12 seconds' },
  { value: '15', display: '15 seconds' },
  { value: '20', display: '20 seconds' },
  { value: '25', display: '25 seconds' },
  { value: '30', display: '30 seconds' },
  { value: '35', display: '35 seconds' },
  { value: '40', display: '40 seconds' },
  { value: '45', display: '45 seconds' },
  { value: '50', display: '50 seconds' },
  { value: '55', display: '55 seconds' },
  { value: '60', display: '1 minute' },
  { value: '70', display: '1 minute 10 seconds' },
  { value: '80', display: '1 minute 20 seconds' },
  { value: '90', display: '1 minute 30 seconds' },
  { value: '105', display: '1 minute 45 seconds' },
  { value: '120', display: '2 minutes' },
  { value: '150', display: '2 minutes 30 seconds' },
  { value: '180', display: '3 minutes' },
  { value: '210', display: '3 minutes 30 seconds' },
  { value: '240', display: '4 minutes' },
  { value: '270', display: '4 minutes 30 seconds' },
  { value: '300', display: '5 minutes' },
  { value: '360', display: '6 minutes' },
  { value: '420', display: '7 minutes' },
  { value: '480', display: '8 minutes' },
  { value: '540', display: '9 minutes' },
  { value: '600', display: '10 minutes' },
  { value: '720', display: '12 minutes' },
  { value: '900', display: '15 minutes' },
  { value: '1200', display: '20 minutes' },
  { value: '1500', display: '25 minutes' },
  { value: '1800', display: '30 minutes' }
] as const;

export const maxTimeOptions = [
  { value: '30', display: '30 seconds' },
  { value: '35', display: '35 seconds' },
  { value: '40', display: '40 seconds' },
  { value: '45', display: '45 seconds' },
  { value: '50', display: '50 seconds' },
  { value: '55', display: '55 seconds' },
  { value: '60', display: '1 minute' },
  { value: '70', display: '1 minute 10 seconds' },
  { value: '80', display: '1 minute 20 seconds' },
  { value: '90', display: '1 minute 30 seconds' },
  { value: '105', display: '1 minute 45 seconds' },
  { value: '120', display: '2 minutes' },
  { value: '150', display: '2 minutes 30 seconds' },
  { value: '180', display: '3 minutes' },
  { value: '210', display: '3 minutes 30 seconds' },
  { value: '240', display: '4 minutes' },
  { value: '270', display: '4 minutes 30 seconds' },
  { value: '300', display: '5 minutes' },
  { value: '360', display: '6 minutes' },
  { value: '420', display: '7 minutes' },
  { value: '480', display: '8 minutes' },
  { value: '540', display: '9 minutes' },
  { value: '600', display: '10 minutes' },
  { value: '720', display: '12 minutes' },
  { value: '900', display: '15 minutes' },
  { value: '1200', display: '20 minutes' },
  { value: '1500', display: '25 minutes' },
  { value: '1800', display: '30 minutes' },
  { value: '2100', display: '35 minutes' },
  { value: '2400', display: '40 minutes' },
  { value: '2700', display: '45 minutes' },
  { value: '3000', display: '50 minutes' },
  { value: '3300', display: '55 minutes' },
  { value: '3600', display: '1 hour' },
  { value: '4200', display: '1 hour 10 minutes' },
  { value: '4800', display: '1 hour 20 minutes' },
  { value: '5400', display: '1 hour 30 minutes' },
  { value: '6000', display: '1 hour 40 minutes' },
  { value: '6600', display: '1 hour 50 minutes' },
  { value: '7200', display: '2 hours' },
  { value: '8100', display: '2 hours 15 minutes' },
  { value: '9000', display: '2 hours 30 minutes' },
  { value: '9900', display: '2 hours 45 minutes' },
  { value: '10800', display: '3 hours' },
  { value: '12600', display: '3 hours 30 minutes' },
  { value: '14400', display: '4 hours' }
] as const;

export function parse(formData: FormData): FischerClockSettings {
  const get = getter(formData);

  const rawValues = {
    type: FISCHER,
    initialSeconds: get('initialTimeSeconds'),
    incrementSeconds: get('incrementSeconds'),
    maxSeconds: get('maxTimeSeconds')
  };

  const result: FischerClockSettings = {
    type: FISCHER,
    initialSeconds: parseInitialTimeSeconds(rawValues.initialSeconds),
    incrementSeconds: parseIncrementSeconds(rawValues.incrementSeconds),
    maxSeconds: parseMaxSeconds(rawValues.maxSeconds)
  };

  // Prevent max < initial
  result.maxSeconds = Math.max(result.maxSeconds, result.initialSeconds);

  return result;
}

function parseInitialTimeSeconds(rawValue: string): number {
  const specifiedOption = initialTimeOptions.find((o) => o.value === rawValue);
  const option = specifiedOption ?? defaultInitialTimeOption();

  return Number(option.value);
}

export function defaultInitialTimeOption() {
  const option = initialTimeOptions.find(
    (opt) => opt.value === String(DEFAULT_INITIAL_TIME_SECONDS)
  );

  if (!option) {
    throw new Error(`Default initial time (${DEFAULT_INITIAL_TIME_SECONDS} seconds) not found`);
  }

  return option;
}

function parseIncrementSeconds(rawValue: string): number {
  const specifiedOption = incrementOptions.find((o) => o.value === rawValue);
  const option = specifiedOption ?? defaultIncrementOption();

  return Number(option.value);
}

export function defaultIncrementOption() {
  const option = incrementOptions.find((opt) => opt.value === String(DEFAULT_INCREMENT_SECONDS));

  if (!option) {
    throw new Error(`Default increment (${DEFAULT_INCREMENT_SECONDS} seconds) not found`);
  }

  return option;
}

function parseMaxSeconds(rawValue: string): number {
  const specifiedOption = maxTimeOptions.find((o) => o.value === rawValue);
  const option = specifiedOption ?? defaultMaxTimeOption();

  return Number(option.value);
}

export function defaultMaxTimeOption() {
  const option = maxTimeOptions.find((opt) => opt.value === String(DEFAULT_MAX_TIME_SECONDS));

  if (!option) {
    throw new Error(`Default max time (${DEFAULT_MAX_TIME_SECONDS} seconds) not found`);
  }

  return option;
}

export function saveSettings(settings: FischerClockSettings) {
  db.set('newGame.fischer.initialTime', settings.initialSeconds);
  db.set('newGame.fischer.increment', settings.incrementSeconds);
  db.set('newGame.fischer.maxTime', settings.maxSeconds);
}

export function getInitialValues(): FischerClockSettings {
  return {
    type: FISCHER,
    initialSeconds: parseInitialTimeSeconds(
      first(db.get('newGame.fischer.initialTime', ''), String(DEFAULT_INITIAL_TIME_SECONDS))
    ),
    incrementSeconds: parseIncrementSeconds(
      first(db.get('newGame.fischer.increment', ''), String(DEFAULT_INCREMENT_SECONDS))
    ),
    maxSeconds: parseMaxSeconds(
      first(db.get('newGame.fischer.maxTime', ''), String(DEFAULT_MAX_TIME_SECONDS))
    )
  };
}
