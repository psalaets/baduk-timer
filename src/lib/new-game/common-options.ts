import { BYOYOMI, CANADIAN, FISCHER, type ClockType } from '$lib/timing/clock-type';
import { first } from '$lib/util/first';
import * as db from '$lib/util/localstorage';

const DEFAULT_TIME_SYSTEM = BYOYOMI;

export const timeSystemOptions = [
  { value: BYOYOMI, display: 'Byo-Yomi' },
  { value: CANADIAN, display: 'Canadian' },
  { value: FISCHER, display: 'Fischer' }
];

export function saveSettings(settings: { timeSystem: ClockType }) {
  db.set('newGame.common.timeSystem', settings.timeSystem);
}

export function getInitialValues() {
  return {
    timeSystem: first(db.get('newGame.common.timeSystem', ''), DEFAULT_TIME_SYSTEM)
  };
}
