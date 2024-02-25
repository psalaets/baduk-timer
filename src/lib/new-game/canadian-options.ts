import type { RawValues } from '$lib/new-game/raw-values';
import type { CanadianClockSettings } from '$lib/timing/canadian';
import { mainTimeOptions as byoyomiMainTimeOptions } from './byoyomi-options';
import { getter } from './get-form-value';

const DEFAULT_MAIN_TIME_SECONDS = 60 * 10;
const DEFAULT_TIME_PER_PERIOD_SECONDS = 60 * 3;
const DEFAULT_STONES_PER_PERIOD = 10;
const MIN_STONES_PER_PERIOD = 1;

// Canadian main time options are identical to byoyomi main time options
const mainTimeOptions = byoyomiMainTimeOptions;

export const timePerPeriodOptions = [
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
  { value: '1800', display: '30 minutes' },
  { value: '2100', display: '35 minutes' },
  { value: '2400', display: '40 minutes' },
  { value: '2700', display: '45 minutes' },
  { value: '3000', display: '50 minutes' },
  { value: '3300', display: '55 minutes' },
  { value: '3600', display: '1 hour' }
] as const;

export function parse(formData: FormData): CanadianClockSettings {
  const get = getter(formData);

  const rawValues: RawValues<CanadianClockSettings> = {
    type: 'canadian',
    mainTimeSeconds: get('mainTimeSeconds'),
    timePerPeriodSeconds: get('timePerPeriodSeconds'),
    stonesPerPeriod: get('stonesPerPeriod')
  };

  return {
    type: 'canadian',
    mainTimeSeconds: parseMainTimeSeconds(rawValues.mainTimeSeconds),
    timePerPeriodSeconds: parseTimePerPeriodSeconds(rawValues.timePerPeriodSeconds),
    stonesPerPeriod: parseStonesPerPeriod(rawValues.stonesPerPeriod)
  };
}

function parseMainTimeSeconds(rawValue: string): number {
  const specifiedOption = mainTimeOptions.find((o) => o.value === rawValue);
  const option = specifiedOption ?? defaultMainTimeOption();

  return Number(option.value);
}

export function defaultMainTimeOption() {
  const option = mainTimeOptions.find((opt) => opt.value === String(DEFAULT_MAIN_TIME_SECONDS));

  if (!option) {
    throw new Error(`Default main time (${DEFAULT_MAIN_TIME_SECONDS} seconds) not found`);
  }

  return option;
}

function parseTimePerPeriodSeconds(rawValue: string): number {
  const specifiedOption = timePerPeriodOptions.find((o) => o.value === rawValue);
  const option = specifiedOption ?? defaultTimePerPeriodOption();

  return Number(option.value);
}

export function defaultTimePerPeriodOption() {
  const option = timePerPeriodOptions.find(
    (opt) => opt.value === String(DEFAULT_TIME_PER_PERIOD_SECONDS)
  );

  if (!option) {
    throw new Error(
      `Default time per period (${DEFAULT_TIME_PER_PERIOD_SECONDS} seconds) not found`
    );
  }

  return option;
}

function parseStonesPerPeriod(rawValue: string): number {
  const isNumeric = rawValue.trim() !== '' && !isNaN(Number(rawValue));
  return isNumeric ? Math.max(MIN_STONES_PER_PERIOD, Number(rawValue)) : DEFAULT_STONES_PER_PERIOD;
}
