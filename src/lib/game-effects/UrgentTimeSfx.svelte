<script lang="ts">
  import { onMount } from 'svelte';
  import { type Game } from '$lib/game';
  import { urgentTimeSfx } from './urgent-time-sfx';

  export let game: Game;

  onMount(() => {
    return urgentTimeSfx(game);
  });
</script>
