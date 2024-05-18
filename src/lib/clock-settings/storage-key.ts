/**
 * @return Key parts for reading/writing clock settings from/to localstorage.
 */
export const clockSettingsKey = (keyParts: Array<string>) => ['clock-settings'].concat(keyParts);
