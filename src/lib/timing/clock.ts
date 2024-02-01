import type { Readable } from 'svelte/store';

export type Clock<TimingSystemData> = {
  subscribe: Readable<TimingSystemData>['subscribe'];
  play: () => void;
  pause: () => void;
  playedStone: () => void;
  opponentPlayedStone: () => void;
};
