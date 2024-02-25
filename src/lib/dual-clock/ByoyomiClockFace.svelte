<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import TimeLeft from '$lib/dual-clock/TimeLeft.svelte';
  import PrimaryInfo from '$lib/dual-clock/PrimaryInfo.svelte';
  import SecondaryInfo from '$lib/dual-clock/SecondaryInfo.svelte';
  import ClockFace from '$lib/dual-clock/ClockFace.svelte';
  import { pluralize } from '$lib/util/pluralize';
  import type { Color } from '$lib/color';
  import type { ByoyomiState, ByoyomiClockSettings } from '$lib/timing/byoyomi';

  export let state: ByoyomiState;
  export let settings: ByoyomiClockSettings;

  export let color: Color;

  const dispatch = createEventDispatcher();
</script>

<ClockFace {color}>
  {#if state.phase === 'main'}
    <PrimaryInfo>
      <TimeLeft secondsRemaining={state.countdown} />
    </PrimaryInfo>
    <SecondaryInfo>
      +<TimeLeft secondsRemaining={settings.timePerPeriodSeconds} /> ({settings.periods})
    </SecondaryInfo>
  {:else}
    <PrimaryInfo>
      <TimeLeft secondsRemaining={state.countdown} />
    </PrimaryInfo>
    <SecondaryInfo
      >({state.periodsRemaining} {pluralize(state.periodsRemaining, 'period')})</SecondaryInfo
    >
  {/if}

  <div>
    <button type="button" on:click={() => dispatch('stone')}>Played stone</button>
  </div>
</ClockFace>
