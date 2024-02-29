import { getContext, setContext } from 'svelte';
import type { ClockSettings } from '$lib/clock-settings/clock-settings';
import type { Game } from '$lib/game';

export type GameContext = {
  game: Game | null;
};

export const initialGameContext: GameContext = {
  game: null
};

export function getGameContext(): GameContext {
  return getContext<GameContext>('game');
}

export function overwriteGame(game: Game, context: GameContext) {
  const oldGame = context.game;
  if (oldGame) {
    oldGame.dispose();
  }

  context.game = game;
}

export function setGameContext(ctx: GameContext): void {
  setContext<GameContext>('game', ctx);
}
