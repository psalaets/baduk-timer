import { derived } from 'svelte/store';
import { type Game } from '$lib/game';
import * as sfx from '$lib/game-effects/sfx';
import type { GameClockState } from '$lib/timing/game-clock';

export function urgentTimeSfx(game: Game) {
  // These ranges seem a bit weird but they're needed to get 5 boops of each urgency.
  const isSuperUrgent = (secondsLeft: number) => secondsLeft < 5 && secondsLeft >= 0;
  const isUrgent = (secondsLeft: number) => secondsLeft < 10 && secondsLeft >= 5;

  const playUrgencySound = (secondsLeft: number) => {
    if (isSuperUrgent(secondsLeft)) sfx.superUrgent();
    if (isUrgent(secondsLeft)) sfx.urgent();
  };

  type ClockStateStore = typeof game.clockState;
  type PausedStore = typeof game.paused;
  type CountdownSelector = (clockState: GameClockState) => number;

  const urgentSecondsStore = (
    clockStateStore: ClockStateStore,
    pausedStore: PausedStore,
    selector: CountdownSelector
  ) => {
    let previousSecondsLeft: number | null = null;

    return derived<[ClockStateStore, PausedStore], number>(
      [clockStateStore, pausedStore],
      ([clockState, paused], set) => {
        if (!paused) {
          const currentSecondsLeft = Math.trunc(selector(clockState));

          // Update current seconds only if it's different than last time's seconds
          if (previousSecondsLeft !== null && currentSecondsLeft !== previousSecondsLeft) {
            set(currentSecondsLeft);
          }
          previousSecondsLeft = currentSecondsLeft;
        }
      }
    );
  };

  // watch black urgency
  const blackUrgentSecondsLeft = urgentSecondsStore(
    game.clockState,
    game.paused,
    (clockState) => clockState.black.countdown
  );
  const unsubBlackUrgency = blackUrgentSecondsLeft.subscribe(playUrgencySound);

  // watch white urgency
  const whiteUrgentSecondsLeft = urgentSecondsStore(
    game.clockState,
    game.paused,
    (clockState) => clockState.white.countdown
  );
  const unsubWhiteUrgency = whiteUrgentSecondsLeft.subscribe(playUrgencySound);

  return () => {
    unsubBlackUrgency();
    unsubWhiteUrgency();
  };
}
