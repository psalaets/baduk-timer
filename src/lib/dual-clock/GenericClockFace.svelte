<script lang="ts">
  import ClockFace from '$lib/dual-clock/ClockFace.svelte';
  import ByoyomiClockFace from '$lib/dual-clock/ByoyomiClockFace.svelte';
  import CanadianClockFace from '$lib/dual-clock/CanadianClockFace.svelte';
  import FischerClockFace from '$lib/dual-clock/FischerClockFace.svelte';
  import type { Color } from '$lib/color';
  import type { ClockState } from '$lib/timing/clock-state';
  import type { ClockSettings } from '$lib/timing/clock-settings';

  export let state: ClockState;
  export let settings: ClockSettings;

  export let color: Color;
</script>

<ClockFace {color}>
  {#if state.type === 'byoyomi' && settings.type === 'byoyomi'}
    <ByoyomiClockFace {state} {settings} {color} on:stone />
  {:else if state.type === 'canadian' && settings.type === 'canadian'}
    <CanadianClockFace {state} {settings} {color} on:stone />
  {:else if state.type === 'fischer' && settings.type === 'fischer'}
    <FischerClockFace {state} {settings} {color} on:stone />
  {:else}
    Unhandled clock type: {state.type}
  {/if}
</ClockFace>
