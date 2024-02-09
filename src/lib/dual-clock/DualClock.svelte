<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import ClockFace from './ClockFace.svelte';
  import type { GameClock } from '$lib/timing/dual-clock';
  import type { ClockSettings } from '$lib/timing/clock-settings';

  export let gameClock: GameClock;
  export let settings: ClockSettings;
  export let switchSides = false;

  const dispatchStone = createEventDispatcher();
</script>

<div class="dual-clock {switchSides ? 'switch-sides' : ''}">
  <ClockFace
    color="black"
    clock={$gameClock.black}
    {settings}
    on:stone={() => dispatchStone('stone', 'black')}
  />

  <div>
    <slot />
  </div>

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
    flex-direction: row;

    gap: 1rem;
  }

  .switch-sides {
    flex-direction: row-reverse;
  }
</style>
