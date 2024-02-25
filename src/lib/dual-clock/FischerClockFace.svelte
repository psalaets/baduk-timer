<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import TimeLeft from '$lib/dual-clock/TimeLeft.svelte';
  import PrimaryInfo from '$lib/dual-clock/PrimaryInfo.svelte';
  import SecondaryInfo from '$lib/dual-clock/SecondaryInfo.svelte';
  import ClockFace from '$lib/dual-clock/ClockFace.svelte';
  import type { Color } from '$lib/color';
  import type { FischerState, FischerClockSettings } from '$lib/timing/fischer';

  export let state: FischerState;
  export let settings: FischerClockSettings;

  export let color: Color;

  const dispatch = createEventDispatcher();
</script>

<ClockFace {color}>
  <PrimaryInfo>
    <TimeLeft secondsRemaining={state.countdown} />
  </PrimaryInfo>
  <SecondaryInfo>
    (+<TimeLeft secondsRemaining={settings.incrementSeconds} />)
  </SecondaryInfo>

  <div>
    <button type="button" on:click={() => dispatch('stone')}>Played stone</button>
  </div>
</ClockFace>
