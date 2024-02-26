<script lang="ts">
  import { getContext } from 'svelte';
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';
  import { getGameContext, type GameContext } from '$lib/game';
  import InGame from '$lib/in-game/InGame.svelte';

  const ctx = getContext<GameContext>('game');
  const game = ctx.game;

  if (browser && !game) {
    goto('/new');
  }
</script>

<!-- TODO remove link -->
<a href="/new">new game</a>

{#if game}
  <InGame {game} />
{/if}
