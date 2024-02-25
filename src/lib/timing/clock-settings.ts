import { type ByoyomiClockSettings, settingsEqual as byoyomiSettingsEqual } from './byoyomi';
import { type CanadianClockSettings, settingsEqual as canadianSettingsEqual } from './canadian';
import { type FischerClockSettings, settingsEqual as fischerSettingsEqual } from './fischer';

export type ClockSettings = ByoyomiClockSettings | CanadianClockSettings | FischerClockSettings;

export function settingsEqual(a: ClockSettings, b: ClockSettings) {
  if (a.type === 'byoyomi' && b.type === 'byoyomi') {
    return byoyomiSettingsEqual(a, b);
  }

  if (a.type === 'canadian' && b.type === 'canadian') {
    return canadianSettingsEqual(a, b);
  }

  if (a.type === 'fischer' && b.type === 'fischer') {
    return fischerSettingsEqual(a, b);
  }

  return false;
}
