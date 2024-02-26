<script lang="ts">
  import '../global.css';
  import { setContext } from 'svelte';
  import { setGameContext, type GameContext } from '$lib/game';

  setContext<GameContext>('game', {
    game: null
  });
</script>

<div>
  Top level layout
  <slot />
</div>
