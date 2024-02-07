<script lang="ts">
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';
  import { settings, game } from '$lib/game';
  import DualClock from '$lib/dual-clock/DualClock.svelte';
  import Preview from '$lib/preview/Preview.svelte';
  import type { Color } from '$lib/color';

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
</script>

<a href="/new">new game</a>

{#if clock && $settings}
  <div>started: {$game.started}</div>
  <div>paused: {$game.paused}</div>
  {#if $game.started}
    <DualClock gameClock={clock} settings={$settings} on:stone={(event) => onStone(event.detail)}>
      {#if $game.paused}
        <button on:click={() => onResume()}>Resume</button>
      {:else}
        <button on:click={() => onPause()}>Pause</button>
      {/if}
    </DualClock>
  {:else}
    <Preview settings={$settings} on:begin={() => onBegin()} />
  {/if}
{/if}
