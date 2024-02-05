import { writable, get, derived, type Readable, type Writable } from 'svelte/store';
import { createByoyomi } from './byoyomi';
import type { ClockSettings } from './clock-settings';
import type { Color } from '$lib/color';

export type GameClock = ReturnType<typeof create>;

/**
 * A pair of clocks that alternate ticking on each turn.
 */
export function create(settings: ClockSettings) {
  const { black, white } = clocks(settings);

  const blacksTurn = writable(true);
  const whoseTurn = derived<typeof blacksTurn, Color>(blacksTurn, (b) => (b ? 'black' : 'white'));

  function pauseGame() {
    black.pause();
    white.pause();
  }

  function resumeGame() {
    if (get(blacksTurn)) {
      black.play();
    } else {
      white.play();
    }
  }

  function switchTurn() {
    blacksTurn.update((b) => !b);
  }

  const data = derived([black, white, whoseTurn], ([b, w, who]) => {
    return {
      black: b,
      white: w,
      whoseTurn: who
    };
  });

  return {
    subscribe: data.subscribe,
    stonePlayed(by: Color) {
      if (by === 'black') {
        black.playedStone();
        white.opponentPlayedStone();
      } else {
        white.playedStone();
        black.opponentPlayedStone();
      }

      switchTurn();
    },
    resume: () => resumeGame(),
    pause: () => pauseGame()
  };
}

function clocks(settings: ClockSettings) {
  if (settings.type === 'byoyomi') {
    return {
      black: createByoyomi(settings),
      white: createByoyomi(settings)
    };
  } else {
    throw new Error(`Unsupported clock type: ${settings.type}`);
  }
}
