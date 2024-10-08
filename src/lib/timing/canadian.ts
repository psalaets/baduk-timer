import { derived, writable } from 'svelte/store';
import { createDefaultTicker } from './ticker';
import { createCountdown } from './countdown';
import type { Clock } from './clock';
import { CANADIAN, type Canadian } from '$lib/clock-settings/clock-type';
import { type CanadianClockSettings } from '$lib/clock-settings/canadian-settings';
import { toSeconds } from '$lib/clock-settings/duration';

type Phase = 'main' | 'overtime';

export type CanadianClock = Clock<CanadianState>;

export type CanadianState = {
  type: Canadian;
  countdown: number;
  phase: Phase;
  stonesRemaining: number;
  timeout: boolean;
};

type PhaseLogic = {
  onCountdownExhausted?: () => void;
  onTurnPlayed?: () => void;
  onStonePlayed?: (stonesLeft: number) => void;
};

export const createCanadian = (
  settings: CanadianClockSettings,
  createTicker = createDefaultTicker
): Clock<CanadianState> => {
  const { mainTime, stonesPerPeriod, timePerPeriod } = settings;

  const countdown = createCountdown(toSeconds(mainTime), createTicker);
  const phase = writable<Phase>(toSeconds(mainTime) > 0 ? 'main' : 'overtime');
  const stonesRemaining = writable(stonesPerPeriod);
  const timeout = writable(false);

  const state = derived([countdown, phase, stonesRemaining, timeout], ([c, ph, sr, t]) => {
    return {
      type: CANADIAN,
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
        countdown.set(toSeconds(timePerPeriod));
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
      countdown.set(toSeconds(timePerPeriod));
    }
  });

  stonesRemaining.subscribe((stonesLeft) => {
    // Only call hook if a stone has actually been played
    if (stonesLeft < stonesPerPeriod) {
      logic.onStonePlayed && logic.onStonePlayed(stonesLeft);
    }
  });

  countdown.subscribe((seconds) => {
    if (seconds === 0) {
      logic.onCountdownExhausted && logic.onCountdownExhausted();
    }
  });

  return {
    subscribe: state.subscribe,
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
