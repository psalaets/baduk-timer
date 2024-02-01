import { writable, get, derived, type Readable, type Writable } from 'svelte/store';
import { createByoyomi } from './byoyomi';
import type { ClockSettings } from './clock-settings';
import type { Color } from '$lib/color';

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

  const paused = writable(true);
  paused.subscribe((isPaused) => {
    if (isPaused) {
      pauseGame();
    } else {
      resumeGame();
    }
  });

  function switchTurn() {
    blacksTurn.update((b) => !b);
  }

  return {
    white,
    black,
    whoseTurn,
    paused,
    stonePlayed(by: Color) {
      if (get(paused)) {
        return;
      }

      if (by === 'black') {
        black.playedStone();
        white.opponentPlayedStone();
      } else {
        white.playedStone();
        black.opponentPlayedStone();
      }

      switchTurn();
    },
    begin: () => paused.set(false),
    resume: () => paused.set(false),
    pause: () => paused.set(true)
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
