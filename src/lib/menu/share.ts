import type { ClockType } from '$lib/clock-settings/clock-type';
import type { ClockSettings } from '$lib/clock-settings/clock-settings';
import { type ByoyomiClockSettings } from '$lib/clock-settings/byoyomi-settings';
import { type CanadianClockSettings } from '$lib/clock-settings/canadian-settings';
import { type FischerClockSettings } from '$lib/clock-settings/fischer-settings';
import { BYOYOMI, CANADIAN, FISCHER } from '$lib/clock-settings/clock-type';
import type { RawValues } from '$lib/util/raw-values';
import { currentUrl } from '$lib/util/url';

export const shareableSettingsUrl = (settings: ClockSettings) => {
  const url = currentUrl();
  url.pathname = '/new';
  url.search = toQueryParams(settings).toString();
  return url;
};

/**
 * Names of query parameters used for sharing settings
 *
 * Cool urls don't change so these names used for query params should not be
 * changed without a *really* good reason.
 **/
const queryParams = {
  type: 'type',
  mainTimeSeconds: 'mainTimeSeconds',
  timePerPeriodSeconds: 'timePerPeriodSeconds',
  periods: 'periods',
  stonesPerPeriod: 'stonesPerPeriod',
  initialSeconds: 'initialSeconds',
  incrementSeconds: 'incrementSeconds',
  maxSeconds: 'maxSeconds'
};

function toQueryParams(settings: ClockSettings): URLSearchParams {
  const { type } = settings;

  switch (type) {
    case BYOYOMI:
      return new URLSearchParams({
        [queryParams.type]: type,
        [queryParams.mainTimeSeconds]: String(settings.mainTimeSeconds),
        [queryParams.timePerPeriodSeconds]: String(settings.timePerPeriodSeconds),
        [queryParams.periods]: String(settings.periods)
      });

    case CANADIAN:
      return new URLSearchParams({
        [queryParams.type]: type,
        [queryParams.mainTimeSeconds]: String(settings.mainTimeSeconds),
        [queryParams.timePerPeriodSeconds]: String(settings.timePerPeriodSeconds),
        [queryParams.stonesPerPeriod]: String(settings.stonesPerPeriod)
      });

    case FISCHER:
      return new URLSearchParams({
        [queryParams.type]: type,
        [queryParams.initialSeconds]: String(settings.initialSeconds),
        [queryParams.incrementSeconds]: String(settings.incrementSeconds),
        [queryParams.maxSeconds]: String(settings.maxSeconds)
      });
    default:
      const exhaustiveCheck: never = type;
      throw new Error(`Unsupported settings type: ${exhaustiveCheck}`);
  }
}

type Getter = (name: string) => string;

/**
 * Create a function that reads raw settings values from the query string.
 *
 * @param expected Clock type for which to look for settings in query params
 * @param readFromQueryParams Receives a query param value getter function and returns raw settings.
 * @param empty Empty settings object to return if settings of expected clock type
 * not found in query params.
 */
function fromQueryParams<T extends ClockSettings>(
  expected: ClockType,
  readFromQueryParams: (get: Getter) => RawValues<T>,
  empty: RawValues<T>
) {
  return (params: URLSearchParams): RawValues<T> => {
    const get = (name: string) => params.get(name) || '';
    return get(queryParams.type) === expected ? readFromQueryParams(get) : empty;
  };
}

export const byoyomiFromQueryParams = fromQueryParams<ByoyomiClockSettings>(
  BYOYOMI,
  (get) => ({
    type: BYOYOMI,
    mainTimeSeconds: get(queryParams.mainTimeSeconds),
    timePerPeriodSeconds: get(queryParams.timePerPeriodSeconds),
    periods: get(queryParams.periods)
  }),
  {
    type: BYOYOMI,
    mainTimeSeconds: '',
    timePerPeriodSeconds: '',
    periods: ''
  }
);

export const canadianFromQueryParams = fromQueryParams<CanadianClockSettings>(
  CANADIAN,
  (get) => ({
    type: CANADIAN,
    mainTimeSeconds: get(queryParams.mainTimeSeconds),
    timePerPeriodSeconds: get(queryParams.timePerPeriodSeconds),
    stonesPerPeriod: get(queryParams.stonesPerPeriod)
  }),
  {
    type: CANADIAN,
    mainTimeSeconds: '',
    timePerPeriodSeconds: '',
    stonesPerPeriod: ''
  }
);

export const fischerFromQueryParams = fromQueryParams<FischerClockSettings>(
  FISCHER,
  (get) => ({
    type: FISCHER,
    initialSeconds: get(queryParams.initialSeconds),
    incrementSeconds: get(queryParams.incrementSeconds),
    maxSeconds: get(queryParams.maxSeconds)
  }),
  {
    type: FISCHER,
    initialSeconds: '',
    incrementSeconds: '',
    maxSeconds: ''
  }
);
