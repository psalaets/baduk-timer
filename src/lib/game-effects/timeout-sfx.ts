import { derived } from 'svelte/store';
import { type Game, type GamePhase, isGameInProgress, isGameover } from '$lib/game';
import * as sfx from '$lib/game-effects/sfx';

export function timeoutSfx(game: Game) {
  let previousPhase: GamePhase | null = null;

  const timeoutStore = derived(
    [game.clockState, game.phase],
    ([clockState, currentPhase]) => {
      const gameJustEnded =
        previousPhase && isGameInProgress(previousPhase) && isGameover(currentPhase);
      previousPhase = currentPhase;

      const timeout = clockState.black.timeout || clockState.white.timeout;
      return gameJustEnded && timeout;
    },
    false
  );

  const stopWatchingTimeout = timeoutStore.subscribe((timeout) => {
    if (timeout) {
      sfx.timeout();
    }
  });

  return stopWatchingTimeout;
}
