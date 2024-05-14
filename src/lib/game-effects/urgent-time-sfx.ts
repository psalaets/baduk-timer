import { derived } from 'svelte/store';
import { type Game } from '$lib/game';
import * as sfx from '$lib/game-effects/sfx';

export function urgentTimeSfx(game: Game) {
  // These ranges seem a bit weird but they're needed to get 5 boops of each
  // urgency and while also taking care not to boop twice really fast when clock
  // insta-switches from 10 to 9 in games with 10 second byoyomi periods.
  const isSuperUrgent = (secondsLeft: number) => secondsLeft < 5 && secondsLeft >= 0;
  const isUrgent = (secondsLeft: number) => secondsLeft < 10 && secondsLeft >= 5;

  const playLowTimeSound = (secondsLeft: number) => {
    if (isSuperUrgent(secondsLeft)) {
      sfx.superUrgent();
    } else if (isUrgent(secondsLeft)) {
      sfx.urgent();
    }
  };

  const blackWholeSecondsLeft = derived([game.clockState], ([clockState]) =>
    Math.trunc(clockState.black.countdown)
  );

  blackWholeSecondsLeft.subscribe(playLowTimeSound);

  const whiteWholeSecondsLeft = derived([game.clockState], ([clockState]) =>
    Math.trunc(clockState.white.countdown)
  );

  whiteWholeSecondsLeft.subscribe(playLowTimeSound);
}
