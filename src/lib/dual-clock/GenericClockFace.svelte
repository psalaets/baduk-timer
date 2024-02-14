<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import ClockFace from '$lib/dual-clock/ClockFace.svelte';
  import type { Color } from '$lib/color';
  import type { ClockData } from '$lib/timing/clock-data';
  import type { ClockSettings } from '$lib/timing/clock-settings';

  export let clock: ClockData;
  export let settings: ClockSettings;

  export let color: Color;

  const dispatch = createEventDispatcher();
</script>

<ClockFace {color}>
  {#if settings.type === 'byoyomi'}
    byoyomi
  {:else if settings.type === 'canadian'}
    canadian
  {/if}
</ClockFace>
