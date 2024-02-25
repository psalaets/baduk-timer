<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import ClockFace from '$lib/dual-clock/ClockFace.svelte';
  import ByoyomiClockFace from '$lib/dual-clock/ByoyomiClockFace.svelte';
  import CanadianClockFace from '$lib/dual-clock/CanadianClockFace.svelte';
  import type { Color } from '$lib/color';
  import type { ClockData } from '$lib/timing/clock-data';
  import type { ClockSettings } from '$lib/timing/clock-settings';

  export let clock: ClockData;
  export let settings: ClockSettings;

  export let color: Color;

  const dispatch = createEventDispatcher();
</script>

<ClockFace {color}>
  {#if clock.type === 'byoyomi' && settings.type === 'byoyomi'}
    <ByoyomiClockFace {clock} {settings} {color} on:stone />
  {:else if clock.type === 'canadian' && settings.type === 'canadian'}
    <CanadianClockFace {clock} {settings} {color} on:stone />
  {/if}
</ClockFace>
