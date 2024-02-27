import { first } from '$lib/util/first';
import * as db from '$lib/util/localstorage';

const DEFAULT_TIME_SYSTEM = 'byoyomi';

export const timeSystemOptions = [
  { value: 'byoyomi', display: 'Byo-Yomi' },
  { value: 'canadian', display: 'Canadian' },
  { value: 'fischer', display: 'Fischer' }
];

export function saveSettings(settings: { timeSystem: string }) {
  db.set('newGame.common.timeSystem', settings.timeSystem);
}

export function getInitialValues() {
  return {
    timeSystem: first(db.get('newGame.common.timeSystem', ''), DEFAULT_TIME_SYSTEM)
  };
}
