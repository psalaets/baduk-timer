<script lang="ts">
  import TimeLeft from '$lib/game-clock/TimeLeft.svelte';
  import PrimaryInfo from '$lib/game-clock/PrimaryInfo.svelte';
  import SecondaryInfo from '$lib/game-clock/SecondaryInfo.svelte';
  import Timeout from '$lib/game-clock/Timeout.svelte';
  import { pluralize } from '$lib/util/pluralize';
  import type { CanadianState } from '$lib/timing/canadian';
  import type { CanadianClockSettings } from '$lib/clock-settings/canadian-settings';
  import { toSeconds } from '$lib/clock-settings/duration';

  export let state: CanadianState;
  export let settings: CanadianClockSettings;

  const timePerPeriodSeconds = toSeconds(settings.timePerPeriod);
</script>

{#if state.phase === 'main'}
  <PrimaryInfo>
    <TimeLeft secondsRemaining={state.countdown} />
  </PrimaryInfo>
  <SecondaryInfo>
    +<TimeLeft secondsRemaining={timePerPeriodSeconds} /> / {settings.stonesPerPeriod}
  </SecondaryInfo>
{:else}
  <PrimaryInfo>
    <TimeLeft secondsRemaining={state.countdown} />
  </PrimaryInfo>
  <SecondaryInfo>
    <Timeout timeout={state.timeout}>
      ({state.stonesRemaining}
      {pluralize(state.stonesRemaining, 'stone')})
    </Timeout>
  </SecondaryInfo>
{/if}
