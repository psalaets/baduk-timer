<script lang="ts">
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';
  import { getGameContext } from '$lib/game-context';
  import InGame from '$lib/in-game/InGame.svelte';

  const ctx = getGameContext();
  const game = ctx.game;

  if (browser && !game) {
    goto('/new');
  }
</script>

{#if game}
  <InGame {game} />
{/if}
