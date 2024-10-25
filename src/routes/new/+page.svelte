<script lang="ts">
  import NewGameForm from '$lib/new-game/NewGameForm.svelte';
  import type { ClockSettings } from '$lib/clock-settings/clock-settings';
  import { goto } from '$app/navigation';
  import { gameStore } from '$lib/game-store';
  import { createGame } from '$lib/game';
  import { i18nStore } from '$lib/i18n/i18n-store';

  const hasPreExistingGame = !!$gameStore;

  function onSubmit(event: CustomEvent<ClockSettings>) {
    const game = createGame(event.detail);
    gameStore.set(game);

    goto('/');
  }

  function onCancel() {
    goto('/');
  }
</script>

<div class="new-game-page">
  <h1>{$i18nStore.newGamePageHeading}</h1>
  <NewGameForm canCancel={hasPreExistingGame} on:submit={onSubmit} on:cancel={onCancel} />
</div>

<style>
  .new-game-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;

    margin-inline: auto;
    width: 26rem;
    max-width: calc(100% - 2rem);
  }
</style>
