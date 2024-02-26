<script lang="ts">
  import type { Game } from '$lib/game';
  import GameClock from '$lib/game-clock/GameClock.svelte';
  import Preview from '$lib/preview/Preview.svelte';
  import type { Color } from '$lib/color';
  import PauseDialog from '$lib/pause/PauseDialog.svelte';

  export let game: Game;

  const { started, paused, clockState } = game;

  function onStone(color: Color) {
    game.stonePlayed(color);
  }

  function onPause() {
    game.pause();
  }

  function onResume() {
    game.resume();
  }

  function onBegin() {
    game.begin();
  }
</script>

<div>started: {$started}</div>
<div>paused: {$paused}</div>
{#if $started}
  <GameClock
    gameClock={$clockState}
    settings={game.settings}
    on:stone={(event) => onStone(event.detail)}
  >
    <button on:click={() => onPause()}>Pause</button>
    {#if $paused}
      <PauseDialog on:close={() => onResume()} />
    {/if}
  </GameClock>
{:else}
  <Preview settings={game.settings} on:begin={() => onBegin()} />
{/if}
