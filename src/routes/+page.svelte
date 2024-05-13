<script lang="ts">
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';
  import InGame from '$lib/in-game/InGame.svelte';
  import WakeLock from '$lib/game-effects/WakeLock.svelte';
  import { gameStore } from '$lib/game-store';

  if (browser && !$gameStore) {
    goto('/new');
  }
</script>

{#if $gameStore}
  <!-- Begin game effects -->
  <WakeLock game={$gameStore} />
  <!-- End of game effects -->

  <InGame game={$gameStore} />
{/if}
