import {
  loadSettings,
  type CommonSettings,
  parseType,
  DEFAULT_TYPE
} from '$lib/clock-settings/common-settings';
import { BYOYOMI, CANADIAN, FISCHER, type ClockType } from '$lib/clock-settings/clock-type';
import { first } from '$lib/util/first';
import { getter } from './get-form-value';
import type { RawValues } from '$lib/util/raw-values';

export { typeOptions } from '$lib/clock-settings/common-settings';

export function parse(formData: FormData): CommonSettings {
  const get = getter(formData);

  return {
    type: parseType(get('timeSystem'))
  };
}

export function getInitialValues(): RawValues<CommonSettings> {
  const loaded = loadSettings();

  return {
    type: first(loaded.type, DEFAULT_TYPE)
  };
}
