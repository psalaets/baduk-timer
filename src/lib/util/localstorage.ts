const prefix = 'baduk-timer.';

export function get(key: string, defaultValue: string) {
  return localStorage.getItem(prefix + key) ?? defaultValue;
}

export function set(key: string, value: string | number) {
  localStorage.setItem(prefix + key, String(value));
}
