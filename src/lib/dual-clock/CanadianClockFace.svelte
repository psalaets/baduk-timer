<script lang="ts">
  import TimeLeft from '$lib/dual-clock/TimeLeft.svelte';
  import PrimaryInfo from '$lib/dual-clock/PrimaryInfo.svelte';
  import SecondaryInfo from '$lib/dual-clock/SecondaryInfo.svelte';
  import { pluralize } from '$lib/util/pluralize';
  import type { CanadianState, CanadianClockSettings } from '$lib/timing/canadian';

  export let state: CanadianState;
  export let settings: CanadianClockSettings;
</script>

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
