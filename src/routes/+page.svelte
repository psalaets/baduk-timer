<script lang="ts">
  import { onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';
  import { gameStore } from '$lib/game-store';
  import InGame from '$lib/in-game/InGame.svelte';
  import WakeLock from '$lib/game-effects/WakeLock.svelte';
  import UrgentTimeSfx from '$lib/game-effects/UrgentTimeSfx.svelte';
  import TimeoutSfx from '$lib/game-effects/TimeoutSfx.svelte';
  import { appSettingsStore } from '$lib/app-settings-store';
  import { isLanguageSet } from '$lib/app-settings';

  if (browser && !$gameStore) {
    goto('/new');
  }

  // Make sure game is paused when leaving this view, e.g. back button
  onDestroy(() => {
    const game = $gameStore;
    game && game.pause();
  });
</script>

{#if $gameStore}
  <InGame game={$gameStore}>
    <WakeLock game={$gameStore} />
    {#if $appSettingsStore.sound}
      <UrgentTimeSfx game={$gameStore} />
      <TimeoutSfx game={$gameStore} />
    {/if}
  </InGame>
{/if}
