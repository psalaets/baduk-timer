<script lang="ts">
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';
  import { settings, game } from '$lib/game';
  import DualClock from '$lib/dual-clock/DualClock.svelte';
  import Preview from '$lib/preview/Preview.svelte';
  import type { Color } from '$lib/color';
  import PauseDialog from '$lib/pause/PauseDialog.svelte';

  $: clock = $game.clock;
  $: {
    if (browser && clock == null) {
      goto('/new');
    }
  }

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

  function onSwitch() {
    game.switchSides();
  }
</script>

<a href="/new">new game</a>

{#if clock && $settings}
  <div>started: {$game.started}</div>
  <div>paused: {$game.paused}</div>
  {#if $game.started}
    <DualClock
      gameClock={clock}
      settings={$settings}
      switchSides={$game.switchSides}
      on:stone={(event) => onStone(event.detail)}
    >
      <button on:click={() => onPause()}>Pause</button>
      {#if $game.paused}
        <PauseDialog on:close={() => onResume()} on:switch={onSwitch} />
      {/if}
    </DualClock>
  {:else}
    <Preview settings={$settings} on:begin={() => onBegin()} />
  {/if}
{/if}
