import { derived } from 'svelte/store';
import { visibility } from '$lib/util/document-visibility';
import type { Game } from '$lib/game';

export function controlWakeLock(game: Game) {
  const supported = !!navigator.wakeLock;
  if (!supported) {
    console.warn('wakelock not supported in this browser');
    return () => {};
  }

  const internalData = derived([visibility, game.phase], ([visible, phase]) => {
    return {
      visible,
      phase
    };
  });

  let wakeLock: WakeLockSentinel | null = null;

  const onRelease = () => {
    wakeLock = null;
  };

  const acquire = () => {
    return navigator.wakeLock
      .request('screen')
      .then((lock) => {
        wakeLock = lock;
        wakeLock.addEventListener('release', onRelease);
      })
      .catch((e) => console.error('Unable to acquire wakelock', e));
  };
  const release = () => {
    if (wakeLock) {
      return wakeLock
        .release()
        .then(() => {
          wakeLock?.removeEventListener('release', onRelease);
          wakeLock = null;
        })
        .catch((e) => console.error('Unable to release wakelock', e));
    } else {
      return Promise.resolve();
    }
  };

  const unsubInternalData = internalData.subscribe((d) => {
    if (d.phase === 'peri' && d.visible) {
      acquire();
    } else {
      release();
    }
  });

  return () => {
    unsubInternalData();
    release();
  };
}
