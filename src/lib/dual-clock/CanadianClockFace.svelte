<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import TimeLeft from '$lib/dual-clock/TimeLeft.svelte';
  import PrimaryInfo from '$lib/dual-clock/PrimaryInfo.svelte';
  import SecondaryInfo from '$lib/dual-clock/SecondaryInfo.svelte';
  import ClockFace from '$lib/dual-clock/ClockFace.svelte';
  import { pluralize } from '$lib/util/pluralize';
  import type { Color } from '$lib/color';
  import type { CanadianData, CanadianClockSettings } from '$lib/timing/canadian';

  export let clock: CanadianData;
  export let settings: CanadianClockSettings;

  export let color: Color;

  const dispatch = createEventDispatcher();
</script>

<ClockFace {color}>
  {#if clock.phase === 'main'}
    <PrimaryInfo>
      <TimeLeft secondsRemaining={clock.countdown} />
    </PrimaryInfo>
    <SecondaryInfo>
      +<TimeLeft secondsRemaining={settings.timePerPeriodSeconds} /> / {settings.stonesPerPeriod}
    </SecondaryInfo>
  {:else}
    <PrimaryInfo>
      <TimeLeft secondsRemaining={clock.countdown} />
    </PrimaryInfo>
    <SecondaryInfo
      >({clock.stonesRemaining} {pluralize(clock.stonesRemaining, 'stone')})</SecondaryInfo
    >
  {/if}

  <div>
    <button type="button" on:click={() => dispatch('stone')}>Played stone</button>
  </div>
</ClockFace>
