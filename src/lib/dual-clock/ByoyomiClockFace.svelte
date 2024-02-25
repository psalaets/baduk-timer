<script lang="ts">
  import TimeLeft from '$lib/dual-clock/TimeLeft.svelte';
  import PrimaryInfo from '$lib/dual-clock/PrimaryInfo.svelte';
  import SecondaryInfo from '$lib/dual-clock/SecondaryInfo.svelte';
  import { pluralize } from '$lib/util/pluralize';
  import type { ByoyomiState, ByoyomiClockSettings } from '$lib/timing/byoyomi';

  export let state: ByoyomiState;
  export let settings: ByoyomiClockSettings;
</script>

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
