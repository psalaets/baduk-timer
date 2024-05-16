import { Howl, type HowlOptions } from 'howler';
import sprite from './sound-sprite.json';

const howl = new Howl(sprite as unknown as HowlOptions);

export function timeout() {
  repeatedly(howl, 'timeout', 5, 60);
}

export function urgent() {
  howl.play('urgent');
}

export function superUrgent() {
  howl.play('super-urgent');
}

function repeatedly(howl: Howl, soundName: string, totalPlays: number, gapMillis: number) {
  const howlId = howl.play(soundName); // (1)

  // Plan for one less play because first play already happened at (1)
  const plannedPlays = totalPlays - 1;
  let playsScheduled = 0;

  const handler = (howlId: number) => {
    if (playsScheduled === plannedPlays) {
      howl.off('end', howlId);
    } else {
      setTimeout(() => howl.play(howlId), gapMillis);

      playsScheduled += 1;
    }
  };

  howl.on('end', handler, howlId);
}
