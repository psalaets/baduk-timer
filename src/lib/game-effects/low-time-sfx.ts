import { derived } from 'svelte/store';
import type { GameEffect } from '$lib/game';
import { Howl, Howler } from 'howler';

export const lowTimeSfx: GameEffect = function lowTimeSfx(gameData) {
  const howls = createHowls();

  const disposers: Array<() => any> = [];

  const isSuperUrgent = (secondsLeft: number) => secondsLeft <= 5;
  const isUrgent = (secondsLeft: number) => secondsLeft <= 10;
  const playLowTimeSound = (secondsLeft: number) => {
    if (isSuperUrgent(secondsLeft)) {
      howls.superUrgent.play();
    } else if (isUrgent(secondsLeft)) {
      howls.urgent.play();
    }
  };

  const blackWholeSecondsLeft = derived([gameData.clockState], ([clockState]) =>
    Math.trunc(clockState.black.countdown)
  );
  disposers.push(blackWholeSecondsLeft.subscribe(playLowTimeSound));

  const whiteWholeSecondsLeft = derived([gameData.clockState], ([clockState]) =>
    Math.trunc(clockState.white.countdown)
  );
  disposers.push(whiteWholeSecondsLeft.subscribe(playLowTimeSound));

  return () => disposers.forEach((fn) => fn());
};

function createHowls() {
  return {
    urgent: new Howl({
      src: 'sfx/urgent.wav'
    }),
    superUrgent: new Howl({
      src: 'sfx/super-urgent.wav'
    })
  };
}
