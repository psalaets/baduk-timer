import { getContext, setContext } from 'svelte';
import { writable, type Readable } from 'svelte/store';
import type { ClockSettings } from './timing/clock-settings';
import { create as createClock, type GameClock } from './timing/game-clock';
import type { Color } from '$lib/color';

export type GameContext = {
  game: Game | null;
};

export function getGameContext(): Game | null {
  const context = getContext<GameContext>('game');
  return context ? context.game : null;
}

export function setGameContext(game: Game | null): void {
  // const current = getGameContext();
  // if (current) {
  //   current.dispose();
  // }

  setContext<GameContext>('game', { game });
}

export type Game = {
  settings: ClockSettings;
  clock: GameClock;
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

  return {
    settings: settings,
    clock: clock,
    started: started,
    paused: paused,
    begin() {
      started.set(true);
      paused.set(false);
    },
    pause() {
      paused.set(true);
    },
    resume() {
      paused.set(false);
    },
    stonePlayed(by) {
      clock.stonePlayed(by);
    },
    dispose() {
      unsubPaused();
    }
  };
}
