function key(keyParts: Array<string>): string {
  if (keyParts.length < 1) {
    throw new Error('Key must have at least 1 key part');
  }

  return ['baduk-timer'].concat(keyParts).join('.');
}

export function get(keyParts: Array<string>, defaultValue: string) {
  return localStorage.getItem(key(keyParts)) ?? defaultValue;
}

export function set(keyParts: Array<string>, value: string | number) {
  localStorage.setItem(key(keyParts), String(value));
}
