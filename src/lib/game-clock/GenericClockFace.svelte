<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import ClockFace from '$lib/game-clock/ClockFace.svelte';
  import ByoyomiClockFace from '$lib/game-clock/ByoyomiClockFace.svelte';
  import CanadianClockFace from '$lib/game-clock/CanadianClockFace.svelte';
  import FischerClockFace from '$lib/game-clock/FischerClockFace.svelte';
  import type { ClockState } from '$lib/timing/clock-state';
  import type { ClockSettings } from '$lib/timing/clock-settings';

  export let state: ClockState;
  export let settings: ClockSettings;

  const dispatch = createEventDispatcher();
  function dispatchStone() {
    dispatch('stone');
  }
</script>

<ClockFace on:click={() => dispatchStone()}>
  {#if state.type === 'byoyomi' && settings.type === 'byoyomi'}
    <ByoyomiClockFace {state} {settings} />
  {:else if state.type === 'canadian' && settings.type === 'canadian'}
    <CanadianClockFace {state} {settings} />
  {:else if state.type === 'fischer' && settings.type === 'fischer'}
    <FischerClockFace {state} {settings} />
  {:else}
    Unhandled clock type: {state.type}
  {/if}

  <div class="buttons">
    <button type="button" on:click|stopPropagation={() => dispatchStone()}>Played stone</button>
  </div>
</ClockFace>
