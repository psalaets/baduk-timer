import {
  loadSettings,
  type CommonSettings,
  parseType,
  DEFAULT_TYPE
} from '$lib/clock-settings/common-settings';
import { BYOYOMI, CANADIAN, FISCHER, type ClockType } from '$lib/clock-settings/clock-type';
import { firstFullyPopulated } from '$lib/util/first';
import { getter } from './get-form-value';
import type { RawValues } from '$lib/util/raw-values';
import { commonFromQueryParams } from '$lib/menu/share';
import { currentUrl } from '$lib/util/url';

export { typeOptions } from '$lib/clock-settings/common-settings';

export function parse(formData: FormData): CommonSettings {
  const get = getter(formData);

  return {
    type: parseType(get('timeSystem'))
  };
}

// TODO should initial values be a merge pipeline? or just use the first object that has all values?

export function getInitialValues(): RawValues<CommonSettings> {
  const raw = firstFullyPopulated([
    commonFromQueryParams(currentUrl().searchParams),
    loadSettings(),
    {
      type: DEFAULT_TYPE
    }
  ]);

  return {
    type: parseType(raw.type)
  };
}
