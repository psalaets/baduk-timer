<script lang="ts">
  import TimeLeft from '$lib/game-clock/TimeLeft.svelte';
  import PrimaryInfo from '$lib/game-clock/PrimaryInfo.svelte';
  import SecondaryInfo from '$lib/game-clock/SecondaryInfo.svelte';
  import Timeout from '$lib/game-clock/Timeout.svelte';
  import type { FischerState } from '$lib/timing/fischer';
  import type { FischerClockSettings } from '$lib/clock-settings/fischer-settings';
  import { toSeconds } from '$lib/clock-settings/duration';

  export let state: FischerState;
  export let settings: FischerClockSettings;
</script>

<PrimaryInfo>
  <TimeLeft secondsRemaining={state.countdown} />
</PrimaryInfo>
<SecondaryInfo>
  <Timeout timeout={state.timeout}>
    (+<TimeLeft secondsRemaining={toSeconds(settings.increment)} />)
  </Timeout>
</SecondaryInfo>
