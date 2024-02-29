<script lang="ts">
  import TimeLeft from '$lib/game-clock/TimeLeft.svelte';
  import PrimaryInfo from '$lib/game-clock/PrimaryInfo.svelte';
  import SecondaryInfo from '$lib/game-clock/SecondaryInfo.svelte';
  import Timeout from '$lib/game-clock/Timeout.svelte';
  import { pluralize } from '$lib/util/pluralize';
  import type { ByoyomiState } from '$lib/timing/byoyomi';
  import type { ByoyomiClockSettings } from '$lib/clock-settings/byoyomi-settings';

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
  <SecondaryInfo>
    <Timeout timeout={state.timeout}>
      ({state.periodsRemaining}
      {pluralize(state.periodsRemaining, 'period')})
    </Timeout>
  </SecondaryInfo>
{/if}
