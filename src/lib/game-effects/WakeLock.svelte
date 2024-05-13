<script lang="ts">
  import { type Game } from '$lib/game';
  import { onMount } from 'svelte';
  import { controlWakeLock } from './wake-lock';

  export let game: Game;

  onMount(() => controlWakeLock(game));
</script>
