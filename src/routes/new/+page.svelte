<script lang="ts">
  import NewGameForm from '$lib/new-game/NewGameForm.svelte';
  import type { ClockSettings } from '$lib/clock-settings/clock-settings';
  import { goto } from '$app/navigation';
  import { clockSettingsStore } from '$lib/clock-settings-store';
  import { gameStore } from '$lib/game-store';

  const hasPreExistingGame = !!$gameStore;

  function onSubmit(event: CustomEvent<ClockSettings>) {
    clockSettingsStore.set(event.detail);
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
