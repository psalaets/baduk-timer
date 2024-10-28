<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import ClockFace from '$lib/game-clock/ClockFace.svelte';
  import ByoyomiClockFace from '$lib/game-clock/ByoyomiClockFace.svelte';
  import CanadianClockFace from '$lib/game-clock/CanadianClockFace.svelte';
  import FischerClockFace from '$lib/game-clock/FischerClockFace.svelte';
  import type { ClockState } from '$lib/timing/clock-state';
  import { BYOYOMI, CANADIAN, FISCHER } from '$lib/clock-settings/clock-type';
  import type { ClockSettings } from '$lib/clock-settings/clock-settings';

  export let state: ClockState;
  export let settings: ClockSettings;
  export let myTurn: boolean;
  export let invertsInPortrait: boolean;

  const dispatch = createEventDispatcher();
  function dispatchStone() {
    dispatch('stone');
  }
</script>

<ClockFace {myTurn} {invertsInPortrait} timeout={state.timeout} on:press={dispatchStone}>
  {#if state.type === BYOYOMI && settings.type === BYOYOMI}
    <ByoyomiClockFace {state} {settings} />
  {:else if state.type === CANADIAN && settings.type === CANADIAN}
    <CanadianClockFace {state} {settings} />
  {:else if state.type === FISCHER && settings.type === FISCHER}
    <FischerClockFace {state} {settings} />
  {:else}
    Unhandled clock type: {state.type}
  {/if}
</ClockFace>
