import { timeRemaining } from '$lib/game-clock/time-remaining';
import { describe, it, expect } from 'vitest';

describe('timeRemaining', () => {
  it('zero seconds', () => {
    const result = timeRemaining(0);

    expect(result).toBe('0:00');
  });

  it('< 1 second', () => {
    const result = timeRemaining(0.2);

    expect(result).toBe('0:00');
  });

  it('< 10 whole seconds', () => {
    const result = timeRemaining(4);

    expect(result).toBe('0:04');
  });

  it('< 10 fractional seconds', () => {
    const result = timeRemaining(3.3);

    expect(result).toBe('0:03');
  });

  it('> 10 whole seconds', () => {
    const result = timeRemaining(18);

    expect(result).toBe('0:18');
  });

  it('> 10 fractional seconds', () => {
    const result = timeRemaining(19.7);

    expect(result).toBe('0:19');
  });
  it('60 seconds', () => {
    const result = timeRemaining(60);

    expect(result).toBe('1:00');
  });

  it('75 seconds', () => {
    const result = timeRemaining(75);

    expect(result).toBe('1:15');
  });

  it('5 minutes', () => {
    const result = timeRemaining(60 * 5);

    expect(result).toBe('5:00');
  });

  it('10 minutes', () => {
    const result = timeRemaining(60 * 10);

    expect(result).toBe('10:00');
  });

  it('10 minutes 31 seconds', () => {
    const result = timeRemaining(60 * 10 + 31);

    expect(result).toBe('10:31');
  });

  it('1 hour', () => {
    const result = timeRemaining(60 * 60);

    expect(result).toBe('1:00:00');
  });

  it('1 hour 1 second', () => {
    const result = timeRemaining(60 * 60 + 1);

    expect(result).toBe('1:00:01');
  });

  it('1 hour 1 minute 1 second', () => {
    const result = timeRemaining(60 * 60 + 60 + 1);

    expect(result).toBe('1:01:01');
  });

  it('3 hour 11 minutes 59 second', () => {
    const result = timeRemaining(60 * 60 * 3 + 60 * 11 + 59);

    expect(result).toBe('3:11:59');
  });
});
