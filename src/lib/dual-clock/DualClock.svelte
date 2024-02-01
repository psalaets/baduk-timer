<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import ClockFace from './ClockFace.svelte';
  import type { GameClock } from '$lib/timing/dual-clock';
  import type { ClockSettings } from '$lib/timing/clock-settings';

  export let gameClock: GameClock;
  export let settings: ClockSettings;

  const dispatchStone = createEventDispatcher();
  const dispatchPause = createEventDispatcher();
</script>

<div class="dual-clock">
  <ClockFace
    color="black"
    clock={$gameClock.black}
    {settings}
    on:stone={() => dispatchStone('stone', 'black')}
  />

  <button class="pause" on:click={() => dispatchPause('pause')}>Pause</button>

  <ClockFace
    color="white"
    clock={$gameClock.white}
    {settings}
    on:stone={() => dispatchStone('stone', 'white')}
  />
</div>

<style>
  .dual-clock {
    display: flex;
    gap: 1rem;
  }

  .pause {
    align-self: flex-start;
  }
</style>
