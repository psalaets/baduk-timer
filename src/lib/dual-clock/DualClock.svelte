<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import GenericClockFace from './GenericClockFace.svelte';
  import type { GameClock } from '$lib/timing/game-clock';
  import type { ClockSettings } from '$lib/timing/clock-settings';

  export let gameClock: GameClock;
  export let settings: ClockSettings;

  const dispatchStone = createEventDispatcher();
</script>

<div class="dual-clock">
  <GenericClockFace
    state={$gameClock.black}
    {settings}
    on:stone={() => dispatchStone('stone', 'black')}
  />

  <div>
    <slot />
  </div>

  <GenericClockFace
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
</style>
