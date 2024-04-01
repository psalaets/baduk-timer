<script lang="ts">
  import NewGameForm from '$lib/new-game/NewGameForm.svelte';
  import { getGameContext, overwriteGame } from '$lib/game-context';
  import { createGame } from '$lib/game';
  import { controlWakeLock } from '$lib/game-effects/wake-lock';
  import type { ClockSettings } from '$lib/clock-settings/clock-settings';
  import { goto } from '$app/navigation';

  const ctx = getGameContext();
  const game = ctx.game;

  const hasPreExistingGame = !!game;

  function onSubmit(event: CustomEvent<ClockSettings>) {
    const newGame = createGame(event.detail, (data) => {
      return controlWakeLock(data);
    });
    overwriteGame(newGame, ctx);

    goto('/');
  }

  function onCancel() {
    goto('/');
  }
</script>

<div class="new-game-page">
  <h1>New Game</h1>
  <NewGameForm canCancel={hasPreExistingGame} on:submit={onSubmit} on:cancel={onCancel} />
</div>

<style>
  .new-game-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
</style>
