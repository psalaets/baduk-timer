import { derived } from 'svelte/store';
import { type Game } from '$lib/game';
import * as sfx from './sfx';

export function timeoutSfx(game: Game) {
  const timeoutStore = derived(
    game.clockState,
    (clockState) => clockState.black.timeout || clockState.white.timeout,
    false
  );

  timeoutStore.subscribe((timeout) => {
    if (timeout) {
      sfx.timeout();
    }
  });
}
