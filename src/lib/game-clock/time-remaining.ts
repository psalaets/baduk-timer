function wholeSeconds(secondsRemaining: number) {
  return Math.trunc(secondsRemaining);
}

function hours(secondsRemaining: number) {
  return Math.trunc(wholeSeconds(secondsRemaining) / 3600);
}

function minutes(secondsRemaining: number) {
  const leftoverSeconds = wholeSeconds(secondsRemaining) % 3600;
  return Math.trunc(leftoverSeconds / 60);
}

function seconds(secondsRemaining: number) {
  return Math.trunc(secondsRemaining % 60);
}

export function timeRemaining(secondsRemaining: number) {
  const parts: Array<string> = [];

  // hours
  const hoursLeft = hours(secondsRemaining);
  if (hoursLeft > 0) {
    parts.push(String(hoursLeft));
  }

  // minutes
  const minutesLeft = minutes(secondsRemaining);
  const padding = hoursLeft > 0 ? 2 : 1;
  parts.push(String(minutesLeft).padStart(padding, '0'));

  // seconds
  const secondsLeft = seconds(secondsRemaining);
  parts.push(String(secondsLeft).padStart(2, '0'));

  return parts.join(':');
}
