export type Ticker = {
  start: () => void;
  stop: () => void;
};

/**
 * @param elapsedMs How many ms have elapsed since the last tick.
 */
export type OnTick = (elapsedMs: number) => void;

export type CreateTicker = (intervalMs: number, onTick: OnTick) => Ticker;

/**
 * Creates a heartbeat.
 */
export const createDefaultTicker: CreateTicker = function (intervalMs, onTick) {
  let intervalId: number | null = null;
  let previousTickTimestamp = 0;

  function tick() {
    const now = Date.now();
    const elapsedMs = now - previousTickTimestamp;
    previousTickTimestamp = now;

    onTick(elapsedMs);
  }

  return {
    start() {
      if (intervalId == null) {
        previousTickTimestamp = Date.now();
        intervalId = setInterval(tick, intervalMs);
      }
    },
    stop() {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    }
  };
};
