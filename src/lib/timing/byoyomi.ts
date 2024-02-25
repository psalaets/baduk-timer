import { derived, writable } from 'svelte/store';
import { createCountdown } from './countdown';
import { createDefaultTicker } from './ticker';
import type { Clock } from './clock';

export type ByoyomiClockSettings = {
  type: 'byoyomi';
  mainTimeSeconds: number;
  periods: number;
  timePerPeriodSeconds: number;
};

export function settingsEqual(a: ByoyomiClockSettings, b: ByoyomiClockSettings) {
  if (a.mainTimeSeconds !== b.mainTimeSeconds) return false;
  if (a.periods !== b.periods) return false;
  if (a.timePerPeriodSeconds !== b.timePerPeriodSeconds) return false;

  return true;
}

type Phase = 'main' | 'overtime';

export type ByoyomiClock = Clock<ByoyomiState>;

export type ByoyomiState = {
  type: 'byoyomi';
  countdown: number;
  phase: Phase;
  periodsRemaining: number;
  timeout: boolean;
};

type PhaseLogic = {
  onCountdownExhausted?: () => void;
  onTurnPlayed?: () => void;
  onPeriodConsumed?: (periodsLeft: number) => void;
};

export const createByoyomi = (
  settings: ByoyomiClockSettings,
  createTicker = createDefaultTicker
): Clock<ByoyomiState> => {
  const { mainTimeSeconds, periods: initialPeriods, timePerPeriodSeconds } = settings;

  const countdown = createCountdown(mainTimeSeconds, createTicker);
  const phase = writable<Phase>(mainTimeSeconds > 0 ? 'main' : 'overtime');
  const periodsRemaining = writable(initialPeriods);
  const timeout = writable(false);

  const data = derived([countdown, phase, periodsRemaining, timeout], ([c, ph, pr, t]) => {
    return {
      type: 'byoyomi' as 'byoyomi',
      countdown: c,
      phase: ph,
      periodsRemaining: pr,
      timeout: t
    };
  });

  const mainTimeLogic: PhaseLogic = {
    onCountdownExhausted() {
      if (initialPeriods > 0) {
        // Go into overtime if there are any periods
        phase.set('overtime');
      } else {
        // Otherwise just timeout. This is essentially absolute timing.
        timeout.set(true);
      }
    }
  };

  const overtimeLogic: PhaseLogic = {
    onTurnPlayed() {
      countdown.set(timePerPeriodSeconds);
    },
    onCountdownExhausted() {
      // burn a period
      periodsRemaining.update((periods) => periods - 1);
    },
    onPeriodConsumed(periodsLeft) {
      if (periodsLeft === 0) {
        timeout.set(true);
      } else {
        countdown.set(timePerPeriodSeconds);
      }
    }
  };

  let logic = mainTimeLogic;

  // Set logic based on current phase
  phase.subscribe((timerPhase) => {
    if (timerPhase === 'main') {
      logic = mainTimeLogic;
    } else if (timerPhase === 'overtime') {
      logic = overtimeLogic;
      countdown.set(timePerPeriodSeconds);
    }
  });

  periodsRemaining.subscribe((periodsLeft) => {
    // Only call hook if a period has actually been used
    if (periodsLeft < initialPeriods) {
      logic.onPeriodConsumed && logic.onPeriodConsumed(periodsLeft);
    }
  });

  countdown.subscribe((secondsLeft) => {
    if (secondsLeft === 0) {
      logic.onCountdownExhausted && logic.onCountdownExhausted();
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
