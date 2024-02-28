import type { ByoyomiClockSettings } from '$lib/timing/byoyomi';
import type { CanadianClockSettings } from '$lib/timing/canadian';
import type { ClockSettings } from '$lib/clock-settings/clock-settings';
import { BYOYOMI, CANADIAN, FISCHER } from '$lib/clock-settings/clock-type';
import type { FischerClockSettings } from '$lib/clock-settings/fischer-settings';
import { set } from '$lib/util/localstorage';
import type { RawValues } from '$lib/util/raw-values';
import { currentUrl } from '$lib/util/url';

export const shareableSettingsUrl = (settings: ClockSettings) => {
  const url = currentUrl();
  url.pathname = '/new';
  url.search = toQueryParams(settings).toString();
  return url;
};

// Cool urls don't change so the names used for query params should not be changed
// without a *really* good reason. Right now they happen to match the settings
// property names but they don't necessarily have to.
function toQueryParams(settings: ClockSettings): URLSearchParams {
  const { type } = settings;

  switch (type) {
    case BYOYOMI:
      return new URLSearchParams({
        type,
        mainTimeSeconds: String(settings.mainTimeSeconds),
        timePerPeriodSeconds: String(settings.timePerPeriodSeconds),
        periods: String(settings.periods)
      });

    case CANADIAN:
      return new URLSearchParams({
        type,
        mainTimeSeconds: String(settings.mainTimeSeconds),
        timePerPeriodSeconds: String(settings.timePerPeriodSeconds),
        stonesPerPeriod: String(settings.stonesPerPeriod)
      });

    case FISCHER:
      return new URLSearchParams({
        type,
        initialSeconds: String(settings.initialSeconds),
        incrementSeconds: String(settings.incrementSeconds),
        maxSeconds: String(settings.maxSeconds)
      });
    default:
      const exhaustiveCheck: never = type;
      throw new Error(`Unsupported settings type: ${exhaustiveCheck}`);
  }
}

// parse from query string
// massage all values
// check type first because that dictates all other settings
export function fromQueryParams(params: URLSearchParams): ClockSettings {
  return {};
}
