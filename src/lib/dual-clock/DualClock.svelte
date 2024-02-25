<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import GenericClockFace from './GenericClockFace.svelte';
  import type { GameClock } from '$lib/timing/dual-clock';
  import type { ClockSettings } from '$lib/timing/clock-settings';

  export let gameClock: GameClock;
  export let settings: ClockSettings;
  export let switchSides = false;

  const dispatchStone = createEventDispatcher();
</script>

<div class="dual-clock {switchSides ? 'switch-sides' : ''}">
  <GenericClockFace
    color="black"
    state={$gameClock.black}
    {settings}
    on:stone={() => dispatchStone('stone', 'black')}
  />

  <div>
    <slot />
  </div>

  <GenericClockFace
    color="white"
    state={$gameClock.white}
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
