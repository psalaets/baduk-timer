import { derived, writable } from 'svelte/store';
import { createCountdown } from './countdown';
import { createDefaultTicker } from './ticker';
import type { Clock } from './clock';
import { BYOYOMI, type Byoyomi } from '$lib/clock-settings/clock-type';
import { type ByoyomiClockSettings } from '$lib/clock-settings/byoyomi-settings';
import { toSeconds } from '$lib/clock-settings/duration';

type Phase = 'main' | 'overtime';

export type ByoyomiClock = Clock<ByoyomiState>;

export type ByoyomiState = {
  type: Byoyomi;
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
  const { mainTime, periods: initialPeriods, timePerPeriod } = settings;
  const countdown = createCountdown(toSeconds(mainTime), createTicker);
  const phase = writable<Phase>(toSeconds(mainTime) > 0 ? 'main' : 'overtime');
  const periodsRemaining = writable(initialPeriods);
  const timeout = writable(false);

  const state = derived([countdown, phase, periodsRemaining, timeout], ([c, ph, pr, t]) => {
    return {
      type: BYOYOMI,
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
      countdown.set(toSeconds(timePerPeriod));
    },
    onCountdownExhausted() {
      // burn a period
      periodsRemaining.update((periods) => periods - 1);
    },
    onPeriodConsumed(periodsLeft) {
      if (periodsLeft === 0) {
        timeout.set(true);
      } else {
        /**
         * Sort of a hack:
         *
         * After using a period, player gets nearly `<period time> + 1` seconds
         * so the clock shows `<period time>` for a bit.
         *
         * Without this the clock will show `<period time>` then instantly
         * switches to `<period time> - 1`.
         */
        const periodBurnedBonusSeconds = 0.99;
        countdown.set(toSeconds(timePerPeriod) + periodBurnedBonusSeconds);
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
      countdown.set(toSeconds(timePerPeriod));
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
