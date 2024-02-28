import { writable, get, derived, type Readable, type Writable } from 'svelte/store';
import type { ClockSettings } from '$lib/clock-settings/clock-settings';
import { BYOYOMI, CANADIAN, FISCHER } from '$lib/clock-settings/clock-type';
import type { Color } from '$lib/color';
import { createByoyomi } from '$lib/timing/byoyomi';
import { createCanadian } from '$lib/timing/canadian';
import { createFischer } from '$lib/timing/fischer';
import type { ClockState } from '$lib/timing/clock-state';

export type GameClock = ReturnType<typeof create>;

export type GameClockState = {
  black: ClockState;
  white: ClockState;
  whoseTurn: Color;
};

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

      blacksTurn.set(by !== 'black');
    },
    resume: () => resumeGame(),
    pause: () => pauseGame()
  };
}

function clocks(settings: ClockSettings) {
  const { type } = settings;

  switch (type) {
    case BYOYOMI:
      return {
        black: createByoyomi(settings),
        white: createByoyomi(settings)
      };
    case CANADIAN:
      return {
        black: createCanadian(settings),
        white: createCanadian(settings)
      };
    case FISCHER:
      return {
        black: createFischer(settings),
        white: createFischer(settings)
      };
    default:
      const exhaustiveCheck: never = type;
      throw new Error(`Unsupported clock type: ${exhaustiveCheck}`);
  }
}
