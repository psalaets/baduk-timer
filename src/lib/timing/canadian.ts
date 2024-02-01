import { derived, writable } from 'svelte/store';
import { createDefaultTicker } from './ticker';
import { createCountdown } from './countdown';

export type CanadianClockSettings = {
  type: 'canadian';
  mainTimeSeconds: number;
  stonesPerPeriod: number;
  timePerPeriodSeconds: number;
};

type PhaseLogic = {
  onCountdownExhausted?: () => void;
  onTurnPlayed?: () => void;
  onStonePlayed?: (stonesLeft: number) => void;
};

export const createCanadian = (
  settings: CanadianClockSettings,
  createTicker = createDefaultTicker
) => {
  const { mainTimeSeconds, stonesPerPeriod, timePerPeriodSeconds } = settings;

  const countdown = createCountdown(mainTimeSeconds, createTicker);
  const phase = writable(mainTimeSeconds > 0 ? 'main' : 'overtime');
  const stonesRemaining = writable(stonesPerPeriod);
  const timeout = writable(false);

  const data = derived([countdown, phase, stonesRemaining, timeout], ([c, ph, sr, t]) => {
    return {
      countdown: c,
      phase: ph,
      stonesRemaining: sr,
      timeout: t
    };
  });

  const mainTimeLogic: PhaseLogic = {
    onCountdownExhausted() {
      phase.set('overtime');
    }
  };

  const overtimeLogic: PhaseLogic = {
    onTurnPlayed() {
      stonesRemaining.update((stones) => stones - 1);
    },
    onCountdownExhausted() {
      timeout.set(true);
    },
    onStonePlayed(stonesLeft) {
      if (stonesLeft === 0) {
        countdown.set(timePerPeriodSeconds);
        stonesRemaining.set(stonesPerPeriod);
      }
    }
  };

  let logic = mainTimeLogic;

  // when phase changes, set logic accordingly
  phase.subscribe((timerPhase) => {
    if (timerPhase == 'main') {
      logic = mainTimeLogic;
    } else if (timerPhase == 'overtime') {
      logic = overtimeLogic;
      countdown.set(timePerPeriodSeconds);
    }
  });

  stonesRemaining.subscribe((stonesLeft) => {
    // Only call hook if a stone has actually been played
    if (stonesLeft < stonesPerPeriod) {
      logic.onStonePlayed && logic.onStonePlayed(stonesLeft);
    }
  });

  return {
    subscribe: data.subscribe,
    play: countdown.play,
    pause: countdown.pause,
    playedStone() {
      countdown.pause();
      logic.onTurnPlayed && logic.onTurnPlayed();
    },
    opponentPlayedStone() {
      countdown.play();
    }
  };
};
