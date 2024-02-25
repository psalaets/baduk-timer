import type { Readable } from 'svelte/store';

export type Clock<State> = {
  subscribe: Readable<State>['subscribe'];
  play: () => void;
  pause: () => void;
  playedStone: () => void;
  opponentPlayedStone: () => void;
};
