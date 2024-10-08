import { DEFAULT_MAIN_TIME } from './byoyomi-settings';

export type Duration = {
  hours: number;
  minutes: number;
  seconds: number;
};

export function parseDuration(val: string, defaultValues: Duration): Duration {
  const pattern = /^((\d+)h)(\d+)m(\d+)s$/;
  const result = pattern.exec(val);

  if (result) {
    const [_entireString, _entireHour, hours, minutes, seconds] = result;
    const parsed: Partial<Duration> = {
      minutes: Number(minutes),
      seconds: Number(seconds)
    };

    if (hours != null) {
      parsed.hours = Number(hours);
    }

    return {
      ...defaultValues,
      ...parsed
    };
  } else {
    return defaultValues;
  }
}

export function stringifyDuration(duration: Duration) {
  return `${duration.hours}h${duration.minutes}m${duration.seconds}s`;
}

export function toSeconds(duration: Duration): number {
  return duration.hours * 60 * 60 + duration.minutes * 60 + duration.seconds;
}
