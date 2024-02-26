import { writable, get, type Readable } from 'svelte/store';
import type { ClockSettings } from './timing/clock-settings';
import { create as createClock, type GameClockState } from './timing/game-clock';
import type { Color } from '$lib/color';

export type Game = {
  settings: ClockSettings;
  clockState: Readable<GameClockState>;
  started: Readable<boolean>;
  paused: Readable<boolean>;
  begin: () => void;
  pause: () => void;
  resume: () => void;
  stonePlayed: (by: Color) => void;
  dispose: () => void;
};

export function createGame(settings: ClockSettings): Game {
  const started = writable(false);
  const paused = writable(true);
  const clock = createClock(settings);

  const unsubPaused = paused.subscribe((isPaused) => {
    if (isPaused) {
      clock.pause();
    } else {
      clock.resume();
    }
  });

  function begin() {
    started.set(true);
    paused.set(false);
  }

  return {
    settings: settings,
    clockState: clock,
    started: started,
    paused: paused,
    begin,
    pause() {
      paused.set(true);
    },
    resume() {
      paused.set(false);
    },
    stonePlayed(by) {
      const isStarted = get(started);
      const isPaused = get(paused);

      const isFirstStone = isPaused && !isStarted;
      const notPaused = !isPaused;
      const expectedBy = get(clock).whoseTurn;

      if (isFirstStone) {
        // Anyone can play the first stone. It's decided by the players.
        // In even games it's black and in handicap games it's white.
        clock.stonePlayed(by);

        // Start everything
        begin();
      } else if (notPaused && by === expectedBy) {
        // Otherwise, only allow the expected person to play a move when game is not paused
        clock.stonePlayed(by);
      }
    },
    dispose() {
      unsubPaused();
    }
  };
}
