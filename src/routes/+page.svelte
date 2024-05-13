<script lang="ts">
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';
  import InGame from '$lib/in-game/InGame.svelte';
  import { gameStore } from '$lib/game-store';

  if (browser && !$gameStore) {
    goto('/new');
  }
</script>

{#if $gameStore}
  <InGame game={$gameStore} />
{/if}
