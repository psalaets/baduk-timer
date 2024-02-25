<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import TimeLeft from '$lib/dual-clock/TimeLeft.svelte';
  import PrimaryInfo from '$lib/dual-clock/PrimaryInfo.svelte';
  import SecondaryInfo from '$lib/dual-clock/SecondaryInfo.svelte';
  import ClockFace from '$lib/dual-clock/ClockFace.svelte';
  import { pluralize } from '$lib/util/pluralize';
  import type { Color } from '$lib/color';
  import type { CanadianState, CanadianClockSettings } from '$lib/timing/canadian';

  export let state: CanadianState;
  export let settings: CanadianClockSettings;

  export let color: Color;

  const dispatch = createEventDispatcher();
</script>

<ClockFace {color}>
  {#if state.phase === 'main'}
    <PrimaryInfo>
      <TimeLeft secondsRemaining={state.countdown} />
    </PrimaryInfo>
    <SecondaryInfo>
      +<TimeLeft secondsRemaining={settings.timePerPeriodSeconds} /> / {settings.stonesPerPeriod}
    </SecondaryInfo>
  {:else}
    <PrimaryInfo>
      <TimeLeft secondsRemaining={state.countdown} />
    </PrimaryInfo>
    <SecondaryInfo
      >({state.stonesRemaining} {pluralize(state.stonesRemaining, 'stone')})</SecondaryInfo
    >
  {/if}

  <div>
    <button type="button" on:click={() => dispatch('stone')}>Played stone</button>
  </div>
</ClockFace>
