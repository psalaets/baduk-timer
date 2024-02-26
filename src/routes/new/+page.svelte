<script lang="ts">
  import NewGameForm from '$lib/new-game/NewGameForm.svelte';
  import { getGameContext, overwriteGame } from '$lib/game-context';
  import { createGame } from '$lib/game';
  import type { ClockSettings } from '$lib/timing/clock-settings';
  import { goto } from '$app/navigation';

  const ctx = getGameContext();
  const game = ctx.game;

  const hasPreExistingGame = !!game;

  function onSubmit(event: CustomEvent<ClockSettings>) {
    const newGame = createGame(event.detail);
    overwriteGame(newGame, ctx);

    goto('/');
  }

  function onCancel() {
    goto('/');
  }
</script>

<h1>New Game</h1>
<NewGameForm canCancel={hasPreExistingGame} on:submit={onSubmit} on:cancel={onCancel} />
