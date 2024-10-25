/**
 * Capitalize every word in a string.
 */
export function capitalize(value: string): string {
  return value.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase());
}
