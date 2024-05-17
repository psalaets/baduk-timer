<script lang="ts">
  import { onMount } from 'svelte';
  import { type Game } from '$lib/game';
  import { timeoutSfx } from './timeout-sfx';

  export let game: Game;

  onMount(() => timeoutSfx(game));
</script>
