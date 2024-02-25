import type { ByoyomiClockSettings } from '$lib/timing/byoyomi';
import { getter } from './get-form-value';
import type { RawValues } from './raw-values';

type Option = {
  value: string;
  display: string;
  default?: boolean;
};

// ripped from OGS
export const mainTimeOptions: Array<Option> = [
  { value: '0', display: 'None' },
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
  { value: '600', display: '10 minutes', default: true },
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
];

// ripped from OGS
export const timePerPeriodOptions: Array<Option> = [
  { value: '10', display: '10 seconds' },
  { value: '12', display: '12 seconds' },
  { value: '15', display: '15 seconds' },
  { value: '20', display: '20 seconds' },
  { value: '25', display: '25 seconds' },
  { value: '30', display: '30 seconds', default: true },
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
];

export function parse(formData: FormData): ByoyomiClockSettings {
  const get = getter(formData);

  const rawValues: RawValues<ByoyomiClockSettings> = {
    type: 'byoyomi',
    mainTimeSeconds: get('mainTimeSeconds'),
    timePerPeriodSeconds: get('timePerPeriodSeconds'),
    periods: get('periods')
  };

  return {
    type: 'byoyomi' as 'byoyomi',
    periods: parsePeriods(rawValues.periods),
    mainTimeSeconds: parseMainTimeSeconds(rawValues.mainTimeSeconds),
    timePerPeriodSeconds: parseTimePerPeriodSeconds(rawValues.timePerPeriodSeconds)
  };
}

export function parsePeriods(rawValue: string): number {
  const isNumeric = rawValue.trim() !== '' && !isNaN(Number(rawValue));

  if (isNumeric) {
    const minPeriods = 0;
    return Math.max(minPeriods, Number(rawValue));
  } else {
    const defaultPeriods = 5;
    return defaultPeriods;
  }
}

export function parseMainTimeSeconds(rawValue: string): number {
  const specifiedOption = mainTimeOptions.find((o) => o.value === rawValue);
  const option = specifiedOption ?? defaultMainTimeOption();

  return Number(option.value);
}

export function parseTimePerPeriodSeconds(rawValue: string): number {
  const specifiedOption = timePerPeriodOptions.find((o) => o.value === rawValue);
  const option = specifiedOption ?? defaultTimePerPeriodOption();

  return Number(option.value);
}

export function defaultMainTimeOption() {
  const option = mainTimeOptions.find((opt) => opt.default);
  if (!option) {
    throw new Error('No default main time option is configured');
  }
  return option;
}

export function defaultTimePerPeriodOption() {
  const option = timePerPeriodOptions.find((opt) => opt.default);
  if (!option) {
    throw new Error('No default time per period option is configured');
  }
  return option;
}

export function mainTimeLabel(seconds: number) {
  const option = mainTimeOptions.find((opt) => opt.value === String(seconds));
  return option ? option.display : null;
}

export function timePerPeriodLabel(seconds: number) {
  const option = timePerPeriodOptions.find((opt) => opt.value === String(seconds));
  return option ? option.display : null;
}
