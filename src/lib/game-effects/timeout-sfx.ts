import { derived } from 'svelte/store';
import { type Game } from '$lib/game';
import { Howl } from 'howler';

export function timeoutSfx(game: Game) {
  const howls = createHowls();

  const timeoutStore = derived(
    game.clockState,
    (clockState) => {
      return clockState.black.timeout || clockState.white.timeout;
    },
    false
  );

  timeoutStore.subscribe((timeout) => {
    if (timeout) {
      repeatedly(howls.timeout);
    }
  });
}

function createHowls() {
  return {
    timeout: new Howl({
      src: 'sfx/timeout.wav'
    })
  };
}

function repeatedly(howl: Howl, iterations = 5, gapMillis = 60) {
  let runs = 0;

  const handler = () => {
    if (runs === iterations) {
      howl.off('end', handler);
    }

    setTimeout(() => howl.play(), gapMillis);

    runs += 1;
  };

  howl.on('end', handler);
  howl.play();
}
