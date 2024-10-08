import type { ClockType } from '$lib/clock-settings/clock-type';
import type { ClockSettings } from '$lib/clock-settings/clock-settings';
import { type ByoyomiClockSettings } from '$lib/clock-settings/byoyomi-settings';
import { type CanadianClockSettings } from '$lib/clock-settings/canadian-settings';
import { type FischerClockSettings } from '$lib/clock-settings/fischer-settings';
import { BYOYOMI, CANADIAN, FISCHER } from '$lib/clock-settings/clock-type';
import type { RawValues } from '$lib/util/raw-values';
import { currentUrl } from '$lib/util/url';
import type { CommonSettings } from '$lib/clock-settings/common-settings';
import { stringifyDuration } from '$lib/clock-settings/duration';

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
const queryParamNames = {
  type: 'type',
  mainTime: 'mainTime',
  timePerPeriod: 'timePerPeriod',
  periods: 'periods',
  stonesPerPeriod: 'stonesPerPeriod',
  initialTime: 'initialTime',
  increment: 'increment',
  maxTime: 'maxTime'
};

function toQueryParams(settings: ClockSettings): URLSearchParams {
  const { type } = settings;

  switch (type) {
    case BYOYOMI:
      return new URLSearchParams({
        [queryParamNames.type]: type,
        [queryParamNames.mainTime]: stringifyDuration(settings.mainTime),
        [queryParamNames.timePerPeriod]: stringifyDuration(settings.timePerPeriod),
        [queryParamNames.periods]: String(settings.periods)
      });

    case CANADIAN:
      return new URLSearchParams({
        [queryParamNames.type]: type,
        [queryParamNames.mainTime]: stringifyDuration(settings.mainTime),
        [queryParamNames.timePerPeriod]: stringifyDuration(settings.timePerPeriod),
        [queryParamNames.stonesPerPeriod]: String(settings.stonesPerPeriod)
      });

    case FISCHER:
      return new URLSearchParams({
        [queryParamNames.type]: type,
        [queryParamNames.initialTime]: stringifyDuration(settings.initialTime),
        [queryParamNames.increment]: stringifyDuration(settings.increment),
        [queryParamNames.maxTime]: stringifyDuration(settings.maxTime)
      });
    default:
      const exhaustiveCheck: never = type;
      throw new Error(`Unsupported settings type: ${exhaustiveCheck}`);
  }
}

export const commonFromQueryParams = (params: URLSearchParams): RawValues<CommonSettings> => {
  return {
    type: params.get('type') || ''
  };
};

type Getter = (name: string) => string;

/**
 * Create a function that reads raw settings values from the query string.
 *
 * @param expectedType Clock type for which to look for settings in query params
 * @param readFromQueryParams Receives a query param value getter function and returns raw settings.
 * @param fallback Settings object to return if settings of expected clock type
 * not found in query params.
 */
function fromQueryParams<T extends ClockSettings>(
  expectedType: ClockType,
  readFromQueryParams: (get: Getter) => RawValues<T>,
  fallback: RawValues<T>
) {
  return (params: URLSearchParams): RawValues<T> => {
    const get = (name: string) => params.get(name) || '';
    return get(queryParamNames.type) === expectedType ? readFromQueryParams(get) : fallback;
  };
}

export const byoyomiFromQueryParams = fromQueryParams<ByoyomiClockSettings>(
  BYOYOMI,
  (get) => ({
    type: BYOYOMI,
    mainTime: get(queryParamNames.mainTime),
    timePerPeriod: get(queryParamNames.timePerPeriod),
    periods: get(queryParamNames.periods)
  }),
  {
    type: BYOYOMI,
    mainTime: '',
    timePerPeriod: '',
    periods: ''
  }
);

export const canadianFromQueryParams = fromQueryParams<CanadianClockSettings>(
  CANADIAN,
  (get) => ({
    type: CANADIAN,
    mainTime: get(queryParamNames.mainTime),
    timePerPeriod: get(queryParamNames.timePerPeriod),
    stonesPerPeriod: get(queryParamNames.stonesPerPeriod)
  }),
  {
    type: CANADIAN,
    mainTime: '',
    timePerPeriod: '',
    stonesPerPeriod: ''
  }
);

export const fischerFromQueryParams = fromQueryParams<FischerClockSettings>(
  FISCHER,
  (get) => ({
    type: FISCHER,
    initialTime: get(queryParamNames.initialTime),
    increment: get(queryParamNames.increment),
    maxTime: get(queryParamNames.maxTime)
  }),
  {
    type: FISCHER,
    initialTime: '',
    increment: '',
    maxTime: ''
  }
);
