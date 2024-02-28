/**
 * Object type that mirrors another object type, but all values are strings.
 */
export type RawValues<T> = {
  [key in keyof T]: string;
};
