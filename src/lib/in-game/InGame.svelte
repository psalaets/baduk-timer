<script lang="ts">
  import { type Game, isGameInProgess } from '$lib/game';
  import GameClock from '$lib/game-clock/GameClock.svelte';
  import MenuDialog from '$lib/menu/MenuDialog.svelte';

  export let game: Game;

  const { paused, clockState, whoseTurn, phase } = game;

  $: gameInProgress = isGameInProgess($phase);
  let menuOpen = false;
</script>

<!-- <div>paused: {$paused}</div>
<div>whoseTurn: {$whoseTurn}</div>
<div>phase: {$phase}</div> -->

<!-- Render game effects -->
<slot />

<GameClock
  gameClock={$clockState}
  settings={game.settings}
  whoseTurn={gameInProgress ? $whoseTurn : 'either'}
  on:stone={(event) => game.stonePlayed(event.detail)}
>
  {#if gameInProgress}
    <button on:click={() => game.pause()}>Pause</button>
  {:else}
    <button on:click={() => (menuOpen = true)}>Menu</button>
  {/if}

  {#if gameInProgress && $paused}
    <MenuDialog on:close={() => game.resume()} paused={$paused} settings={game.settings} />
  {:else if menuOpen}
    <MenuDialog on:close={() => (menuOpen = false)} settings={game.settings} />
  {/if}
</GameClock>
