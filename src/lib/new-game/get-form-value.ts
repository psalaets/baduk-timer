/**
 * Wraps a FormData and returns a getter that returns string values.
 */
export function getter(formData: FormData) {
  return function get(name: string): string {
    const value = formData.get(name);
    if (value instanceof File) {
      throw new Error(`Unexpected file value for ${name}`);
    } else {
      return value ?? '';
    }
  };
}
