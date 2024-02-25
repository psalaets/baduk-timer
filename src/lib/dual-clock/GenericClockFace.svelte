<script lang="ts">
  import ClockFace from '$lib/dual-clock/ClockFace.svelte';
  import ByoyomiClockFace from '$lib/dual-clock/ByoyomiClockFace.svelte';
  import CanadianClockFace from '$lib/dual-clock/CanadianClockFace.svelte';
  import FischerClockFace from '$lib/dual-clock/FischerClockFace.svelte';
  import type { Color } from '$lib/color';
  import type { ClockData } from '$lib/timing/clock-data';
  import type { ClockSettings } from '$lib/timing/clock-settings';

  export let clock: ClockData;
  export let settings: ClockSettings;

  export let color: Color;
</script>

<ClockFace {color}>
  {#if clock.type === 'byoyomi' && settings.type === 'byoyomi'}
    <ByoyomiClockFace {clock} {settings} {color} on:stone />
  {:else if clock.type === 'canadian' && settings.type === 'canadian'}
    <CanadianClockFace {clock} {settings} {color} on:stone />
  {:else if clock.type === 'fischer' && settings.type === 'fischer'}
    <FischerClockFace {clock} {settings} {color} on:stone />
  {:else}
    Unhandled clock type: {clock.type}
  {/if}
</ClockFace>
