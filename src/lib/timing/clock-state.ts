import type { ByoyomiState } from './byoyomi';
import type { CanadianState } from './canadian';
import type { FischerState } from './fischer';

export type ClockState = ByoyomiState | CanadianState | FischerState;
