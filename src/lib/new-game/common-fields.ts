import {
  loadSettings,
  type CommonSettings,
  parseType,
  DEFAULT_TYPE
} from '$lib/clock-settings/common-settings';
import { firstFullyPopulated } from '$lib/util/first';
import { getter } from './get-form-value';
import type { RawValues } from '$lib/util/raw-values';
import { commonFromQueryParams } from '$lib/menu/share';
import { currentUrl } from '$lib/util/url';

export function parse(formData: FormData): CommonSettings {
  const get = getter(formData);

  return {
    type: parseType(get('timeSystem'))
  };
}

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
