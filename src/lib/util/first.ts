import { type RawValues } from '$lib/util/raw-values';

export function firstFullyPopulated<T extends {}>(objs: Array<RawValues<T>>): RawValues<T> {
  return objs.filter((obj) => Object.values(obj).every((value) => !!value))[0];
}
