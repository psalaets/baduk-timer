export function first(...values: Array<string>): string {
  if (values.length === 0) {
    throw new Error('Must have at least one value');
  }

  return values.filter((v) => v)[0];
}
