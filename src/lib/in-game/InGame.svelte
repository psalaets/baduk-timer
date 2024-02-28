<script lang="ts">
  import type { Game } from '$lib/game';
  import GameClock from '$lib/game-clock/GameClock.svelte';
  import MenuDialog from '$lib/menu/MenuDialog.svelte';

  export let game: Game;

  const { started, paused, clockState } = game;

  let menuOpen = false;
</script>

<div>started: {$started}</div>
<div>paused: {$paused}</div>

<GameClock
  gameClock={$clockState}
  settings={game.settings}
  on:stone={(event) => game.stonePlayed(event.detail)}
>
  {#if $started}
    <button on:click={() => game.pause()}>Pause</button>
  {:else}
    <button on:click={() => (menuOpen = true)}>Menu</button>
  {/if}

  {#if $started && $paused}
    <MenuDialog on:close={() => game.resume()} paused={$paused} settings={game.settings} />
  {:else if menuOpen}
    <MenuDialog on:close={() => (menuOpen = false)} settings={game.settings} />
  {/if}
</GameClock>
