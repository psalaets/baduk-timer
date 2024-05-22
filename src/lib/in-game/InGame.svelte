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
    <button class="pause" on:click={() => game.pause()}>Pause</button>
    <button class="pause pause--icon" on:click={() => game.pause()}>⏸</button>
    <button class="pause pause--flip" on:click={() => game.pause()}>Pause</button>
  {:else}
    <button class="pause pause--icon" on:click={() => (menuOpen = true)}>Menu</button>
  {/if}

  {#if gameInProgress && $paused}
    <MenuDialog on:close={() => game.resume()} paused={$paused} settings={game.settings} />
  {:else if menuOpen}
    <MenuDialog on:close={() => (menuOpen = false)} settings={game.settings} />
  {/if}
</GameClock>

<style>
  .pause {
    background-color: transparent;
    font-weight: bold;
    text-transform: uppercase;
    color: var(--clock-face-foreground-color);
    flex: 1 1 0%;
    border: none;
    font-size: calc(100vw / 20);
    padding: .5em;
    height: 3em;
    background-color: rgb(24, 24, 24);
  }
  .pause:nth-of-type(1),
  .pause:nth-of-type(3) {
    border-top-left-radius: 1000px;
    border-bottom-left-radius: 1000px;
  }
  .pause:hover,
  .pause:active {
    background-color: black;
  }
  .pause--flip {
    transform: rotate(180deg);
  }
</style>