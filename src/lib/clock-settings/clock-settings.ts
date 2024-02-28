import { type ByoyomiClockSettings } from '$lib/clock-settings/byoyomi-settings';
import { type CanadianClockSettings } from '$lib/clock-settings/canadian-settings';
import { type FischerClockSettings } from '$lib/clock-settings/fischer-settings';

export type ClockSettings = ByoyomiClockSettings | CanadianClockSettings | FischerClockSettings;
