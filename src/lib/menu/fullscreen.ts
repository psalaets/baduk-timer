export function isFullscreen() {
  return !!document.fullscreenElement;
}

export function canFullscreen() {
  return document.fullscreenEnabled;
}

export function enterFullscreen() {
  if (!canFullscreen()) {
    return Promise.reject(new Error('fullscreen not enabled'));
  }

  if (isFullscreen()) {
    return Promise.reject(new Error('Already in fullscreen mode'));
  }

  return document.documentElement.requestFullscreen();
}

export function exitFullscreen() {
  return document.fullscreenElement ? document.exitFullscreen() : Promise.resolve();
}
