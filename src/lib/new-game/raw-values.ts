export type RawValues<T> = {
  [k in keyof T]: string;
};
