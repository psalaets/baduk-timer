<script lang="ts">
  import { getContext } from 'svelte';
  import NewGameForm from '$lib/new-game/NewGameForm.svelte';
  import { type GameContext, setGameContext, createGame } from '$lib/game';
  import type { ClockSettings } from '$lib/timing/clock-settings';
  import { goto } from '$app/navigation';

  const ctx = getContext<GameContext>('game');
  const game = ctx.game;

  const hasPreExistingGame = !!game;

  function onSubmit(event: CustomEvent<ClockSettings>) {
    if (game) {
      game.dispose();
    }
    ctx.game = createGame(event.detail);

    goto('/');
  }

  function onCancel() {
    goto('/');
  }
</script>

<h1>New Game</h1>
<NewGameForm canCancel={hasPreExistingGame} on:submit={onSubmit} on:cancel={onCancel} />
