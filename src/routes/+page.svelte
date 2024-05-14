<script lang="ts">
  import { onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';
  import { gameStore } from '$lib/game-store';
  import InGame from '$lib/in-game/InGame.svelte';
  import WakeLock from '$lib/game-effects/WakeLock.svelte';
  import UrgentTimeSfx from '$lib/game-effects/UrgentTimeSfx.svelte';
  import TimeoutSfx from '$lib/game-effects/TimeoutSfx.svelte';

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
  <!-- Begin game effects -->
  <WakeLock game={$gameStore} />
  <UrgentTimeSfx game={$gameStore} />
  <TimeoutSfx game={$gameStore} />
  <!-- End of game effects -->

  <InGame game={$gameStore} />
{/if}
