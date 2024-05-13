<script lang="ts">
  import { onMount } from 'svelte';
  import { type Game } from '$lib/game';
  import { sfx } from './sfx';

  export let game: Game;

  onMount(() => {
    return sfx(game);
  });
</script>
