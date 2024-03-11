import { writable, derived, get, type Readable } from 'svelte/store';
import type { ClockSettings } from '$lib/clock-settings/clock-settings';
import { create as createClock, type GameClockState } from '$lib/timing/game-clock';
import type { Color } from '$lib/color';

type GamePhase = 'pre' | 'peri' | 'post';

export function isGameInProgess(phase: GamePhase) {
  return phase === 'peri';
}

export function isGameover(phase: GamePhase) {
  return phase === 'post';
}

export function isAwaitingFirstStone(phase: GamePhase) {
  return phase === 'pre';
}

export type Game = {
  settings: ClockSettings;
  clockState: Readable<GameClockState>;
  paused: Readable<boolean>;
  whoseTurn: Readable<Color>;
  phase: Readable<GamePhase>;
  pause: () => void;
  resume: () => void;
  stonePlayed: (by: Color) => void;
  dispose: Disposer;
};

type GameData = Pick<Game, 'clockState' | 'paused' | 'whoseTurn' | 'phase'>;
type Disposer = () => void;
/** Function that receives game's stores and returns a dispose function */
type Effect = (data: GameData) => Disposer;

export function createGame(settings: ClockSettings, effect?: Effect): Game {
  const clock = createClock(settings);

  const blacksTurn = writable(true);
  const whoseTurn = derived<typeof blacksTurn, Color>(blacksTurn, (b) => (b ? 'black' : 'white'));

  const paused = writable(true);
  const phase = writable<GamePhase>('pre');

  const disposers: Array<Disposer> = [];
  const dispose = () => disposers.forEach((fn) => fn());

  if (effect) {
    const disposeEffect = effect({
      clockState: clock,
      paused,
      whoseTurn,
      phase
    });
    disposers.push(disposeEffect);
  }

  // start and stop clock based on pause/unpause
  const unsubPaused = paused.subscribe((isPaused) => {
    if (isPaused) {
      clock.pause();
    } else {
      const who = get(whoseTurn);
      clock.resume(who);
    }
  });
  disposers.push(unsubPaused);

  // start and stop clock based on phase changes
  const unsubPhase = phase.subscribe((gamePhase) => {
    if (gamePhase === 'peri') {
      paused.set(false);
    } else if (gamePhase === 'post') {
      paused.set(true);
    }
  });
  disposers.push(unsubPhase);

  // Watch for end of game
  const unsubClock = clock.subscribe((state) => {
    if (state.black.timeout || state.white.timeout) {
      phase.set('post');
    }
  });
  disposers.push(unsubClock);

  function begin() {
    phase.set('peri');
  }

  function stonePlayed(by: Color) {
    clock.stonePlayed(by);

    // Flip turn to other player
    blacksTurn.set(by !== 'black');
  }

  return {
    settings: settings,
    clockState: clock,
    paused: paused,
    whoseTurn: whoseTurn,
    phase: phase,
    pause() {
      paused.set(true);
    },
    resume() {
      paused.set(false);
    },
    stonePlayed(by) {
      const isPaused = get(paused);

      const currentPhase = get(phase);
      const expectedBy = get(whoseTurn);
      const isRegularMove = isGameInProgess(currentPhase) && !isPaused && by === expectedBy;

      // Can't play any more
      if (isGameover(currentPhase)) {
        return;
      }

      if (isAwaitingFirstStone(currentPhase)) {
        // Anyone can play the first stone. It's decided by the players.
        // In even games it's black and in handicap games it's white.
        stonePlayed(by);

        // Start everything
        begin();
      } else if (isRegularMove) {
        // Otherwise, only allow the expected person to play a move when game is not paused
        stonePlayed(by);
      }
    },
    dispose
  };
}
