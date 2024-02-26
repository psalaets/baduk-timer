<script lang="ts">
  import type { Game } from '$lib/game';
  import GameClock from '$lib/game-clock/GameClock.svelte';
  import PauseDialog from '$lib/pause/PauseDialog.svelte';

  export let game: Game;

  const { started, paused, clockState } = game;
</script>

<div>started: {$started}</div>
<div>paused: {$paused}</div>

<GameClock
  gameClock={$clockState}
  settings={game.settings}
  on:stone={(event) => game.stonePlayed(event.detail)}
>
  <button on:click={() => game.pause()}>Pause</button>
  {#if $started && $paused}
    <PauseDialog on:close={() => game.resume()} />
  {/if}
</GameClock>
